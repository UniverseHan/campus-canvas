var socketio = require( "socket.io" );
var http = require( "http" );
var express = require('express');
var path = require('path');

var app = express();

//Express req.body
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var server = http.createServer(app);

server.listen( 9892, function()
{
	console.log("RunnerGame Server Start port:9892");
});
//localhost/port번호로 GameFramework.html에 접근 가능하게 해줌
/*
app.get('/chat', function(req,res){
	console.log(req.query.username);
	res.sendFile(__dirname + '/Client/GameFramework.html');
});
*/

//Use POST instead of GET
app.post('/chat', function(req, res, next){
	console.log(req.body.username);
	var username = req.body.username;
	//res.sendFile(__dirname + '/Client/GameFramework.html');
	res.redirect('./GameFramework.html?username=' + username);
});
// /Client의 Static 파일들에 대한 접근을 가능케 함
app.use(express.static(path.join(__dirname, 'Client')));

var io = socketio.listen( server );
io.set("log level", 1);

io.sockets.on("connection", function(socket)
{
	console.log("[Client Connected] " + socket.id);

	// add Student
	var student = new Student(socket.id);
	arrStudents.push(student);

	console.log("Student Count : " + arrStudents.length);

	socket.on('disconnect', function()
	{
		console.log("[client Disconnected]" );
		sendAllExcept(socket, "other_has_leaved", socket.id);
		leaveStudent(socket.id);
	});

	socket.on("join_room", function(data)
	{
		console.log("[join room]");
		var student = getStudentById(socket.id);
		student.x = data.x;
		student.y = data.y;

		if(student == null)
			return;

		var arr = new Array();
		for(var i in arrStudents)
		{
			var sd = arrStudents[i];
			if( sd.id == socket.id)
				continue;
			arr.push( {id: sd.id, x: sd.x, y:sd.y });
		}

		socket.emit("other_players", arr);

		// notify join stude to all other players
		sendAllExcept(socket,
				"join_newStudent",
				{ id: socket.id
				, x : data.x
				, y : data.y});
	});

	socket.on("move_to", function(data)
	{
		console.log("[move_to] dx : " + data.dx + ", dy : " + data.dy);

		var s = getStudentById( socket.id );
		s.x += data.dx;
		s.y += data.dy;
		sendAllExcept(socket,
				"move_to",
				{ id: socket.id
				, dx : data.dx
				, dy : data.dy
				, dir: data.dir});
	});

	socket.on("speak_to_all", function(data)
	{
		console.log("[speak_to_all] msg : " + data.msg);
		sendAllExcept(socket,
				"speak",
				{ id: socket.id, msg: data.msg });
	});

});

function Student(id)
{
	this.id = id;

	this.x = 0;
	this.y = 0;
}

Student.prototype.emit = function(event, data) {
//	io.sockets.(event, data);
};

function getStudentById( id )
{
	for( var i in arrStudents)
	{
		var other = arrStudents[i];
		if(other.id == id)
			return other;
	}
	return null;
}

function sendAllExcept(socket, msg, data)
{
	for( var i=0; i<arrStudents.length; ++i)
	{
		var otherStudent = arrStudents[i];
		if(otherStudent.id == socket.id) {
			continue;
		}
		socket.broadcast.to(otherStudent.id).emit(
				msg,data);
	}
}
function studentIndexOf(id)
{
	for( var i in arrStudents)
	{
		var other = arrStudents[i];
		if(other.id == id)
			return i;
	}
	return -1;
}

function leaveStudent(studentId)
{
	var indexToDel = studentIndexOf(studentId);
	arrStudents.splice(indexToDel, 1);
}

var arrStudents = new Array();

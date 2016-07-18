window.addEventListener("keydown", onKeyDown, false);

window.addEventListener("touchstart", onTouchStart, false);
window.addEventListener("touchmove", onTouchMove, false);
window.addEventListener("touchend", onTouchEnd, false);

window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("mouseup", onMouseUp, false);

//var Server = "http://220.149.235.222";
var Server = "http://222.106.5.225";
// var Server = "http://localhost";
var Port = "9892";
var AddrSocket = Server + ':' + Port;

function SpriteTestScene()
{
	this.aiUsed = false;
	this.camera = new Camera();
	//player
	this.spriteImg = new Image();
	this.spriteImg.src = "./image/player.png";
	//npc
	this.spriteImg2 = new Image();
	this.spriteImg2.src = "./image/npc.png";
	
	this.spriteObject = new SpriteAnimation( this.spriteImg, 50, 110, 3, 3);
	
	var backgroundImg = new Image();
	backgroundImg.src = "./image/finalmap.jpg";
	this.backgroundObject = new GraphicObject(backgroundImg);
	
	new Socket(AddrSocket);
	this.others = new Array();
	this.others.push( this.spriteObject);
	
	this.userIsTyping = true;
	
	gfwSocket.onInit(onSocketInit);
	
	var chatControl = new ChatControl();
	
	this.chatBar = document.createElement("input");
	this.chatBar.id = "chatBar";
	document.body.appendChild(this.chatBar);
	
	var canvasX = 0;
	var canvasY = 0;	
	
	// Joy Stick
	var joystick = new Joystick();
	this.joysticBottomGap = 50;
	
	
	//this -> player
	this.currentAI = null;
	
	//save the newest Player data
	this.newPlayer = null;

	if( typeof this.toggleAiMode != "function") {
	//============== Member Function Definitions ==================
	SpriteTestScene.prototype.toggleAiMode = function()
	{
		//AI used value change
		if( this.aiUsed == true)
		{
			this.aiUsed = false;
		}
		else {
			this.aiUsed = true;
		}
		//if AI used, create AI object
		if(this.aiUsed == true)
		{
			this.currentAI = new FindThePlayer(this);
			this.spriteObject.changeImg(this.spriteImg2);
		}
		else {
			this.currentAI = null;
			this.spriteObject.changeImg(this.spriteImg);
		}
	};
	
SpriteTestScene.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var context = theCanvas.getContext("2d");
	
	context.save();
	
		var	offsetX = (this.spriteObject.x - screenWidth/2);
		var offsetY = (this.spriteObject.y - screenHeight/2);
		
		if( offsetX < 0 )
			offsetX = 0;
		if(offsetY < 0)
			offsetY = 0;
		
		if(offsetX > (791 - screenWidth))
			offsetX = (791 - screenWidth);
		
		if(offsetY > (650 - screenHeight))
			offsetY = (650 - screenHeight);
	
		context.translate( -offsetX, -offsetY );
		this.backgroundObject.Render(context);	
		this.RenderPlayers(context);
	context.restore();
		
	
	this.RenderUI(context);
};	

SpriteTestScene.prototype.RenderUI = function(context)
{
	joystick.render(context);
};

SpriteTestScene.prototype.Update = function()
{
	this.processInput(inputSystem);

	if( this.currentAI != null)
	{
		this.currentAI.update();
	}
	this.updatePlayers();
	this.updateUI();
};

SpriteTestScene.prototype.updateUI = function()
{
	// Rearrange Joystic  
	joystick.y = screenHeight 
		- joystick.radius 
		- this.joysticBottomGap;
	
	// Update ChatControl
	chatControl.setWidth( screenWidth );
	chatControl.moveTo(0 , screenHeight - chatControl.getHeight()-8);
	
	// Fix Scroll
	 window.scrollTo(0, 0);
	 document.body.scrollTop = 0;
	 viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', 'height=auto');
};

SpriteTestScene.prototype.onTouch = function(x, y)
{	
	if( joystick.touchedBy(x, y ) )
	{
		joystick.touch(x, y);
	}
};

SpriteTestScene.prototype.processInput = function(inputSystem)
{
	if(this.aiUsed === true)
		return;
	
	//이렇게 change
	//  ||
	// \||/
	//  \/
	//inputProcessor.process(inputSystem);

	var dx = 0;
	var dy = 0;
	var DIR_LEFT = 1;
	var DIR_RIGHT = 2;
	var DIR_DOWN = 0;
	var DIR_UP = 3;
	
	var direction = this.spriteObject.state;
	if(inputSystem.isKeyDown( 37 ) )	
	{
		dx -= 5;
		direction = DIR_LEFT;
	}
	if(inputSystem.isKeyDown(39) )
	{
		dx += 5;
		direction = DIR_RIGHT;
	}
	if(inputSystem.isKeyDown(38))
	{
		dy -= 5;
		direction = DIR_UP;
	}
	if(inputSystem.isKeyDown(40))
	{
		dy += 5;
		direction = DIR_DOWN;
	}
	
	if( joystick.isControlling )
	{
		var dir = joystick.getHandleDir();
		this.moveCharacter( dir.dx, dir.dy, dir.dir);
	}
	else {
		this.moveCharacter( dx, dy, direction);	
	}
};

SpriteTestScene.prototype.onMouseMove = function(x, y, e)
{
	if( joystick.isControlling ) 
	{		
		joystick.moveControl(x, y);
		e.preventDefault();
	}
};

SpriteTestScene.prototype.onTouchEnd = function(x, y)
{
	joystick.endControl( x, y);
};


SpriteTestScene.prototype.onKeyDown = function(e)
{
	if(e.keyCode ==13)
	{
		// update()
		if( this.userIsTyping )
		{
			var chatMsg = chatControl.getChatObject().val();
			if( chatMsg != "" )
			{
				gameState.enterChat(chatMsg);
			}
			chatControl.getChatObject().val("");
		}
		//gameState.userIsTyping  = !gameState.userIsTyping;
		
		// process screen
		//chatControl.getChatObject().toggle();
		if( this.userIsTyping )
		{
			chatControl.getChatObject().focus();
		}
	}
};

}//============= End Of Member Function Definitions===================================
}
function onSocketInit()
{
	gfwSocket.On("join_newStudent", function(data) 
	{
		var otherPlayer = new SpriteAnimation( gameState.spriteImg, 50, 110, 3, 3);
		otherPlayer.id = data.id;
		otherPlayer.SetPosition(data.x, data.y);
		//remember new player
		gameState.newPlayer = otherPlayer;
		//first new player appears -> ai is not the others
		if(this.aiUsed == true)
		{
			if(gameState.others.length > 0)
			{
				gameState.currentAI = new FollowAndChat(gameState);
			}
		}
		//gameState.currentAI.setNewPlayerData(gameState.newPlayer);
		gameState.others.push( otherPlayer );
	});
	
	gfwSocket.On("move_to", function(data) 
	{
		gameState.otherPlayerMove(data.id, data.dx, data.dy, data.dir);
	});
	
	gfwSocket.On("other_players", function(data)
	{
		for(var i in data)
		{
			var p = data[i];
			var otherPlayer = new SpriteAnimation( gameState.spriteImg, 50, 110, 3, 3);
			otherPlayer.id = p.id;
			otherPlayer.SetPosition(p.x, p.y);
			gameState.others.push( otherPlayer );
		}
	});
	
	gfwSocket.On("other_has_leaved", function(data) 
	{
		gameState.otherPlayerLeave(data);
		if ( gameState.others.length > 1)
		{
			var newTarget = gameState.others[gameState.others.length - 1];
			gameState.currentAI.setNewPlayer(newTarget);
		}
		else {
			gameState.currentAI = new FindThePlayer(gameState);
		}
	});
	
	gfwSocket.On("speak", function(data) {
		gameState.otherPlayerSpeak(data.id, data.msg);
	});
	
	gfwSocket.Emit("join_room", 
			{ x : gameState.spriteObject.x
			, y : gameState.spriteObject.y});
}

function onTouchStart(e)
{
	gameState.onTouch( 
		e.changedTouches[0].clientX,
		e.changedTouches[0].clientY);
	//e.preventDefault();
}

function onMouseDown(e)
{
	gameState.onTouch( 
		e.clientX,
		e.clientY);
	// e.preventDefault();
}

function onTouchMove(e)
{	
	gameState.onMouseMove( 
		e.changedTouches[0].clientX, 
		e.changedTouches[0].clientY
		, e);	
	// e.preventDefault();
}

function onMouseMove(e)
{
	gameState.onMouseMove( e.clientX, e.clientY);
	// e.preventDefault();
}

function onMouseUp(e)
{
	gameState.onTouchEnd( e.clientX, e.clientY);	
 	//e.preventDefault();
}
function onTouchEnd(e)
{
	gameState.onTouchEnd( 
		e.changedTouches[0].clientX, 
		e.changedTouches[0].clientY);
	// e.preventDefault();
}

function onKeyDown(e)
{
	try {
		gameState.onKeyDown(e);
	}
	catch(e)
	{
		alert(e);
	}
}

SpriteTestScene.prototype.RenderPlayers = function(context)
{
	var sprites = this.others.slice();
	sprites.sort(comparePositionY);
	
	for(var i in sprites)
	{
		var other = sprites[i];
		other.Render(context);
	}
};

SpriteTestScene.prototype.moveCharacter = function(dx, dy, direction)
{
	this.spriteObject.ChangeStateTo(direction);
	this.camera.translate(dx, dy);
	this.spriteObject.Translate( dx, dy );
	if( dx != 0 || dy != 0) {
		gfwSocket.Emit("move_to", {dx: dx, dy: dy, dir: direction});
	}
};

SpriteTestScene.prototype.updatePlayers = function()
{
	for(var i in this.others)	
	{
		var other = this.others[i];
		other.Update();
	}
};

function comparePositionY(player1, player2)
{
	if( player1.y > player2.y) {
		return 1;
	}
	else if( player1.y < player2.y) {
		return -1;
	}
	else {
		return 0;
	}
}

SpriteTestScene.prototype.otherPlayerMove = function(id, dx, dy, dir)
{
	for(var i in this.others)
	{
		var other = this.others[i];
		if( other.id == id )
		{
			other.ChangeStateTo(dir);
			other.Translate(dx, dy);
			break;
		}
	}
};

SpriteTestScene.prototype.otherPlayerSpeak = function(id, msg)
{
	for(var i in this.others)
	{
		var other = this.others[i];
		if( other.id == id )
		{
			other.speak(msg);
			break;
		}
	}
};

SpriteTestScene.prototype.enterChat = function(msg)
{
	this.spriteObject.speak(msg);
	gfwSocket.Emit("speak_to_all", { msg : msg});
};

SpriteTestScene.prototype.otherPlayerLeave = function(id)
{	
	for(var i in this.others)
	{
		if( this.others[i].id == id) 
		{
			this.others.splice(i, 1);
			break;
		}
	}
};

function Camera()
{
	this.x = 0;
	this.y = 0;
}

Camera.prototype.translate = function(dx, dy)
{
	this.x += dx;
	this.y += dy;
};


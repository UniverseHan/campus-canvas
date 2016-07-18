function Socket(server_http)
{
	LoadJavaScript(server_http + "/socket.io/socket.io.js" );
	setTimeout(gfwSocketConnectForLoadJavascript, 200, server_http);
	
	gfwSocket = this;
	
	this.onInitHandler = null;
}

var gfwSocket;

function LoadJavaScript(src)
{
	var el = document.createElement("script");
	el.setAttribute("src", src);
	document.getElementsByTagName("head")[0].appendChild(el);
}

function gfwSocketConnectForLoadJavascript( server_http )
{
	if( typeof io != 'undefined') {
		gfwSocket.socket = io.connect( server_http );
		
		if( gfwSocket.onInitHandler != null)
		{
			gfwSocket.onInitHandler();
		}
	}
	else 
		setTimeout(gfwSocketConnectForLoadJavascript, 100, server_http);
}

Socket.prototype.On = function(event, func)
{
	this.socket.on(event, func);
};

Socket.prototype.Emit = function(event, data)
{
	this.socket.emit( event, data);
};

Socket.prototype.Disconnect = function()
{
	if(this.socket)
		this.socket.disconnect();
};


Socket.prototype.onInit = function(onInitHandler)
{
	this.onInitHandler = onInitHandler;
};


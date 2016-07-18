window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

function InputSystem()
{
	this.mouseX = 0;
	this.mouseY = 0;
	
	this.isKeyPressed = [];
	return this;
}

InputSystem.prototype.updateMouseOn = function( canvas, e )
{
	this.mouseX = e.clientX - canvas.offsetLeft;
	this.mouseY = e.clientY - canvas.offsetTop;
};

InputSystem.prototype.press = function( keyEvent )
{
	this.isKeyPressed[keyEvent.keyCode] = true;
};

InputSystem.prototype.depress = function(keyEvent)
{
	this.isKeyPressed[keyEvent.keyCode] = false;
};

InputSystem.prototype.isKeyDown = function(keyCode)
{
	if( this.isKeyPressed[keyCode] == true )
	{
		return true;
	}
	else {
		return false;
	}
};

function onMouseMove(e)
{
	var theCanvas = document.getElementById("GameCanvas");
	inputSystem.updateMouseOn( theCanvas, e );
}

function onKeyDown(e)
{
	inputSystem.press(e);
}

function onKeyUp(e)
{
	inputSystem.depress(e);
}

var inputSystem = new InputSystem();

function Joystick()
{
	this.x = 100;
	this.y = 300;
	
	this.touchX = 0;
	this.touchY = 0;
	
	this.radius = 50;
	
	this.handle = {x:0, y:0};
	
	this.isControlling = false;
	
	
if( typeof this.updateStickPosition != "function") {
//=======================================================================
	Joystick.prototype.updateStickPosition = function( x, y)
	{
		this.handle.x = x;
		this.handle.y = y;
	};
	
	Joystick.prototype.moveControl = function(x, y)
	{
		var rX = x - this.x;
		var rY = y - this.y;
		
		if( this.isControlling )
		{
			var length = Math.sqrt( rX*rX + rY*rY);
			if(length > this.radius)
			{
				var theta = Math.acos( rX / length );
				length = this.radius;
			
				if( rY < 0 )
				{
					theta = -theta;
				}
				
				rX = length * Math.cos(theta);
				rY = length * Math.sin(theta);
			}
			this.updateStickPosition(rX, rY);
		}
	};
	
	Joystick.prototype.getHandleDir = function()
	{
		var DIR_LEFT = 1;
		var DIR_RIGHT = 2;
		var DIR_DOWN = 0;
		var DIR_UP = 3;
		
		var r = Math.sqrt( 
				this.handle.x*this.handle.x 
				+ this.handle.y*this.handle.y);
		var theta = Math.acos(this.handle.x / r );
		if( this.handle.y > 0 )
		{
			theta = -theta;
		}
		
		if( theta >  - Math.PI * (1/4)
			&& theta  < Math.PI * (1/4))
		{
			return { dx : 5, dy : 0 , dir : DIR_RIGHT};
		}
		else if(theta >= Math.PI * (1/4) && 
				theta < Math.PI * (3/4))
		{
			return { dx : 0, dy : -5 , dir : DIR_UP};
		}
		else if( theta >= Math.PI * (3/4) 
				|| theta < -Math.PI * (3/4))
		{
			return { dx : -5, dy : 0 , dir : DIR_LEFT};
		} 
		else 
		{
			return { dx : 0, dy : 5 , dir : DIR_DOWN};
		}
	};
	
	Joystick.prototype.touchedBy = function(x, y)
	{
		var localCoord = this.getLocalCoord(x, y);
		
		var r = Math.sqrt( 
				localCoord.x * localCoord.x 
				+ localCoord.y*localCoord.y);
		if( r > this.radius )
			return false;	
		return true;
	};
	
	Joystick.prototype.touch = function(x, y)
	{
		var localCoord = this.getLocalCoord(x, y);
		
		this.isControlling = true;
		this.updateStickPosition(localCoord.x, localCoord.y);
	};
	
	Joystick.prototype.endControl = function(x, y)
	{
		this.isControlling = false;
		this.updateStickPosition(0, 0);
	};
	
	Joystick.prototype.getLocalCoord = function(x, y)
	{
		return {x : x - this.x, y : y - this.y};
	};
}//======================================================================
}

Joystick.prototype.render = function(context)
{
	var joysticPose = { x: this.x, y: this.y };
			
	var moverPose = {
			x: joysticPose.x + this.handle.x, 
			y: joysticPose.y + this.handle.y};
	var moverRadius = 10;
	
	
	context.beginPath();
	context.arc(
			joysticPose.x, joysticPose.y, 
			this.radius, 
			0, 2 * Math.PI, false);
	context.fillStyle = "#eeffff";
	context.strokeStyle = "rgba(200, 230, 255, 0.6)";
	context.stroke();
			
	context.beginPath();
	context.arc( 
			moverPose.x, moverPose.y, 
			moverRadius, 
			0, 2 * Math.PI, 
			false);
	context.fill();
	
	
	context.fillStyle = "#ffffff";
	context.font = '15px Arial';
	context.textBaseline = "top";
	context.fillText("touch : X = " + this.touchX + ", Y = " + this.touchY, 10, 25);
	
	var r = Math.sqrt( 
			this.handle.x*this.handle.x 
			+ this.handle.y*this.handle.y);
	var theta = Math.acos(this.handle.x / r );
	if( this.handle.y > 0 )
	{
		theta = -theta;
	}
	
	context.fillText("sticX = " + this.handle.x + ", sticY = " + this.handle.y, 10, 55);
	context.fillText("Joystic Pose: { " + joysticPose.x + "," + joysticPose.y + " }", 10, 80 );
	context.fillText("r="+ r + ", theta= " + theta, 10, 40);
};

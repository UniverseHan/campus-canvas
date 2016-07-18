function JustMoveAround(p)
{
	this.DIR_LEFT = 1;
	this.DIR_RIGHT = 2;
	this.DIR_DOWN = 0;
	this.DIR_UP = 3;
	
	this.player = p;
	this.currentDirection = this.DIR_RIGHT;
	this.currentDx = 5;
};

JustMoveAround.prototype.update = function()
{
	if(this.player.spriteObject.x >= 700)
	{
		this.currentDirection = this.DIR_LEFT;
		this.currentDx = -5;
	}
	if(this.player.spriteObject.x <= this.player.spriteObject.width)
	{
		this.currentDirection = this.DIR_RIGHT;
		this.currentDx = 5;
	}	
	this.player.moveCharacter(this.currentDx, 0, this.currentDirection);
};
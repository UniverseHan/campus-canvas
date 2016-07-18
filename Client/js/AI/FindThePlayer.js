function FindThePlayer(p)
{
	this.count = 1;
	this.DIR_LEFT = 1;
	this.DIR_RIGHT = 2;
	this.DIR_DOWN = 0;
	this.DIR_UP = 3;
	
	this.player = p;
	this.currentDirection = this.DIR_DOWN;
	this.currentDx = 5;
	this.msg = ["Hello", "Welcome", "I'm so tired", "I'm NPC"];
	this.num = 0;
};

FindThePlayer.prototype.update = function()
{	
	if(this.currentDirection == this.DIR_LEFT || this.currentDirection == this.DIR_RIGHT)
	{
		this.horizon();
		gameState.enterChat(this.msg[this.num]);
		this.count++;
		if((this.count % 80) == 0)
		{
			this.num = Math.floor(Math.random()*4);
			this.changeDirection();
		}
	}
	else
	{
		this.vertical();
		gameState.enterChat(this.msg[this.num]);
		this.count++;
		if((this.count % 50) == 0)
		{
			this.num = Math.floor(Math.random()*4);
			this.changeDirection();
		}
	}
};

FindThePlayer.prototype.changeDirection = function()
{
	this.currentDirection = Math.floor(Math.random()*4);
	
	if(this.currentDirection == this.DIR_RIGHT)
	{
		this.currentDx = 5;
	}
	else if(this.currentDirection == this.DIR_LEFT)
	{
		this.currentDx = -5;
	}
	else if(this.currentDirection == this.DIR_UP)
	{
		this.currentDx = -5;
	}
	else
	{
		this.currentDx = 5;
	}
};

FindThePlayer.prototype.horizon = function()
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

FindThePlayer.prototype.vertical = function()
{
	if(this.player.spriteObject.y >= 530)
	{
		this.currentDirection = this.DIR_UP;
		this.currentDx = -5;
	}
	if(this.player.spriteObject.y <= this.player.spriteObject.width)
	{
		this.currentDirection = this.DIR_DOWN;
		this.currentDx = 5;
	}	
	this.player.moveCharacter(0, this.currentDx, this.currentDirection);
};

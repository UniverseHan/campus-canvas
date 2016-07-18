function SpriteAnimation( img, width, height, totalFrameCount, fps)
{
	this.id;
	this.x = 0;
	this.y = 0;
	
	//사용 이미지
	this.img = img;
	
	this.width = width;
	this.height = height;
	this.totalFrameCount = totalFrameCount;
	this.currentFrame = 0;
	
	this.updateFrame = fps/ 30;
	
	// Down, Left, Right, Up

	this.state = 0;
	this.isSpeaking = false;
	this.wordsToSpeak = "";
	
	this.remainTimeInSeconds = 3;
	this.releaseTimeInSeconds = this.remainTimeInSeconds;
	
	return this;
}

SpriteAnimation.prototype.changeImg = function(newImg)
{
	this.img = newImg;
};

SpriteAnimation.prototype.Render = function(context)
{
	context.drawImage( this.img,
			this.width * Math.floor( this.currentFrame ), 
			this.height * this.state,
			this.width, this.height,
			this.x, this.y,
			this.width, this.height );
	
	this.RenderChatQuote(context);
};

SpriteAnimation.prototype.Translate = function(x, y)
{
	this.x += x;
	this.y += y;
	
	if( this.x > 791 - this.width)
		this.x = 791 - this.width;
	
	if( this.y > 650 - this.height)
		this.y = 650- this.height;
	
	if( this.x < 0)
		this.x = 0;
	
	if( this.y < 0)
		this.y =0;
};

SpriteAnimation.prototype.SetPosition = function(x, y)
{
	this.x = x;
	this.y = y;
};

SpriteAnimation.prototype.Update = function()
{
	this.currentFrame += this.updateFrame;
	if( this.currentFrame >= this.totalFrameCount)
		this.currentFrame = 0;
	
	// Update MsgBox
	if( this.isSpeaking )
	{
		this.remainTimeInSeconds -= 1/30;
		if( this.releaseTimeInSeconds < 0)
		{
			this.isSpeaking = false;
			this.releaseTimeInSeconds = this.releaseTimeInSeconds;
		}
	}
};

SpriteAnimation.prototype.ChangeStateTo = function(stateNum)
{
	this.state = stateNum;
};

SpriteAnimation.prototype.RenderChatQuote = function (context)
{
	if( this.isSpeaking &&
		this.remainTimeInSeconds > 0)
	{
		context.font = '15px Arial';
		var quoteGap = 3;
		var widthOfText =
			quoteGap
			+ context.measureText( this.wordsToSpeak ).width
			+ quoteGap;
			
		var quoteX = this.x - widthOfText/2 + this.width/2;
		
		context.fillStyle = "#ffffff";
		context.fillRect(quoteX, this.y - 5 - 20,
				widthOfText, 20 );
		
		context.fillStyle = "#000000";		
		context.textBaseline = "top";
		context.fillText(this.wordsToSpeak,
				quoteX + quoteGap, this.y - 5 - 20);	
	}
};

SpriteAnimation.prototype.speak = function(msg)
{
	this.isSpeaking = true;
	this.wordsToSpeak = msg;
	this.remainTimeInSeconds = this.releaseTimeInSeconds;
};


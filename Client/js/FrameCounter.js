function FrameCounter()
{
	this.lastfps = 0;
	this.frameCount = 0;
	this.lastTime = 0;
	return this;
}

FrameCounter.prototype.countFrame = function()
{
	this.frameCount++;
};

var frameCounter = new FrameCounter();

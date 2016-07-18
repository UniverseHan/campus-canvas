function GraphicObject( img )
{
	this.x = 0;
	this.y = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	this.img = img;
	return this;
}


GraphicObject.prototype.Render = function(context)
{
//	context.drawImage( this.img,
//			-this.offsetX, this.offsetY,
//			320, 480,
//			this.x, this.y,
//			320, 480);
	
	context.drawImage( this.img,
			this.x, this.y);
};

GraphicObject.prototype.translate = function( dx, dy )
{
	this.offsetX += dx;
	this.offsetY += dy;
};

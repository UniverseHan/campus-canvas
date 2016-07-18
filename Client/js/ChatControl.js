
function ChatControl()
{
	var chatBar = document.createElement("input");
	var chatObject = $(chatBar);
	chatBar.id = "chatBar";
	document.body.appendChild(chatBar);
	
	var canvasX = 0;
	var canvasY = 0;
	var heightOfChatBox = $("#chatBar").height();
	var positionOfChatBox = { 
	     x: canvasX,
	     y: canvasY + screenHeight - heightOfChatBox-8};

	$(chatBar).css("position", "fixed");
	$(chatBar).css("width", screenWidth + "px");
	$(chatBar).css("left", positionOfChatBox.x + "px");
	$(chatBar).css("top", positionOfChatBox.y +"px");
	
	if( typeof this.getChatObject != "function") {
	//============== Member Function Definitions ==================
	ChatControl.prototype.getChatObject = function()
	{
		return $(chatBar);
	};
	
	ChatControl.prototype.getHeight = function()
	{
		return chatObject.height();
	};
	
	ChatControl.prototype.setWidth = function(w)
	{
		chatObject.css("width", w + "px");
	};
	
	ChatControl.prototype.moveTo = function(x, y)
	{
		chatObject.css("left", x + "px");
		chatObject.css("top", y + "px");
	};
	}
};
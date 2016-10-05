
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

}

function HistoryButton()
{
	var historyButton = document.createElement("BUTTON");
	var buttonText = document.createTextNode("History");
	historyButton.appendChild(buttonText);
	historyButton.id = "historyButton";
	document.body.appendChild(historyButton);

	var canvasX = 0;
	var canvasY = 0;
	var positionOfhistoryButton = {
			 x: $("#chatBar").width(),
			 y: $("#chatBar").position().top
	};

	var historyButtonObj = $('#historyButton');

	$(historyButton).css("position", "fixed");
	$(historyButton).css("width", 100 + "px");
	$(historyButton).css("left", positionOfhistoryButton.x + "px");
	$(historyButton).css("top", positionOfhistoryButton.y +"px");
	$(historyButton).type = "button";

	HistoryButton.prototype.moveTo = function(x, y)
	{
		historyButtonObj.css("left", x + "px");
		historyButtonObj.css("top", y + "px");
	};
}

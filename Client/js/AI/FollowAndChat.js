function FollowAndChat(spriteTestScene)
{	
	this.DIR_LEFT = 1;
	this.DIR_RIGHT = 2;
	this.DIR_DOWN = 0;
	this.DIR_UP = 3;
	
	this.sceneController = spriteTestScene;
	this.newPlayer = null;
	this.currentDirection = this.DIR_RIGHT;
	this.currentDx = 0;
	this.currentDy = 0;
};

FollowAndChat.prototype.setNewPlayerData = function(data)
{
	this.newPlayer = data;
	this.sceneController.enterChat("반가워");
};

FollowAndChat.prototype.update = function()
{
	if(this.newPlayer == null)
	{
		//just stop
		//change the state of JustMoveAround
		return;
	}
	//==========================================
	//1. Follow
	//==========================================
	var youX, youY, meX, meY, dist, speed;

	youX = this.newPlayer.x;
	youY = this.newPlayer.y;
	meX = this.sceneController.spriteObject.x;
	meY = this.sceneController.spriteObject.y;
	
	//거리 계산
	dist = Math.sqrt((youX-meX)*(youX-meX) + (youY-meY)*(youY-meY));
	
	//거리가 충분히 가깝다면
	if(dist < 50)
	{
		this.currentDx = 0;
		this.currentDy = 0;
	}
	else
	{
		if (dist > 200)
			speed = 6;
		else
			speed = 2;
		
		if(meX <= youX - 5) //ai가 왼쪽에 있을 떄
		{
			this.currentDirection = this.DIR_RIGHT;
			this.currentDx = speed;
			if(meY >= youY + 5)
				this.currentDy = -speed;
			else if(meY <= youY - 5)
				this.currentDy = speed;
			else
				this.currentDy = 0;
		}
		else if(meX >= youX + 5) //ai가 오른쪽에 있을 때
		{
			this.currentDirection = this.DIR_LEFT;
			this.currentDx = -speed;
			if(meY >= youY + 5)
				this.currentDy = -speed;
			else if(meY <= youY - 5)
				this.currentDy = speed;
			else
				this.currentDy = 0;
		}
		else //ai가 x축에 가까워질 떄
		{
			this.currentDx = 0;
			if(meY >= youY + 5)
				this.currentDy = -speed;
			else
				this.currentDy = speed;
		}
			
	}
	this.sceneController.moveCharacter(this.currentDx, this.currentDy, this.currentDirection);
	
	//==========================================
	//chat
	//==========================================
	if(this.newPlayer.isSpeaking)
	{
		var msg = this.newPlayer.wordsToSpeak;
		
		//대화 분할
		var arr = msg.split(' ');
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i] == "넌")
			{
				var next = arr[i+1];
				this.sceneController.enterChat("그래 난 "+ next +"이다!");
			}
		}
	
		if(msg.search("안녕") != -1)
		{
			this.sceneController.enterChat("그래 안녕");
		}
		else if(msg.search("Bye") != -1)
		{
			this.sceneController.enterChat("Bye~");
		}
		else if(msg.search("dd") != -1)
		{
			this.sceneController.enterChat("Bye~");
			this.newPlayer = null;
			this.sceneController.currentAI = new FindThePlayer(this.sceneController);
		}
		else if(msg.search("뭐해") != -1)
		{
			this.sceneController.enterChat("니 생각");
		}
	
	}
	else
	{
		//말풍선 없애는 방법?
	}
};

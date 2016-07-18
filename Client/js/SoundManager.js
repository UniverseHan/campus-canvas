
window.addEventListener("keydown", onKeyDown, false);
function onKeyDown(e)
{
	var volume = soundSystem.volume;
	
	switch( e.keyCode)
	{
	case 38: // UP
		volume += 0.1;
		break;
	case 40:
		volume -= 0.1;
		break;
	}
	
	// truncate out of boundery
	if( volume > 1)
		volume = 1;
	if(volume <0)
		volume = 0;
	
	soundSystem.SetVolume( volume );
}

function SoundSystem()
{
	this.isLoadComplete = false;
	this.nowResourceLoadedCount = 0;
	this.intAllResourceCount = 0;
	this.arrSounds = new Array();
	this.volume = 1;
	return this;
}

SoundSystem.prototype.AddSound = function(fileName, resourceCount)
{
	var SOUND_RESOURCE_MAX = 8;
	if( resourceCount == undefined )
		resourceCount = SOUND_RESOURCE_MAX;
	
	for( var i = 0; i < resourceCount; ++i)
	{
		var newSound = new Audio();
		newSound.src = fileName;
		newSound.volume = this.volume;
		newSound.isPlayed = false;
		document.body.appendChild(newSound);
		
		newSound.addEventListener("canplaythrough", onLoadSoundComplete, false);
		this.arrSounds.push( 
				{name: fileName
				,sound: newSound
				,isPlayed: false}
		);
		this.intAllResourceCount++;
		newSound.addEventListener("ended", function()
		{
			if( window.chrome ) 
			{
				this.load();
			}
			this.pause();
		}, false);
		
	}
	

};

SoundSystem.prototype.PlaySound = function(fileName)
{
	for( var i in this.arrSounds)
	{
		var sound = this.arrSounds[i];
		if( sound.name == fileName)
		{
			if( sound.sound.paused == true ||
				sound.isPlayed == false)
			{
				sound.sound.vlume = this.volume;
				sound.sound.play();
				sound.isPlayed = true;
				return;
			}
		}
	}
	
	var soundMusic = new Audio();
	soundMusic.src = fileName;
	soundMusic.loop = false;
	document.body.appendChild(soundMusic);
	
	soundMusic.addEventListener("canplaythrough", function()
	{
		this.play();
	}, false);
	
	soundMusic.addEventListener("ended", function() {
		if( window.chrome) this.load();
	}, false);
	this.arrSounds.push({name: fileName, sound:soundMusic, isPlayed: true});
};

SoundSystem.prototype.SetVolume = function(volume)
{
	this.arrSounds.forEach( function(audio) {
		audio.sound.volume = volume;
	});
	
	this.volume = volume;
};
	

function onLoadSoundComplete()
{
	soundSystem.nowResourceLoadedCount++;
	if( soundSystem.nowResourceLoadedCount == soundSystem.intAllResourceCount)
	{
		soundSystem.isLoadComplete = true;
	}
}

var soundSystem = new SoundSystem();

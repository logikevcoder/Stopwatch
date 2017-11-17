
$(function(){
	var appMode = 0;
	var timeCounter = 0;
	var lapCounter = 0;
	var action;
	var lapNum = 0;
	var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
	
	
	
	//On App load show start and lap buttons
	hideShowButtons("#startBtn", "#lapBtn");
	//click on startBtn
	$("#startBtn").click(function() {
		//mode on
		appMode = 1;
		//show the stop and lap buttons
		hideShowButtons('#stopBtn', '#lapBtn');
		//start counter
		startAction();
		
	});
	
	$("#stopBtn").click(function(){
		// Show these 2 buttons
		hideShowButtons('#resumeBtn', '#resetBtn');
		// Stop the timer
		clearInterval(action);
	});
	
	$("#resumeBtn").click(function(){
		// Show these 2 buttons
		hideShowButtons('#stopBtn', '#lapBtn');
		// Start the timer
		startAction();
	});
	
	$("#resetBtn").click(function(){
		// reload the page
		location.reload();
	});

	$("#lapBtn").click(function(){
		if(appMode) {
			// Stop counter
			clearInterval(action);
			// Restart the lap counter
			lapCounter = 0;
			addLap();
			// Start action again
			startAction();
			
		}
	});
	//click on lapBtn
		//if mode is ON
		//stop action
		//resetLap and print lap details
		//start action
	
	//functions
	function hideShowButtons(x, y) {
		$(".control").hide();
		$(x).show();
		$(y).show();
	}
	
	function startAction() {
		action = setInterval(function() {
			timeCounter++;
			if(timeCounter == 100*60*100) {
				timeCounter = 0;
			}
			lapCounter++;
			if(lapCounter == 100*60*100) {
				lapCounter = 0;
			}
			updateTime();
		}, 10);
	}
	
	//conver counter to m, s centisec
	function updateTime() {
		// Clock timer
		timeMinutes = Math.floor(timeCounter/6000);
		// to get the seconds divide the remainder of timecounter / 6000
		timeSeconds = Math.floor((timeCounter%6000)/100);
		// to get the centiseconds, get the remainder of both variables above
		timeCentiseconds = (timeCounter%6000)%100;
		$("#timeMinutes").text(format(timeMinutes));
		$("#timeSeconds").text(format(timeSeconds));
		$("#timeCentiseconds").text(format(timeCentiseconds));
		
		// Lap timer
		lapMinutes = Math.floor(timeCounter/6000);
		// to get the seconds divide the remainder of timecounter / 6000
		lapSeconds = Math.floor((timeCounter%6000)/100);
		// to get the centiseconds, get the remainder of both variables above
		lapCentiseconds = (timeCounter%6000)%100;
		$("#lapMinutes").text(format(lapMinutes));
		$("#lapSeconds").text(format(lapSeconds));
		$("#lapCentiseconds").text(format(lapCentiseconds));
	}
	
	// Print the lap details inside the lap div
	function addLap(){
		lapNum++;
		var myLapDetails = 
				'<div class="lap">'+
					'<div class="lapTitle">'+
						'Lap' + lapNum +
					'</div>'+
					'<div class="lapTime">'+
						'<span>' + format(timeMinutes) + '</span>:'+
						'<span>' + format(timeSeconds) + '</span>:'+
						'<span>' + format(timeCentiseconds) + '</span>' +
					'</div>'+
				'</div>';
		$(myLapDetails).prependTo("#laps");
	}
	
	function format(num) {
		if(num < 10) {
		  return "0" + num;
		} else {
			return num;
		}
	}
});
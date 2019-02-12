
//DOM elements
var tempoDisplay = document.getElementById("screen-left"),
    beatDisplay = document.getElementById("screen-right"),
    tempoUp = document.getElementById("tempo-up"),
    beatUp = document.getElementById("beat-up"),
    startBtn = document.getElementById("start-btn"),
    light = document.getElementById("light"),
    tempoDown = document.getElementById("tempo-down"),
    beatDown = document.getElementById("beat-down"),
    muteIcon = document.getElementById("mute-icon"),
    highBeep = document.getElementById("high-beep"),
    lowBeep = document.getElementById("low-beep");

//Other variables
var startChecker = false,
    tempoList = [60, 63, 66, 72, 80, 92, 100, 108, 120, 132, 144, 160],
    beatList = ["1/4", "2/4", "3/4", "4/4"],
    tempoSetting = 60,
    beatSetting = "1/4",
    currentTempoIndex = tempoList.indexOf(tempoSetting), //for arrow buttons
    currentBeatIndex = beatList.indexOf(beatSetting),   //for arrow buttons
    masterTrack,
    beatTrack,
    beatCounter = 0,
    blink; //for the light blinker

const defaultLightColor = "rgb(0, 84, 139)";
const defaultLightBorderColor = "1px solid black";
const illuminatedLightColorRed = "red";
const illuminatedLightColorGreen = "rgb(30, 255, 0)";
const illuminatedLightBorderColor = "2px solid yellow";

//Button click event handlers
tempoUp.addEventListener("click", function() {
    if (startChecker == true) {  //checks if start button has already been pressed
        stopMetronome();
        increaseTempo();
        playMetronome();
    } else if (startChecker == false) {
        increaseTempo();
    }
});

tempoDown.addEventListener("click", function() {
    if (startChecker == true) {  //checks if start button has already been pressed
        stopMetronome();
        decreaseTempo();
        playMetronome();
    } else if (startChecker == false) {
        decreaseTempo();
    }
});

beatUp.addEventListener("click", function() {
    if (startChecker == true) {  //checks if start button has already been pressed
        stopMetronome();
        increaseBeat();
        playMetronome();
    } else if (startChecker == false) {
        increaseBeat();
    }
});

beatDown.addEventListener("click", function() {
    if (startChecker == true) {  //checks if start button has already been pressed
        stopMetronome();
        decreaseBeat();
        playMetronome();
    } else if (startChecker == false) {
        decreaseBeat();
    }
});

startBtn.addEventListener("click", function() {
    if (startChecker == true) {
        stopMetronome();
        startBtn.innerText = "START";
        startChecker = false;
        return;
    } else if (startChecker == false) {
        playMetronome();
        startBtn.innerText = "STOP";
        startChecker = true;
        return;
    }
});


//This is for the mute feature (BONUS)
light.addEventListener("click", function() {
    //muteSound();
});


//FUNCTIONS
function playMetronome() {
    switch(beatSetting) {  //This compiles the beat track
        case "1/4":
            beatTrack = [playHighBeep];
            break;
        case "2/4":
            beatTrack = [playHighBeep, playLowBeep];
            break;
        case "3/4":
            beatTrack = [playHighBeep, playLowBeep, playLowBeep];
            break;
        case "4/4":
            beatTrack = [playHighBeep, playLowBeep, playLowBeep, playLowBeep];
            break;
    }
    masterTrack = setInterval(playTrack, convertTempoToMilliseconds(tempoSetting));
    return;
}

function stopMetronome() {
    clearInterval(masterTrack);
    masterTrack = "";
    beatTrack = "";
    beatCounter = 0;
    return;
}


function playTrack() {
    if (beatCounter == beatTrack.length) {  //this starts the beat track over when it gets to the end
        beatCounter = 0;
        beatTrack[beatCounter]();
        beatCounter++;
        return;
    } else {
        beatTrack[beatCounter]();
        beatCounter++;
        return;
    }
}

function increaseTempo() {
    if (currentTempoIndex == tempoList.length - 1) { //checks if end of list has been reached and returns to bottom (accommodates zero-based counting system)
        tempoSetting = tempoList[0];
        updateTempoDisplay();
        currentTempoIndex = tempoList.indexOf(tempoSetting);
    } else {
        var i = currentTempoIndex;
        tempoSetting = tempoList[i+1];
        updateTempoDisplay();
        currentTempoIndex = tempoList.indexOf(tempoSetting);
    }
}

function decreaseTempo() {
    if (currentTempoIndex == 0) { //checks if beginning of list has been reached and returns to top (accommodates zero-based counting system)
        tempoSetting = tempoList[tempoList.length - 1];
        updateTempoDisplay();
        currentTempoIndex = tempoList.indexOf(tempoSetting);
    } else {
        var i = currentTempoIndex;
        tempoSetting = tempoList[i-1];
        updateTempoDisplay();
        currentTempoIndex = tempoList.indexOf(tempoSetting);
    }
}

function increaseBeat() {
    if (currentBeatIndex == beatList.length - 1) { //checks if end of list has been reached and returns to bottom (accommodates zero-based counting system)
        beatSetting = beatList[0];
        updateBeatDisplay();
        currentBeatIndex = beatList.indexOf(beatSetting);
    } else {
        var i = currentBeatIndex;
        beatSetting = beatList[i+1];
        updateBeatDisplay();
        currentBeatIndex = beatList.indexOf(beatSetting);
    }
}

function decreaseBeat() {
    if (currentBeatIndex == 0) { //checks if beginning of list has been reached and returns to top (accommodates zero-based counting system)
        beatSetting = beatList[beatList.length - 1];
        updateBeatDisplay();
        currentBeatIndex = beatList.indexOf(beatSetting);
    } else {
        var i = currentBeatIndex;
        beatSetting = beatList[i-1];
        updateBeatDisplay();
        currentBeatIndex = beatList.indexOf(beatSetting);
    }
}

//Beep sounds
var playHighBeep = function() {
    highBeep.play();
    redBlinker();
    return;
}

var playLowBeep = function() {
    lowBeep.play();
    greenBlinker();
    return;
}

//Update displays
function updateTempoDisplay() {
    tempoDisplay.innerText = tempoSetting;
    console.log(tempoSetting);
}

function updateBeatDisplay() {
    beatDisplay.innerText = beatSetting;
    console.log(beatSetting);
}

//Conversion function
function convertTempoToMilliseconds(tempo) {
    var tempoMs = 60000/tempo;
    return tempoMs;
}

//Light blinker
function redBlinker() {
    light.style.background = illuminatedLightColorRed;
    light.style.border = illuminatedLightBorderColor;
    blink = setTimeout(turnLightOff, 100);
}

function greenBlinker() {
    light.style.background = illuminatedLightColorGreen;
    light.style.border = illuminatedLightBorderColor;
    blink = setTimeout(turnLightOff, 100);
}

function turnLightOff() {
    light.style.background = defaultLightColor;
    light.style.border = defaultLightBorderColor;
}


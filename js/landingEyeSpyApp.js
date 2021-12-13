let mapFound = false;

const startOver = () => {
    startGame();
}

const caught = () => {
    $('#main-div').css({});
    
    $('#main-div').css({'background-image':'url()','background-color': 'black'});

    $('#header').html('<h2>Oh no, you were caught!!</h2>')

    $('#main-div').html('<button id="start-over" onClick="window.location.reload();">Start Over</button>');

    $('#start-over').css({'position': 'relative', 'top': '30%', 'padding': '1em', 'font-size': '3em'});
};

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    let interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if(--timer < 0){
            if(mapFound){
                clearInterval(interval);
            } else {
                caught(); 
                clearInterval(interval);
            };
        }
    }, 1000);
}

const foundMap = () => {
    mapFound = true;

    $('#header').html("<h2>You've found the map!</h2>");
    $('#main-div').html('');
    $('#main-div').css({'background-image': 'url(https://i.imgur.com/qPoeCZN.png)', 'background-size': 'cover' });

}

const startGame = (e) => {
    e.stopPropagation;
    $('#main-div').html('');
    $('#main-div').css({'background-image': 'url(https://images.unsplash.com/photo-1496664444929-8c75efb9546f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)', 'background-size': 'cover' });

    $('#header').html('<h2>Quick! Locate the treasure map in your rivals office.<br> You only have <span id="timer">01:00</span> minute/seconds.</h2>');


    const map = $('<div id="map"><img src="https://i.imgur.com/qPoeCZN.png"></div>');

    $('#main-div').append(map);
    $('#map img').css({'z-index': '0', 'width': '3vw', 'position': 'relative', 'top': '8vh', 'left': '5vw'});

    const pictureDiv = $('<div id="picture"><img src="https://i.imgur.com/PCVWNio.jpg"></div>');
    $('#main-div').append(pictureDiv);

    $('#picture img').css({'width': '4vw', 'position': 'relative', 'top': '3vh', 'left': '5vw'});

    $('#picture').click(function(e){
        e.stopPropagation;
        $('#picture').css({'position': 'relative', 'right': '-3vw'});
        $('#map').click(foundMap);  
    })

    //Got from https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
    jQuery(function ($) {
        var oneMinute = 10 * 1,
            display = $('#timer');
        startTimer( oneMinute, display);
    });
};

$('#accept').click(startGame);

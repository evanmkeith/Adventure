let mapFound = false;

const caught = () => {
    $('.lives').remove();
    $('#main-div').css({});
    
    $('#main-div').css({'background-image':'url()','background-color': 'black'});

    $('#header').html('<h2>Oh no, you were caught!!</h2>')

    $('#main-div').html('<button id="start-over" onClick="window.location.reload()">Try Again</button>');
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
    $('.lives').remove();
    $('#main-div').css({'top': '0'});

    $('#header').html("<h2>You found the map!</h2>");
    $('#main-div').html('');
    $('#main-div').css({'background-image': 'url(https://i.imgur.com/qPoeCZN.png)'});

    $('#main').append($('<a id="continue" href="./locateTreasure.html">Continue</a>')); 
    
    $('#continue').css({'margin': '10px'});
    $('#main').css({'flex-direction': 'column'});
}

const startGame = (e) => {
    e.stopPropagation;
    $('#main-div').css({'top': '-6vh'});
    timer();
    $('#accept').remove();
    $('#main-div').html('');
    $('#main-div').css({
        'background-color': 'black',
        'background-image': 'url(https://images.unsplash.com/photo-1496664444929-8c75efb9546f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)', 'background-size': 'auto 100%', 'background-repeat': 'no-repeat',
        'background-position': 'center'
    });

    $('#header').html(
        `<h2>Quick! Locate a map in your father's study before your mom sees you.<br> You only have 30 seconds.</h2>`
        );


    const map = $('<div id="map"><img src="https://i.imgur.com/qPoeCZN.png"></div>');

    $('#main-div').append(map);
    $('#map img').css({'z-index': '0', 'width': '3vw', 'position': 'relative', 'top': '-12vh', 'left': '4vw'});

    const pictureDiv = $('<div id="picture"><img src="https://i.imgur.com/PCVWNio.jpg"></div>');
    $('#main-div').append(pictureDiv);

    $('#picture img').css({'width': '4vw', 'position': 'relative', 'top': '-20vh', 'left': '4vw'});

    $('#picture').click(function(e){
        e.stopPropagation;
        //move picture 
        $('#picture img').animate({left: '7vw'}, 500);
        $('#map img').click(foundMap);  
    })

    //Got from https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
    jQuery(function ($) {
        var thirtySec = 30 * 1,
            display = $('#timer');
        startTimer( thirtySec, display);
    });
};

const timer = () => {
    const timer = $(`<div class="lives"><h3>Time left: <span id="timer">00:30</span></h3></div>`);
    $('nav').append(timer);
}

$('#accept').click(timer, startGame);

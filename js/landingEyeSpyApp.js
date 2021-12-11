const startOver = () => {
    startGame();
}

const caught = () => {
    $('#header').html('<h2>Oh no, you were caught!!</h2>')

    $('#main-div').html('<button id="start-over">Start Over</button>');

    $('#start-over').css({'position': 'relative', 'top': '30%', 'padding': '1em', 'font-size': '3em'});

    $('#main-div').css({'background-color': '#3d3834', 'background-blend-mode': 'multiply'});
};

const startGame = () => {
    $('#main-div').html('');
    $('#main-div').css({'background-image': 'url(https://images.unsplash.com/photo-1496664444929-8c75efb9546f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)', 'background-size': 'cover' });

    $('#header').html('<h2>Quick! Locate the treasure map in your rivals office.<br> You only have <span id="timer">01:00</span> minute/seconds.</h2>');

    //Got from https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.text(minutes + ":" + seconds);
    
            if (--timer < 0) {
                return caught();
            }
        }, 1000);
    }
    
    jQuery(function ($) {
        var oneMinute = 5 * 1,
            display = $('#timer');
        startTimer( oneMinute, display);
    });
};

$('#accept').click(startGame);
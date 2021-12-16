//got help from https://stackoverflow.com/questions/4950575/how-to-move-a-div-with-arrow-keys

let mainLeftMin = $('#main-div2').position()['left'];
let mainTopMin = $('#main-div2').position()['top'];
let mainLeftMax = mainLeftMin + $('#main-div2').width();
let mainTopMax = mainTopMin + $('#main-div2').height();



let box = $('#box');
let maxLeft = 1120;
let keysPressed = {};
let distancePerIteration = 3;

const snake1 = $('.snake');
const snake2 = $('.snake2');
const snake3 = $('.snake3');
const snakeWarn1 = $('.snake-warning');
const snakeWarn2 = $('.snake-warning2');
const snakeWarn3 = $('.snake-warning3');
const treasure = $('#treasure');


function calculateNewLeftValue(oldValue, keyCode1, keyCode2) {
    let newValue = parseInt(oldValue, 10)
                   - (keysPressed[keyCode1] ? distancePerIteration : 0)
                   + (keysPressed[keyCode2] ? distancePerIteration : 0);

    if(newValue < mainLeftMin){
        return mainLeftMin;
    } else if (newValue > (mainLeftMax - $('#box').width())) {
        return mainLeftMax - $('#box').width();
    } else {
        return newValue;
    };
};

function calculateNewTopValue(oldValue, keyCode1, keyCode2) {
    console.log(oldValue);
    let newValue = parseInt(oldValue, 10)
                   - (keysPressed[keyCode1] ? distancePerIteration : 0)
                   + (keysPressed[keyCode2] ? distancePerIteration : 0);

    if(newValue < mainTopMin) {
        return mainTopMin;
    } else if (newValue > (mainTopMax - $('#box').height())) {
        return mainTopMax - $('#box').height();
    } else {
        return newValue;
    };
};

$(window).keydown(function(event) { keysPressed[event.which] = true; });
$(window).keyup(function(event) { keysPressed[event.which] = false; });

const bitenBySnake = () => {
    $('#main-div2').append('<div id="start-over"></div>');
    $('#start-over').append('<h2')
}

let gameInterval = setInterval(function() {
    box.css({
        left: function(index ,oldValue) {
            return calculateNewLeftValue(oldValue, 37, 39);
        },
        top: function(index, oldValue) {
            return calculateNewTopValue(oldValue, 38, 40);
        }
    });

    //got help from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection\
    if(
        //snake1 warning 
        box.position()['left'] < snakeWarn1.position()['left'] + snakeWarn1.width() 
        &&
        box.position()['left'] + box.width() > snakeWarn1.position()['left']
        &&
        box.position()['top'] < snakeWarn1.position()['top'] + snakeWarn1.height() 
        &&
        box.height() + box.position()['top'] > snakeWarn1.position()['top']
    ) {
        if(box.children('img').length < 1) {
            box.append('<img class="alert" src="../images/Screen Shot 2021-12-15 at 4.18.10 PM.png">');
            $('header h1').html('Watch out for snakes!');
            $('header h1').css({'color': 'yellow'});
        };
    } else if (
        //snake2 warning
        box.position()['left'] < snakeWarn2.position()['left'] + snakeWarn2.width() 
        &&
        box.position()['left'] + box.width() > snakeWarn2.position()['left']
        &&
        box.position()['top'] < snakeWarn2.position()['top'] + snakeWarn2.height() 
        &&
        box.height() + box.position()['top'] > snakeWarn2.position()['top']
    ) {
        if(box.children('img').length < 1) {
            box.append('<img class="alert" src="../images/Screen Shot 2021-12-15 at 4.18.10 PM.png">');
            $('header h1').html('Watch out for snakes!');
            $('header h1').css({'color': 'yellow'});
        };
    } else if (
        //snake3 warning
        box.position()['left'] < snakeWarn3.position()['left'] + snakeWarn3.width() 
        &&
        box.position()['left'] + box.width() > snakeWarn3.position()['left']
        &&
        box.position()['top'] < snakeWarn3.position()['top'] + snakeWarn3.height() 
        &&
        box.height() + box.position()['top'] > snakeWarn3.position()['top']
    ) {
        if(box.children('img').length < 1) {
            box.append('<img class="alert" src="../images/Screen Shot 2021-12-15 at 4.18.10 PM.png">');
            $('header h1').html('Watch out for snakes!');
            $('header h1').css({'color': 'yellow'});
        };
    } else {
        $('.alert').remove();
        $('header h1').html('Locate the treasure!');
        $('header h1').css({'color': 'lightgreen'});
    };

    if(
        //snake1 bite
        box.position()['left'] < snake1.position()['left'] + snake1.width() 
        &&
        box.position()['left'] + box.width() > snake1.position()['left']
        &&
        box.position()['top'] < snake1.position()['top'] + snake1.height() 
        &&
        box.height() + box.position()['top'] > snake1.position()['top']
    ) {
        box.css({'border-color': 'red'});
        $('header h1').html("Oh no! You've been bitten by a snake!");
        $('header h1').css({'color': 'red'});
        clearInterval(gameInterval);
        bitenBySnake();
    } else if (
        //snake2 bite
        box.position()['left'] < snake2.position()['left'] + snake2.width() 
        &&
        box.position()['left'] + box.width() > snake2.position()['left']
        &&
        box.position()['top'] < snake2.position()['top'] + snake2.height() 
        &&
        box.height() + box.position()['top'] > snake2.position()['top']
    ) {
        box.css({'border-color': 'red'});
        $('header h1').html("Oh no! You've been bitten by a snake!");
        $('header h1').css({'color': 'red'});
        clearInterval(gameInterval);
        bitenBySnake();
    } else if (
        //snake3 bite
        box.position()['left'] < snake3.position()['left'] + snake3.width() 
        &&
        box.position()['left'] + box.width() > snake3.position()['left']
        &&
        box.position()['top'] < snake3.position()['top'] + snake3.height() 
        &&
        box.height() + box.position()['top'] > snake3.position()['top']
    ) {
        box.css({'border-color': 'red'});
        $('header h1').html("Oh no! You've been bitten by a snake!");
        $('header h1').css({'color': 'red'});
        clearInterval(gameInterval);
        bitenBySnake();
    };

    if(
        //found treasure
        box.position()['left'] < treasure.position()['left'] + treasure.width() 
        &&
        box.position()['left'] + box.width() > treasure.position()['left']
        &&
        box.position()['top'] < treasure.position()['top'] + treasure.height() 
        &&
        box.height() + box.position()['top'] > treasure.position()['top']
    ) {
        box.css({'border-color': 'green'});
        $('header h1').html("Congratulations! You've located the treasure!!");
        $('header h1').css({'color': 'green'});
    };

}, 20);

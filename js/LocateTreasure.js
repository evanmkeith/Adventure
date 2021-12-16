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
const snakeWarn1 = $('.snake-warning');
const snakeWarn2 = $('.snake-warning2');


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

setInterval(function() {
    box.css({
        left: function(index ,oldValue) {
            return calculateNewLeftValue(oldValue, 37, 39);
        },
        top: function(index, oldValue) {
            return calculateNewTopValue(oldValue, 38, 40);
        }
    });

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
            return box.append('<img class="alert" src="../images/Screen Shot 2021-12-15 at 4.18.10 PM.png">');
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
            return box.append('<img class="alert" src="../images/Screen Shot 2021-12-15 at 4.18.10 PM.png">');
        };
    }     
    else {$('.alert').remove()};

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
    };
}, 20);


// <img id="alert" src="../images/Screen Shot 2021-12-15 at 4.18.10 PM.png">
//got help from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
/*const snake1 = $('.snake');
const snake2 = $('.snake2');
const snakeWarn1 = $('.snake-warning');
const snakeWarn2 = $('.snake-warning2');

const indi = $('#box');

console.log(snake1.position()['left']);

if(
    //snake warning 1
    snake1.position()['left'] < indi.position()['left'] + indi.width() 
    &&
    snake1.position()['left'] + snake1.width() > indi.position()['left']
    &&
    snake1.position()['top'] < indi.position()['top'] + indi.height() 
    &&
    snake1.height() + snake1.position()['top'] > indi.position()['top']
) {
    $('#box').append('<img id="alert" src="../images/Screen Shot 2021-12-15 at 4.18.10 PM.png">');
} else if (){
    //snake warning 2
} else if (){
    //snake1 bite
} else if (){
    //snake2 bite
}

rect2.bind("EnterFrame", function () {
    if (rect1.x < box.x + box.w &&
        rect1.x + rect1.w > box.x &&
        rect1.y < box.y + box.h &&
        rect1.h + rect1.y > box.y) {
        // collision detected!
        this.color("green");
    } else {
        // no collision
        this.color("blue");
    }
});*/
//got help from https://stackoverflow.com/questions/4950575/how-to-move-a-div-with-arrow-keys

let mainLeftMin = $('#main-div2').position()['left'];
let mainTopMin = $('#main-div2').position()['top'];
let mainLeftMax = mainLeftMin + $('#main-div2').width();
let mainTopMax = mainTopMin + $('#main-div2').height();



let box = $('#box');
let maxLeft = 1120;
let keysPressed = {};
let distancePerIteration = 3;

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
}, 20);
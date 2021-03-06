let numLives = 3;

const changeBoxBorderColor = (color='black') => {
    let newColor = color;
    return $('#box').css({'border-color': `${newColor}`});
}

const bitenBySnake = () => {
    
    if(numLives === 1){
        $('nav').html('');
        changeBoxBorderColor('red');
        $('header h1').html("Oh no! You've been bitten by a snake!");
        $('header h1').css({'color': 'red'});
        $('#main-div2').append('<div id="start-over"></div>');
        $('#start-over').html("<h2>Game Over</h2><a id='start-over-btn' href='./landingEyeSpy.html'>Try Again</a>")
    } else {
        numLives -= 1;
        let tryBtn = 'Try Again'
        
        if(numLives === 1){
            tryBtn = 'Last Chance';
        };

        $('header h1').html("Oh no! You've been bitten by a snake!");
        $('header h1').css({'color': 'red'});
        $('#main-div2').append('<div id="try-again"></div>');
        $('#try-again').html(`<h2>You've lost a life!</h2><img src='https://i.imgur.com/84iHMq3.png'><button id='try-again-btn'>${tryBtn}</button>`);
        $('#box').css({'top': '55vh' , 'left': '48vw'});
        $('#try-again-btn').click(function(){startGame()});
    };
    
};

const foundTreasure = () =>{
    const found = $("<div id='foundTres'><img src='https://i.imgur.com/JI8QP5W.png'><p>You've done it! You've finally found the crystal! But what's this, you hear something behind you...</p><button id='continue'>></button></div>"); 

    $('#main-div2').prepend(found);

    $('#continue').click(function(){
        location.href = './battle.html';
    })

}

const startGame = () => {

    $('#startDiv').remove();
    $('#try-again').remove();
    $('#num-lives').html(`${numLives}`);
    //got help from https://stackoverflow.com/questions/4950575/how-to-move-a-div-with-arrow-keys

    let mainLeftMin = $('#main-div2').position()['left'];
    let mainTopMin = $('#main-div2').position()['top'];
    let mainLeftMax = mainLeftMin + $('#main-div2').width();
    let mainTopMax = mainTopMin + $('#main-div2').height();
    
    let box = $('#box');
    let keysPressed = {};
    let distancePerIteration = 3;

    const nearSnake = () => {
        if(box.children('img').length < 1) {
            $('header h1').html('Watch out for snakes!');
            $('header h1').css({'color': 'yellow'});
            changeBoxBorderColor('yellow');
        };
    };

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
    
    
    let gameInterval = setInterval(function() {

        const snake1 = $('.snake');
        const snake2 = $('.snake2');
        const snake3 = $('.snake3');
        const snakeWarn1 = $('.snake-warning');
        const snakeWarn2 = $('.snake-warning2');
        const snakeWarn3 = $('.snake-warning3');
        const treasure = $('#treasure');

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
            nearSnake();
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
            nearSnake();
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
            nearSnake();
        } else {
            $('header h1').html('Locate the crystal!');
            $('header h1').css({'color': '#850001'});
            changeBoxBorderColor('black');
        } 
    
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
            clearInterval(gameInterval);
            bitenBySnake();
        } 
    
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
            $('header h1').html("Congratulations! You've located the crystal!!");
            $('header h1').css({'color': '#850001'});
            clearInterval(gameInterval);
            foundTreasure();
        };
    
    }, 20);
}

const startDiv = $("<div id='startDiv'><p>After obtaining the map, you followed it to a remote island and go on a perlous journey to find the location of the treasure. You've now reached the place where it ought to be, but will have to search around in order to find it. Use the arrow keys on your keyboard to move throughout the jungle to locate the crystal - but be careful! Poisonous snakes inhabit the island and aren't shy. You only have three chances at finding what you've come all this way for.</p><button id='strBtn'>></button></div>"); 

$('#main-div2').prepend(startDiv);

$('#strBtn').click(startGame);


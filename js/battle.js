const indi = $('#indi'); 
const badGuy = $('#bad-guy');
let alive = true;

let moveLeft = parseInt(badGuy.css('left'));

const youWin = () => {
    $('#defend').remove();
    const youWinDiv = $(`<div id="you-win"><h2>Well done!</h2><p>You've yet to see any signs of your father, but believe that he had to have made it as far as you did. Out of the corner of your eye, you see a familiar item of your father's and go investigate.</p><a href="./findFather.html">></a></div>`);
    $('header h1').html(`You've successfully defended yourself.`)
    if($('#main').children().length < 2){
        $('#main').append(youWinDiv);
    };
    indi.css({'background-image': "url('https://i.imgur.com/ZxeL9aj.png')"});
};

const youLose = () => {
    $('#defend').remove();
    const youLoseDiv = $(`<div id="you-lose"><h2>You've been killed!</h2><a href="./landingEyeSpy.html">Try Again?</a></div>`);
    if($('#main').children().length < 2){
        $('#main').append(youLoseDiv);
    };
};

const defend = () => {
    let defndBtn = $("<button id='defend'>Click here to defened yourself!</button>")

    $('#main').append(defndBtn);

    indi.css({'z-index': '1'});
    
    let battle = setInterval(function(){

        $('#defend').click(function(){
            if(alive){
                indi.css({'background-image': "url('https://i.imgur.com/XTzhLMb.png')"}); 
                clearInterval(battle);
                //help from https://codepen.io/seeker5084/pen/VMQGwX
                badGuy.fadeOut(2000).promise().done(function(){youWin()});
            };
        });

        moveLeft -= 3;
        badGuy.css({'left': `${moveLeft}px`});

        if(
            badGuy.position()['left'] < indi.position()['left'] + indi.width() 
            &&
            badGuy.position()['left'] + badGuy.width() > indi.position()['left']
            &&
            badGuy.position()['top'] < indi.position()['top'] + indi.height() 
            &&
            badGuy.height() + badGuy.position()['top'] > indi.position()['top']
        ) {
            clearInterval(battle);
            alive = false;
            indi.fadeOut(1000).promise().done(function(){youLose()});
        };
    }, 25);
    
}

$('#main-div3').animate({left: "0"}, 3000).promise().done(function(){defend()});

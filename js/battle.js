const indi = $('#indi'); 
const badGuy = $('#bad-guy');

let moveLeft = parseInt(badGuy.css('left'));

const youWin = () => {
    $('#defend').remove();
    const youWinDiv = $('<div id="you-win"><h2>Congratulations, You Win!!!</h2><a href="./landingEyeSpy.html">Play Again</a></div>');
    if($('#main').children().length < 2){
        $('#main').append(youWinDiv);
    };
};


const defend = () => {
    let defndBtn = $("<button id='defend'>Quick, defened yourself!</button>")

    $('#main').append(defndBtn);

    indi.css({'z-index': '1'});
    
    let battle = setInterval(function(){

        $('#defend').click(function(){
            indi.css({'background-image': "url('https://i.imgur.com/XTzhLMb.png')"}); 
            console.log('happening');
            clearInterval(battle);
            //help from https://codepen.io/seeker5084/pen/VMQGwX
            badGuy.fadeOut(2000).promise().done(function(){youWin()});
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
            badGuy.css({'border-color': 'red'});
            console.log('youdead!');
            clearInterval(battle);
        };
    }, 25);
    
}

$('#main-div3').animate({left: "0"}, 3000).promise().done(function(){defend()});

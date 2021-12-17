const indi = $('#indi'); 
const badGuy = $('#bad-guy');

let moveTop = parseInt(badGuy.css('top'));
let moveLeft = parseInt(badGuy.css('left'));

//const youWin 


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
            
            badGuy.animate(
            { deg: 90 },
            {
                duration: 1200,
                step: function(now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
                }
            });

            badGuy.css({'top': `27vh`});

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

const finalNote = () => {
    $('#saDiv').html(`<p>Your Journey has come to an end.</p><a href="./landingEyeSpy.html">Play Again</a>`);
}


const completed = () => {
    $('#saDiv').html('');
    $('#saDiv').animate({left: '33vw', top: '25vh'}, 3000).promise().done(function(){finalNote()});
}

const leave = () => {
    $('#indiAfter img').attr('src', 'https://i.imgur.com/o98PESJ.png'); 
    $('#dads-stuff').css({'background-image': "url('https://i.imgur.com/jDj77Uz.png')"});
    $('#indiAfter').animate({left: "-25vw"}, 5000).promise().done(function(){completed()});
};

const sad = () => {
    $('header').remove();
    $('#indiAfter img').attr('src', 'https://i.imgur.com/3SwGG7I.png'); 
    
    const saDiv = $(`<div id="saDiv"><p>Upon arriving, you see that your father infact did not survive all those years ago. Realizing that you only started this journey with the hope of seeing your dad again, you collect your father's things and leave the stone with him - so his dream of finding the stone can finally be realized.</p><br><p>press enter to contine</p></div>`)
    $('#main').append(saDiv);

    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            leave();
        }
    });
};


$('#indiAfter').animate({left: "0"}, 3000).promise().done(function(){sad()});

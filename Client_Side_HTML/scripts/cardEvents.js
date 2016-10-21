
/*Method one*/
/*var init = function() {
    var card = document.getElementById('card');

    document.getElementById('flip').addEventListener( 'click', function(){
        card.toggleClassName('flipped');
    }, false);
};
window.addEventListener('DOMContentLoaded', init, false);*/


/*Method two*/


var flip =function() {
    var cards = $(".section__content > .card");
    for ( var i  = 0, len = cards.length; i < len; i++ ) {
        var card = cards[i];
        clickListener( card );
    }

    function clickListener(card) {
        card.addEventListener( "click", function() {
            var c = this.classList;
            c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
        });
    }
}

var draw =function() {
    var cards = $(".section__content > .card");
    for ( var i  = 0, len = cards.length; i < len; i++ ) {
        var card = cards[i];
        clickListener( card );
    }

    function clickListener(card) {
        card.addEventListener( "click", function() {
            var c = this.classList;
            console.log(c);
            c.contains("draw") === true ? c.remove("draw") : c.add("draw");
        });
    }
}

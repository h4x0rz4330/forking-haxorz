$(document).ready(function(){
    dealCards(4);
    drawCard(1);
});

var dealCards = function(players){

    for(i=1;i<=players;i++) {
        var selector = i-1;
        $(getHand(i)).append(buildCard().clone());
        $(".effect__click:eq("+selector+")").addClass("p"+i+"HandClick");
        if(i==1) {
            $(".card__back:eq(0)").addClass("card__back__flipped");
            $(".card__front:eq(0)").addClass("card__front__flipped");
            $(".card__front:eq(0)").on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function(e) {
                    setBackFlip($(".card__back:eq(0)"));
                    setFrontFlip($(".card__front:eq(0)"));
                    $(".card__back:eq(0)").removeClass("card__back__flipped");
                    $(".card__front:eq(0)").removeClass("card__front__flipped");
                });
            $(".card__front:eq(0)").addClass("card__front__zoomed");
        }
        else {
            $(".card__back:eq(" + selector + ")").addClass("p"+i+ "HandDraw");
            $(".card__front:eq(" +selector+ ")").addClass("p"+i+ "HandDraw");
        }
    }
}

function drawCard(player,cardinfo){
    $("#draw").on("click",function(){
        $(getHand(player)).append(buildCard().clone());
        applyDrawAnimation(player);
        $(".card__front:eq(1)").on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
            function(e) {
                var i = player-1;
                switch(i)
                {
                    case 0:
                        $(".card__front:eq(1)").addClass("card__front__zoomed");
                    case 2:
                        setBackFlip($(".card__back:eq(1)"));
                        setFrontFlip($(".card__front:eq(1)"));
                        break;

                    case 1:
                    case 3:

                        break;
                }
                $(".card__back:eq(1)").removeClass("drawBack");
                $(".card__front:eq(1)").removeClass("drawFront");
            });
    });
}

//creates a card as a dom element.
function buildCard(){
    var card =$("<div class='card effect__click'></div>");
    var cardFront = $("<div class='card__front'></div>");
    var cardBack = $("<div class='card__back'></div>");
    $(card).append(cardFront);
    $(card).append(cardBack);
    return card
}
//gets the id value of the player. When called must surround with $()
function getHand(player){
    var hand = "#p"+player+"Hand";
    return hand;
}

//Sets backside rotateY value to avoid flipback on class deletion
function setBackFlip(card) {
    $(card).css({ WebkitTransform: 'rotateY(180deg)'});
    $(card).css({ '-moz-transform': 'rotateY(180deg)'});
}

//sets backside rotateY value to avoid flipback when deleting the animation class.
function setFrontFlip(card) {
   $(card).css({ WebkitTransform: 'rotateY(360deg)'});
    $(card).css({ '-moz-transform': 'rotateY(360deg)'});
}

function applyDrawAnimation(player){
    $(".effect__click:eq("+player+")").addClass("drawMove");
    $(".card__back:eq("+player+")").addClass("drawBack");
    $(".card__front:eq("+player+")").addClass("drawFront");
}

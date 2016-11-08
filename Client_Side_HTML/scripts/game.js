


$(document).ready(function(){



    dealCards(4);

    $("#draw").click(function(){
        drawCard(1,"hello");
    });

    $("#discard").click(function(){
     discardCard($(getHand(1)));
    });

    ripples();





});


/*------------------------------Value Obtaining Functions-----------------------*/
//gets the id value of the players hand. When called must surround with $()
function getHand(player){
    var hand = "#p"+player+"Hand";
    return hand;
}

//gets the id value of the players discard.
function getDiscard(player)
{
    var hand = "#p"+player+"Disc";
    return hand;
}


function getImageOffset(){

}

function getWindowSize() {
    var window = [$(window).height(), $(window).width()];
    return window;
}

function getFieldSize(){
    var board = [$(".board").height()];

}

function modifyPlayField(){

}

/*------------------------------GAME ACTIONS -------------------------------------*/
//performs initial deal actions which gives 1 card to all players.
function dealCards(players){
    for(i=1;i<=players;i++) {
        var card = buildCard().clone();
        var hand = $(getHand(i));
        hand.append(card);
        $(".effect__click:eq(0)",hand).addClass("p"+i+"HandClick");
        if(i==1) {
            var tempHand = hand;
            $(".card",tempHand).click(playCard());
            $(".card__back:eq(0)").addClass("card__back__flipped");
            $(".card__front:eq(0)").addClass("card__front__flipped");
            $(".card__front:eq(0)").on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function(e) {
                    setCardFlipDeal(tempHand);
                    $(".card__back:eq(0)").removeClass("card__back__flipped");
                    $(".card__front:eq(0)").removeClass("card__front__flipped");
                });
            $(".card__front:eq(0)",tempHand).addClass("card__front__zoomed");
        }
        else {
            $(".card__back:eq(0)",hand).addClass("p"+i+ "HandDraw");
            $(".card__front:eq(0)",hand).addClass("p"+i+ "HandDraw");
        }
    }
}

//deals a single card to a player during draw phase.
function drawCard(player,cardinfo){
     //var card = $(getHand(player)).append(buildCard().clone());

    var card = buildCard().clone();
    var hand = $(getHand(player));
    hand.append(card);
    applyDrawAnimation(1,hand);
   $(card).on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function(e) {
            var tempHand = hand;
            var i = player-1;
            switch(i)
            {
                case 0:
                    setCardFlipDraw(tempHand);
                case 2:

                    break;

                case 1:
                case 3:

                    break;
            }
            $(".card__back:eq(1)",tempHand).removeClass("drawBack");
            $(".card__front:eq(1)",tempHand).removeClass("drawFront");
        });

}


function playCard(){

}

function discardCard(card,player){
   $(card).removeClass("p"+player+"HandClick");
    $(card).remove();
    var dcard= $(card).clone();
    $(getDiscard(1)).append(dcard);

    //setDiscardAnimation(1,dcard);

}

/*------------------------------------------------------------------------------------*/




/*---------------------------- Component Builder---------------------------------------------*/
//creates a card with basic parameters
function buildCard(){
    var card =$("<div class='card effect__click'></div>");
    var cardFront = $("<div class='card__front'></div>");
    var cardBack = $("<div class='card__back'></div>");
    $(card).append(cardFront);
    $(card).append(cardBack);
    return card
}






//Sets backside rotateY value during deal to avoid flipback on class deletion
function setCardFlipDeal(hand) {
        $(".card__back:eq(0)",hand).css({ WebkitTransform: 'rotateY(180deg)'});
        $(".card__back:eq(0)",hand).css({ '-moz-transform': 'rotateY(180deg)'});
        $(".card__front:eq(0)",hand).css({ WebkitTransform: 'rotateY(360deg)'});
        $(".card__front:eq(0)",hand).css({ '-moz-transform': 'rotateY(360deg)'});
}


//sets backside rotateY value during card draw to avoid flipback when deleting the animation class.
function setCardFlipDraw(hand) {
    $(".card__back:eq(1)",hand).css({ WebkitTransform: 'rotateY(180deg)'});
    $(".card__back:eq(1)",hand).css({ '-moz-transform': 'rotateY(180deg)'});
    $(".card__front:eq(1)",hand).css({ WebkitTransform: 'rotateY(360deg)'});
    $(".card__front:eq(1)",hand).css({ '-moz-transform': 'rotateY(360deg)'});
}

//applies proper move and rotation animation on during draw phase for card.
//If it is the users turn will also add a card flip animation on the card so user can see the card.
function applyDrawAnimation(player,hand){
    switch(player){
        case 1:
            $(".card:eq(1)",hand).addClass("drawMove1");
            $(".card__back:eq(1)",hand).addClass("drawBack");
            $(".card__front:eq(1)",hand).addClass("drawFront");
            $(".card__front:eq(1)",hand).addClass("card__front__zoomed");
            break;
        case 2:

            break;
        case 3:
            break;
        case 4:
            break;
    }
}

//apply necessary move animation on the card to the players discard section.
//No flip animation is necessary as player is allowed to look at opponents discard.
function applyDiscardAnimation(player){

}

//sets necessary parameters such as the image to display on the front of the card for the user.
function setCard(){

}


function isWinner(){
    return false;
}



/*------------------------MISCELANIOUS/SIDE FEATURES-----------------------------*/
//creates a ripple that propogates outward with specified radius and amplitude.
function ripples()
{

    $('#game').ripples({
        resolution: 512,
        dropRadius: 20, //px
        perturbance: .04,
        interactive:false
    });
    $('#game').on('click',function(event){
        if ($(".card").find(".card__front:hover").length==0) {
            var $el = $('#game');
            var x = event.pageX;
            var y = event.pageY;
            var dropRadius = 20;
            var strength = .04;
            $el.ripples('drop', x, y, dropRadius, strength);
        }
    });
}

/*--------In progress-------------
//stores original height and width
var oVIEW = {height:$(window).height(),width:$(window).width()};

$(window).on('resize',function(){

    //stores new height and width after resize
    var nVIEW = {height:$(".board").height(),width:$(".board").width()};

    //console.log("wHeight: " + wHeight + " wWidth: " + wWidth);

    //used to determine image size and width
    var iVIEW={height:0,width:0};
    var ratio = 1920/1080;

    var userTop = $("#p1Hand").children();


    //determines if change was an increase
    if( oVIEW.height< nVIEW.height ) {
        console.log("windowIncreased");
        if (nVIEW.height * ratio <= nVIEW.width) {
            iVIEW.height = nVIEW.height;
            iVIEW.width = nVIEW.height * ratio;
        }
        else {
            //height of img derived from width
            iVIEW.width = nVIEW.width;
            iVIEW.height = iVIEW.width / ratio;
        }
    }
    else if(oVIEW.height>nVIEW.height||oVIEW.width >nVIEW.width)//determines
    {
        console.log("WindowDecreased");
        if(nVIEW.height<=nVIEW.width&&nVIEW.height*ratio<=nVIEW.width) {
            //width of img derived from height
            iVIEW.height = nVIEW.height;
            iVIEW.width = nVIEW.height*ratio;

        }
        else {
            //height of img derived from width
            iVIEW.width = nVIEW.width;
            iVIEW.height=iVIEW.width/ratio;
        }
    }
})*/
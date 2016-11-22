/*
Main changes: implemented transit to perform jquery animations instead of initial .css animation

Began on discard animation will implement eventlistener binding to complete this

 */

$(document).ready(function(){
    
    var oVIEW = getWindowSize();
    var iVIEW=getInitBoardDims(oVIEW);

    //deal Phase
    dealCards(3,iVIEW);


    //Draw Phase
    //used to test all draw for all players.
    $("#draw").click(function(){
        drawCard(1,iVIEW);
        drawCard(2,iVIEW);
        drawCard(3,iVIEW);
    });

    //Play Phase


    //End of turn phase


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

//gets the current Window size
function getWindowSize() {
    var view = {height:$(window).height(), width:$(window).width()};
    return view;
}

/*Determines x and y value of discard not actual px offset */
function getDiscardOffsetPosition(discardPile){
    var position = {vertical:0,horizontal:0};
    if(discardPile.length!=0)
    {
        position.vertical=((discardPile.length-1)/4)
        position.horizontal=(discardPile.length%4);
    }
    return position;
}

function modifyPlayField(){

}

/*------------------------------GAME ACTIONS -------------------------------------*/
//performs initial deal actions which gives 1 card to all players.
function dealCards(players,board){
    for(i=players;i>=1;i--)
    {
            var card = generateCard().clone();
            var hand = $(getHand(i));
            hand.append(card);
            var rotation = 720 + 90 * (i - 1);
            var delay = 750 * (i%players);

            var item = $(".effect__click:eq(0)", hand);

            var handPosition = hand.position();
        console.log(handPosition);

       $(".card:eq(0)",hand).flip({trigger:'manual'});

        //Performs deal for each player will be changed to user names when testing against begins
        switch(i)
        {
            case 1:
               $(".effect__click:eq(0)",hand).velocity({top:'+='+(board.height*.23)},{duration:1000,delay:2250, queue:false});
                delay=2250;
                break;
            case 2:
               $(".effect__click:eq(0)",hand).velocity({left:'-='+(board.width*.35)},{duration:1000,delay:1500, queue:false});
                delay = 1500;
                break;
            case 3:
                $(".effect__click:eq(0)",hand).velocity({top:'-='+(board.height*.23)},{duration:1000,delay:750, queue:false});
                delay = 750;
                break;
            case 4:
                $(".effect__click:eq(0)",hand).velocity({left:'+='+(board.width*.35)},{duration:1000,delay:0, queue:false});
                delay = 0;
                break;
        }
        //if player is user include flip and zoom-in animation with the normal deal animation.
        if(i==1) {
            var tempHand = hand;
            $(".effect__click:eq(0)", hand).velocity({rotateZ: rotation},
                {duration: 1000,
                    complete: function () {
                        $(".card:eq(0)",tempHand).flip(true);
                        $(".card:eq(0)",tempHand).mouseover(function(){$(".card:eq(0)",tempHand).velocity({scale:1.4});}).mouseleave(function(){
                                $(".card:eq(0)",tempHand).velocity("reverse");
                            });
                        },

                    delay: delay,
                    queue: false
                }
                )
        }
        else{
            //applies normal rotation animation with no flip effect.
            $(".effect__click:eq(0)", hand).velocity({
                    rotateZ: rotation
                },
                {
                    duration: 1000,
                    delay: delay,
                    queue: false
                }
            );
        }
    }

}

//applies proper move and rotation animation on during draw phase for card.
//If it is the users turn will also add a card flip animation on the card so user can see the card.
function applyDrawAnimation(player,board){
    var rotation = 720 + 90 * (player - 1);
    var delay = 750 * (player%4);
    var hand = $(getHand(player));
    var item = $(".effect__click:eq(1)", hand);
    var handPosition = hand.position();

    $(".card:eq(1)",hand).flip({trigger:'manual'});
    console.log("New position: " + handPosition.top + " " + handPosition.left);
    //apply draw animation based on the player which will include an offset to be placed by the other card.
    switch(player)
    {
        case 1:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(board.height*.23),left:'+='+(board.width *.08)},{duration:1000,queue:false});
            break;
        case 2:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(board.height *.12),left:'-='+(board.width*.35)},{duration:1000, queue:false});
            break;
        case 3:
           $(".effect__click:eq(1)",hand).velocity({top:'-='+(board.height*.23),left:'-='+(board.width) *.08},{duration:1000, queue:false});
            break;
        case 4:
            $(".effect__click:eq(1)",hand).velocity({top:'-='+(board.height *.12),left:'+='+(board.width*.35)},{duration:1000, queue:false});
            break;
    }

    if(player==1)
    {
        var tempHand = hand;
        $(".effect__click:eq(1)", hand).velocity({rotateZ: rotation},
            {duration: 1000,
                complete: function () {$(".card:eq(1)",tempHand).flip(true);
                    $(".card:eq(1)",tempHand).mouseover(function() {
                        if (!$(".card:eq(1)", tempHand).is(':animated')) {
                            console.log($(".card:eq(1)", tempHand).isAnimating());
                            $(".card:eq(1)", tempHand).velocity({scale: 1.4});
                        }
                    }).mouseleave(function(){
                        if(!$(".card:eq(1)",tempHand).is(':animated'))
                        {
                            $(".card:eq(1)",tempHand).velocity("reverse");
                        }
                    })
                },
                queue: false
            }
        );
    }
    else
        $(".effect__click:eq(1)", hand).velocity({rotateZ: rotation}, {duration: 1000, queue: false});

}

//deals a single card to a player during draw phase.
function drawCard(player,iVIEW){
   var card = generateCard().clone();
    //TODO createCard
    var hand = $(getHand(player));
    hand.append(card);
    console.log("Original position:" + hand.position());
    applyDrawAnimation(player,iVIEW);

}


function playCard(){

}

//gets the initial dimension of the board at start of game
function getInitBoardDims(view)
{
    var ratio = 16/9;
    var boardView={height:0,width:0,heightN:0,widthN:0};
    if (view.height * ratio < view.width) {
        boardView.height = view.height;
        boardView.width = view.height * ratio;
    }
    else {
        boardView.width = view.width;
        boardView.height = view.width / ratio;
    }
    return boardView;

}

//gets the current dimensions of the gameboard
function getCurrBoardDims(view,board)
{
    var ratio = 16/9;
    var nBoardView={height:0,width:0,heightN:0,widthN:0};
    if (view.height * ratio < view.width) {
        boardView.height = view.height;
        boardView.width = view.height * ratio;
    }
    else {
        boardView.width = view.width;
        boardView.height = view.width / ratio;
    }
    return boardView;

}

function cardCorrection(view){

}


/* Temporarily commenting out due to potential solution.
function getDiscardOffsetPosition(discardPile){
    var position = {vertical:0,horizontal:0};
    if(discardPile.length!=0)
    {
        position.vertical=((discardPile.length-1)/4)
        position.horizontal=(discardPile.length%4);
    }
    return position;
}

function discardCard(hand,player,board){
   //
    var dPile = $(getDiscard(player));
    var dcard= $(card).clone();
    var cardposition=getDiscardOffsetPosition(dPile);
    var hand = $(getHand(player));
    switch(player)
    {
        case 1:
            $(".effect__click:eq(1)",hand).velocity({top:'-='+(board.height*.23),left:'-='+(cardposition.horizontal*board.width*.08)},{duration:1000,queue:false});
            break;
        case 2:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(board.height*.23),left:'+='+(board.width *.08)},{duration:1000,queue:false});
            break;
        case 3:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(board.height*.23),left:'+='+(board.width *.08)},{duration:1000,queue:false});
            break;
        case 4:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(board.height*.23),left:'+='+(board.width *.08)},{duration:1000,queue:false});
            break;
    }
    $(card).remove();

}*/

/*------------------------------------------------------------------------------------*/




/*---------------------------- Component Builder---------------------------------------------*/
//creates a card with basic parameters
function generateCard(){
    var card =$("<div class='card effect__click'></div>");
    var cardFront = $("<div class='front'></div>");
    var cardBack = $("<div class='back'></div>");
    $(card).append(cardBack);
    $(card).append(cardFront);
    return card
}

function buildCard(card){
    //TODO get card info from server
}





//apply necessary move animation on the card to the players discard section.
//No flip animation is necessary as player is allowed to look at opponents discard.
function applyDiscardAnimation(player){

}


//TODO ISWINNER()

function verticalCorrection(voffset){

}
function horizontalCorrection(hoffset){

}

/*------------------------MISCELANIOUS/SIDE FEATURES-----------------------------*/
//creates a ripple that propogates outward with specified radius and amplitude.
function ripples()
{

    $('#game').ripples({
        resolution: 256,
        dropRadius: 20, //px
        perturbance:.04,
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
TODO USED TO CORRECT THE POSITION OF THE CARD
*/

/* $(window).on('resize',function(){
 //stores new height and width after resize
 var nVIEW = {height:$(".board").height(),width:$(".board").width()};
 var offset ={top:0,left:0};

 //used to hold the dimensions of the game board as they change to fit screen size while maintaining aspect ratio.
 var ratio = 16/9;

 var newTop;
 var newLeft;
 //used to determine if change resulted in an increase or decrease in window height.
 if( oVIEW.height< nVIEW.height ) {
 //used to determine if change disrupted ratio between height and width and calculates new image new dimension.
 if (nVIEW.height * ratio < nVIEW.width) {
 iVIEW.heightN = nVIEW.height;
 iVIEW.widthN = nVIEW.height * ratio;
 offset.left = (iView.widthN-iView.width)/2
 if($("#p2Hand").length>0)
 $("#p2Hand").children().css("left",-offset.width+'px');
 if($("#p4Hand").length>0)
 $("#p4Hand").children().css("left",offset.width+'px');

 }
 else if(nVIEW.height*ratio>nVIEW.width)
 {

 iVIEW.width = nVIEW.width;
 iVIEW.height = iVIEW.width / ratio;
 offset.top = (iView.heightN-iView.height)/2

 if($("#p1Hand").length>0)
 $("#p1Hand").children().css("top",offset.top+'px');
 if($("#p3Hand").length>0)
 $("#p3Hand").children().css("top",-offset.top+'px');
 }
 }
 else if(oVIEW.height>nVIEW.height)//determines
 {
 if(nVIEW.height*ratio<=nVIEW.width) {
 //width of img derived from height
 iVIEW.height = nVIEW.height;
 iVIEW.width = nVIEW.height*ratio;

 offset.left = (iView.width-iView.widthN)/2
 console.log("hD1: nView.height*ration <= nVIEW.width");
 if($("#p2Hand").length>0)
 $("#p2Hand").children().css("left",offset.width+'px');
 if($("#p4Hand").length>0)
 $("#p4Hand").children().css("left",-offset.width+'px');


 }
 else if(nVIEW.height*ratio>nVIEW.width){
 //height of img derived from width
 iVIEW.width = nVIEW.width;
 iVIEW.height=iVIEW.width/ratio;
 console.log("hD2: nView.height*ration > nVIEW.width");
 offset.top = (iView.height-iView.heightN)/2
 //push Player 1 Down |||| Push Player 3 Up
 if($("#p1Hand").length>0)
 $("#p1Hand").children().css("top",-offset.height+'px');
 if($("#p3Hand").length>0)
 $("#p3Hand").children().css("top",offset.height+'px');
 }
 }

 if(oVIEW.width< nVIEW.width)
 {
 if (nVIEW.height * ratio <= nVIEW.width) {
 //Player 2 Right ||||  Player 4 left
 iVIEW.height = nVIEW.height;
 iVIEW.width = nVIEW.height * ratio;
 offset.left=nVIEW.width-iVIEW.width;
 console.log("wI1: nView.height*ration <= nVIEW.width");
 if($("#p2Hand").length>0)
 $("#p2Hand").children().css("left",offset.width+'px')
 if($("#p4Hand").length>0)
 $("#p4Hand").children().css("left",-offset.width+'px')

 }
 else if(nVIEW.height * ratio > nVIEW.width)
 {
 //height of img derived from width
 iVIEW.width = nVIEW.width;
 iVIEW.height = iVIEW.width / ratio;
 console.log("wI2: nView.height*ration > nVIEW.width");
 offset.top=nVIEW.height-iVIEW.height;

 if($("#p1Hand").length>0)
 $("#p1Hand").children().css("top",offset.top+'px');
 if($("#p3Hand").length>0)
 $("#p3Hand").children().css("top",-offset.top+'px');
 //Player 1 Down ||||   Player 3 UP
 }
 }
 else if(oVIEW.width> nVIEW.width)
 {


 if (nVIEW.height * ratio < nVIEW.width) {
 iVIEW.height = nVIEW.height;
 iVIEW.width = nVIEW.height * ratio;
 console.log("wD1: nView.height*ration < nVIEW.width");
 //move p2 left p4 right
 offset.left=nVIEW.width-iVIEW.width;
 if($("#p2Hand").length>0)
 $("#p2Hand").children().css("left",-offset.width+'px')
 if($("#p4Hand").length>0)
 $("#p4Hand").children().css("left",offset.width+'px')
 }
 else if (nVIEW.height*ratio > nVIEW.width){
 //height of img derived from width
 iVIEW.width = nVIEW.width;
 iVIEW.height = iVIEW.width / ratio;
 console.log("wD2: nView.height*ration > nVIEW.width");
 offset.top=nVIEW.height-iVIEW.height;
 if($("#p1Hand").length>0)
 $("#p1Hand").children().css("top",-offset.top+'px');
 if($("#p3Hand").length>0)
 $("#p3Hand").children().css("top",offset.top+'px');
 //move p1 up p3 down
 }
 }
 //console.log("Current height: " + nVIEW.height + " " + "Current img height: " + iVIEW.height);
 //console.log("Current width: " + nVIEW.width + " " + "Current img width: " + iVIEW.width);
 oVIEW.height = nVIEW.height;
 oVIEW.width = nVIEW.width;
 console.log(offset.left + " " + offset.top);
 })*/

/*

 path.hover(function() { // mouse enter


 //if the path is in the middle of an animation, stop it immediately and reverse the animation. This prevents many unwanted animations if the user hovers in and out quickly


if (path.data('animating') === true){
    path.velocity("stop", true).velocity('reverse',{ duration:300});
    path.data({animating:false});

} else {  // begin default animation
    $(this).velocity({fill: '#ffcc00'},{
        duration:500,
        begin: function(){
            path.data({animating:true});
        },
        complete: function(){
            path.data({animating:false});
        }
    });

}
}, function() { // mouse exit


     //if the path is in the middle of an animation, stop it immediately and reverse the animation. This prevents many unwanted animations if the user hovers in and out quickly


    if (path.data('animating') === true){
        path.velocity("stop", true).velocity('reverse',{ duration:300});
        path.data({animating:false});


    } else { // begin default animation

        $(this).velocity({fill: '#000'},{
            duration:500,
            begin: function(){
                path.data({animating:true});
            },
            complete: function(){
                path.data({animating:false});
            }
        });

    }
});

 */
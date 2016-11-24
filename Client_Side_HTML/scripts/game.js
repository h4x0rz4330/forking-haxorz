/**
 *Author: Chris Schayer
 *File: game.js
 *Description: This file controls the flow of the game
 *  Ajax calls are used to send data to the game server to initiate calculations
 *  and receive data from the game server to determine the result of said calculations.
 *
 * Calculations conducted in this script primarily utilized to determine window and board height/width.
 *  This is done to allow for a dynamic environment in which dom elements will maintain proper positioning despite changes to window height and width.
 *
 * Changes:
 *  added object boardState: 11/23/16 Chris Schayer
 *  added object handState: 11/23/16 Chris Schayer
 *  added Dynamic Dom Feature: 11/23/16 Chris Schayer
 *  removed repetitive logic for obtainiing board and window dimensions: 11/23/16 Chris Schayer
 *  added generate Deck: 11/23/16 Chris Schayer
 *  added card removal from deck to deal and draw: 11/23/16 Chris Schayer
 */

$(document).ready(function(){
    //gets the users initial window dimensions.
    boardState.initializeGameDimensions();
    playerStates.initPlayerState(2);
    //ripples();
    populateDeck();
    //this will be where the outter most loop will occur that will trigger each round
        //deal Phase
        dealCards(4);



        //updates the dimensions of board and performs correct corrections to maintain card position relative to gameboard.
        $(window).resize(function(){
            boardState.updateBoardDimensions();
            playerStates.correctCards();
        });

        //This will be where main loop in each round that will trigger the start of a new turn

            //Draw Phase
            $("#draw").click(function(){
                drawCard(1);
                drawCard(2);
                drawCard(3);
                drawCard(4);
            });

            //Play Phase

            //End of turn phase
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
    //boardState.height{height:$(window).height(), width:$(window).width()};
    //return view;
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
function dealCards(players){
    for(i=players;i>=1;i--)
    {
            var card = generateCard().clone();
            var hand = $(getHand(i));
            hand.append(card);
            var rotation = 720 + 90 * (i - 1);
            var delay = 750 * (i%players);
            var item = $(".effect__click:eq(0)", hand);
            var handPosition = hand.position();
            $(".card:last-child","#deck").remove();

       $(".card:eq(0)",hand).flip({trigger:'manual'});

        //Performs deal for each player will be changed to user names when testing against begins
        switch(i)
        {
            case 1:
               $(".effect__click:eq(0)",hand).velocity({top:'+='+(boardState.iHeight*.23)},{duration:1000,delay:2250, queue:false});
                delay=2250;
                break;
            case 2:
               $(".effect__click:eq(0)",hand).velocity({left:'-='+(boardState.iWidth*.35)},{duration:1000,delay:1500, queue:false});
                delay = 1500;
                break;
            case 3:
                $(".effect__click:eq(0)",hand).velocity({top:'-='+(boardState.iHeight*.23)},{duration:1000,delay:750, queue:false});
                delay = 750;
                break;
            case 4:
                $(".effect__click:eq(0)",hand).velocity({left:'+='+(boardState.iWidth*.35)},{duration:1000,delay:0, queue:false});
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
                        $(".card:eq(0)",tempHand).mouseover(function(){$(".card:eq(0)",tempHand).velocity({scale:1.4},{duration:200})}).mouseleave(function(){
                                $(".card:eq(0)",tempHand).velocity("reverse");

                            });
                        $(".card.effect__click:eq(0)",tempHand).on("click",function(e){

                            var card =  $(e.target).parent();
                            discardCard(card,board);
                        })
                        playerStates.setHandPositions(players);
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
function applyDrawAnimation(player){
    var rotation = 720 + 90 * (player - 1);
    var delay = 750 * (player%4);
    var hand = $(getHand(player));
    var item = $(".effect__click:eq(1)", hand);
    var handPosition = hand.position();

    $(".card:eq(1)",hand).flip({trigger:'manual'});

    //apply draw animation based on the player which will include an offset to be placed by the other card.
    switch(player)
    {
        case 1:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(boardState.iHeight*.23),left:'+='+(boardState.iWidth *.08)},{duration:1000,queue:false});
            break;
        case 2:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(boardState.iHeight *.12),left:'-='+(boardState.iWidth*.35)},{duration:1000, queue:false});
            break;
        case 3:
           $(".effect__click:eq(1)",hand).velocity({top:'-='+(boardState.iHeight*.23),left:'-='+(boardState.iWidth) *.08},{duration:1000, queue:false});
            break;
        case 4:
            $(".effect__click:eq(1)",hand).velocity({top:'-='+(boardState.iHeight *.12),left:'+='+(boardState.iWidth*.35)},{duration:1000, queue:false});
            break;
    }

    if(player==1)
    {
        var tempHand = hand;
        $(".effect__click:eq(1)", hand).velocity({rotateZ: rotation},
            {duration: 1000,
                complete: function () {$(".card:eq(1)",tempHand).flip(true);

                    $(".card:eq(1)",tempHand).flip(true);
                    $(".card:eq(1)",tempHand).mouseover(function(){$(".card:eq(1)",tempHand).velocity({scale:1.4},{duration:200})}).mouseleave(function(){
                        $(".card:eq(1)",tempHand).velocity("reverse");

                    });
                    $(".card.effect__click:eq(1)",tempHand).on("click",function(e){

                        var card =  $(e.target).parent();
                        discardCard(card,board);
                    })

                },
                queue: false
            }
        );
    }
    else {
        $(".effect__click:eq(1)", hand).velocity({rotateZ: rotation}, {duration: 1000, queue: false});
    }

}

//deals a single card to a player during draw phase.
function drawCard(player){
   var card = generateCard().clone();
    //TODO createCard
    var hand = $(getHand(player));
    hand.append(card);
    applyDrawAnimation(player);

}


function populateDeck()
{

    for(var i = 1;i<=15;i++)
    {
        var card = generateCard().clone();
        $(card).flip({trigger:'manual'});
       $("#deck").append(card);
    }
}


function playCard(){

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
*/
function discardCard(card){

    console.log(card.index());
    console.log(card.parent());
    /*var dPile = $(getDiscard(player));
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
*/
}

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

var playerStates = {
    p1State: {
        hand: {position: 0},
        discard: {position:0},
        isEliminated: true
    },
    p2State: {
        hand: {position: 0},
        discard: {position:0},
        isEliminated: true

    },
    p3State: {
        hand: {position: 0},
        discard: {position:0},
        isEliminated: true
    },
    p4State: {
        hand: {position: 0},
        discard: {position:0},
        isEliminated: true
    },
    setHandPositions: function (players) {
        for (i = 1; i <= players; i++) {
            switch (i) {
                case 1:
                    this.p1State.hand.position = $(".effect__click:eq(0)", getHand(i)).position();
                    break;
                case 2:
                    this.p2State.hand.position = $(".effect__click:eq(0)", getHand(i)).position();
                    break;
                case 3:
                    this.p3State.hand.position = $(".effect__click:eq(0)", getHand(i)).position();
                    break;
                case 4:
                    this.p4State.hand.position = $(".effect__click:eq(0)", getHand(i)).position();
                    break;
            }
        }
    },
    correctCards: function () {
        //update hand position
        this.p1State.hand.position.top = boardState.iHeight * .23;
        this.p2State.hand.position.left = -boardState.iWidth * .35;
        this.p3State.hand.position.top = -boardState.iHeight * .23;
        this.p4State.hand.position.left = boardState.iWidth * .35;

        //apply position update to cards in hand
        //p1Hand reposition
        $(".effect__click", "#p1Hand").css("top", this.p1State.hand.position.top + "px");

        if ($("#p1Hand").children().length == 2) {   //repositioning for second card in hand to allow for dynamic width maintainence b/w cards.
            $(".effect__click:eq(1)", "#p1Hand").css("left", -boardState.iWidth * .08 + "px");
        }

        //p2Hand reposition
        $(".effect__click", "#p2Hand").css("left", this.p2State.hand.position.left + "px");
        if ($("#p2Hand").children().length == 2) {
            $(".effect__click:eq(1)", "#p2Hand").css("top", boardState.iHeight * .12 + "px");
        }

        //p3Hand reposition
        $(".effect__click", "#p3Hand").css("top", this.p3State.hand.position.top + "px");
        if ($("#p3Hand").children().length == 2) {
            $(".effect__click:eq(1)", "#p3Hand").css("left", boardState.iWidth * .08 + "px");
        }

        //p4Hand reposition
        $(".effect__click", "#p4Hand").css("left", this.p4State.hand.position.left + "px");
        if ($("#p4Hand").children().length == 2) {
            $(".effect__click:eq(1)", "#p4Hand").css("top", -boardState.iHeight * .12 + "px");
        }
    },
    initPlayerState: function(players){
        switch(players)
        {
            case 4:
                this.p4State.isEliminated=false;
            case 3:
                this.p3State.isEliminated=false;
            case 2:
                this.p2State.isEliminated=false;
                this.p1State.isEliminated=false;
                break;

        }
    }
}

var boardState = {
    //height and width of window
    height: 0,
    width: 0,

    //height and width of the actual board
    iHeight: 0,
    iWidth: 0,

    //aspect ratio of the board
    ratio: (16 / 9),

    //obtains the dimensions the of the window and calculates the dimensions of the board.
    initializeGameDimensions: function () {
        this.height = $(window).height();
        this.width = $(window).width();
        if (this.height * this.ratio < this.width) {
            this.iHeight = this.height;
            this.iWidth = this.height * this.ratio;
        }
        else {
            this.iWidth = this.width;
            this.iHeight = this.width / this.ratio;
        }
    },
    updateBoardDimensions: function () {
        var newBoardState = {height: $(window).height(), width: $(window).width(),iHeight:0,iWidth:0};
        //if window height increased
        if(this.height<newBoardState.height)
        {
            if(newBoardState.height*this.ratio<newBoardState.width){
                //calculating new board dimensions
                newBoardState.iHeight = newBoardState.height;
                newBoardState.iWidth = newBoardState.iHeight*this.ratio;

            }
            else if(newBoardState.height*this.ratio>=newBoardState.width)
            {
                newBoardState.iWidth = newBoardState.width;
                newBoardState.iHeight = newBoardState.iWidth/this.ratio;
            }
        }
        else if(this.height>=newBoardState.height)
        {
            if(newBoardState.height*this.ratio<newBoardState.width){
                //calculating new board dimensions
                newBoardState.iHeight = newBoardState.height;
                newBoardState.iWidth = newBoardState.iHeight*this.ratio;

            }
            else if(newBoardState.height*this.ratio>=newBoardState.width)
            {
                newBoardState.iWidth = newBoardState.width;
                newBoardState.iHeight = newBoardState.iWidth/this.ratio;
            }
        }

        //determines if window width increased
        if(this.width<newBoardState.width)
        {
            if(newBoardState.height*this.ratio <newBoardState.width)
            {
                newBoardState.iHeight = newBoardState.height;
                newBoardState.iWidth = newBoardState.iHeight*this.ratio;
            }
            else if(newBoardState.height * this.ratio >= newBoardState.width)
            {
                newBoardState.iWidth = newBoardState.width;
                newBoardState.iHeight = newBoardState.iWidth/this.ratio;
            }
        }
        else if(this.width>=newBoardState.width)
        {
            if(newBoardState.height*this.ratio <newBoardState.width)
            {
                newBoardState.iHeight = newBoardState.height;
                newBoardState.iWidth = newBoardState.iHeight*this.ratio;
            }
            else if(newBoardState.height * this.ratio >=newBoardState.width)
            {
                newBoardState.iWidth = newBoardState.width;
                newBoardState.iHeight = newBoardState.iWidth/this.ratio;
            }
        }
        this.height = newBoardState.height;
        this.width = newBoardState.width;
        this.iHeight = newBoardState.iHeight;
        this.iWidth = newBoardState.iWidth;
    }
}

/*------------------------MISCELANIOUS/SIDE FEATURES-----------------------------*/
//creates a ripple that propogates outward with specified radius and amplitude.
function ripples() {

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

*/

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
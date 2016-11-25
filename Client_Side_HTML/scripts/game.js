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
 *  swapped positioning for p2 and p3 to allow for easier implementation between 2-4 players: 11/24/16 Chris Schayer
 *  removed p2-p4 card css files because velocity rendered such files unecessary: 11/24/16 Chris Schayer
 */

$(document).ready(function(){
    //gets the users initial window dimensions.
    boardState.initializeGameDimensions();
    playerStates.initPlayerState(3);
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


/*------------------------------GAME ACTIONS -------------------------------------*/
//performs initial deal actions which gives 1 card to all players.
function dealCards(players){
    for(i=players;i>=1;i--)
    {
            //adds a card to hand
            var hand = updateHand(i);

            //applies the necessary rotation and delay to animation to apply to the card

            //removes a card from the deck during each deal and updates count of remaining cards in deck
            gameState.updateDeckLength();
       $(".card:eq(0)",hand).flip({trigger:'manual'});

        //Performs deal for each player will be changed to user names when testing against begins
        switch(i)
        {
            case 1:
               $(".effect__click:eq(0)",hand).velocity({top:'+='+(boardState.iHeight*.23)},{duration:1000,delay:animationStates.delay[i-1], queue:false});
                break;
            case 3:
               $(".effect__click:eq(0)",hand).velocity({left:'-='+(boardState.iWidth*.35)},{duration:1000,delay:animationStates.delay[i-1], queue:false});
                break;
            case 2:
                $(".effect__click:eq(0)",hand).velocity({top:'-='+(boardState.iHeight*.23)},{duration:1000,delay:animationStates.delay[i-1], queue:false});
                break;
            case 4:
                $(".effect__click:eq(0)",hand).velocity({left:'+='+(boardState.iWidth*.35)},{duration:1000,delay:animationStates.delay[i-1], queue:false});
                break;
        }
        //if player is user include flip and zoom-in animation with the normal deal animation.
        if(i==1) {
            var tempHand = hand;

            $(".effect__click:eq(0)", hand).velocity({rotateZ: animationStates.rotation[i-1]},
                {duration: 1000,
                    complete: function () {
                        $(".card:eq(0)",tempHand).flip(true);
                        $(".card:eq(0)",tempHand).mouseover(function(){$(".card:eq(0)",tempHand).velocity({scale:2.5},{duration:200}).css("z-index","2")}).mouseleave(function(){
                                $(".card:eq(0)",tempHand).velocity("reverse").css("z-index","1");
                            });
                        $(".card:eq(0)",tempHand).attr("data-toggle","modal").attr('data-target',"#playerModal");
                        $(".card.effect__click:eq(0)",tempHand).on("click",function(e){
                            gameState.cardChosenIndex = $(e.target).parent().index();
                            playCard($(e.target).parent());
                        })
                        playerStates.setHandPositions(players);
                        },

                    delay: animationStates.delay[i-1],
                    queue: false
                }
                )

        }
        else{
            //applies normal rotation animation with no flip effect.
            $(".effect__click:eq(0)", hand).velocity({
                    rotateZ: animationStates.rotation[i-1]
                },
                {
                    duration: 1000,
                    delay: animationStates.delay[i-1],
                    queue: false
                }
            );
        }
    }

}

//applies proper move and rotation animation on during draw phase for card.
//If it is the users turn will also add a card flip animation on the card so user can see the card.
function applyDrawAnimation(player){
    var hand = $(getHand(player));
    $(".card:eq(1)",hand).flip({trigger:'manual'});

    //apply draw animation based on the player which will include an offset to be placed by the other card.
    switch(player)
    {
        case 1:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(boardState.iHeight*.23),left:'+='+(boardState.iWidth *.08)},{duration:1000,queue:false});
            break;
        case 3:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(boardState.iHeight *.12),left:'-='+(boardState.iWidth*.35)},{duration:1000, queue:false});
            break;
        case 2:
           $(".effect__click:eq(1)",hand).velocity({top:'-='+(boardState.iHeight*.23),left:'-='+(boardState.iWidth) *.08},{duration:1000, queue:false});
            break;
        case 4:
            $(".effect__click:eq(1)",hand).velocity({top:'-='+(boardState.iHeight *.12),left:'+='+(boardState.iWidth*.35)},{duration:1000, queue:false});
            break;
    }

    if(player==1)
    {
        var tempHand = hand;
        $(".effect__click:eq(1)", hand).velocity({rotateZ: animationStates.rotation[player-1]},
            {duration: 1000,
                complete: function () {$(".card:eq(1)",tempHand).flip(true);

                    $(".card:eq(1)",tempHand).flip(true);
                    $(".card:eq(1)",tempHand).mouseover(function(){$(".card:eq(1)",tempHand).velocity({scale:2.5},{duration:200}).css("z-index","2")}).mouseleave(function(){
                        $(".card:eq(1)",tempHand).velocity("reverse").css("z-index","1");

                    });
                    $(".card:eq(1)",tempHand).attr("data-toggle","modal").attr('data-target',"#playerModal");
                    $(".card:eq(1)",tempHand).on("click",function(e){
                        gameState.cardChosenIndex = $(e.target).parent().index();
                        playCard($(e.target).parent());
                    })

                },
                queue: false
            }
        );
    }
    else {
        $(".effect__click:eq(1)", hand).velocity({rotateZ: animationStates.rotation[player-1]}, {duration: 1000, queue: false});
    }

}

function playCard(card){
    switch(gameState.players){
        case 4:
            if(!playerStates.p4State.isEliminated)
            {
                $("#choosePlayer").append($(playerStates.p4State.modalButton))
            }
        case 3:
            if(!playerStates.p3State.isEliminated)
            {
                $("#choosePlayer").append($(playerStates.p3State.modalButton))
            }
        case 2:
            if(!playerStates.p2State.isEliminated)
            {
                $("#choosePlayer").append($(playerStates.p2State.modalButton))
            }
    }
    $(".playerButton").on("click",function(e){
        gameState.playerChoice.playerChosen=$(e.target).html();
        modalSwitch();
    })
}

//deals a single card to a player during draw phase.
function drawCard(player){
    updateHand(player);
    applyDrawAnimation(player);
    gameState.updateDeckLength();

}

function populateDeck()
{
    var size;
    if(gameState.players==2)
        size = 12;
    else
        size = 14;

    for(var i = 1;i<=size;i++)
    {
        var card = generateCard().clone();
        $(card).flip({trigger:'manual'});
       $("#deck").append(card);
    }
}

function updateHand(player){
    //todo use buildcardFunction when it is completed.
    var hand =  $(getHand(player));
    hand.append(generateCard().clone());
    return hand;
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

function discardCard(cardPlayed){

    console.log(cardPlayed.index());

    var dPile = $(getDiscard(player));
    var dcard= $(cardPlayed).clone();

    var cardposition=getDiscardOffsetPosition(dPile);
    var hand = $(getHand(player));
    switch(player)
    {
        case 1:
            $(".effect__click:eq(1)",hand).velocity({top:'-='+(board.height*.23),left:'-='+(gameState.cardChosenIndex*board.width *.08+cardposition.horizontal*board.width*.08)},{duration:1000,queue:false});
            break;
        case 3:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(board.height*.23),left:'+='+(board.width *.08)},{duration:1000,queue:false});
            break;
        case 2:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(board.height*.23),left:'+='+(board.width *.08)},{duration:1000,queue:false});
            break;
        case 4:
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(board.height*.23),left:'+='+(board.width *.08)},{duration:1000,queue:false});
            break;
    }
    $(card).remove();

}

/*Determines x and y value of discard not actual px offset */
function getDiscardOffsetPosition(discardPile,player){
    var position = {vertical:0,horizontal:0};
    if(player.index()==1||player.index()==3) {
        if (discardPile.length != 0) {
            position.vertical = ((discardPile.length - 1) / 4)
            position.horizontal = (discardPile.length % 4);
        }
    }
    else
    {
        position.horizontal=discardPile.length
    }

    return position;
}

function calculateDiscardOffset(player,card){

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
        userName:"user",
        hand: {position: 0},
        discard: {position:0},
        isEliminated: true,
        modalButton:""
    },
    p2State: {
        userName:"p2",
        hand: {position: 0},
        discard: {position:0},
        isEliminated: true,
        modalButton:""

    },
    p3State: {
        userName:"p3",
        hand: {position: 0},
        discard: {position:0},
        isEliminated: true,
        modalButton:""
    },
    p4State: {
        userName:"p4",
        hand: {position: 0},
        discard: {position:0},
        isEliminated: true,
        modalButton:""
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
        this.p3State.hand.position.left = -boardState.iWidth * .35;
        this.p2State.hand.position.top = -boardState.iHeight * .23;
        this.p4State.hand.position.left = boardState.iWidth * .35;

        //apply position update to cards in hand
        //p1Hand reposition
        $(".effect__click", "#p1Hand").css("top", this.p1State.hand.position.top + "px");

        if ($("#p1Hand").children().length == 2) {   //repositioning for second card in hand to allow for dynamic width maintainence b/w cards.
            $(".effect__click:eq(1)", "#p1Hand").css("left", boardState.iWidth * .08 + "px");
        }

        //p2Hand reposition
        $(".effect__click", "#p3Hand").css("left", this.p3State.hand.position.left + "px");
        if ($("#p3Hand").children().length == 2) {
            $(".effect__click:eq(1)", "#p3Hand").css("top", boardState.iHeight * .12 + "px");
        }

        //p3Hand reposition
        $(".effect__click", "#p2Hand").css("top", this.p2State.hand.position.top + "px");
        if ($("#p2Hand").children().length == 2) {
            $(".effect__click:eq(1)", "#p2Hand").css("left", -boardState.iWidth * .08 + "px");
        }

        //p4Hand reposition
        $(".effect__click", "#p4Hand").css("left", this.p4State.hand.position.left + "px");
        if ($("#p4Hand").children().length == 2) {
            $(".effect__click:eq(1)", "#p4Hand").css("top", -boardState.iHeight * .12 + "px");
        }
    },
    initPlayerState: function(players){
        gameState.players=players;
        switch(players)
        {
            case 4:
                this.p4State.isEliminated=false;
                this.p4State.modalButton="<button type = 'button' class=\"playerButton\">"+this.p3State.userName+"</button>";
            case 3:
                this.p3State.isEliminated=false;
                this.p3State.modalButton="<button type = 'button' class=\"playerButton\">"+this.p3State.userName+"</button>";
            case 2:
                this.p2State.isEliminated=false;
                this.p2State.modalButton="<button type = 'button' class=\"playerButton\">"+this.p2State.userName+"</button>";

                this.p1State.isEliminated=false;
                this.p1State.modalButton="<button type = 'button' class=\"playerButton\">"+this.p1State.userName+"</button>";
                break;

        }


    }
}

var gameState ={
    players:0,
    playerNames:[],
    playerChoice:{
        cardPlayed:"",
        playerChosen:"",
        cardChosen:""
    },
    cardChosenIndex:0,
    cardsRemaining:0,
    updateDeckLength:function(){
        $(".card:last-child","#deck").remove();
        this.cardsRemaining = $("#deck").children().length;
    },
    initGameState:function(){
        //TODO ajax call
        this.players = 0;

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

var animationStates={
    rotation:[720,900,810,990],
    delay:[2250,750,1500,0]
}


function modalSwitch(){
    $('#playerModal').modal('hide');
    $('#cardModal').modal('show');
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
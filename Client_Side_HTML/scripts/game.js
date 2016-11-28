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
 * Changes log:
 * {decsription} {date} {performed by}
 *  added object boardState: 11/23/16 Chris Schayer
 *  added object handState: 11/23/16 Chris Schayer
 *  added Dynamic Dom Feature: 11/23/16 Chris Schayer
 *  removed repetitive logic for obtainiing board and window dimensions: 11/23/16 Chris Schayer
 *  added generate Deck: 11/23/16 Chris Schayer
 *  added card removal from deck to deal and draw: 11/23/16 Chris Schayer
 *  swapped positioning for p2 and p3 to allow for easier implementation between 2-4 players: 11/24/16 Chris Schayer
 *  removed p2-p4 card css files because velocity rendered such files unecessary: 11/24/16 Chris Schayer
 */

/*$(document).ready(function(){
    //gets the users initial window dimensions.
    boardState.initializeGameDimensions();
    playerStates.initPlayerState(2);
    //ripples();
    populateDeck();
    $('#playerModal').on('hidden.bs.modal', function () {

    })
    //this will be where the outter most loop will occur that will trigger each round

        setupBoard();
        //deal Phase
        dealCards(2);

        //updates the dimensions of board and performs correct corrections to maintain card position relative to gameboard.
        $(window).resize(function(){
            boardState.updateBoardDimensions();
            playerStates.correctCards();
        });

        //This will be where main loop in each round that will trigger the start of a new turn

            //Draw Phase
            $("#draw").click(function(){
                drawCard(1);
            });

            //Play Phase

            //End of turn phase
});*/


/*------------------------------Value Obtaining Functions-----------------------*/
//gets the id value of the players hand. When called must surround with $()
function getHand(player){
    var hand = "#"+player+"Hand";
    return hand;
}

//gets the id value of the players discard.
function getDiscard(player)
{
    var hand = "#"+player+"Disc";
    return hand;
}


function setupBoard(){
    $("#p1Disc").velocity({top:'+='+(boardState.iHeight*.24),left:'-='+(boardState.iWidth *.15)},{duration:1000,queue:false});
    $("#p2Disc").velocity({top:'-='+(boardState.iHeight*.24),left:'+='+(boardState.iWidth) *.15},{duration:1000, queue:false});
    $("#p2Disc").velocity({rotateZ: "180"}, {duration: 1000, queue: false});
    $("#p3Disc").velocity({top:'+='+(boardState.iHeight *.15),left:'-='+(boardState.iWidth*.36)},{duration:1000, queue:false});
    $("#p3Disc").velocity({rotateZ:"90"}, {duration: 1000, queue: false});
    $("#p4Disc").velocity({top:'-='+(boardState.iHeight *.15),left:'+='+(boardState.iWidth*.36)},{duration:1000, queue:false});
    $("#p4Disc").velocity({rotateZ:"270"}, {duration: 1000, queue: false});
}

/*------------------------------GAME ACTIONS -------------------------------------*/
//performs initial deal actions which gives 1 card to all players.
function dealCards(players){
    for(i=1;i<=players;i++)
    {
            //adds a card to hand
            var hand = updateHand("p"+i);

            //applies the necessary rotation and delay to animation to apply to the card

            //removes a card from the deck during each deal and updates count of remaining cards in deck
            gameState.updateDeckLength();
       $(".card:eq(0)",hand).flip({trigger:'manual'});

        //Performs deal for each player will be changed to user names when testing against begins
        switch(i)
        {
            case 1:
               $(".effect__click:eq(0)",hand).velocity({top:'+='+(boardState.iHeight*.25)},{duration:1000,delay:animationStates.delay[i-1], queue:false});
                break;
            case 3:
               $(".effect__click:eq(0)",hand).velocity({left:'-='+(boardState.iWidth*.36)},{duration:1000,delay:animationStates.delay[i-1], queue:false});
                break;
            case 2:
                $(".effect__click:eq(0)",hand).velocity({top:'-='+(boardState.iHeight*.25)},{duration:1000,delay:animationStates.delay[i-1], queue:false});
                break;
            case 4:
                $(".effect__click:eq(0)",hand).velocity({left:'+='+(boardState.iWidth*.36)},{duration:1000,delay:animationStates.delay[i-1], queue:false});
                break;
        }
        //if player is user include flip and zoom-in animation with the normal deal animation.
        if(i==1) {
            var tempHand = hand;

            $(".effect__click:eq(0)", hand).velocity({rotateZ: animationStates.rotation[i-1]},
                {duration: 1000,
                    complete: function () {
                        $(".card:eq(0)",tempHand).flip(true);
                        $(".card:eq(0)",tempHand).mouseover(function(){$(".card:eq(0)",tempHand).velocity({scale:2.8},{duration:200}).css("z-index","2")}).mouseleave(function(){
                                $(".card:eq(0)",tempHand).velocity("reverse").css("z-index","1");
                            });

                        $(".card.effect__click:eq(0)",tempHand).on("click",function(e){
                            activateCard($(e.target).parent());
                        });
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
   // if()
    $(".card:eq(1)",hand).flip({trigger:'manual'});

    //apply draw animation based on the player which will include an offset to be placed by the other card.
    switch(player)
    {
        case 'p1':
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(boardState.iHeight*.25),left:'+='+(boardState.iWidth *.07)},{duration:1000,queue:false});
            break;
        case 'p3':
            $(".effect__click:eq(1)",hand).velocity({top:'+='+(boardState.iHeight *.10),left:'-='+(boardState.iWidth*.36)},{duration:1000, queue:false});
            break;
        case 'p2':
           $(".effect__click:eq(1)",hand).velocity({top:'-='+(boardState.iHeight*.25),left:'-='+(boardState.iWidth) *.07},{duration:1000, queue:false});
            break;
        case 'p4':
            $(".effect__click:eq(1)",hand).velocity({top:'-='+(boardState.iHeight *.10),left:'+='+(boardState.iWidth*.36)},{duration:1000, queue:false});
            break;
    }

    if(player=='p1')
    {
        var tempHand = hand;
        $(".effect__click:eq(1)", hand).velocity({rotateZ: animationStates.rotation[player[1]-1]},
            {duration: 1000,
                complete: function () {$(".card:eq(1)",tempHand).flip(true);

                    $(".card:eq(1)",tempHand).flip(true);
                    $(".card:eq(1)",tempHand).mouseover(function(){$(".card:eq(1)",tempHand).velocity({scale:2.5},{duration:200}).css("z-index","2")}).mouseleave(function(){
                        $(".card:eq(1)",tempHand).velocity("reverse").css("z-index","1");

                    });
                    $(".card.effect__click:eq(1)",tempHand).on("click",function(e){
                        activateCard($(e.target).parent());
                    });
                },
                queue: false
            }
        );
    }
    else {
        $(".effect__click:eq(1)", hand).velocity({rotateZ: animationStates.rotation[player[1]-1]}, {duration: 1000, queue: false});
    }

}
function applyModalAnimation(){
    $("#playerModal").on("hidden.bs.modal",function(){
        clearPlayerChoice();
    });
    $("#playerModal").on("show.bs.modal",function(){
        populatePlayerChoice();
        $(".playerButton").on("click",function(e){
            gameState.playerChoice.playerChosen=$(e.target).html();
            switch(gameState.playerChoice.cardPlayed)
            {
                case "hack":
                    modalSwitch();
                    break;
                case "rat":
                    $("#playerModal").modal("hide");
                    cardEffect.seeHand(gameState.playerChoice.playerChosen);
                    break;
                case "hijack":
                    $("#playerModal").modal("hide");
                    cardEffect.swapHands("p1",gameState.playerChoice.playerChosen);
                    break;
                case "hardReset":
                    $("#playerModal").modal("hide");
                    cardEffect.resetHand(gameState.playerChoice.playerChosen);

            }
        });
    })
    $("#cardModal").on("hidden.bs.modal",function(){
        setTimeout(function(){
            $('#outcomeModal').modal('show');
        },0);
    })
    $("#outcomeModal").on("show.bs.modal",function(){
        switch(gameState.playerChoice.cardPlayed)
        {
            case "hijack":
            case "hack":
            case "hardReset":
                setTimeout(function(){
                    $('#outcomeModal').modal('hide');
                },2000);
        }
    });
    $("#outcomeModal").on("hidden.bs.modal",function(){
        clearOutcome();

    });

    $("#discardModal").on("hidden.bs.modal",function(){
        clearDiscard();
    });
}

function activateCard(card){
    gameState.cardChosenIndex = $(card).index();
    gameState.playerChoice.cardPlayedDom=card;
    gameState.playerChoice.cardPlayed = getCardName(card);
    switch(gameState.playerChoice.cardPlayed)
    {
        case "hack":
        case "rat":
        case "hardReset":
        case "hijack":
        case "cybersecurity":
            $("#playerModal").modal('toggle');
            break;
        case "firewall":
            break;
    }

}


function getCardName(card)
{
    if(card.hasClass("hack")){
        return "hack";
    }
    else if(card.hasClass("rat")){
        return "rat";
    }
    else if(card.hasClass("cybersecurity")){
        return "cybersecurity";
    }
    else if(card.hasClass("firewall")){
        return "firewall";
    }
    else if(card.hasClass("hardReset")){
        return "hardReset";
    }
    else if(card.hasClass("hijack")){
       return "hijack";
    }
    else if(card.hasClass("trojanHorse")){
        return "trojanHorse";
    }
    else if(card.hasClass("bitcoinBillionair")){
        return "bitcoinBillionair";
    }
}

//deals a single card to a player during draw phase.
function drawCard(player){
    updateHand(player);
    applyDrawAnimation(player);
    gameState.updateDeckLength();

}

function populatePlayerChoice(){

    switch(gameState.players){
        case 4:
            if(!playerStates.p4State.isEliminated)
            {
                $("#choosePlayer").append($(playerStates.p4State.modalButton));
            }
        case 3:
            if(!playerStates.p3State.isEliminated)
            {
                $("#choosePlayer").append($(playerStates.p3State.modalButton));
            }
        case 2:
            if(!playerStates.p2State.isEliminated)
            {
                $("#choosePlayer").append($(playerStates.p2State.modalButton));
            }
        case 1:
            if(gameState.playerChoice.cardPlayed=='hardReset')
            {
                $("#choosePlayer").append($(playerStates.p1State.modalButton));
            }
            break;
    }
}

function clearPlayerChoice(){
    for (choice in $("#choosePlayer")){
        $(choice,"#choosePlayer").remove();
    }
}

function clearDiscard(){
    var length = $("#discard").find('img').length;
    for(i=0;i<length;i++)
    {
        $("#discard").find('img')[0].remove();

    }

}

function clearOutcome(){
    for (i=0;i<$("#outcome").children().length;i++){
        $("#outcome").children(i).remove();
    }
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
        var card = generateCard(1).clone();
        $(card).flip({trigger:'manual'});
       $("#deck").append(card);
    }
}

function updateHand(player){
    var hand =  $(getHand(player));
    hand.append(generateCard(deck.shift()).clone());
    return hand;
}


function discardCard(player,card){
    switch(player)
    {
        case "p1":
            animationStates.playerDiscard.p1Discard(card,getDiscard(player),getHand(player));
            break;
        case "p2":
            animationStates.playerDiscard.p2Discard(card,getDiscard(player),getHand(player));
            break;
        case "p3":
            animationStates.playerDiscard.p3Discard(card,getDiscard(player),getHand(player));
            break;
        case "p4":
            animationStates.playerDiscard.p4Discard(card,getDiscard(player),getHand(player));
            break;
    }


}

function applyDiscardAnimation(player,card){

}
//TODO alter to utilize ajax for player
/*Determines x and y value of discard not actual px offset */



/*------------------------------------------------------------------------------------*/




/*---------------------------- Component Builder---------------------------------------------*/
//creates a card with basic parameters
function generateCard(val){
    var card =$("<div class='card effect__click'></div>");
    var cardFront = $("<div class='front'></div>");
    var cardBack = $("<div class='back'></div>");
    setCardValues(card,val)
    $(card).append(cardBack);
    $(card).append(cardFront);
    return card;
}

function setCardValues(card,number)
{
    //console.log($(card).children(0)[0].children()[1]);
  switch(number){
      case 1:
          $(card).addClass("hack");
          //.addClass("hack");
          break;
      case 2:
         $(card).addClass("rat");
         // $($(card).children(0)[0]).children()[1].addClass("rat");
          break;
      case 3:
         // $($(card).children(0)[0]).children()[1].addClass("cybersecurity");
          $(card).addClass("cybersecurity");
          break;
      case 4:
          //$($(card).children(0)[0]).children()[1].addClass("firewall");
          $(card).addClass("firewall");
          break;
      case 5:
          //$($(card).children(0)[0]).children()[1].addClass("hardReset");
          $(card).addClass("hardReset");
          break;
      case 6:
          //$($(card).children(0)[0]).children()[1].addClass("hijack");
          $(card).addClass("hijack");
          break;
      case 7:
          //$($(card).children(0)[0]).children()[1].addClass("trojanHorse");
          $(card).addClass("trojanHorse");
          break;
      case 8:
         // $($(card).children(0)[0]).children()[1].addClass("bitcoinBillionair");
          $(card).addClass("bitCoinBillionair");
          break;
      default:
          break;
  }
}
function buildCard(card){
    //TODO get card info from server
}

//apply necessary move animation on the card to the players discard section.
//No flip animation is necessary as player is allowed to look at opponents discard.



//TODO ISWINNER()
var playerStates = {
    p1State: {
        userName:"p1",
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
                    this.p1State.hand.position = $(".effect__click:eq(0)", getHand("p1")).position();
                    break;
                case 2:
                    this.p2State.hand.position = $(".effect__click:eq(0)", getHand("p2")).position();
                    break;
                case 3:
                    this.p3State.hand.position = $(".effect__click:eq(0)", getHand("p3")).position();
                    break;
                case 4:
                    this.p4State.hand.position = $(".effect__click:eq(0)", getHand("p4")).position();
                    break;
            }
        }
    },
    correctCards: function () {
        //update hand position
        this.p1State.hand.position.top = boardState.iHeight * .25;
        this.p3State.hand.position.left = -boardState.iWidth * .36;
        this.p2State.hand.position.top = -boardState.iHeight * .25;
        this.p4State.hand.position.left = boardState.iWidth * .36;

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
    playerNames:["p1","p2","p3","p4"],
    playerChoice:{
        cardPlayed:"",
        cardPlayedDom:"",
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
	 delay:[0,1500,750,2250],
    playerDiscard:{

        p1Discard:function(card,dPile,hand){
            if(card.index()==1)
            {
                $(card,hand).velocity({
                    left:"-="+(boardState.iWidth *.22)
                },{
                    duration:1000,
                    complete: function(){
                        var dcard = $(generateCard(convertNameToNumber(getCardName($(card))))).clone();
                        $(dcard).on('click',function(e){
                            populateDiscardModal($(e.target).parent());
                        });
                        $(dPile).append(dcard);
                        $(card).remove();
                    },
                    queue:false
                });
            }
            else
            {
                $(card).velocity({left:"-="+(boardState.iWidth *.15)},{
                    duration:1000,
                    complete: function(){
                        var dcard =$(generateCard(convertNameToNumber(getCardName($(card))))).clone();
                        $(dcard).on('click',function(e){
                            populateDiscardModal($(e.target).parent());
                        });
                        $(dPile).append(dcard);
                        $(card).remove();
                        $(getHand('p1')).children(0).velocity({left:"-="+(boardState.iWidth *.07)},{
                            duration:1000,
                            complete: function(){
                                $(getHand('p1')).children(0).mouseover(function(){$(getHand('p1')).children(0).velocity({scale:2.5},{duration:200}).css("z-index","2")}).mouseleave(function(){
                                    $(getHand('p1')).children(0).velocity("reverse").css("z-index","1");
                                });
                            },
                            queue:false
                        });
                    },
                    queue:false
                });
            }
        },
        p2Discard:function(card,dPile,hand){
            if(card.index()==1)
            {
                $(card,hand).velocity({
                    left:"+="+(boardState.iWidth *.22)
                },{
                    duration:1000,
                    complete: function() {
                        var dcard =$(generateCard(convertNameToNumber(getCardName($(card))))).clone();
                        console.log(dcard);
                        $(dcard).on('click',function(e){

                            populateDiscardModal($(e.target).parent());
                        });
                        $(dPile).append($(dcard));
                        $(card).children(0)[1].remove();
                    },
                    queue:false
                });
            }
            else
            {

                $(card).velocity({left:"+="+(boardState.iWidth *.15)},{
                    duration:1000,
                    complete: function(){
                        //todo get card number
                        var dcard =$(generateCard(convertNameToNumber(getCardName($(card))))).clone();
                        $(dcard).on('click',function(e){
                            console.log('ran');
                            populateDiscardModal($(e.target).parent());
                        });

                        $(dPile).append($(dcard));

                        $(card)[0].remove();
                        console.log($(getHand('p2')).children(0)[0]);
                        $($(getHand('p2')).children(0)[0]).velocity({left:"+="+(boardState.iWidth *.07)},{
                            duration:1000,
                            queue:false
                        });
                    },
                    queue:false
                });
            }

        },
        p3Discard:function(card){
            if(card.index()==1)
            {

            }
            else
            {

            }

        },
        p4Discard:function(card){
            if(card.index()==1)
            {

            }
            else
            {

            }

        }
    }
}
function convertNameToNumber(item){
   var value;
    switch(item)
    {
        case 'hack':
            value=1;
            break;
        case 'rat':
            value=2;
            break;
        case 'cybersecurity':
            value=3;
            break;
        case 'firewall':
            value=4;
            break;
        case 'hardReset':
            value=5;
            break;
        case 'hijack':
            value=6;
            break;
        case 'trojanHorse':
            value=7;
            break;
        case 'bitCoinBillionair':
            value=8;
            break;
    }
    return value;
}

var cardEffect={
    seeHand:function(player){
        var img = $('<img class="opponentHand">');
        img.addClass(getCardName($(getHand(player)).children(0))+'Img');
        $("#outcome").append(img);

        $("#outcomeModalLabel").html("Opponent's Current Hand");
        $("#outcomeModal").modal('show');
        //Todo put current player in for argument
        discardCard("p1",gameState.playerChoice.cardPlayedDom);
    },
    checkGuess:function(card){

        var opponentHand = getHand(gameState.playerChoice.playerChosen);
        if($(".card",opponentHand).hasClass(getCardName($(card))))
        {
            $("#outcome").append("<div class='outcomeMessage'><p>Hack attempt succeeded</p></div>");
            discardCard(gameState.playerChoice.playerChosen,$(opponentHand).children(0));
				userWin = true;
        }
        else
            $("#outcome").append("<div class='outcomeMessage'><p>Hack attempt failed</p></div>");
        //Todo put current player in for argument
        discardCard("p1",gameState.playerChoice.cardPlayedDom);
        $('#cardModal').modal('hide');
    },
    swapHands:function(player1,player2){
        var card1 = $(getHand(player1)).children(1-gameState.cardChosenIndex);
        var card2 = $(getHand(player2)).children(0);
        var card1Class = getCardName(card1);
        var card2Class = getCardName(card2);
        card1.removeClass(card1Class).addClass(card2Class);
        card2.removeClass(card2Class).addClass(card1Class);
        $("#outcomeModalLabel").html("Attempting to Steal Opponents Data");
        $("#outcome").append("<div class='outComeMessage'><p>Data Aquisition Successful</p></div>");
        $("#outcomeModal").modal('show');
    },
    resetHand:function(player)
    {
        //fix this for current turn
        if(player=="p1")
        {
            if($(getHand(player)).length==2) {
                delayedDraw();
                discardCard(player, $(getHand(player)).children(0));
                discardCard(player, $(getHand(player)).children(1));
            }
            else
            {
                delayedDraw();
                discardCard(player,$(getHand(player)).children(0));
            }
            $("#outcomeModalLabel").html("Performing Hard Reset On User's System");
        }
        else{
            console.log(player);
            $("#outcomeModalLabel").html("Attempting Hard Reset On User's System");
            drawCard(player);
            //console.log($(getHand(player)).children(0));
            discardCard(player,$(getHand(player)).children(0));
        }
        //$("#outcome").append("<div class='outComeMessage'><p>Hard Reset Successful</p></div>");
       // $("#outcomeModal").modal('show');
    }
}

function populateDiscardModal(e){


    $("#outcome").append(img);




    var discard = $($(e).parent()).children(0);
    for(i=0;i<$(discard).length;i++)
    {
        var dcard = $(discard)[i];
        var img = $('<img class="discardedCard">');
        img.addClass(getCardName($(dcard))+'Img');
        $("#discard").append(img);
    }
    $("#discardModal").modal('show');

}
function modalSwitch(){
    $('#playerModal').modal('hide');
    $('#cardModal').modal('show');
}

/*function modalSwitch2(){
    $('#cardModal').modal('hide');
}*/


function delayedDraw(){
    setTimeout(function(){
        dealCards(1);
    },1500);
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
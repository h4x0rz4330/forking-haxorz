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

//sets the initial animations that will be performed during initial loading of the gameboard
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


            //removes a card from the deck during each deal and updates count of remaining cards in deck
            gameState.updateDeckLength();
       $(".card:eq(0)",hand).flip({trigger:'manual'});

        //Performs deal for each player, player name will be changed to user names when testing multiplayer functionality begins
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
    /*applies animation to enlarge player card and flips player card 
     NOTE:this will only be the user as the user has no need to enlarge opponents card and should not be able to see opponents hand*/
    if(player=='p1')
    {   //tempHand used to overcome change in hand value due to asynchronouse call of complete.
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
//sets the necessary modal events to occur based on the card played.
function applyModalAnimation(){
    //Removes all children nodes in the playerModal when it is hidden to allow for accurate displaying of remaining players
    $("#playerModal").on("hidden.bs.modal",function(){
        clearPlayerChoice();
    });
    //Applies the proper modal transitions based on the card played
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
    //Launches the outcome modal for the hack card as it is the only card that uses this modal
    $("#cardModal").on("hidden.bs.modal",function(){
        setTimeout(function(){
            $('#outcomeModal').modal('show');
        },0);
    })

    //Performs an auto hide on outcome modal after a set amount time for the cards listed below
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
    //clear outcome content to allow for new content to be added
    $("#outcomeModal").on("hidden.bs.modal",function(){
        clearOutcome();

    });

    //clear discard to allow for individual player discards to be properly loaded
    $("#discardModal").on("hidden.bs.modal",function(){
        clearDiscard();
    });
}

//Toggles the modal that allows the player to use their card
function activateCard(card){
    //determines the index of the card to apply the proper discard animation and necessary correction, such as the first card in the hand is plaeyd
    gameState.cardChosenIndex = $(card).index();
    //gets the dom value of the card played to copy it to the discard div before deleting it from the players hand
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

//returns the class name of the card to use as a mean to determine which card was played, as well as to add a background to the cardModal
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
    else if(card.hasClass("bitCoinBillionair")){
        return "bitCoinBillionair";
    }
}

//deals a single card to a player during draw phase.
function drawCard(player){
    updateHand(player);
    applyDrawAnimation(player);
    gameState.updateDeckLength();

}
//populates the players available to choose in player modal by checking isEliminated boolean for each player
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
//removes the players appended to the player modal during the players turn 
function clearPlayerChoice(){
    for (choice in $("#choosePlayer")){
        $(choice,"#choosePlayer").remove();
    }
}
//clears the content in the discard modal to allow another players discard to be loaded in
function clearDiscard(){
    var length = $("#discard").find('img').length;
    for(i=0;i<length;i++)
    {
        $("#discard").find('img')[0].remove();

    }

}
//celars the outcome modal's content in order to print the result 
function clearOutcome(){
    for (i=0;i<$("#outcome").children().length;i++){
        $("#outcome").children(i).remove();
    }
}
//populates the deck based on the number of cards that will be in the deck 
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
//updates the hand of the player passed to the method.
function updateHand(player){
    var hand =  $(getHand(player));
    hand.append(generateCard(deck.shift()).clone());
    return hand;
}

//calls the proper discard animation by determine which player is called by the username and which card to discard based on the card played
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
//creates a card dom by appending a card front and a card back to the card container.
function generateCard(val){
    var card =$("<div class='card effect__click'></div>");
    var cardFront = $("<div class='front'></div>");
    var cardBack = $("<div class='back'></div>");
    $(card).append(cardBack);
    $(card).append(cardFront);
    setCardValues(card,val)
    return card;
}
//Set the image for the card that was drawn based on the number provided and adds it to the card passed to the function
//the addition of the class to the front of card is so the background appears on the front div instead of container to allow flip animation to function properly.
function setCardValues(card,number)
{
  switch(number){
      case 1:
          $(card).addClass("hack");
          $('.front',card).addClass("hack");
          break;
      case 2:
         $(card).addClass("rat");
          $('.front',card).addClass("rat");
          break;
      case 3:
          $('.front',card).addClass("cybersecurity");
          $(card).addClass("cybersecurity");
          break;
      case 4:
          $('.front',card).addClass("firewall");
          $(card).addClass("firewall");
          break;
      case 5:
          $('.front',card).addClass("hardReset");
          $(card).addClass("hardReset");
          break;
      case 6:
          $('.front',card).addClass("hijack");
          $(card).addClass("hijack");
          break;
      case 7:
          $('.front',card).addClass("trojanHorse");
          $(card).addClass("trojanHorse");
          break;
      case 8:
          $('.front',card).addClass("bitCoinBillionair");
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
//holds values of the player such as, their username the position of their hand to update its position, if they are eliminated, the modal button that represents them.
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
    //Sets the initial hand for the player based on the players status: p1, p2, p3, p4 from the users view point.
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
    //corrects the position of the cards in the players hand in the event that the user decides to resize the window. 
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
    //sets the initial values for the players as the game state such as number of players if they are eliminated and a button to select them.
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
//holds the current values of the game such as number of players, their names, choices made such as player, card user played, card user guess
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
    //removes a card div from the deck id and updates the number of cards remaining by getting the number of childrens 
    updateDeckLength:function(){
        $(".card:last-child","#deck").remove();
        this.cardsRemaining = $("#deck").children().length;
    },//needs to be expanded to implement ajax calls
    initGameState:function(){
        //TODO ajax call
        this.players = 0;

    }
}
//keeps track of the current size of the window and the theoretical height and width of the game board
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
    /*determines if window width or window height changed and if an increase or decrease occurs. 
    This is used to calculate the change in width in height of the gameboard as it uses the contain class and will maintain aspect ratio*/
    updateBoardDimensions: function () {
        var newBoardState = {height: $(window).height(), width: $(window).width(),iHeight:0,iWidth:0};
        //if window height increased
        if(this.height<newBoardState.height)
        {   /*determines if ratio is broken as the value that is smaller than the necessary aspect ratio 
            will be what the contain value will use to maintain proper aspect ratio*/
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

//Holds various parameters and functions necessary to apply animations used throughout the script
/*NOTE: Function calls made in the complete statement are used to initialize the card in the discard pile which 
copies the content of the card discarded before it is removed from the players hand*/
var animationStates={
    //rotation and delay store the necessary card rotation value for draw and deal animation and delay exclusively for the deal animation
    rotation:[720,900,810,990],
	 delay:[0,1500,750,2250],
    playerDiscard:{
        //applies the discard animation necessary for player one based on if the card was the first or second card in their hand
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
        //performs the necessary discard action for p2 based on card played in hand
        p2Discard:function(card,dPile,hand){
            //if the second card in hand was played
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

        },//Need to implement to allow 3player gameplay
        p3Discard:function(card){
            if(card.index()==1)
            {

            }
            else
            {

            }

        },//Need to implement to allow 4player gameplay.
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
//Converts the name of teh card to a number value to implement in the compareValue method for 
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

//Stores the various effects each card will have. 
var cardEffect={
    //Allows the player to see the content of the opponents hand by populating a modal with the children elements of the discard Div
    seeHand:function(player){
        var img = $('<img class="opponentHand">');
        img.addClass(getCardName($(getHand(player)).children(0))+'Img');
        console.log($(img));
        $("#outcome").append(img);

        $("#outcomeModalLabel").html("Opponent's Current Hand");
        $("#outcomeModal").modal('show');
        //Todo put current player in for argument
        discardCard("p1",gameState.playerChoice.cardPlayedDom);
    },
    //Checks the card the user guesses after playing the hack card against the card that exists in the hand of the player chosen.
    checkGuess:function(card){
        $("#outcomeModalLabel").html("Attempting to Hack Opponents System");
        var opponentHand = getHand(gameState.playerChoice.playerChosen);
        if($(".card",opponentHand).hasClass(getCardName($(card))))
        {
            //appends success message to the outcomeMessage modal and discards the players card
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
    //Gets the value of the card not played in player1's hand and the card in player2's hand and copies the value to 
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
    //Discards the players hand and have the player to draw one new card after discarding the card.
    resetHand:function(player)
    {
        //TODO Implement user's name when server is implemented
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

//Populates the discard modal by obtaining the content of the users discard pile and appending images using t
function populateDiscardModal(e){

   
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
//Switches from the playerModal to the cardModal after choosing a player after playing the hack card
function modalSwitch(){
    $('#playerModal').modal('hide');
    $('#cardModal').modal('show');
}


//Performs a delayed deal for player 1 in order to avoid issue 
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



/*--------In progress-------------*/



/* This method is designed to fix the scaling and reset queueing issue in velocity by implementing a 'frame reset'.

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
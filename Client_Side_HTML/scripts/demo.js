var deck = [3,5,2,6,1,5,7,1];


$(document).ready(function(){
    //gets the users initial window dimensions.
    boardState.initializeGameDimensions();
    playerStates.initPlayerState(2);
    applyModalAnimation();
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
});
var deck = [3,5,2,6,1,5,7,1];

var cphand = [5];
var playerTurn = true;
var cpTurn = false;
var userWin = false;

$(document).ready(function(){
    //gets the users initial window dimensions.
	boardState.initializeGameDimensions();

	//initialed the game to be 2 players
	playerStates.initPlayerState(2);
	//added the modal animations values to the modals utilized in the game
	applyModalAnimation();
	//applies a ripple effect to allow the user to perform an action to lessen sense of boredom if player takes time before making move.
	//ripples();

	
	populateDeck();
	$('#playerModal').on('hidden.bs.modal', function () {

	})
	//this will be where the outter most loop will occur that will trigger each round

	setupBoard();
			
    setTimeout(function(){
		//deal Phase
		  dealCards(2);
		//updates the dimensions of board and performs correct corrections to maintain card position relative to gameboard.
		$(window).resize(function(){
			boardState.updateBoardDimensions();
			playerStates.correctCards();
		});

		//This will be where main loop in each round that will trigger the start of a new turn

			//Draw Phase
			

			//Play Phase
				drawCard('p1');
				//drawCard('p2');
			//End of turn phase
	},3000);
});

//This function is used to simulate a computer player to perform the demo
function cpPlayCard(){
	if (!userWin){
		cphand.push(deck[0]);
		drawCard("p2");
		var cardnum = cphand.shift();
		//adds a delay to card action to simulate time spent contemplating time to play card
		setTimeout(function(){
			switch(cardnum){
				case 5:
					cardEffect.resetHand('p1');
					discardCard('p2',$('#p2Hand').find('.hardReset'));
					break;
				case 6:
					if (cphand[0] == 7){

						discardCard('p2',$('#p2Hand').find('.trojanHorse'));
						setTimeout(function(){
							$('#p2Hand').find('.trojanHorse').remove();
						},999);
					}
					break;
			}
			setTimeout(function(){
				drawCard("p1");
			},1500);
		}, 3000);
	}else{
		$('#gameModal').modal('show');
	}
}

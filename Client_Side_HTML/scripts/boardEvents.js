/**
 * Created by chrisschayer on 9/25/16.
 */

var turn=["p1","p2","p3","p4"];
var phases =["draw","main","discard","end"];
var isWinner;

var match={
    user1: {
        hand:0,
        status:"playing",
        canDrawn:false
    },

    user2: {
        hand:0,
        status:"playing",
        canDrawn:false
    },

    user3: {
        hand:0,
        status:"playing",
        canDrawn:false
    },

    user4: {
        hand:0,
        status:"playing",
        canDrawn:false
    }
}
var currentTurn;
var currentPhase;

var changeTurn= function(){

}

var getTurn = function(){
  return turn[currentTurn];
}

var setTurn = function(tindex){

}

var dealCards = function(){

}

var cardDraw = function(){

}

var cardDiscard= function(){

}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}



/**
 * Created by chrisschayer on 9/25/16.
 */
$(document).ready(function() {

    dealListener(4);



        drawListener(1, "hello");

});



var turn=["p1","p2","p3","p4"];


var isWinner;



var changeTurn= function(){

}

var getTurn = function(){
    return turn[currentTurn];
}

var setTurn = function(tindex){

}


function cardDiscard(){

}

var card =$("<div class='card effect__click'></div>");
var cardFront = $("<div class='card__front'></div>");
var cardBack = $("<div class='card__back'></div>");
$(card).append(cardFront);
$(card).append(cardBack);

function dealListener(playerCount){
     $("#deck").on("click", function(){
         var i;
         var handString;
         for(i=1;i<=playerCount;i++)
         {
             var selector = i-1;
             handString = "p"+i+"Hand";
             var hand=$("#"+handString);
             hand.append(card.clone());
             $(".effect__click:eq("+selector+")").addClass(handString+"Click");
            //creating a special function for user draw as it will need to have a card flip animation
             if(i==1)
             {
                 //adding custom classes for the front and backside of card
                 $(".card__front:eq("+selector+")").addClass("card__front__flipped");
                 $(".card__back:eq("+selector+")").addClass("card__back__flipped");

                 $(".card__front:eq("+selector+")").on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                     function(e) {
                         $(".card__back:eq(0)").css({
                             "-ms-transform": "rotateY(-180deg)",
                             "-moz-transform": "rotateY(-180deg)",
                             "-webkit-transform": "rotateY(-180deg)",
                             "-o-transform": "rotateY(-180deg)",
                             "transform": "rotateY(-180deg)"
                         });
                         $(".card__front:eq(0)").css({
                             "-ms-transform": "rotateY(0deg)",
                             "-moz-transform": "rotateY(0deg)",
                             "-webkit-transform": "rotateY(0deg)",
                             "-o-transform": "rotateY(0deg)",
                             "transform": "rotateY(0deg)"
                         });

                         $(".card__back:eq(0)").removeClass("card__back__flipped");
                         $(".card__front:eq(0)").removeClass("card__front__flipped");
                     });
                 $(".card__front:eq("+selector+")").addClass("card__front__zoomed");
             }
             else
             {
                 $(".card__back:eq(" + selector + ")").addClass(handString + "Draw");
                 $(".card__front:eq(" + selector + ")").addClass(handString + "Draw");
             }

         }
     });
}
//function to do individual draws.
function drawListener(player,cardinfo){
    $("#draw").on("click",function(){
        console.log(cardinfo);
        var handString = "p"+player+"Hand";
        var hand="#"+handString;
        $(hand).append($(card).clone());

        $("g")
        $(".effect__click:eq(1)").addClass("drawMove");
        $(".card__back:eq(1)").addClass("drawBack");
        $(".card__front:eq(1)").addClass("drawFront");
        $(".card__front:eq(1)").on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
            function(e) {
                console.log("entered function");
                var transVal;
                var i = player-1;
                switch(i)
                {
                    case 0:
                        console.log("got 0");
                        $(".card__front:eq(1)").addClass("card__front__zoomed");
                        $(".card__back:eq(1)").css({
                            "-ms-transform": "rotateY(-180deg)",
                            "-moz-transform": "rotateY(-180deg)",
                            "-webkit-transform": "rotateY(-180deg)",
                            "-o-transform": "rotateY(-180deg)",
                            "transform": "rotateY(-180deg)"
                        });
                        $(".card__front:eq(1)").css({
                            "-ms-transform": "rotateY(0deg)",
                            "-moz-transform": "rotateY(0deg)",
                            "-webkit-transform": "rotateY(0deg)",
                            "-o-transform": "rotateY(0deg)",
                            "transform": "rotateY(0deg)"
                        });
                    case 2:
                        transVal ="\"-ms-transform\":\"rotateY(-180deg)\","+
                        "\"-moz-transform\": \"rotateY(-180deg)\","+
                        "\"-webkit-transform\": \"rotateY(-180deg)\","+
                        "\"-o-transform\": \"rotateY(-180deg)\","+
                        "\"transform\": \"rotateY(-180deg)\"";
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

function discard(player)
{

}

/* Function for maintaining a timer.
function clock()
{
    $("#DateCountdown").TimeCircles();
    $("#CountDownTimer").TimeCircles({ time: { Days: { show: false }, Hours: { show: false }, Minutes: {show: false}}});
    $("#PageOpenTimer").TimeCircles();

    var updateTime = function(){
        var date = $("#date").val();
        var time = $("#time").val();
        var datetime = date + ' ' + time + ':00';
        $("#DateCountdown").data('date', datetime).TimeCircles().start();
    }
    $("#date").change(updateTime).keyup(updateTime);
    $("#time").change(updateTime).keyup(updateTime);

    // Start and stop are methods applied on the public TimeCircles instance
    $(".startTimer").click(function() {
        $("#CountDownTimer").TimeCircles().start();
    });
    $(".stopTimer").click(function() {
        $("#CountDownTimer").TimeCircles().stop();
    });

    // Fade in and fade out are examples of how chaining can be done with TimeCircles
    $(".fadeIn").click(function() {
        $("#PageOpenTimer").fadeIn();
    });
    $(".fadeOut").click(function() {
        $("#PageOpenTimer").fadeOut();
    });

}*/

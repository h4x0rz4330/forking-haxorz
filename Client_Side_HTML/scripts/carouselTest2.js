/**
 * Created by chrisschayer on 10/22/16.
 */

$(document).ready(function(){
    buildCarousel();
    var clicking = false;

    $('figure').mousedown(function(){
        clicking = true;
        $('img').on('dragstart', function(event) { event.preventDefault(); });
    });

    $(document).mouseup(function(){
        clicking = false;

    })

    $('figure').mousemove(function(e){
        if(clicking == false) return;
            var relativeX = e.pageX - this.offsetLeft;
            $(this).css('transform', 'rotateY(' + relativeX + 'deg)');
        $('img').on('dragstart', function(event) { event.preventDefault(); });
    });

});

function buildCarousel() {
    var cardBacks=["back1.jpg","back1.jpg","back1.jpg","back1.jpg","back1.jpg","back1.jpg","back1.jpg","back1.jpg","back1.jpg","back1.jpg","back1.jpg","back1.jpg"];
    var image;
    var button;
    for(var i =0; i<cardBacks.length;i++)
    {   image = $("<img src='cardBacks/"+cardBacks[i]+"'>");
        button = $("<button class='purchase'>Take my money</button>")
        $("#carousel").append(image.clone());
        $("#buttons").append
    }
    var numberOfImgs = $("figure img").length;

    //calculates the necessary radius
    var zlength;

    //calculates initial rotateY value for each card
    var degreeSep = 360 / (numberOfImgs - 1);
    var angle = 0;
    for (i = 1; i < numberOfImgs; i++) {
        $("figure img:nth-child(" + (i) + ")").css('transform', 'rotateY(' + angle + 'deg)');
        angle = angle + degreeSep;
    }
}




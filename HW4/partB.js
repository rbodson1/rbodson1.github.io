var images = [];
var imagesClicked = [];
var imagesClickedIds = [];
var flipped = 0;
Array.prototype.randomize = function() {
    var i = this.length;
    var rand;
    var temp;
    while (--i > 0) {
        rand = Math.floor(Math.random() * (i + 1));
        temp = this[rand];
        this[rand] = this[i];
        this[i] = temp;
    }
}

function gameLevel(difficulty) {
    flipped = 0;
    var output = '';
    images.randomize();

    for (var i = 0; i < images.length; i++) {
        output += '<div id="tile_' + i + '"><img src=images/' + images[i] + '.jpg></div>';
    }
    document.getElementById('board').innerHTML = output;
    output = "";

    setTimeout(function() {
        for (var i = 0; i < images.length; i++) {
            output += '<div id="tile_' + i + '" onclick="flip(this,\'' + images[i] + '\')"></div>';
        }
        document.getElementById('board').innerHTML = output;
    }, difficulty);

    setTimeout(function() {
        timer();
    }, difficulty - 500);
}

function flip(tile, value) {
    if (tile.innerHTML == "" && imagesClicked.length < 2) {
        tile.innerHTML = '<img src=images/' + value + '.jpg>';
        if (imagesClicked.length == 0) {
            imagesClicked.push(value);
            imagesClickedIds.push(tile.id);
        } else if (imagesClicked.length == 1) {
            imagesClicked.push(value);
            imagesClickedIds.push(tile.id);

            if (imagesClicked[0] == imagesClicked[1]) {
                flipped += 2;
                imagesClicked = [];
                imagesClickedIds = [];
                if (flipped == images.length) {
                    alert("Congratulation, You Won!");
                    location.reload();
                }
            } else {
                function flipBack() {
                    var tile1 = document.getElementById(imagesClickedIds[0]);
                    var tile2 = document.getElementById(imagesClickedIds[1]);
                    tile1.innerHTML = "";
                    tile2.innerHTML = "";
                    imagesClicked = [];
                    imagesClickedIds = [];
                }
                setTimeout(flipBack, 1000);
            }
        }
    }
}

function timer() {
    if (document.getElementById("easy").checked)
        var time = 120000;
    if (document.getElementById("medium").checked)
        var time = 150000;
    if (document.getElementById("hard").checked)
        var time = 180000;

    var countDownDate = new Date().getTime() + time;

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = "Timer= " + '<b>' + "<b style='color:red'>" + minutes + ":" + seconds + "<b/>" + '</b>';

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Sorry, you are of time!";
            alert("Game Over, you ran out of time!");
            location.reload();
        }
    }, 1000);
}

function radioCheck() {
    if (document.getElementById("easy").checked)
        images = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'];
    if (document.getElementById("medium").checked)
        images = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10'];
    if (document.getElementById("hard").checked)
        images = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12'];
}

function startGame() {
    if (document.getElementById("easy").checked)
        gameLevel(3000);
    if (document.getElementById("medium").checked)
        gameLevel(5000);
    if (document.getElementById("hard").checked)
        gameLevel(8000);

}
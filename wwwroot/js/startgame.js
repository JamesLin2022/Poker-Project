console.log("here");

document.getElementById("win").onclick = function() {
    console.log("here");
    document.getElementsByClassName("o-two")[0].src = "../img/cards/a-d.png"
    document.getElementsByClassName("o-one")[0].src = "../img/cards/a-c.png"
    document.getElementsByClassName("s-five")[0].src = "../img/cards/a-h.png"
    document.getElementById("opponent-hand").innerHTML = "<h1>THREE OF A KIND</h1>"
    document.getElementById("player-hand").innerHTML = "<h1>ROYAL FLUSH (WINNER)</h1>"
    document.getElementById("opponent-hand").innerHTML = "<h1>THREE OF A KIND</h1>"
    document.getElementById("next-page").innerHTML = "NEXT PAGE"
}
console.log("here");

document.getElementById("win").onclick = function() {
    console.log("here");
    document.getElementsByClassName("o-two")[0].src = "../img/cards/a-d.png"
    document.getElementsByClassName("o-one")[0].src = "../img/cards/a-c.png"
    document.getElementsByClassName("s-five")[0].src = "../img/cards/a-h.png"
    document.getElementById("opponent-hand").innerHTML = "<h1>THREE OF A KIND</h1>"
    document.getElementById("player-hand").innerHTML = "<h1>ROYAL FLUSH (WINNER)</h1>"
    document.getElementById("opponent-hand").innerHTML = "<h1>THREE OF A KIND</h1>"
    document.getElementById("next-page").innerHTML = "<a id='next-page2' href='/home/WinGame'>NEXT PAGE</a>"

    document.getElementById("next-page").onclick = "location.href='@Url.Action(`WinGame`,`Home`)'";
    console.log(document.getElementById("next-page").onclick);

}
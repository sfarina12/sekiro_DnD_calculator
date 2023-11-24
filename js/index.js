var players_names = ["Andrea M","Andrea L","Valeria","Francesco","Boss"]
var players = [{
    "nome" : "am",
    "d100":"",
    "d20":"",
    "d10":"",
    "d4":"",
    "sb":"",
    "hp":"",
    "pp":"",
    "mini":"img/bandream.png"
},{
    "nome" : "al",
    "d100":"",
    "d20":"",
    "d10":"",
    "d4":"",
    "sb":"",
    "hp":"",
    "pp":"",
    "mini":"img/bandreal.png"
},{
    "nome" : "v",
    "d100":"",
    "d20":"",
    "d10":"",
    "d4":"",
    "sb":"",
    "hp":"",
    "pp":"",
    "mini":"img/bvaleria.png"
},{
    "nome" : "f",
    "d100":"",
    "d20":"",
    "d10":"",
    "d4":"",
    "sb":"",
    "hp":"",
    "pp":"",
    "mini":"img/bfrancesco.png"
},{
    "nome" : "boss",
    "d100":"",
    "d20":"",
    "d10":"",
    "d4":"",
    "sb":"",
    "hp":"",
    "pp":"",
    "mini":"img/bdm.png"
},]
var count = 0
$(document).ready(function(){
    $("#nome").text(players_names[count])
})

$(document).on("click","#btn_addPlayer",function() {
    
    players[count].nome = players_names[count]
    players[count].hp = $("#txt_playerv").val()
    players[count].sb = $("#txt_playersb").val()
    players[count].pp = $("#txt_playerpp").val()
    $("#txt_playerv").val("")
    $("#txt_playersb").val("")
    $("#txt_playerpp").val("")
console.log(count)
    if(count<4) {
        count++
        $("#nome").text(players_names[count])
    } else {
        $("field-text").attr("style","display:none")
        $("#startgame").attr("style","")
    }
});

$(document).on("click","#btn_startBattle",function(e) {
    sessionStorage.setItem("players",players);
});






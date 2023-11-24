var att_pl
var def_pl
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
$(document).ready(function(){ $("#nome").text(players_names[count]) })

$(document).on("click","#btn_addPlayer",function() {
    
    players[count].nome = players_names[count]
    players[count].hp = $("#txt_playerv").val()
    players[count].sb = $("#txt_playersb").val()
    players[count].pp = $("#txt_playerpp").val()
    $("#txt_playerv").val("")
    $("#txt_playersb").val("")
    $("#txt_playerpp").val("")

    $(".bar[plsb='"+count+"']").attr("act",players[count].sb)
    $(".bar[plsb='"+count+"'] life txt").text(players[count].hp)

    if(count<4) {
        count++
        $("#nome").text(players_names[count])
    } else {
        $(".tmp").attr("style","display:none")
        $("#btn_startBattle").attr("style","")
    }
});

$(document).on("click","#btn_startBattle",function(e) {
    $("#inizializzazione").attr("style","display:none")
    $("#game").attr("style","")
    valueToText()
});

$(document).on("click","#player_table div",function() {
    var selected = $(this).children()[1]

    if($(selected).hasClass("contenderDef")) {
        $(selected).removeClass("contenderDef")
        $(selected).addClass("contenderAtt")
    } else if($(selected).hasClass("contenderAtt")) {
        $(selected).removeClass("contenderAtt")
    } else $(selected).addClass("contenderDef")
});

$(document).on("click","#btn_startBtl",function() {
    $("#game_2").attr("style","")

    var att = $(".contenderAtt")
    var def = $(".contenderDef")

    att_pl = $(att).attr("pl")
    def_pl = $(def).attr("pl")

    var ba = players[att_pl].pp
    var bd = Math.trunc(players[def_pl].pp/2)
    $("#base_att").text(ba == '' ? 0 : ba)
    $("#base_def").text(bd == '' ? 0 : bd)

    $("#base_att").attr("style","")
    $("#base_def").attr("style","")
    $("#result_att").attr("style","display:none")
    $("#result_def").attr("style","display:none")
    $("#game_bar img").attr("style","display:none")

    $("aa").text("")
    $("bb").text("")

    $("#txt_att").val("")
    $("#txt_def").val("")
    
    $("#img_att").attr("src",$($(att).parent().children()[0]).attr("src"))
    $("#img_def").attr("src",$($(def).parent().children()[0]).attr("src"))

    var dice
    if(players[def_pl].d4=="x") dice=4
    if(players[def_pl].d10=="x") dice=10
    if(players[def_pl].d20=="x") dice=20
    if(players[def_pl].d100=="x") dice=100

    var parent = $("#player_def .dice_list")
    $(parent).empty()
    $(parent).append('<img dice="4" src="img/d4.png"><img dice="10"  src="img/d10.png"><img dice="20"  src="img/d20.png"><img dice="100" src="img/d100.png">')

    switch(dice) {
        case 4:   $(parent).find("img[dice=4]").attr("src","img/dd4.png"); break;
        case 10:  $(parent).find("img[dice=10]").attr("src","img/dd10.png"); break;
        case 20:  $(parent).find("img[dice=20]").attr("src","img/dd20.png"); break;
        case 100: $(parent).find("img[dice=100]").attr("src","img/dd100.png"); break;
    }
});

$(document).on("click","#btn_endBtl",function() {
    $("#game_2").attr("style","display:none")
});

$(document).on("click","#btn_fight",function() {
    $("#base_att").attr("style","display:none")
    $("#base_def").attr("style","display:none")
    $("#result_att").attr("style","")
    $("#result_def").attr("style","")
    
    var val_att = parseInt($("#base_att").text())+parseInt($("#cal_att").text())
    var val_def = parseInt($("#base_def").text())+parseInt($("#cal_def").text())
    $("#result_att").text(val_att)
    $("#result_def").text(val_def)

    $("#game_bar img").attr("src",players[def_pl].mini)
    var att,par;

    if(val_att == val_def)                                   {$("div[value=0] img").attr("style","");  att=60; par=0}
    else if((val_att < val_def) && (val_att+3 >= val_def))   {$("div[value=3] img").attr("style","");  att=30; par=15}
    else if((val_att+3 < val_def) && (val_att+5 >= val_def)) {$("div[value=5] img").attr("style","");  att=15; par=15}
    else if((val_att+5 < val_def) && (val_att+8 >= val_def)) {$("div[value=8] img").attr("style","");  att=0; par=30}
    else if((val_att+8 < val_def))                           {$("div[value=9] img").attr("style","");  att=0; par=50}
    else if((val_att > val_def) && (val_att-3 <= val_def))   {$("div[value=-3] img").attr("style",""); att=30; par=15}
    else if((val_att-3 > val_def) && (val_att-5 <= val_def)) {$("div[value=-5] img").attr("style",""); att=15; par=15}
    else if((val_att-5 > val_def) && (val_att-8 <= val_def)) {$("div[value=-8] img").attr("style",""); att=0; par=30}
    else if(val_att-8 > val_def)                             {$("div[value=-9] img").attr("style",""); att=0; par=50}

    $("aa").text("-"+att)
    $("bb").text("-"+par)

    var def_act = $(".bar[plsb='"+def_pl+"']").attr("act")-par
    var att_act = $(".bar[plsb='"+att_pl+"']").attr("act")-att
    $(".bar[plsb='"+def_pl+"']").attr("act",def_act)
    $(".bar[plsb='"+att_pl+"']").attr("act",att_act)

    updateBars(def_pl,players[def_pl].sb,def_act)
    updateBars(att_pl,players[att_pl].sb,att_act)
});

$(document).on("focusout","#txt_att",function() {
    if($(this).val() != '') {
        $("#cal_att").text(Math.trunc($(this).val()/10))
        var val_att = parseInt($("#base_att").text())+parseInt($("#cal_att").text())
        $("#result_att").text(val_att)
        $("#result_att").attr("style","")
        $("#base_att").attr("style","display:none")
    } else {
        $("#base_att").attr("style","")
        $("#result_att").attr("style","display:none")
    }
});

$(document).on("focusout","#txt_def",function() {
    if($(this).val() != '') {
        $("#cal_def").text($(this).val())
        var val_def = parseInt($("#base_def").text())+parseInt($("#cal_def").text())
        $("#result_def").text(val_def)
        $("#result_def").attr("style","")
        $("#base_def").attr("style","display:none")
    } else {
        $("#base_def").attr("style","")
        $("#result_def").attr("style","display:none")
    }
});

$(document).on("click",".dice_list img",function() {
    var dice = $(this).attr("dice")

    players[def_pl].d4 = ""
    players[def_pl].d10 = ""
    players[def_pl].d20 = ""
    players[def_pl].d100 = ""
    var parent = $(this).parent()
    $(parent).empty()
    $(parent).append('<img dice="4" src="img/d4.png"><img dice="10"  src="img/d10.png"><img dice="20"  src="img/d20.png"><img dice="100" src="img/d100.png">')

    switch(dice) {
        case "4":   players[def_pl].d4 = "x";   $(parent).find("img[dice=4]").attr("src","img/dd4.png"); break;
        case "10":  players[def_pl].d10 = "x";  $(parent).find("img[dice=10]").attr("src","img/dd10.png"); break;
        case "20":  players[def_pl].d20 = "x";  $(parent).find("img[dice=20]").attr("src","img/dd20.png"); break;
        case "100": players[def_pl].d100 = "x"; $(parent).find("img[dice=100]").attr("src","img/dd100.png"); break;
    }
});

$(document).on("click",".bar life img",function(){
    $(this).attr("style","display:none")
    var player = $($($(this).parent()).parent()).attr("plsb")
    $($(this).parent().children()[0]).text(players[player].hp)
    
    $(".bar[plsb='"+player+"'] .stability_bar .inner_stability").attr("style","width:100%;")
    $(".bar[plsb='"+player+"']").attr("act",players[player].sb)

    valueToText()
})

$(document).on("focusout",".inner_stability input",function() {
    textToValue(this)
});

function valueToText() {
    $(".inner_stability input").each(function(k,v) {
        var act = $($($($(v).parent()).parent()).parent()).attr("act")
        $(v).val(act)
    })
}

function textToValue(elem) {
    var player = $($($($(elem).parent()).parent()).parent()).attr("plsb")
    $($($($(elem).parent()).parent()).parent()).attr("act",$(elem).val())
    updateBars(player,players[player].sb,$(elem).val())
}

function updateBars(bar,max,act) {
    if(act > 0) {
        var percentage = (act/max) * 100
        $(".bar[plsb='"+bar+"'] .stability_bar .inner_stability").attr("style","width:"+percentage+"%")
    } else {
        var tmp = $(".bar[plsb='"+bar+"'] life").text()-1
        if(tmp > 0) {
            $(".bar[plsb='"+bar+"']").attr("act",players[def_pl].sb)
            $(".bar[plsb='"+bar+"'] .stability_bar .inner_stability").attr("style","width:100%")
            $(".bar[plsb='"+bar+"'] life txt").text(tmp)
        } else {
            $(".bar[plsb='"+bar+"']").attr("act","100%")
            $(".bar[plsb='"+bar+"'] .stability_bar .inner_stability").attr("style","width:100%; background-color:#b32525")
            $(".bar[plsb='"+bar+"'] life txt").text("")
            $(".bar[plsb='"+bar+"'] life img").attr("style","")
        }
    }

    valueToText() 
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    //localStorage.clear();
    if(localStorage.regime == undefined){
        $("#regime1").attr("checked", "checked");
    }
    else {
        $("#"+localStorage.regime).attr("checked", "checked")
    }

    $("#menu").click(goMenu);
    $(".input").click(Regime);
    function goMenu(){
        location.href = "start.html";
    }
});
function Regime(){
    localStorage.regime= $(this).attr("id");
}

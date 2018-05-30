/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    $("#play").click(goPlay);
    $("#regime").click(goRegime);
    
    function goPlay()
    {
        if(localStorage.regime == undefined){
            location.href = "play1.html";
        }
        else {
            if (localStorage.regime=="regime1")
                location.href = "play1.html";
            else location.href = "play2.html";
        }
    }
    function goRegime()
    {
        location.href = "regime.html";
    }
});

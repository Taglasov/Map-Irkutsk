/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function() {
    $(".region").click(ValueColorclick);
    $(".region").mouseover(ValueColorover);
    $(".region").mouseout(ValueColorout);
});

function ValueColorclick(click_evt){
    var st = click_evt.target.style;
    st.fill = "rgb(128, 128, 128)";
    st.opacity = 1;
    document.getElementById("ans").focus();
    /*var s = $(this).attr('synonym');
    $("#check").click(check);*/
}

function check(){
    alert("hello");
    /*alert($(this).attr('synonym'));*/
}

function ValueColorover(click_evt){
    var st = click_evt.target.style;
    if (st.fill == "none"){
        st.fill = "rgb(0, 0, 50)";
        st.opacity = 0.2;
    }
    
}
function ValueColorout(click_evt){
    var st = click_evt.target.style;
    if (st.opacity == 0.2){
        st.fill = "none";
        st.opacity = 1;
    }
}




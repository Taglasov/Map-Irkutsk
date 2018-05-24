/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var flag = false;
window.evt = "a";
var mass = [];


$(function() {
    $(".region").click(ValueColorclick);
    $(".region").mouseover(ValueColorover);
    $(".region").mouseout(ValueColorout);
    $("#check").click(check);
    
});
function ValueColorclick(click_evt){
    window.evt = "b";
    var st1;
    if (flag == true){
        st1 = mass[0];
        if(st1.target.id!=click_evt.target.id){
            st1.target.style.fill = "none";
            st1.target.style.opacity = 1;
            mass.pop();
            mass.push(click_evt);
            var st = click_evt.target.style;
            st.fill = "rgb(128, 128, 128)";
            st.opacity = 1;
            alert(st1.target.id);
        }
    }
    //if (flag == true) alert(click_evt.target.id + "," + st1.target.id);
    
    
    if (flag == false){
        mass.push(click_evt); 
        var st = click_evt.target.style;
        st.fill = "rgb(128, 128, 128)";
        st.opacity = 1;
        flag = true;
    }
    
    document.getElementById("answer").focus();
    document.getElementById("ans").focus();
    /*var s = $(this).attr('synonym');
    $("#check").click(check);*/
    
}

function check(){
    /*if (flag==true){
        alert("true");
    }
    else alert("false");*/
    alert(mass.pop());
    
    document.getElementById("ans").focus();
    var a = document.getElementById("ans").value;
    /*alert(evt.attr('synonym'));*/
    
   
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




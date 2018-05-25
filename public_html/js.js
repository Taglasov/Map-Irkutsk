/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var flag = false;
var mass = [];
var synon=[];
var regions = [];
var mainindex = 0;
var divanswer1;
var divanswer2;
window.onload = function() {
    var imap = document.getElementById("imap").contentDocument;
    var reg = imap.getElementsByClassName("region");
    
    for (var i = 0; i < reg.length; i++) {
        regions.push(reg[i]);
    }
    regions = shuffle(regions);
    //for (var i = 0; i < regions.length; i++) {
    //   alert(regions[i].id);
    //}
    document.getElementById("start").onclick = Play;
    //$(".region").click(ValueColorclick);
    //$(".region").mouseover(ValueColorover);
    //$(".region").mouseout(ValueColorout);
    
    //for (var i = 0; i < reg.length; i++) {
    //    imap.getElementsByClassName("region")[i].onmouseover = ValueColorover;
    //    imap.getElementsByClassName("region")[i].onmouseout = ValueColorout;
    //    imap.getElementsByClassName("region")[i].onclick = ValueColorclick;
    //};
    
};

function Play(){
    regions[mainindex].style.fill = "rgb(128, 128, 128)";
    setTimeout(Input, 1000);
}
function Input(){
    divanswer1 = document.getElementById("answer1");
    divanswer2 = document.getElementById("answer2");
    divanswer1.innerHTML=""; 
    divanswer2.innerHTML="";
    document.getElementById("ans").value="";
    document.getElementById("ans").focus();
    document.getElementById("check").onclick = checking;
}
function checking(evt){
    //alert(regions[mainindex].getAttribute("synonym"));
    
    var input = document.getElementById("ans").value.toLowerCase();
    var synonyms = [];
    synonyms = regions[mainindex].getAttribute("synonym").split(',');
    for (var i = 0; i < synonyms.length; i++) {
        if (input === synonyms[i]){
            divanswer1.style.color = "green";
            divanswer1.innerHTML="Совершенно верно!";
            divanswer2.innerHTML = "Это "+regions[mainindex].getAttribute('rightanswer');
            regions[mainindex].style.fill = "rgb(0, 128, 0)";
            break;
        }
        else {
            if(i == synonyms.length-1 && input != synonyms[i]){
                divanswer1.style.color = "red";
                divanswer1.innerHTML="Вы ошиблись!";
                divanswer2.innerHTML = "Правильный ответ: "+regions[mainindex].getAttribute('rightanswer');
                regions[mainindex].style.fill = "rgb(255, 0, 0)";
                break;
            }
        }
    }
    mainindex++;
    setTimeout(Play, 1000);
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex!==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*function ValueColorclick(click_evt){
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
            synon=[];
            var a = $(this).attr('synonym');
            synon = a.split(",");
            
        }
    }
    //if (flag == true) alert(click_evt.target.id + "," + st1.target.id);
    if (flag == false){
        mass.push(click_evt); 
        var st = click_evt.target.style;
        st.fill = "rgb(128, 128, 128)";
        st.opacity = 1;
        flag = true;
        synon=[];
        var a = $(this).attr('synonym');
        synon = a.split(",");
        
    }
    
    //document.getElementById("answer").focus();
    
    document.getElementById("ans").focus();
    var s = $(this).attr('synonym');
    $("#check").click(check);
    document.getElementById("check").onclick = check;
}*/
/*function check(click_evt){
    var divanswer1 = document.getElementById("answer1");
    var divanswer2 = document.getElementById("answer2");
    divanswer1.innerHTML=""; 
    divanswer2.innerHTML="";
    var input = document.getElementById("ans").value.toLowerCase();
    for (var i = 0; i < synon.length; i++) {
        if (input === synon[i]){
            divanswer1.style.color = "green";
            divanswer1.innerHTML="Совершенно верно";
            mass[0].target.style.fill = "rgb(0, 128, 0)";
            break;
        }
        else {
            if(i == synon.length-1 && input != synon[i]){
                divanswer1.style.color = "red";
                divanswer1.innerHTML="Вы ошиблись!";
                divanswer2.innerHTML = "Правильный ответ: "+mass[0].target.getAttribute('rightanswer');
                mass[0].target.style.fill = "rgb(255, 0, 0)";
            }
        }
    }
    
    alert(evt.attr('synonym'));
    
   
}*/

function ValueColorover(click_evt){
    var st = click_evt.target.style;
    if (st.fill == "none"){
        st.fill = "rgb(128, 128, 0)";
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




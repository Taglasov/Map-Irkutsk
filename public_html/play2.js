/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var flag = false;
var flag_mass= false;
var mass = [];
var synon=[];
var regions = [];
var mainindex = 0;
var countright = 0;
var divanswer1, divanswer2, divresult, res;
var flagtry = 0;
var clickregion;
var flag_answ;
window.onload = function() {
    //localStorage.clear();
    var imap = document.getElementById("imap").contentDocument;
    var reg = imap.getElementsByClassName("region");
    var city = imap.getElementsByClassName("city");
    for (var i = 0; i < reg.length; i++) {
        reg[i].style.fill = "rgb(0, 0, 0)";
        reg[i].style.setProperty("fill-opacity",0,"");
        regions.push(reg[i]);
    }
    for (var i = 0; i<city.length; i++){
        
        regions.push(city[i]);
    }
    
    regions = shuffle(regions);
    divanswer1 = document.getElementById("answer1");
    divanswer2 = document.getElementById("answer2");
    divresult = document.getElementById("result");
    $("#replay").click(goReload);
    $("#menu").click(goMenu);
    
    Play();
};

function Play(){
    if (mainindex==regions.length){
        Result();
    }
    if (flag){
        return;
    }
    flag_answ = false;
    divanswer1.innerHTML="";
    var randomO = document.getElementById("randomObject");
    randomO.innerHTML = regions[mainindex].getAttribute('rightanswer'); 
    document.getElementById("check").onclick = check;
    for (var i = 0; i < regions.length; i++) {
        regions[i].onclick = ValueColorclick;
    };
    document.getElementById("end").onclick = Result;
}

function ValueColorclick(click_evt){
    if (mainindex==regions.length){
        return;
    }
    if (flag){
        return;
    }
    var st1;
    if (flag_mass == true && click_evt.target.style.fill != "rgb(0, 128, 0)" && click_evt.target.style.fill != "rgb(255, 0, 0)"){
        st1 = mass[0];
        if(st1.target.id!=click_evt.target.id){
            if (st1.target.getAttribute("class") == "region"){
                st1.target.style.fill = "rgb(0, 0, 0)";
                st1.target.style.setProperty("fill-opacity",0,"");
            }
            else {
                st1.target.style.fill = "rgb(255, 255, 255)";
                st1.target.style.setProperty("fill-opacity",0.8,"");
            }
            mass.pop();
            mass.push(click_evt);
            click_evt.target.style.fill = "rgb(128, 128, 128)";
            if (click_evt.target.getAttribute("class") == "region"){
                click_evt.target.style.setProperty("fill-opacity",0.3,"");
            }
            else {
                click_evt.target.style.setProperty("fill-opacity",1,"");
            }
            
            
            clickregion = click_evt.target.getAttribute('rightanswer');
        }
    }
    if (flag_mass == false && click_evt.target.style.fill != "rgb(0, 128, 0)" && click_evt.target.style.fill != "rgb(255, 0, 0)"){
        mass.push(click_evt);
        click_evt.target.style.fill = "rgb(128, 128, 128)";
        click_evt.target.style.setProperty("fill-opacity",0.5,"");
        flag_mass = true;
        clickregion = click_evt.target.getAttribute('rightanswer');
    }
    
}

function check(click_evt){
    if (mainindex==regions.length){
        return;
    }
    if (flag){
        return;
    }
    if (flag_mass==false && flag_answ==false){
        divanswer1.style.color = "yellow";
        divanswer1.innerHTML="Вы ничего не выбрали!"; 
        return;
    }
    else if (flag_mass==false && flag_answ){
        return;
    }
    divanswer1.innerHTML=""; 
    if (clickregion == regions[mainindex].getAttribute('rightanswer')){
        divanswer1.style.color = "green";
        divanswer1.innerHTML="Совершенно верно";
        regions[mainindex].style.fill = "rgb(0, 128, 0)";
        countright++;
        if(localStorage.right1<countright || localStorage.right1==undefined){
            localStorage.right1=countright;
        }
        var st1=mass.pop();
        flag_mass=false;
    }
    else{
        divanswer1.style.color = "red";
        divanswer1.innerHTML="Вы ошиблись!";
        regions[mainindex].style.fill = "rgb(255, 0, 0)";
        if(flag_mass == true){
            var st1=mass.pop();
            if (st1.target.getAttribute("class") == "region"){
                st1.target.style.fill = "rgb(0, 0, 0)";
                st1.target.style.setProperty("fill-opacity",0,"");
            }
            else {
                st1.target.style.fill = "rgb(255, 255, 255)";
                st1.target.style.setProperty("fill-opacity",0.8,"");
            }
            flag_mass=false;
        }
    }
    
    if (regions[mainindex].getAttribute("class") == "region"){
        regions[mainindex].style.setProperty("fill-opacity",0.3,"");
    }
    else {
        regions[mainindex].style.setProperty("fill-opacity",0.8,"");
    }
    mainindex++;
    flag_answ=true;
    setTimeout(Play, 2000);
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

function goReload(){
    location.reload();
}
function goMenu(){
    location.href = "start.html";
}

function Result(){
    if(localStorage.right1== undefined) res=countright;
    else res = localStorage.right1;
    divresult.innerHTML = "Результат: вы отгадали "+countright+" из "+mainindex+". Ваш лучший результат: "+res;
    flag=true;
}

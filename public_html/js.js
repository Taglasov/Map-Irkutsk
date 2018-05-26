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
var countright = 0;
var divanswer1;
var divanswer2;
var divresult;
window.onload = function() {
    var imap = document.getElementById("imap").contentDocument;
    var reg = imap.getElementsByClassName("region");
    for (var i = 0; i < reg.length; i++) {
        regions.push(reg[i]);
    }
    regions = shuffle(regions);
    divanswer1 = document.getElementById("answer1");
    divanswer2 = document.getElementById("answer2");
    divresult = document.getElementById("result");
    document.getElementById("start").onclick = Play;
    for (var i = 0; i < reg.length; i++) {
        if (i<mainindex){
            imap.getElementsByClassName("region")[i].onmouseover = Answer;
        }
    }
};

function Play(){
    if (mainindex==regions.length) {
        Result();
    }
    divanswer1.innerHTML=""; 
    divanswer2.innerHTML="";
    document.getElementById("ans").value="";
    regions[mainindex].style.fill = "rgb(128, 128, 128)";
    regions[mainindex].style.opacity = 0.3;
    document.getElementById("end").onclick = Result;
    setTimeout(Input, 1000);
}
function Input(){
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
            regions[mainindex].style.opacity = 0.3;
            countright++;
            break;
        }
        else {
            if(i == synonyms.length-1 && input != synonyms[i]){
                divanswer1.style.color = "red";
                divanswer1.innerHTML="Вы ошиблись!";
                divanswer2.innerHTML = "Правильный ответ: "+regions[mainindex].getAttribute('rightanswer');
                regions[mainindex].style.fill = "rgb(255, 0, 0)";
                regions[mainindex].style.opacity = 0.3;
                break;
            }
        }
    }
    mainindex++;
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

function Result(){
    divresult.innerHTML = "Результат: вы отгадали правильно "+countright+" из "+mainindex;
}

function Answer(){
    
}






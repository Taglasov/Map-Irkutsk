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
var divanswer1, divanswer2, divresult, res;
var flagtry = 0;
window.onload = function() {
    //localStorage.clear();
    var imap = document.getElementById("imap").contentDocument;
    var reg = imap.getElementsByClassName("region");
    var city = imap.getElementsByClassName("city");
    for (var i = 0; i < reg.length; i++) {
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
    
    for (var i = 0; i < regions.length; i++) {
        if (i<mainindex){
            regions[i].onmousemove = Helpon;
            regions[i].onmouseout = Helpoff;
        }
    }
    if (mainindex==regions.length){
        Result();
    }
    if (flag){
        return;
    }
    divanswer1.innerHTML="";
    divanswer2.innerHTML="";
    document.getElementById("ans").value="";
    regions[mainindex].style.fill = "rgb(128, 128, 128)";
    if (regions[mainindex].getAttribute("class") == "region"){
        regions[mainindex].style.opacity = 0.3;
    }
    if (regions[mainindex].getAttribute("class") == "city"){
        regions[mainindex].style.opacity = 1;
    }
    document.getElementById("end").onclick = Result;
    
    setTimeout(Input, 1000);
    
}

function Input(){
    document.getElementById("ans").focus();
    document.getElementById("check").onclick = checking;
}
function checking(evt){
    if (flag)
        return;
    var clas = regions[mainindex].getAttribute("class");
    var input = document.getElementById("ans").value.toLowerCase();
    var synonyms = [];
    synonyms = regions[mainindex].getAttribute("synonym").split(',');
    for (var i = 0; i < synonyms.length; i++) {
        if (levenshtein(input, synonyms[i])==0 && flagtry==0){
            divanswer1.style.color = "green";
            divanswer1.innerHTML="Совершенно верно!";
            divanswer2.innerHTML = "Это "+regions[mainindex].getAttribute('rightanswer');
             switch(clas){
                case "region": {
                    regions[mainindex].style.fill = "rgb(0, 128, 0)";
                    regions[mainindex].style.opacity = 0.3;
                }
                break;
                case "city": {
                    regions[mainindex].style.fill = "rgb(0, 128, 0)";
                    regions[mainindex].style.opacity = 0.6;
                } 
                break;
            }
            flagtry = 0;
            countright++;
            if(localStorage.right<countright || localStorage.right==undefined){
                localStorage.right=countright;
            }
            break;
        }
        else if (levenshtein(input, synonyms[i])>0 && levenshtein(input, synonyms[i])<4 && flagtry<3){
            divanswer1.style.color = "orange";
            divanswer1.innerHTML="Вы написали с ошибкой. Попробуйте еще раз!";
            divanswer2.innerHTML="Количество ошибок: "+levenshtein(input, synonyms[i]);
            divanswer2.innerHTML+=". Осталось попыток: "+(3-flagtry);
            flagtry++;
            document.getElementById("ans").focus();
            return;
        }
        else if (levenshtein(input, synonyms[i])==0 && flagtry>0 && flagtry<3){
            divanswer1.style.color = "orange";
            divanswer1.innerHTML="Вы отгадали!";
            divanswer2.innerHTML = "Это "+regions[mainindex].getAttribute('rightanswer');
             switch(clas){
                case "region": {
                    regions[mainindex].style.fill = "rgb(255, 128, 0)";
                    regions[mainindex].style.opacity = 0.3;
                }
                break;
                case "city": {
                    regions[mainindex].style.fill = "rgb(255, 128, 0)";
                    regions[mainindex].style.opacity = 0.6;
                } 
                break;
            }
            countright++;
            if(localStorage.right<countright || localStorage.right==undefined){
                localStorage.right=countright;
            }
            flagtry = 0;
            break;
        }
        
        
        else {
            if(i == synonyms.length-1 && input != synonyms[i] || flagtry==3){
                divanswer1.style.color = "red";
                divanswer1.innerHTML="Вы ошиблись!";
                divanswer2.innerHTML = "Правильный ответ: "+regions[mainindex].getAttribute('rightanswer');
                switch(clas){
                    case "region": {
                        regions[mainindex].style.fill = "rgb(255, 0, 0)";
                        regions[mainindex].style.opacity = 0.3;
                    }
                    break;
                    case "city": {
                        regions[mainindex].style.fill = "rgb(255, 0, 0)";
                        regions[mainindex].style.opacity = 0.6;
                    } 
                    break;
                }
                flagtry = 0;
                break;
            }
        }
    }
    mainindex++;
    if (mainindex==regions.length) {
        flag=true;
    }
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

function Helpon(click_evt){
    document.getElementById("help").innerHTML=click_evt.target.getAttribute('rightanswer');
    if (click_evt.target.getAttribute("class") == "region"){
        click_evt.target.style.opacity = 0.5;
    }
    else click_evt.target.style.opacity = 0.8;
    $("#help").show();
    $("#help").css('left',(click_evt.pageX+20)+'px').css('top',(click_evt.pageY+20)+'px');  
    
    //alert(click_evt.target.getAttribute('rightanswer'));
}
function Helpoff(click_evt){
    if (click_evt.target.getAttribute("class") == "region"){
        click_evt.target.style.opacity = 0.3;
    }
    else click_evt.target.style.opacity = 0.6;
    $("#help").hide();
}

function Result(){
    if(localStorage.right== undefined) res=countright;
    else res = localStorage.right;
    divresult.innerHTML = "Результат: вы отгадали "+countright+" из "+mainindex+". Ваш лучший результат: "+res;
    flag=true;
}

function goReload(){
    location.reload();
}
function goMenu(){
    location.href = "start.html";
}

function levenshtein(s1, s2){
    var m = s1.length;
    var n = s2.length;
    var D = [];
    for (var i = 0; i <= m; i++) {
        D[i]=[];
    }
    D[0][0] = 0;
    for (var i = 1; i <= n; i++) {
        D[0][i]=i;
    }
    for (var i = 1; i <= m; i++) {
        D[i][0]=i;
        for (var j = 1; j <= n; j++) {
            var cost = (s1.charAt(i - 1) != s2.charAt(j - 1)) ? 1 : 0;
            D[i][j]=Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + cost);
        }
    }
    return D[m][n];
}





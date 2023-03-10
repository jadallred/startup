var bubble1_hg;
var hole1_hg;
var bubble2_hg;

setInterval(() => {
    bubble1_hg=Math.floor(Math.random()*10)+30;
    hole1_hg=Math.floor(Math.random()*20)+20;
    document.getElementById("bubble1").style.height=bubble1_hg+"%";
    document.getElementById("bubble2").style.top=bubble1_hg+hole1_hg+"%";
    document.getElementById("bubble2").style.height=100-(bubble1_hg+hole1_hg)+"%";

}, 4000);

var elem=document.getElementById("bird");

//gravity functionality

setInterval(() => {
    var x=parseInt(window.getComputedStyle(elem).getPropertyValue("top"));
    if(x<=510){
        elem.style.top=(x+3)+"px";
    }
    else{
        alert("You Lost !! your score is: "+score);
        elem.style.top=100+"px";
        window.location.reload();
    }
}, 30);


//fly functionality

function jump(){
    var fly=parseInt(window.getComputedStyle(elem).getPropertyValue("top"));
    if(fly>=14){
        elem.style.top=(fly-40)+"px";
    }
}

document.addEventListener('keyup', event =>{
    if(event.code==='Space'){
        jump();
    }
})


//score functionality

var score=0;
setInterval(() => {
    score++;
    document.getElementById("scr").innerHTML=score;
}, 500);


//obstacle functionality

function checkcollision(elm1,elm2){
    var elm1Rect=elm1.getBoundingClientRect();
    var elm2Rect=elm2.getBoundingClientRect();

    return(elm1Rect.right >= elm2Rect.left && 
        elm1Rect.left <= elm2Rect.right) && 
        (elm1Rect.bottom>=elm2Rect.top && 
            elm1Rect.top<=elm2Rect.bottom);
}

setInterval(() => {
    if(checkcollision(document.getElementById("narwhal"),document.getElementById("bubble1"))){
        elem.style.top=513+"px";
        setTimeout(() => {
            alert("You Lost !! Your Score is: "+score);
            return;
        }, 10);
        window.location.reload();
    }
    else if(checkcollision(document.getElementById("narwhal"),document.getElementById("bubble2"))){
        elem.style.top=513+"px";
        setTimeout(() => {
            alert("You Lost!! Your Score is: "+score);
            return;
        }, 10);
        window.location.reload();
    }
}, 100);



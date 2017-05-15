/**
 * Created by 裘银威 on 2017/5/11.
 */
//var WINDOW_WIDTH = 1024;
//var WINDOW_HEIGHT = 768;
//var RADIUS = 6;
//var MARGIN_TOP = 60;
//var MARGIN_LEFT = 130;
const colors = ["#33b5e5", "#09c", "#a6c", "#93c","#9c0", "#690", "#fb3", "#f80", "#f44", "#c00"];
var balls=[];

const endTime = new Date(2017, 4, 14, 21, 00, 00);                          //设置的结束时间
var curShowTimeSeconds = 0;                                                //初始化倒计时的时间长
window.onload = function(){

    WINDOW_HEIGHT = document.body.clientHeight;
    WINDOW_WIDTH = document.body.clientWidth;
    MARGIN_LEFT = Math.floor(WINDOW_WIDTH/10);
    RADIUS = Math.floor(WINDOW_WIDTH*4/5/108)-1;
    MARGIN_TOP = Math.floor(WINDOW_HEIGHT/5);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(
        function(){
            render(context);                                                    //画球
            update();                                                           //运动
        },
        50
    );
}
//获得倒计时时间
function getCurrentShowTimeSeconds(){
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret/1000);                                                 //getTime获得的时长单位是毫秒
    return ret > 0 ? ret : 0;
}
//倒计时时间动画
function update(){
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
    var seconds = curShowTimeSeconds % 60;

    if(nextSeconds != seconds){
        if(parseInt(nextHours/10) != parseInt(hours/10)){
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10));
        }
        if(parseInt(nextHours%10) != parseInt(hours%10)){
            addBalls(MARGIN_LEFT + 15 *(RADIUS+1), MARGIN_TOP, parseInt(hours%10));
        }
        if(parseInt(nextMinutes/10) != parseInt(minutes/10)){
            addBalls(MARGIN_LEFT + 39 *(RADIUS+1), MARGIN_TOP, parseInt(minutes/10));
        }
        if(parseInt(nextMinutes%10) != parseInt(minutes%10)){
            addBalls(MARGIN_LEFT + 54 * (RADIUS+1), MARGIN_TOP, parseInt(minutes%10));
        }
        if(parseInt(nextSeconds/10) != parseInt(seconds/10)){
            addBalls(MARGIN_LEFT + 78 * (RADIUS+1), MARGIN_TOP, parseInt(seconds/10));
        }
        if(parseInt(nextSeconds%10) != parseInt(seconds%10)){
            addBalls(MARGIN_LEFT + 94 * (RADIUS+1), MARGIN_TOP, parseInt(seconds%10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updataBalls();
    //console.log(balls.length);
}

function updataBalls(){
    for(var i = 0; i<balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }
    var cnt = 0;
    for(var i = 0; i<balls.length; i++){
        if(balls[i].x > WINDOW_WIDTH + RADIUS || balls[i].x < -RADIUS){
            balls.splice(i, 1);
        }
    }
}

//添加掉落的小球
function addBalls(x, y, num){
    for(var i = 0; i<digit[num].length; i++){
        for(var j = 0; j<digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                var aBall = {
                    x: x+RADIUS+1+(RADIUS+1)*2*j,
                    y: y+RADIUS+1+(RADIUS+1)*2*i,
                    g: 1.5+Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random()*10))*6,
                    vy: -5,
                    color: colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}

//显示时间数字
function render( cxt ){

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);                               //没有的话每秒的数字会重叠

    var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
    var seconds = curShowTimeSeconds % 60;

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cxt);
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), cxt);
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), cxt);
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), cxt);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), cxt);

    for(var i = 0; i<balls.length; i++){
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI);
        cxt.closePath();

        cxt.fill();
    }
}
//根据多维数组digit通过圆点画数字
function renderDigit(x, y, num, cxt){

    cxt.fillStyle = "blue";

    for(var i = 0; i<digit[num].length; i++){
        for(var j = 0; j<digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.arc( x+RADIUS+1+(RADIUS+1)*2*j, y+RADIUS+1+(RADIUS+1)*2*i, RADIUS, 0, 2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
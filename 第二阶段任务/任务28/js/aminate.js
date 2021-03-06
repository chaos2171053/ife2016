define(['transmit','man','transmit','util'],function (transmit,man,transmit,util) {
var SCREEN_WIDTH = 600; //屏幕宽度
var SCREEN_HEIGHT = 600; //屏幕高度
var SCREEN_CENTER_X = SCREEN_WIDTH / 2; //屏幕X轴中心坐标
var SCREEN_CENTER_Y = SCREEN_HEIGHT / 2; //屏幕Y轴中心坐标
var PLANET_RADIUS = 50; //行星半径

var POWERBAR_POS_OFFSET = 5; //电量条位置位移
var POWERBAR_COLOR_GOOD = "#70ed3f"; //电量良好状态颜色
var POWERBAR_COLOR_MEDIUM = "#fccd1f"; //电量一般状态颜色
var POWERBAR_COLOR_BAD = "#fb0000"; //电量差状态颜色
var POWERBAR_WIDTH = 5; //电量条宽度

var ORBIT_COUNT = 4;//轨道数量
var SPACESHIP_SIZE = 40; //飞船大小


//根据浏览器类型设置相应的requestAnimationFrame
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
/**
 * 动画
 */
var AminateUtil = function(){
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;

    

    //画行星
    var drawPlanet = function(){
        //ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);//clear canvas
        var x = SCREEN_CENTER_X - PLANET_RADIUS;
        var y = SCREEN_CENTER_Y - PLANET_RADIUS;
        var planet = new Image();
        planet.src = "img/min-iconfont-planet.png";
        if (planet.complete) {
            ctx.drawImage(planet, x, y, PLANET_RADIUS * 2, PLANET_RADIUS * 2);
        } 
        else {
            planet.onload = function () {
                ctx.drawImage(planet, x, y, PLANET_RADIUS * 2, PLANET_RADIUS * 2);
                planet.onload = null;
            };
        }
        
    };

    //画4条轨道
    var drawOrbits = function(){
        for (var i = 0; i < ORBIT_COUNT ;i++) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#113A58";
            ctx.beginPath();
            ctx.arc(SCREEN_CENTER_X, SCREEN_CENTER_Y, 100 + 60 * i, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };

    /**
     * 画飞船
     * @param  {array} spaceships 飞船队列
     */
     var drawSpaceships = function(spaceship){
        var spaceshipImg = new Image(); //创建飞船贴图
        spaceshipImg.src = "img/min-iconfont-rocket-active.png";
        var drawing = function(){
            ctx.save(); //保存画布原有状态
            ctx.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y); //将画布坐标原点移到画布中心
            ctx.rotate(-spaceship.deg * Math.PI / 180); //根据飞船飞行角度进行画布选择
            ctx.beginPath();
            if (spaceship.power > 60) {
                ctx.strokeStyle = POWERBAR_COLOR_GOOD;
            } else if (spaceship.power <= 60 && spaceship.power >= 20) {
                ctx.strokeStyle = POWERBAR_COLOR_MEDIUM;
            } else {
                ctx.strokeStyle = POWERBAR_COLOR_BAD;
            }
            ctx.lineWidth = POWERBAR_WIDTH;
            ctx.moveTo(spaceship.orbit, -POWERBAR_POS_OFFSET);
            ctx.lineTo(spaceship.orbit + SPACESHIP_SIZE * (spaceship.power / 100), -POWERBAR_POS_OFFSET);
            ctx.stroke();
            ctx.drawImage(spaceshipImg, spaceship.orbit, 0, SPACESHIP_SIZE, SPACESHIP_SIZE); //画飞船贴图
            ctx.restore(); //恢复画布到原有状态
        };
        
        //利用image对象的complete属性让图片完全加载完才在canvas上绘制
        if (spaceshipImg.complete) {
            drawing();
        } 
        else {
            spaceshipImg.onload = function () {
                drawing();
                spaceshipImg.onload = null;
            };
        }
    };

    /**
     * 绘制飞船队列
     * @param  {array} spaceships 飞船队列
     * @return {bollean}    判断结果       
     */
    var onDraw = function(spaceships,stateCode){

        if (spaceships.length != 0) {
            ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT); // clear canvas
            drawPlanet();
            drawOrbits();
                for (var i = 0; i < spaceships.length; i++) { //绘制飞船
                    if (spaceships[i]) {
                        drawSpaceships(spaceships[i]);
                    }
                }
                updateScreen(stateCode);//在屏幕上更新飞船信息
                return true;
            } 
        else {
            ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT); // clear canvas
            drawPlanet();
            drawOrbits();
            return false;
        }
    };

    /**
     * 在屏幕上更新飞船信息
     * @param {object} stateCode 所有飞船的飞行状态信息
     */
    var updateScreen = function(stateCode){
        
        for(var i = 0,len = stateCode.length;i<len;i++){
            if(stateCode[i]){
                var content = "";
                content += "<td>" + stateCode[i].id + "号</td><td>" + stateCode[i].currState 
                + "</td><td>" + stateCode[i].speed + "</td><td>" + stateCode[i].dynamicSystem
                + "</td><td>" + stateCode[i].power +"</td>";            
                var j = i + 1;
                $('table tr:eq('+j+')').html(content);
                j = 0;  
                content = "";             
            }
            else{
                var content = "";
                content += "<td>" + i + "号</td><td>未发射</td><td>----"
                +"</td><td>----</td><td>----</td>";
                var k = i + 1;
                $('table tr:eq('+k+')').html(content);
                k = 0;  
                content = ""; 
            }   
        }
    };


    /**
     * 动画循环
     */
    var animLoop = function(){
        requestAnimationFrame(animLoop);
        onDraw(bus.getSpaceships(),stateCode);
    };

    return {
        animLoop: animLoop,
        drawPlanet :drawPlanet,
        drawOrbits :drawOrbits 
    };
};

return {
	AminateUtil:AminateUtil  
};
});
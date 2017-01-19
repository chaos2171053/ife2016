require.config({
	paths: {
		"transmit": "transmit",
		"man": "man",
		"util":"util",
		"aminate":"aminate",
		"adapter":"adapter"
	},
});

var liCount = 0;//记录li条数，最多显示12条
var commander,bus;//指挥官、Bus传播介质
var stateCode = [];//所有飞船的飞行状态信息
require(['man','transmit','util','aminate'], function (man,transmit,util,aminate){
    commander = new man.Commander();
    bus = new transmit.Bus(); 
	bus.register(commander);
	util.controlSpaceship(commander);
	aminate.AminateUtil().animLoop();
});
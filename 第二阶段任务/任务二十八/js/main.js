require.config({
	paths: {
	    // "jquery": "../../../libs/jquery-3.1.1.min",
		"transmit": "transmit",
		"man": "man",
		"util":"util",
		"aminate":"aminate"
	},
});

var liCount = 0;////记录li条数，最多显示12条
var commander,bus;
require(['man','transmit','util','aminate'], function (man,transmit,util,aminate){
    commander = new man.Commander();
    bus = new transmit.Bus(); 
	bus.register(commander);
	util.controlSpaceship(commander);
	aminate.AminateUtil().animLoop();
});
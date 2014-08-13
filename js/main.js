Q
.config({
	baseUrl : 'js/app/',
	paths : {
		'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
		'a1': 'app1',
		'a2': 'app2'
	}
})
.require([
	'jquery',
	'a1',
	'app2'
],function(App1,App2){
	$('document').ready(function(){
		App1.init();
		App2.init();
	});
});
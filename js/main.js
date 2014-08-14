Q
.config({
	baseUrl : 'js/',
	paths : {
		'jquery': ['clibs/jquery-1.9.1.min.js','//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'],
		'a1': 'app/app1',
		'a2': 'app/app2'
	}
}).set({
	'$': 'jquery',
	'app1': 'a1',
	'app2': 'a2'
},function(App){
	$('document').ready(function(){
		App.$body = $('body');
		App.app2.init();
	});
	
});
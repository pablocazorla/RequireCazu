req({
	baseUrl : 'js/app/',
	paths : [
	'//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
	'app1',
	'app2'
	],
	action: function(App1,App2){
		$('document').ready(function(){
			App1.init();
			App2.init();
		});		
	}
});
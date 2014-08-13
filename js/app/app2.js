Q.define(function(App){
	return {
		init : function(){
			console.log('Inicio App2');
			App.app1.init();
		}
	}
});
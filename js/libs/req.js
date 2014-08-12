;(function(){
	var formatUrl = function(url,baseUrl){
			var url = url || '',
				baseUrl = baseUrl || '';
			if(url.indexOf('.js') == -1){url += '.js';}
			if(url.indexOf('//') == -1){url = baseUrl+url;}
			return url;
		},
		addScript = function(url,callback){
			var callback = callback || function(){},
				s = document.createElement('script');
			s.setAttribute('type','text/javascript');
			s.setAttribute('async','true');
			s.setAttribute('src',url);
			document.body.appendChild(s);
			s.addEventListener('load', callback,false);
		},
		lib;

	/************************************************/
	window.req = function(cfg){
		lib = [];

		var i = 0,
			l = cfg.paths.length,
			loadScripts = function(){
				if(i<l){
					addScript(formatUrl(cfg.paths[i],cfg.baseUrl),function(){
						loadScripts();
						showReloj('Loaded '+i);
					});
					i++;
				}else{
					cfg.action.apply(this, lib);
					//cfg.action();
				}
			};
		loadScripts();
	};
	window.d = function(obj){
		lib.push(obj);
	};

	// Init Main
	addScript(formatUrl(document.currentScript.getAttribute('data-main')));
})();
showReloj('Loaded REQ');
var Q = {
	cfg : {},
	definitions : [],
	initialized : false,	
	config : function(obj){
		this.cfg = this._extend(this.cfg,obj);
		return this;
	},
	set : function(requeriments,callback){
		this.definitions = [];
		this.app = {};
		var	elems = [],
			routes = [];
		for(var a in requeriments){
			elems.push(a);
			routes.push(requeriments[a]);
		};
		var self = this,
			i = 0,			
			l = routes.length,
			loadScripts = function(){
				if(i<l){
					var u = self.cfg.paths[routes[i]] || routes[i];
					self._addScript(self._formatUrl(u),function(){
						if(self.definitions.length<i){
							self.define(function(){return {}});
						};
						loadScripts();
					});
					i++;
				}else{
					var lb = self.definitions.length;
					for(var ib = 0;ib<lb;ib++){
						self.app[elems[ib]] = self.definitions[ib];
					}
					callback.apply(this, [self.app]);
				}
			};
		loadScripts();
	},
	define : function(fn){
		var self = this,
			obj = fn.apply(this, [self.app]);
		this.definitions.push(obj);
		return this;
	},
	_init : function(){
		if(!this.initialized){
			this._reset()._addScript(this._formatUrl(document.currentScript.getAttribute('data-main')));
		}
		return this;
	},
	_reset : function(){
		this.cfg = {
			baseUrl : '',
			sufix : 'js',
			paths : {}
		}
		this.definitions = [];
		return this;
	},
	_formatUrl : function(url){
		if(typeof url == 'string'){
			var url = [url];
		}
		var newUrl = [];
		for(var i = 0;i<url.length;i++){
			if(url[i].indexOf('.'+this.cfg.sufix) == -1){url[i] += '.'+this.cfg.sufix;}
			if(url[i].indexOf('//') == -1){
				url[i] = this.cfg.baseUrl+url[i];
			}
			newUrl.push(url[i]);
		}	
		return newUrl;
	},
	_addScript : function(url,callback){
		var callback = callback || function(){},
			i = 0, s,
			loadScript = function(){
				s = document.createElement('script');
				s.type = 'text/javascript';
				s.async = true;
				s.src = url[i];
				document.body.appendChild(s);
				s.addEventListener('load', callback,false);
				s.addEventListener('error', function(){
					console.log('error');
					document.body.removeChild(s);
					i++;
					if(i<url.length){
						loadScript();	
					}else{
						callback();
					}
				},false);
			};
		loadScript();
	},
	_extend : function(destination, source) {
		for (var property in source) {
			if (source[property] && source[property].constructor && source[property].constructor === Object) {
				destination[property] = destination[property] || {};
				arguments.callee(destination[property], source[property]);
			}else{
				destination[property] = source[property];
			}
		}
		return destination;
	}
};
Q._init();
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
			paths : {}
		}
		this.definitions = [];
		return this;
	},
	_formatUrl : function(url){
		if(url.indexOf('.js') == -1){url += '.js';}
		if(url.indexOf('//') == -1){url = this.cfg.baseUrl+url;}
		return url;
	},
	_addScript : function(url,callback){
		var callback = callback || function(){},
			s = document.createElement('script');
		s.setAttribute('type','text/javascript');
		s.setAttribute('async','true');
		s.setAttribute('src',url);
		document.body.appendChild(s);
		s.addEventListener('load', callback,false);
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
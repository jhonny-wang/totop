;(function(exports){

	/*选择器*/
	function $$(id){
		return document.getElementById(id);
	}

	/*事件处理程序*/
	function addHandler(ele,type,fn){
		if(ele.addEventListener){
			ele.addEventListener(type,fn,false);
		}else if(ele.attachEvent){
			ele.attachEvent("on"+type,fn);
		}
	}

	/*自定义的ToTop类型*/
	var ToTop = function(params){

		if(!params) return;

		/*common*/
		this.id = $$(params.id);
		this.visible = false;
		
		/*options*/
		this.options = {
			height : params.height ? params.height : 200,
			speed : params.speed ? params.speed : 65
		}

		this.init();
	}
	
	ToTop.prototype = {
		scroltotop : function(){
			var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
			this.recursion(scrolltop);
		},
		recursion : function(scrolltop){
			var self = this;
			setTimeout(function(){
				scrolltop = Math.floor(scrolltop*self.options.speed/100);
				window.scrollTo(0,scrolltop);
				if(scrolltop != 0){
					setTimeout(arguments.callee,25);
				}
			},25);
		},
		setopacity : function(elem,opy){
			if(elem.filters && elem.filters.alpha){
				return elem.style.filter = "alpha(opacity=opy)";
			}else{
				return elem.style.opacity = opy/100;
			}
		},
		setCss : function(){
			this.id.style.display = "block";
			this.id.style.opacity = 0;
		},
		fadein : function(){
			var self = this;
			var opacity = self.id.style.opacity = 0;
			setTimeout(function(){
				if(opacity > 1){
					self.id.style.opacity = 1;
					return;
				}else{
					opacity = opacity + 0.1;
					self.id.style.opacity = opacity;
					setTimeout(arguments.callee,25);
				}
			},25)
		},
		fadeout : function(){
			self = this;
			var opacity = self.id.style.opacity = 1;
			setTimeout(function(){
				if(opacity < 0){
					self.id.style.opacity = 0;
					return;
				}else{
					opacity = opacity - 0.1;
					self.id.style.opacity = opacity;
					setTimeout(arguments.callee,25);
				}
			})
		},
		scrol : function(){
			var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
			if(scrolltop > this.options.height){
				if(!this.visible){
					this.fadein();
					this.visible = true;
				}
			}else{
				if(this.visible){
					this.fadeout();
					this.visible = false;
				}
			}
		},
		init : function(){
			var self = this;
			self.setCss();
			addHandler(self.id,"click",function(){self.scroltotop();})
			addHandler(window,"scroll",function(){self.scrol()});
		}
	}
	exports.ToTop = ToTop;
})(window);
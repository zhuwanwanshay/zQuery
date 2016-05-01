var ZQObject = function(){ 
	this.data = [];
}

ZQObject.prototype = { 
	size : function (){ 
		return this.data.length;
	},
	html : function (content){ 
		if(content){ 
			for(var i = 0; i < this.data.length; i++){ 
				this.data[i].innerHTML = content;
			}
			return this;
		}else{ 
			if(this.data.length != 0){ 
				return this.data[0].innerHTML;
			}
			return;
		}
	},
	text : function (){ 
		if(window.navigator.userAgent.toLowerCase().indexOf("firefox")!=-1){ 
			for(var i = 0; i < this.data.length; i++){ 
				this.data[i].innerText;
			}
			return this;
		}else{ 
			for(var i = 0; i < this.data.length; i++){ 
				this.data[i].textContent;
			}
			return this;
		}		
	},
	val : function (value){ 
		if(value){ 
			for(var i = 0; i < this.data.length; i++) { 
				this.data[i].value = value;
			}
			return this;
		}else{ 
			if(this.data.length != 0){ 
				return this.data[0].value;
			}
		}
	},
	attr : function (name,value){ 
		if( name && value){ 
			for(var i = 0; i < this.data.length; i++){ 
				this.data[i].setAttribute(name,value);
			}
			return this;
		}else if( name ){ 
			if(this.data.length != 0){ 
				return this.data[0].getAttribute(name);
			}
		}
	},
	addClass : function(className){ 
		for(var i = 0; i < this.data.length; i++){ 
			var elem = this.data[i];
			if(elem.getAttribute("class")){ 
				var oldClassName = elem.getAttribute("class");
				var newClassName = oldClassName + " " + className; 
				elem.setAttribute("class",newClassName);
			}else{ 
				elem.setAttribute("class",className);
			}
		}
		return this;
	},
	removeClass : function(className){ 
		if(className){ 
			for(var i = 0; i < this.data.length; i++){ 
				var arr = this.data[i].getAttribute("class").split(" ");
				var newClassName = "";
				for ( var j = 0; j < arr.length; j++){ 
					if( arr[j] == className){ 
						continue;
					}
					newClassName += arr[j] + " ";
				}
				newClassName = newClassName.substring(0,newClassName.length-1);
				this.data[i].setAttribute("class",newClassName);
			}
			return this;
		}else{ 
			for(var i = 0; i < this.data.length; i++){ 
				this.data[i].setAttribute("class","");
			}
			return this;
		}
	}
}
var $ = function(selector){ 
	this.zqObject = new ZQObject();
	if( selector.substring(0,1) == '#'){ 
		var elem = document.getElementById(selector.substring(1));
		this.zqObject.data.push(elem);
	}else if( selector.substring(0,1)=='.'){ 
		var className = selector.substring(1);
		var reg = new RegExp('(^|\\s)'+className+'($|\\s)');
		var elems = document.getElementsByTagName('*');
		for (var i = 0; i < elems.length; i++){ 
			if(reg.test(elems[i].className)){ 
				this.zqObject.data.push(elems[i]);
			}
		}
	}else{ 
		var elems = document.getElementsByTagName(selector);
		this.zqObject.data = elems;
	}
	return zqObject;
}
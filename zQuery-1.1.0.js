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
	},
	append : function(zqObject){ 
		var srcElem = this.data[0];
		var tarElem = zqObject.data[0];
		srcElem.appendChild(tarElem);
		return this;
	},
	appendTo : function(zqObject){ 
		var srcElem = zqObject.data[0];
		var tarElem = this.data[0];
		srcElem.appendChild(tarElem);
		return this;
	},
	insertBefore : function(zqObject){ 
		var newElem = this.data[0];
		var oldElem = zqObject.data[0];
		var parentElem = oldElem.parentNode;
		parentElem.insertBefore(newElem,oldElem);
		return this;
	},
	remove :function(){ 
		var removeElem = this.data[0];
		var parentElem = removeElem.parentNode;
		parentElem.removeChild(removeElem);
	},
	slideUp : function(speed){
		var s = speed || 300;
		var elem = this.data[0];
		var height = elem.offsetHeight;
		var oldh = height;
		var l = 30 / s * height; 
		var interval = setInterval(function(){ 
				height -= l;
				elem.style.height = height + "px";
				if( height<=0){ 
					elem.style.display = "none";
					elem.style.height = oldh + "px";
					clearInterval(interval);

				}
			},30);
	},
	slideDown : function(speed){ 
		var elem = this.data[0];
		var height = parseInt(elem.style.height);
		var s = speed || 300;
		var l = 30/s*height;
		elem.style.height = 0+"px";
		elem.style.display = "block";
		var interval = setInterval(function(){ 
			elem.style.height = (elem.offsetHeight+l)+"px";
			if( elem.offsetHeight >= height){ 
				elem.style.height = height +"px";
				clearInterval(interval);
			}
		},30);
	},
	hide : function(speed){ 
		var elem = this.data[0];
		var height = elem.offsetHeight;
		var width = elem.offsetWidth;
		var s = speed || 300;
		var h = 30 / s * height;
		var w = 30 / s * width;
		var oldH = height;
		var oldW = width;
		var interval = setInterval(function(){ 
			height -= h;
			width -=w;
			elem.style.height = height + "px";
			elem.style.width = width + "px";
			if( height <= 0 || width <= 0){ 
				clearInterval(interval);
				elem.style.display = "none";
				elem.style.height = oldH + "px";
				elem.style.width = oldW + "px";
			}
		},30);
	},
	show : function(speed){ 
		var elem = this.data[0];
		var height = parseInt(elem.style.height);
		var width = parseInt(elem.style.width);
		var s = speed || 300;
		var h = 30 / s * height;
		var w = 30 / s * width;
		elem.style.height = 0 + "px";
		elem.style.width = 0 + "px";
		elem.style.display = "block";
		var interval = setInterval(function(){ 
			elem.style.height = (elem.offsetHeight + h) + "px";
			elem.style.width = (elem.offsetWidth + w) + "px";
			if( elem.offsetHeight >= height || elem.offsetWidth >= width){ 
				elem.style.height = height + "px";
				elem.style.width = width + "px";
				clearInterval(interval);
			}
		},30);
	},
	fadeOut : function (speed){ 
		var s = speed || 300;
		var elem = this.data[0];
		var op = 100;
		var l = 30 / s * op;
		var interval = setInterval(function(){ 
			op -= l;
			//window.getComputedStyle(elem).opacity = op/100;
			elem.style.opacity = op/100;
			if(op <= 0){ 
				elem.style.display = "none";
				clearInterval(interval);
			}
		},30);
	},
	fadeIn : function(speed){ 
		var s = speed || 300;
		var elem = this.data[0];
		var l = 30 / s * 100;
		var op = 0;
		elem.style.opacity = 0;
		elem.style.display = "block";
		var interval = setInterval(function(){ 
			op += l;
			elem.style.opacity = op/100;
			if(op >= 100){
				elem.style.opacity = 1;
				elem.style.display = "block";
				clearInterval(interval);
			}
		},30);
	},
	bind : function(eventName,fn){ 
		for( var i = 0; i < this.data.length; i++){ 
			var elem = this.data[i];
			elem.addEventListener(eventName,fn,false);
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
	}else if( selector.indexOf('<') == 0 && selector.lastIndexOf('>') == selector.length-1){ 
		var elem = selector.substring(1,selector.indexOf('>'));
		var newElem = document.createElement(elem);
		var content = selector.substring( selector.indexOf('>')+1 ,selector.lastIndexOf('<'));
		newElem.innerHTML = content;
		this.zqObject.data.push(newElem);
	}else{ 
		var elems = document.getElementsByTagName(selector);
		this.zqObject.data = elems;
	}
	
	return zqObject;
}
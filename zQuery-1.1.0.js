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
	if( selector.indexOf('<') == 0 && selector.lastIndexOf('>') == selector.length-1){ 
		var elem = selector.substring(1,selector.indexOf('>'));
		var newElem = document.createElement(elem);
		var content = selector.substring( selector.indexOf('>')+1 ,selector.lastIndexOf('<'));
		newElem.innerHTML = content;
		this.zqObject.data.push(newElem);
	}
	return zqObject;
}
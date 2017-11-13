var utils = (function() {
	 return {
		addEventListener: function (el, type, fn) {
			if (typeof window.addEventListener === 'function') {
				el.addEventListener(type, fn, false);
			} else if (typeof document.attachEvent === 'function') { // IE
				el.attachEvent('on' + type, fn);
			} 
		},
		removeEventListener: function (el, type, fn) {
			if (typeof window.removeEventListener === 'function') {
				el.removeEventListener(type, fn, false);
			} else if (typeof document.detachEvent === 'function') { // IE
				el.detachEvent('on' + type, fn);
			} 
		},
		setTextContent : function (element,value) {
			if(typeof element.innerText != "undefined")
				element.innerText = value;
			else
				element.textContent = value;
		},
		getTextContent : function (element,value) {
			if(typeof element.innerText != "undefined")
				return  element.innerText ;
			else
				return element.textContent;
		}
		         		
	}
})();
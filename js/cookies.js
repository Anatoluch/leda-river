(function (window, undefined){
	"use strict";

	var document = window.document;

	function log() {
		if (window.console && window.console.log) {
			for (var x in arguments) {
				if (arguments.hasOwnProperty(x)) {
					window.console.log(arguments[x]);
				}
			}
		}
	}

	function AcceptCookie() {
		if (!(this instanceof AcceptCookie)) {
			return new AcceptCookie();
		}

		this.init.call(this);

		return this;
	}

	AcceptCookie.prototype = {

		init: function () {
			var self = this;

			if(self.readCookie('pjAcceptCookie') == null)
			{
				self.appendCss();
				self.addCookieBar();
			}

			var clear_cookie_arr = self.getElementsByClass("pjClearCookie", null, "a");
			if(clear_cookie_arr.length > 0)
			{
				self.addEvent(clear_cookie_arr[0], "click", function (e) {
					if (e.preventDefault) {
						e.preventDefault();
					}
					self.eraseCookie('pjAcceptCookie');
					document.location.reload();
					return false;
				});
			}
		},
		getElementsByClass: function (searchClass, node, tag) {
			var classElements = new Array();
			if (node == null) {
				node = document;
			}
			if (tag == null) {
				tag = '*';
			}
			var els = node.getElementsByTagName(tag);
			var elsLen = els.length;
			var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
			for (var i = 0, j = 0; i < elsLen; i++) {
				if (pattern.test(els[i].className)) {
					classElements[j] = els[i];
					j++;
				}
			}
			return classElements;
		},
		addEvent: function (obj, type, fn) {
			if (obj.addEventListener) {
				obj.addEventListener(type, fn, false);
			} else if (obj.attachEvent) {
				obj["e" + type + fn] = fn;
				obj[type + fn] = function() { obj["e" + type + fn](window.event); };
				obj.attachEvent("on" + type, obj[type + fn]);
			} else {
				obj["on" + type] = obj["e" + type + fn];
			}
		},
		createCookie: function (name, value, days){
			var expires;
			if (days) {
					var date = new Date();
					date.setTime(date.getTime()+(days*24*60*60*1000));
					expires = "; expires="+date.toGMTString();
			} else {
					expires = "";
			}
			document.cookie = name+"="+value+expires+"; path=/";
		},
		readCookie: function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0) === ' ') {
							c = c.substring(1,c.length);
					}
					if (c.indexOf(nameEQ) === 0) {
							return c.substring(nameEQ.length,c.length);
					}
			}
			return null;
		},
		eraseCookie: function (name) {
			var self = this;
			self.createCookie(name,"",-1);
		},
		appendCss: function()
		{
			var self = this;
			var cssId = 'pjAcceptCookieCss';
			if (!document.getElementById(cssId))
			{
				var head  = document.getElementsByTagName('head')[0];
				var link  = document.createElement('link');
				link.id   = cssId;
				link.rel  = 'stylesheet';
				link.type = 'text/css';
				link.href = 'https://fonts.googleapis.com/css?family=Open+Sans';
				link.media = 'all';
				head.appendChild(link);
			}

			var cssCode = "";
			cssCode += "#pjAcceptCookieBar .pjAcceptCookieBarBtn,";
			cssCode += "#pjAcceptCookieBar .pjAcceptCookieBarBtn:after { -webkit-transition: all .5s ease-in-out; -moz-transition: all .5s ease-in-out; -ms-transition: all .5s ease-in-out; -o-transition: all .5s ease-in-out; transition: all .5s ease-in-out; }";
			cssCode += "#pjAcceptCookieBar { position: fixed; bottom: 0; left: 0; z-index: 9999; overflow-x: hidden; overflow-y: auto; width: 100%; max-height: 100%; padding: 10px 0; background: rgba(0, 77, 136, 0.7);  backdrop-filter: blur(8px); font-family: 'Open Sans', sans-serif; text-align: center; }";
			cssCode += "#pjAcceptCookieBar * { padding: 0; margin: 0; outline: 0; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; }";
			cssCode += "#pjAcceptCookieBar .pjAcceptCookieBarShell { width: 90%; margin: 0 auto; }";
			cssCode += "#pjAcceptCookieBar a[href^=tel] { color: inherit; }";
			cssCode += "#pjAcceptCookieBar a:focus,";
			cssCode += "#pjAcceptCookieBar button:focus { outline: unset; outline: none; }";
			cssCode += "#pjAcceptCookieBar p { font-size: 13px; line-height: 1.5; color: #fff; font-weight: 400; }";
			cssCode += "#pjAcceptCookieBar .pjAcceptCookieBarActions { padding-top: 6px; }";
			cssCode += "#pjAcceptCookieBar .pjAcceptCookieBarBtn { position: relative; display: inline-block; padding: 5px 20px; height: 30px; border: 0; border-radius: 30px; line-height: 1; background: #fff; font-family: 'M PLUS 1p', sans-serif;  font-size: 18px;  font-weight: 500; color: #004d88;}";
			cssCode += "#pjAcceptCookieBar .pjAcceptCookieBarBtn:hover {transform: scale(1.05) translateY(-2px);filter: drop-shadow(0 3px 3px rgba(0,0,0,0.5));}";
			cssCode += "@media only screen and (max-width: 767px) {";
			cssCode += "#pjAcceptCookieBar { padding: 15px 0; }";
			cssCode += "#pjAcceptCookieBar .pjAcceptCookieBarShell { width: 96%; }";
			// cssCode += "#pjAcceptCookieBar p { font-size: 13px; }";
			cssCode += "}";

			var styleElement = document.createElement("style");
			styleElement.type = "text/css";
			if (styleElement.styleSheet) {
			    styleElement.styleSheet.cssText = cssCode;
			} else {
				styleElement.appendChild(document.createTextNode(cssCode));
			}
			document.getElementsByTagName("head")[0].appendChild(styleElement);
		},
		addCookieBar: function(){
			var self = this;
			var htmlBar = '';

			htmlBar += '<div class="pjAcceptCookieBarShell">';
			htmlBar += '<form action="#" method="post">';
			htmlBar += '<p>Для полноценной работы сайта используются файлы cookie. Закрывая это сообщение вы соглашаетесь на хранение и использование cookie на вашем устройстве.</p>';
			htmlBar += '<div class="pjAcceptCookieBarActions">';
			htmlBar += '<button type="button" class="pjAcceptCookieBarBtn">Принимаю</button>';
			htmlBar += '</div>';
			htmlBar += '</form>';
			htmlBar += '</div>';

			var barDiv = document.createElement('div');
			barDiv.id = "pjAcceptCookieBar";
			document.body.appendChild(barDiv);
			barDiv.innerHTML = htmlBar;

			self.bindCookieBar();
		},
		bindCookieBar: function(){
			var self = this;
			var btn_arr = self.getElementsByClass("pjAcceptCookieBarBtn", null, "button");
			if(btn_arr.length > 0)
			{
				self.addEvent(btn_arr[0], "click", function (e) {
					if (e.preventDefault) {
						e.preventDefault();
					}
					self.createCookie('pjAcceptCookie', 'YES', 365);

					document.getElementById("pjAcceptCookieBar").remove();
					return false;
				});
			}
		}
	};

	window.AcceptCookie = AcceptCookie;
})(window);

window.onload = function() {
	AcceptCookie = AcceptCookie();
}

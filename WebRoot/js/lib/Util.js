/**
 * 用于把普通字符串转换为Html字符串
 * @return {String}
 */
String.prototype.toHtml = function(){
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&acute;').replace(/"/g, '&quot;').replace(/\|/g, '&brvbar;');
};

var Util = {
    /**
     * 用于载入Xml文件或者Xml格式的字符串
     * @param  {String}  xmlSource
     * @param  {Boolean} isFromXmlStr    是否是Xml格式的字符串
     * @return {Object}
     */
    loadXMLDoc: function(xmlSource, isFromXmlStr){
        var xmlDoc = null;
        try {
            // Internet Explorer
            xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
        } 
        catch (e) {
            try {
                // Firefox, Mozilla, Opera, etc.
                xmlDoc = document.implementation.createDocument('', '', null);
            } 
            catch (e) {
                alert(e.message);
            }
        }
        try {
            xmlDoc.async = false;
            if (isFromXmlStr) {
                if (Ext.isIE) {//IE下
                    xmlDoc.loadXML(xmlSource);
                }
                else {//W3C标准
                    var parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xmlSource, "text/xml");
                }
            }
            else {
                xmlDoc.load(xmlSource);
            }
            return xmlDoc;
        } 
        catch (e) {
            alert(e.message);
        }
        return null;
    },
    converToXML: function(str){
        return '<xml>' + str + '</xml>';
    },
    bytesSize: function(bytes){
        var i = 0;
        while (1023 < bytes) {
            bytes /= 1024;
            ++i;
        };
        return i ? bytes.toFixed(2) + ["", " Kb", " Mb", " Gb", " Tb"][i] : bytes + " bytes";
    },
    R: function(id){
        return document.getElementById(id);
    }    /**
     * 用于关闭页面
     */
    ,
    closeWindow: function(){
        window.opener = null;
        window.open('', '_self');
        window.close();
    }    /**
     * 获取页面的高度与长度
     * @return {Object}
     */
    ,
    getViewportSize: function(){
        var w = window.innerWidth ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
        var h = window.innerHeight ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
        
        return {
            width: w,
            height: h
        };
    }    /**
     * 错误提示框
     * @param {String} msg
     */
    ,
    showErrorMsg: function(msg){
        alert(msg);
    }    /**
     * 警告提示框
     * @param {String} msg
     */
    ,
    showWarningMsg: function(msg){
        alert(msg);
    },
    showConfirmMsg: function(msg){
        return confirm(msg);
    }    /**
     * 增加或减少日期操作
     * @param  {Date}    d      操作相对日期对象
     * @param  {Integer} month  需增加或减少的月份数
     * @return {Date}
     */
    ,
    addMonth: function(d, month){
        var t = new Date(d);
        t.setMonth(d.getMonth() + month);
        if (t.getDate() < d.getDate()) {
            t.setDate(0);
        }
        return t;
    },
    padChar: function(str, len, padChar){
        if (typeof padChar === 'undefined') {
            padChar = '0';
        }
        var strLen = str.length;
        var padLen = len - strLen;
        if (padLen <= 0) {
            return str;
        }
        var retStr = str;
        for (var i = padLen; i > 0; --i) {
            retStr = '0' + retStr;
        }
        return retStr;
    },
    isEmpty: function(value){
        if (typeof value === 'undefined' || value === null) {
            return true;
        }
        if (typeof value === 'string' && !value.trim().length) {
            return true;
        }
        if (typeof value === 'object' && !value.length &&
        Object.prototype.toString.apply(value) === '[object Array]') {
            return true;
        }
        return false;
    },
    encodeURL: function(url){
        if (this.isEmpty(url)) {
            return 'null';
        }
        try {
            return encodeURIComponent(url);
        } 
        catch (e) {
            return 'null';
        }
    },
    decodeURL: function(encodeUrl){
        if (this.isEmpty(encodeUrl)) {
            return 'null';
        }
        try {
            return decodeURIComponent(encodeUrl);
        } 
        catch (e) {
            return 'null';
        }
    },
	
    /**
	 * 日期判断
	 * @author 章晓健<zhangxiaojian@myhexin.com>
	 * @param {Object} 2012-5-13
	 * @param {Object} DIO
	 */
	judgeDate : function(oldTime){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		
		var oldYear,oldMonth,oldDay;
		oldYear = oldTime.split('-')[0];
		oldMonth = oldTime.split('-')[1];
		oldDay = oldTime.split('-')[2];
		
		
		if(year == oldYear){
			if(month == oldMonth){ //同年同月
				if((day - oldDay) == 0 ){
					return 'jintian';
				}else if((day - oldDay) == 1){
					return 'zuotian';
				}else if((day - oldDay) == 2){
					return 'qiantian';
				}
			}
			if((month - oldMonth) == 1){ //同年不同月
				if(day == 1){
					if(this.isRunYear(year)){
						if(month == 2){
							if(oldDay == 29){
								return 'zuotian';
							}else if(oldDay == 28){
								return 'qiantian';
							}
						}
					}else{
						if(month == 2){
							if(oldDay == 28){
								return 'zuotian';
							}else if(oldDay == 27){
								return 'qiantian';
							}
						}
					}
					
					if(this.isBigMonth){
						if(oldDay == 31){
							return 'zuotian';
						}else if(oldDay == 30){
							return 'qiantian';
						}
					}else{
						if(oldDay == 30){
							return 'zuotian';
						}else if(oldDay == 29){
							return 'qiantian';
						}
					}
					
				}
				if(day == 2){
					if(this.isRunYear(year)){
						if(month == 2){
							if(oldDay == 29){
								return 'qiantian';
							}
						}
					}else{
						if(month == 2){
							if(oldDay == 28){
								return 'qiantian';
							}
						}
					}
					
					if(this.isBigMonth){
						if(oldDay == 31){
							return 'qiantian';
						}
					}else{
						if(oldDay == 30){
							return 'qiantian';
						}
					}
				}
			}
		}else if((year - oldYear) == 1){ //不同年
			if(month == 1 && oldMonth == 12){
				if(day == 2){
					if(oldDay == 31){
						return 'qiantian';
					}
				}
				if(day == 1){
					if(oldDay == 31){
						return 'zuotian';
					}else if(oldDay ==30){
						return 'qiantian';
					}
				}
			}
		}
		return 'long';		
	},
	
	
	getBeforeDate : function(beforeNum){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();

		if(day - beforeNum > 0){
			return year+'-'+month+'-'+(day - beforeNum);
		}else{
			if(month == 3){
				if(this.isRunYear(year)){
					return year+'-'+(month-1) +'-'+(29 + day - beforeNum);
				}else{
					return year+'-'+(month-1) +'-'+(28 + day - beforeNum);
				}
			}else if(month != 1){
				if(this.isBigMonth(month-1)){
					return year+'-'+(month-1) +'-'+(31 + day - beforeNum);
				}else{
					return year+'-'+(month-1) +'-'+(30 + day - beforeNum);
				}
			}else if(month == 1){
				return (year-1)+'-12-'+(31 + day - beforeNum);
			}
		}
		
	},
	
	isRunYear : function(year){
		if(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)){
			return true;
		}
		return false;
	},
	
	isBigMonth : function(month){
		switch (month){
			case 1:
				return true;
			case 3:
				return true;
			case 4:
				return false;
			case 5:
				return true;
			case 6:
				return false;
			case 7:
				return true;
			case 8:
				return true;
			case 9:
				return false;
			case 10:
				return true;
			case 11:
				return false;
			case 12:
				return true;
		}
	},
	/**
	 * @author 章晓健<zhangxiaojian@myhexin.com>
	 * @param {Object} obj
	 */
	isEmptyObject: function( obj ) {

        for ( var name in obj ) {

            return false;

        }

        return true;

    },
    
    /**
	 * 
	 * @param {Object} container
	 * @param {Object} $dom
	 */
	maskTip : function(container, $dom) {
		container.append('<div class="maskDiv"></div>');
		$('.maskDiv').height(document.body.scrollHeight);
		var domWidth = $dom.width(), domHeight = $dom.height();
		$dom.css({'position':'absolute','left':'50%','top':$('body').scrollTop() + 250,'margin-left':'-'+domWidth/2,'margin-top':'-'+domHeight/2});
//		$dom.css({'position':'absolute','left':'0','top':'50%','margin-top':'-'+domHeight/2});
		$dom.show();
	},
	
	/**
	 * 各种提示
	 */
	showTip : function(text){
		$('.maskDiv').remove();
		$('body').append('<div class="maskDiv"></div>');
		$('.maskDiv').height(document.body.scrollHeight);
		var domWidth = $('#J_tip').width(), domHeight = $('#J_tip').height();
		$('#J_tip').text(text);
		$('#J_tip').css({'position':'absolute','left':'50%','top':$('body').scrollTop() + 270,'margin-left':'-'+domWidth/2,'margin-top':'-'+domHeight/2}).show();
	},
	
	hideTip : function(){
		$('#J_tip').hide();
		$('.maskDiv').hide();
	},
	
	
	isScroll : function(el) {
		var elems = el ? [ el ] : [ document.documentElement, document.body ];
		var scrollX = false, scrollY = false;
		for ( var i = 0; i < elems.length; i++) {
			var o = elems[i];
			var sl = o.scrollLeft;
			o.scrollLeft += (sl > 0) ? -1 : 1;
			o.scrollLeft !== sl && (scrollX = scrollX || true);
			o.scrollLeft = sl;
			var st = o.scrollTop;
			o.scrollTop += (st > 0) ? -1 : 1;
			o.scrollTop !== st && (scrollY = scrollY || true);
			o.scrollTop = st;
		}
		return {
			scrollX : scrollX,
			scrollY : scrollY
		};

	},
	
	/**
	 * Esc 按键事件监听
	 */
	keyPress : function($dom,tagName,callback){
		$dom.keypress(function(event){
			var keyCode = event.which || event.keyCode;
			if(keyCode == 27){
				callback();
			}
		});
	},
	
	sendRequest : function(data){
		$.ajax( {
			url : data['url'],
			type : data['type'],
			data : data['param'],
			dataType : data['dataType'],
			async : data['async'],
			beforeSend : data['beforeSend'],
			success : data['success'],
			failure : data['failure']
		});
	}
	
    
};

// 一个从html参数中提取参数的工具
var href = {
    // url param
    params: null,
    getParam: function(key, def){
        if (typeof def == 'undefined') {
            def = null;
        }
        if (null == href.params) {
            href.params = [];
            if (location.search.length > 0) {
                var seps = decodeURIComponent(location.search).substr(1).split('&');
                for (var i = 0; i < seps.length; ++i) {
                    var pair = seps[i].split('=');
                    href.params[pair[0]] = pair[1];
                }
            }
        }
        return (typeof href.params[key] == 'undefined') ? def : href.params[key];
    }
};

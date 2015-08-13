/**
 + ---------------------------------------- +
 + ������� v1.0
 + Author: Ferris
 + QQ: 21314130
 + Mail: fgm@fgm.cc
 + ---------------------------------------- +
 + Date: 2012-01-10
 + ---------------------------------------- +
**/
/**
 * 2012����2020��ڼ�����Ϣ�������ڼ���ǰ1~3��/��1~3�죩
 * @name _dateMap
 * @ignore
 */	
var _dateMap = {};

/**
 * ��̬������
 * @name _CAL
 * @ignore
*/
var _CAL = {
	/**
	 * ��ʽ�����֣�������λǰ�油0
	 * @name _CAL#formatNum
	 * @param {number} num Ҫ��ʽ��������	 
	 * @function
	 * @return string
	 */	
	formatNum: function(num) {
		return num.toString().replace(/^(\d)$/, "0$1")	
	},
	/**
	 * �����ڶ���/�����ֻᴮ��ʽ��Ϊָ�������ַ���
	 * @name _CAL#formatStrDate
	 * @param {object|string} vArg	��Ϊ���ڶ���������ַ��������ڶ����ʽnew Date(yyyy, mm, dd)�������ַ�����ʽyyyy-mm|n-dd|d	 
	 * @function
	 * @return string yyyy-mm-dd
	 */		 	
	formatStrDate: function(vArg) {
		switch(typeof vArg) {
			case "string":
				vArg = vArg.split(/-|\//g);
				return vArg[0] + "-" + this.formatNum(vArg[1]) + "-" + this.formatNum(vArg[2]);
				break;
			case "object":
				return vArg.getFullYear() + "-" + this.formatNum(vArg.getMonth() + 1) + "-" + this.formatNum(vArg.getDate());
				break;	
		}
	},
	/**
	 * �������ַ�����ʽ��Ϊ����
	 * @name _CAL#formatIntDate
	 * @param {string} sDate	�����ַ�������ʽyyyy-mm|m-dd|d	 
	 * @function
	 * @return number yyyymmdd
	 */	
	formatIntDate: function(sDate) {
	 	return this.formatStrDate(sDate).replace(/-|\//g, "")
	},	
	/**
	 * ��ȡָ�����ڣ�yyyy-mm-dd����ǰ1~3��/��1~3������
	 * @name _CAL#getThreeDays
	 * @param {string} dateName ��������
	 * @param {string} sDate	�����ַ�����yyyy-mm-dd��
	 * @function
	 * @return object
	 */		
	getThreeDays: function(sDate, dateName) {
		var oTmp  = {},
			aDate = sDate.split(/-|\//g),
			sDate, i;
		for(i = 0; i < 7; i++) {			
			sDate = this.formatStrDate(new Date(aDate[0], aDate[1] - 1, aDate[2] - 0 + (i - 3)));
			oTmp[sDate] = dateName + (i != 3 ? (i < 3 ? "\u524d" : "\u540e") + Math.abs(i - 3) + "\u5929" : "");
			i > 2 && (_dateMap[sDate] = dateName + (i != 3 ? (i < 3 ? "\u524d" : "\u540e") + Math.abs(i - 3) + "\u5929" : ""))
		}
		return oTmp
	},
	/**
	 * �������׷�Ӳ����ڵ�����
	 * @name _CAL#addObject
	 * @param {object} obj		Ŀ�����
	 * @param {object} oData	Ҫ��ӵĶ���
	 * @function
	 * @return object
	 */	
	addObject: function(obj, oData) {
		for(var p in oData) obj[p] || (obj[p] = oData[p])
	},
	/**
	 * ��ȡĿ��Ԫ��������ĵ���λ��
	 * @name _CAL#getPos
	 * @param {element} element Ŀ��Ԫ��
	 * @function
	 * @return object {left: Ԫ����˾��ĵ����λ��, top: Ԫ����˾��ĵ����λ��, right: Ԫ���Ҷ˾��ĵ����λ��, bottom: Ԫ�ص׶˾��ĵ��Ϸ�λ��}
	 */	
	getPos: function(element) {
		var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			iScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
			iPos = element.getBoundingClientRect();		
		return {top: iPos.top + iScrollTop, left: iPos.left + iScrollLeft, right: iPos.right + iScrollLeft, bottom: iPos.bottom + iScrollTop}
	},	
	/**
	 * Ԫ��ѡ����
	 * @name _CAL#$
	 * @param {string} sArg		#id/.clssName/tagName
	 * @param {object} context	��ѡ��������
	 * @function
	 * @return element Ϊidʱ����Ԫ��
	 * @return elements ΪclassName|tagNameʱ����Ԫ�ؼ�
	 */	
	$: function(sArg, context) {
		switch(sArg.charAt(0)) {
			case "#":
				return document.getElementById(sArg.substring(1));
				break;
			case ".":
				var reg = new RegExp("(^|\\s)"+ sArg.substring(1) +"(\\s|$)"),
					arr = [],
					aEl = _CAL.$("*", context),
					i;
				for(i = 0; i < aEl.length; i++) reg.test(aEl[i].className) && arr.push(aEl[i]);
				return arr;
				break;
			default:
				return (context || document).getElementsByTagName(sArg);
				break;
		}
	},
	/**
	 * ����Ԫ��λ��
	 * @name _CAL#indexOf
	 * @param {string} vArg Ԫ�ػ���ʽ������vArgΪ��ʽ��ʱ�����ص�һ��ƥ��Ԫ����Ԫ�ؼ��е�λ��
	 * @param {object} arr 	Ԫ�ؼ�
	 * @function
	 * @return number	Ԫ����Ԫ�ؼ��е�λ�ã����û���ҵ�����-1
	 */	
	indexOf: function(vArg, arr) {
		for(var i = arr.length; i--;) {
			if(typeof vArg === "string" ? this.hasClass(arr[i].children[0] || arr[i], vArg) : vArg == arr[i]) return i
		}
		return -1;
	},
	/**

	 * �ж�Ŀ��Ԫ���Ƿ����ָ����className
	 * @name _CAL#hasClass
	 * @param {object} element		Ŀ��Ԫ��
	 * @param {string} className	Ҫ����className
	 * @function
	 * @return boolean
	 */	
	hasClass: function(element, className) {
		return new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className)
	},
	/**
	 * ��Ŀ��Ԫ�����className
	 * @name _CAL#addClass
	 * @param {object} element		Ŀ��Ԫ��
	 * @param {string} className	Ҫ��ӵ�className
	 * @function
	 */	
	addClass: function(element, className) {
		var arr = element.className.split(/\s+/);	
		this.hasClass(element, className) || arr.push(className);
		element.className = arr.join(" ").replace(/(^\s*)|(\s*$)/, "")
	},
	/**
	 * ɾ��Ŀ��Ԫ��className
	 * @name _CAL#removeClass
	 * @param {object} element		Ŀ��Ԫ��
	 * @param {string} className	Ҫɾ����className
	 * @function
	 */	
	removeClass: function(element, className) {
		element.className = element.className.replace(new RegExp("(^|\\s)" + className + "(\\s|$)", "g"), "").split(/\s+/).join(" ")	
	},	
	/**
	 * ��Ŀ��Ԫ�ذ��¼�
	 * @name _CAL#on
	 * @param {object} element		Ŀ��Ԫ��
	 * @param {string} type 		�¼�����
	 * @param {function} handler	������
	 * @function
	 */	
	on: function(element, type, handler) {
		element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent("on" + type, handler)
	},
	/**
	 * ��ֹ�¼�ð�ݺ�Ĭ���¼�
	 * @name _CAL#halt
	 * @param {event} e	 
	 * @function
	 */	
	halt: function(e) {
		e = e || event;
		e.preventDefault ? e.preventDefault() : e.returnValue = !1;
		e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
	},
	/**
	 * �ж�Ԫ��AԪ���Ƿ����BԪ��
	 * @name _CAL#contains
	 * @param {element} A
	 * @param {element} B
	 * @function
	 * @return boolean
	 */	
	contains: function(A, B) {
		if(A.contains) {
			return A.contains(B)	
		}
		else if(A.compareDocumentPosition) {
			return !!(A.compareDocumentPosition(B) & 16)
		}
	},
	/*
	 * ��α����תΪ����
	 * @name _CAL#toArray
	 * @param {object} object α���飺����arguments
	 * @function
	 * @return array
	*/
	toArray: function(object){
		for(var result = [], i = 0, len = object.length; i < len; i++) {
			result.push(object[i])
		}
		return result
	},
	/*
	 * �¼�������ݴ���
	 * @name _CAL#fixEvent
	 * @param {event} e �¼�����
	 * @function
	 * @return object
	*/	
	fixEvent: function(e) {
		e = e || event;
		e.target = e.target || e.srcElement;
		e.preventDefault = function() {
			return e.preventDefault ? e.preventDefault() : e.returnValue = !1;	
		};
		e.stopPropagation = function() {
			return e.stopPropagation ? stopPropagation() : e.cancelBubble = !0;	
		};
		e.hoat = function() {
			this.preventDefault();
			this.stopPropagation();	
		};
		return e
	}
};
/**
 * ����ģ��
 * @name _template
 * @type Array
 * @ignore 
 */	
var _template = [
	"<div class=\"cal-container\">",
		"<dl>",
			"<dt class=\"date\"></dt>",
			"<dt><strong>\u65e5</strong></dt>",
			"<dt>\u4e00</dt>",
			"<dt>\u4e8c</dt>",
			"<dt>\u4e09</dt>",
			"<dt>\u56db</dt>",
			"<dt>\u4e94</dt>",
			"<dt><strong>\u516d</string></dt>",
			"<dd></dd>",
		"</dl>",
	"</div>"
];
/**
 * �ڼ�������
 * @name _dateName
 * @type Object
 * @ignore
 */	
var _dateName = {
	"today":"\u4eca\u5929",
	"yuandan":"\u5143\u65e6",
	"chuxi":"\u9664\u5915",
	"chunjie":"\u6625\u8282",
	"yuanxiao":"\u5143\u5bb5\u8282",
	"qingming":"\u6e05\u660e",
	"wuyi":"\u52b3\u52a8\u8282",
	"duanwu":"\u7aef\u5348\u8282",
	"zhongqiu":"\u4e2d\u79cb\u8282",
	"guoqing":"\u56fd\u5e86\u8282"
};
/**
 * 2012����2020��ڼ�������
 * @name _holidays
 * @type Object
 * @ignore
 */	
var _holidays = {
	today: [_CAL.formatStrDate(new Date)],
	yuandan: ["2012-01-01", "2013-01-01", "2014-01-01", "2015-01-01", "2016-01-01", "2017-01-01", "2018-01-01", "2019-01-01", "2020-01-01"],
	chuxi: ["2012-01-22", "2013-02-09", "2014-01-30", "2015-02-18", "2016-02-07", "2017-01-27", "2018-02-15", "2019-02-04", "2020-01-24"],
	chunjie: ["2012-01-23", "2013-02-10", "2014-01-31", "2015-02-19", "2016-02-08", "2017-01-28", "2018-02-16", "2019-02-05", "2020-01-25"],
	yuanxiao: ["2012-02-06", "2013-02-24", "2014-2-14", "2015-03-05", "2016-02-22", "2017-02-11", "2018-03-02", "2019-02-19", "2020-02-8"],
	qingming: ["2012-04-04", "2013-04-04", "2014-04-05", "2015-04-05", "2016-04-04", "2017-04-04", "2018-04-05", "2019-04-05", "2020-04-04"],
	wuyi: ["2012-05-01", "2013-05-01", "2014-05-01", "2015-05-01", "2016-05-01", "2017-05-01", "2018-05-01", "2019-05-01", "2020-05-01"],
	duanwu: ["2012-06-23", "2013-06-12", "2014-06-02", "2015-06-20", "2016-06-09", "2017-05-30", "2018-06-18", "2019-06-07", "2020-06-25"],
	zhongqiu: ["2012-09-30", "2013-09-19", "2014-09-08", "2015-09-27", "2016-09-15", "2017-10-04", "2018-09-24", "2019-09-13", "2020-10-01"],
	guoqing: ["2012-10-01", "2013-10-01", "2014-10-01", "2015-10-01", "2016-10-01", "2017-10-01", "2018-10-01", "2019-10-01", "2020-10-01"]
};
//���ɽڼ�����ʾ��Ϣ��ͼ
for(var p in _holidays) {
	if(p == "today") continue;
	for(var i = 0; i < _holidays[p].length; i++) {
		_CAL.addObject(_dateMap, _CAL.getThreeDays(_holidays[p][i], _dateName[p]));
	}	
}
/**
 * �������캯��
 * @constructor
 * @name Calendar
 * @param {object} config ���ò���
 */
function Calendar() {
	this._init.apply(this, arguments)
}
Calendar.prototype = {
	constructor: Calendar,
	/**
	 * ������ʽ��ƥ�������ַ���yyyy-mm-dd��yyyy/mm/dd
	 * @name Calendar.reg
	 * @type ExpReg
	 */
	reg: /-|\//g,
	/**
	 * ������ʽ��ƥ�������ַ���2012-01-01����2020-12-31 ��ʽyyyy-mm|m-dd|d
	 * @name Calendar.rDate
	 * @type ExpReg
	 */	
	rDate: /^20(1[2-9]|20)-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[0-1])$/,
	/**
	 * ������ʼ��
	 * @name Calendar#_init
	 * @param {object} config ������������
	 * @function
	 * @private
	 */	
	_init: function(config) {
		config = config || {};	
		/**
		 * �Ƿ񵯳���ʾ������Ĭ��������ʾ����
		 * @name Calendar.isPopup
		 * @type Boolean
		 */		
		this.isPopup = config.isPopup;		
		/**
		 * ��������ID�����ֵΪ��, �����ɲ��ظ�ID��
		 * @name Calendar.id
		 * @type String
		 */
		this.id = this.isPopup ? "C_" + (+new Date()) : config.id.replace(/^#/, "") || "C_" + (+new Date());
		/**
		 * ��������
		 * @name Calendar.container
		 * @type Object
		 */
		this.container = _CAL.$("#" + this.id) || document.createElement("div");
		/**
		 * �Ƿ���selectѡ�����£�Ĭ�ϲ�����
		 * @name Calendar.isSelect
		 * @type Boolean
		 */
		this.isSelect = config.isSelect;	
		/**
		 * �Ƿ���ʾ���°�ť��Ĭ�ϲ���ʾ
		 * @name Calendar.isPrevBtn
		 * @type Boolean
		 */
		this.isPrevBtn = config.isPrevBtn;
		/**
		 * �Ƿ���ʾ���°�ť��Ĭ�ϲ���ʾ
		 * @name Calendar.isNextBtn
		 * @type Boolean
		 */	
		this.isNextBtn = config.isNextBtn;
		/**
		 * �Ƿ���ʾ�رհ�ť��Ĭ�ϲ���ʾ
		 * @name Calendar.isCloseBtn
		 * @type Boolean
		 */	
		this.isCloseBtn = config.isCloseBtn;
		/**
		 * �Ƿ�������ʾ�ڼ��գ�Ĭ�ϲ���ʾ
		 * @name Calendar.isHoliday
		 * @type Boolean
		 */	
		this.isHoliday = config.isHoliday;
		/**
		 * �Ƿ���ʾ�ڼ���ǰ1~3��/��1~3�죬Ĭ�ϲ���ʾ
		 * @name Calendar.isHolidayTips
		 * @type Boolean
		 */	
		this.isHolidayTips = config.isHolidayTips;
		/**
		 * �Ƿ������ı���Ϊֻ����Ĭ�Ͽ�д
		 * @name Calendar.isReadonly
		 * @type Boolean
		 */	
		this.isReadonly = config.isReadonly;
		/**
		 * �Ƿ���ʾ������Ϣ��Ĭ�ϲ���ʾ
		 * @name Calendar.isDateInfo
		 * @type Boolean
		 */	
		this.isDateInfo = config.isDateInfo;	
		/**
		 * ������ϢclassName��Ĭ��ֵ"date-info"
		 * @name Calendar.dateInfoClass
		 * @type String
		 */		
		this.dateInfoClass = config.dateInfoClass || "date-info";		
		/**
		 * �����Ƿ������ʾ��Ϣ��Ĭ�ϲ�������ʾ��Ϣ
		 * @name Calendar.isMessage
		 * @type Boolean
		 */	
		this.isMessage = config.isMessage;
		/**
		 * ������ʾ��Ϣ���ݣ�Ĭ��ֵΪ��
		 * @name Calendar.sMessage
		 * @type String
		 */		
		this.sMessage = config.sMessage || "";
		/**
		 * ��ų�����������ʵ��
		 * @name Calendar.CalStart
		 * @type Object
		 */	
		this.CalStart = config.CalStart || null;
		/**
		 * �������ʵ���Ƿ�Ϊ��������
		 * @name Calendar.isCalStart
		 * @type Boolean
		 */	
		this.isCalStart = config.isCalStart;
		/**
		 * ��ŷ�����������ʵ��
		 * @name Calendar.CalEnd
		 * @type Object
		 */	
		this.CalEnd = config.CalEnd || null;
		/**
		 * �������ʵ���Ƿ�Ϊ��������
		 * @name Calendar.isCalEnd
		 * @type Boolean
		 */	
		this.isCalEnd = config.isCalEnd;
		/**
		 * ��������,Ĭ��1������
		 * @name Calendar.count
		 * @type Number
		 */	
		this.count = config.count || 1;
		/**
		 * �������л�������Ĭ������������һ�£��������л�
		 * @name Calendar.monthStep
		 * @type Number
		 */	
		this.monthStep = config.monthStep || this.count;		
		/**
		 * ��ʾλ��΢����������ԭ�е�λ�ý���ƫ��΢��(leftֵ, topֵ)��������Ի�����
		 * @name Calendar.revise
		 * @type Object
		 */	
		this.revise = {left:0, top:0};
		/**
		 * ������ʾ������Ԫ��
		 * @name Calendar.triggerNode
		 * @type Object
		 */
		this.triggerNode = _CAL.$("#" + config.id.replace(/^#/, ""));
		/**
		 * ����������Ⱦ���ڣ���ʽnew Date(yyyy, mm, dd)
		 * @name Calendar.date
		 * @type Object
		 */	
		this.date = config.date || new Date;
		/**
		 * ������ݣ�ֻ��
		 * @name Calendar.year
		 * @type Number
		 */	
		this.year = this.date.getFullYear();
		/**
		 * �����·ݣ�ֻ��
		 * @name Calendar.month
		 * @type Number
		 */	
		this.month = _CAL.formatNum(this.date.getMonth() + 1);
		/**
		 * ���ó������ڣ���ʽ(yyyy-mm-dd)
		 * @name Calendar.startDate
		 * @type String
		 */	
		this.startDate = config.startDate;
		/**
		 * ���÷������ڣ���ʽ(yyyy-mm-dd)
		 * @name Calendar.endDate
		 * @type String
		 */	
		this.endDate = config.endDate;		
		/**
		 * ����Ĭ��ѡ������ڣ����Ӹ�����ʾ����ʽ(yyyy, mm, dd)
		 * @name Calendar.selectDate
		 * @type String
		 */	
		this.selectDate = config.selectDate && _CAL.formatStrDate(config.selectDate);
		/**
		 * ָ��������ѡ��Χ mindate:��С����, maxdate:������ڡ���ʽnew Date(yyyy, mm, dd)
		 * @name Calendar.range
		 * @type Object
		 */
		this.range = config.range || {mindate:null, maxdate:null};			
		//��������
		this._create();				
		//������Ⱦ
		this.render();
		//����¼�
		this._addEvent()
	},
	/**
	 * ���������ṹ
	 * @name Calendar#_create
	 * @function
	 * @private
	 */
	_create: function() {
		var aTmp = [],
			i = 0,
			oIframe = null,
			oDiv = document.createElement("div"),
			oMsg = document.createElement("div");
		//��ʾ���°�ť	
		this.isPrevBtn  && aTmp.push("<span class=\"cal-prev\">prev</span>");
		//��ʾ���°�ť
		this.isNextBtn  && aTmp.push("<span class=\"cal-next\">next</span>");
		//��ʾ�رհ�ť
		this.isCloseBtn && aTmp.push("<span class=\"cal-close\">close</span>");
		
		//���������ṹ
		for(i = this.count; i--;) aTmp = aTmp.concat(_template);		
			
		//������������
		oDiv.className = "calendar";
		oDiv.innerHTML = aTmp.join("");
		if(!this.isPrevBtn && !this.isNextBtn && !this.isCloseBtn) oDiv.style.paddingLeft = oDiv.style.paddingRight = "5px";
		this.container.id = this.id;
		this.container.appendChild(oDiv);
		
		//������Ϣ����
		if(this.isMessage) {
			this.oMsg = oMsg;
			oMsg.className = "cal-msg";
			oMsg.innerHTML = this.sMessage;
			oMsg.style.display = this.sMessage ? "block" : "none";
			this.container.insertBefore(oMsg, oDiv);
		}
		
		//�޸�ie6�޷��ڸ�select��bug
		!!window.ActiveXObject && !window.XMLHttpRequest && (oIframe = document.createElement("iframe"), this.container.appendChild(oIframe));	
		
		//���ҳ����û�����������򴴽�һ��
		document.getElementById(this.id) || document.body.appendChild(this.container);
		//�����ie6, ���������ڵ�iframe�Ŀ��
		if(oIframe) {
			var style = oIframe.style;
			style.position = "absolute";
			style.top = style.left = "-1px";
			style.filter = "alpha(opacity=0)";
			style.zIndex = -1;
			style.border = 0;
			style.width = this.container.offsetWidth + "px";
			style.height = this.container.offsetHeight + "px"
		}
		
		//����ǵ���ʽ�������Ƚ�������, �����þ��Զ�λ
		this.isPopup && (this.hide().container.style.position = "absolute");
		this.isPopup && (this.hide().container.style.zIndex = "9999");
		
		//����Ԫ��Ϊ�����ʱ���������
		if(this.triggerNode.tagName.toUpperCase() === "INPUT") {
			//���������ֻ��, �޸Ĵ���Ԫ�ص�readonly
			this.isReadonly && (this.triggerNode.readOnly = true);
			//�����������ʾ������Ϣ, �򴴽�������Ϣ��ǩ
			if(this.isDateInfo) {				
				this.triggerNodeParent 				  = document.createElement("div");
				this.oDateInfo 						  = document.createElement("span");
				this.oDateInfo.className 			  = this.dateInfoClass;
				this.triggerNode.style.position 	  = "absolute";
				this.triggerNodeParent.style.position = "relative";
				this.triggerNodeParent.style.display  = "inline-block";
				this.triggerNodeParent.style.width    = this.triggerNode.offsetWidth + "px";
				this.triggerNodeParent.style.height   = this.triggerNode.offsetHeight + "px";
				this.triggerNode.parentNode.insertBefore(this.triggerNodeParent, this.triggerNode);
				this.triggerNodeParent.appendChild(this.triggerNode);
				this.triggerNodeParent.appendChild(this.oDateInfo)				
			}
			//����������ֵ
			this.triggerNode.value != "" && this.isHolidayTips && this.setDateInfo();
		}
	},
	/**
	 * ������
	 * @name Calendar#_draw
	 * @function
	 * @private		 
	 */
	_draw: function(oCal, date) {
		var that  = this,
			oDt   = oCal.getElementsByTagName("dt")[0],
			oDd   = oCal.getElementsByTagName("dd")[0],
			oTmpY = document.createDocumentFragment(),
			oTmpM = document.createDocumentFragment(),
			oOption, oFrag, oDiv, i;		
		//select����
		if(this.isSelect) {
			oDiv = document.createElement("div");
			this.selectYear = document.createElement("select");
			this.selectMonth = document.createElement("select");
			
			oFrag = document.createDocumentFragment();
			for(i = (new Date).getFullYear(); i >= 1900; i--) {
				oOption = document.createElement("option");
				oOption.value = oOption.innerHTML = i;
				oOption.selected = this.year == i;
				oTmpY.appendChild(oOption)
			}
			for(i = 1; i <= 12; i++) {
				oOption = document.createElement("option");
				oOption.value = oOption.innerHTML = i;
				oOption.selected = this.month == i;
				oTmpM.appendChild(oOption)			
			}
			
			this.selectYear.appendChild(oTmpY);
			this.selectMonth.appendChild(oTmpM);
			
			oDiv.appendChild(this.selectYear);
			oDiv.appendChild(this.selectMonth);
			oDiv.appendChild(document.createTextNode("\u6708"));
			oDiv.insertBefore(document.createTextNode("\u5e74"), this.selectMonth);
			
			oDt.innerHTML = "";
			oDt.appendChild(oDiv);
			
			this.selectYear.onchange = this.selectMonth.onchange = function() {
				that.render(new Date(that.selectYear.value, that.selectMonth.value - 1))
			}
		}
		//��������
		else {
			oDt.innerHTML = date.year + "\u5e74" + date.month + "\u6708";
		}
		//����
		oDd.innerHTML = "";
		oDd.appendChild(this._createDays(date.year, date.month))
	},
	/**
	 * ��������
	 * @name Calendar#_createDays
	 * @function
	 * @private		 
	 */
	_createDays: function(year, month) {
		var iDays	  = new Date(year, month, 0).getDate(),
			iFirstDay = new Date(year, month - 1, 1).getDay(),
			arr		  = [],
			result	  = [],
			oFarg	  = document.createDocumentFragment(),
			i, len, sValue, oA, iCur;
		
		for(i = iFirstDay; i--;) arr.push(0);
		for(i = 1; i <= iDays; i++) arr.push(i);
		
		while(arr.length) {
			for(i = 0, len = arr.length; i < len; i++) {
				if(arr.length) {					
					oA 	   = document.createElement("a");
					sValue = arr.shift();
					if(!sValue) {
						oA.className = "disabled";
						oA.innerHTML = "&nbsp;"	
					}
					else {
						oA.href		 	= "javascript:;";
						oA.innerHTML	= sValue;
						oA["data-date"] = _CAL.formatStrDate(year + "-" + month + "-" + sValue);
						
						iCur = _CAL.formatIntDate(oA["data-date"]);
	
						//ָ����Χ
						if(this.range.mindate) {
							iCur < (_CAL.formatIntDate(this.range.mindate)) && (oA.className = "disabled");	
						}
						if(this.range.maxdate) {
							iCur > (_CAL.formatIntDate(this.range.maxdate)) && (oA.className = "disabled");	
						}
						
						//�ڼ��մ���
						if(this.isHoliday) {
							for(var className in _dateName) {
								if(oA.className == "disabled") continue;
								this._isHoliday(oA, className)
							}
						}
						
						//ָ��������������ѡ��״̬
						this.selectDate == oA["data-date"] && ((oA.children[0] || oA).className = "selected");
						
						//��ʼ����
						this.startDate == oA["data-date"] && ((oA.children[0] || oA).className = "start-date");
						
						//��ʼ����
						this.endDate == oA["data-date"] && ((oA.children[0] || oA).className = "end-date");
						
						//���ѡ��Χ
						if(this.startDate && this.endDate) {
							iCur > this.startDate.replace(this.reg, "") && iCur < this.endDate.replace(this.reg, "") && ((oA.children[0] || oA).className = "select-range")
						}
					}					
					oFarg.appendChild(oA)
				}
			}
		}
		return oFarg
	},
	/**
	 * �����Ƿ�Ϊ�ڼ���
	 * @name Calendar#_isHoliday
	 * @function
	 * @private		 
	 */
	_isHoliday: function(obj, className) {
		if(new RegExp(obj["data-date"]).test(_holidays[className].join())) {
			obj.className = className;
			obj.innerHTML = "<span>"+ obj.innerHTML.replace(/<[^>]+>/,"") +"</span>"
		}
	},
	/**
	 * ���õ���ʽ����λ��
	 * @name Calendar#_setPos
	 * @function
	 * @private		 
	 */
	_setPos: function(triggerNode) {
		var t, l, w, h, maxT, ie = /msie\s(\d+\.\d+)/i.test(navigator.userAgent) ? RegExp.$1: undefined;
		triggerNode = triggerNode ? triggerNode._node : null || this.triggerNode;
		t = _CAL.getPos(triggerNode).bottom + this.revise.top - (ie < 8 ? 2 : 0);
		l = _CAL.getPos(triggerNode).left + this.revise.left - (ie < 8 ? 2 : 0);
		w = 205 * this.count + (!this.isPrevBtn && !this.isNextBtn && !this.isCloseBtn ? 10 : 60);
		h = this.isSelect ? 216 : 211;
		maxT = t - h - triggerNode.offsetHeight - this.revise.top * 2;
		maxL = l - w + triggerNode.offsetWidth - this.revise.top * 2;
		if(t > document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop) - h) t = maxT < 0 ? t : maxT;
		if(l > document.documentElement.clientWidth + (document.documentElement.scrollLeft || document.body.scrollLeft) - w) l = maxL < 0 ? l : maxL;
		this.container.style.top  = t + "px";
		this.container.style.left = l + "px"
	},
	/**
	 * isPopupΪfalseʱ���Զ��忪���ĵ���������ʾ��Χ���ƣ�ʹ��ʱ�����а�resize�¼�ִ�д˷�����
	 * @name Calendar#limit
	 * @param {object} triggerNode ��������������Ԫ�أ�YUI DOM�ڵ�
	 * @function 
	 */
	limit: function(triggerNode) {
		this._setPos(triggerNode)
	},	
	/**
	 * ����¼�
	 * @name Calendar#_addEvent
	 * @function
	 * @private		 
	 */
	_addEvent: function() {
		var that = this,
			obj = this.container;
		//Ϊ�����ؼ����CLICK�¼�����
		_CAL.on(obj, "click", function(e) {
			that.isHide = !0;
			that.closeTimer && clearTimeout(that.closeTimer);
			e = e || event;
			var oTarget = e.target || e.srcElement;
			switch(oTarget.className) {
				case "cal-close":
					that.hide();
					break;
				case "cal-prev":
					that.prevMonth();
					break;
				case "cal-next":
					that.nextMonth();
					break;
			}
			oTarget.parentNode.tagName.toUpperCase() === "A" && (oTarget = oTarget.parentNode);			
			if(oTarget.tagName.toUpperCase() === "A" && oTarget.className != "disabled") {					
				that.run("dateClick", oTarget);
				if(that.triggerNode.tagName.toUpperCase() === "INPUT") {					
					that.triggerNode.value = oTarget["data-date"];
					if(that.isDateInfo) that.setDateInfo(oTarget["data-date"]);
					that.hide()
				}
			}
			that.isPopup && _CAL.contains(obj, oTarget) && _CAL.halt(e)			
		});
		//����Ϊ������ʾʱ����¼�
		if(this.isPopup) {
			_CAL.on(this.triggerNode, "focus", function(e) {
				that.isHide = !1;
				that.closeTimer && clearTimeout(that.closeTimer);
				e = e || event;
				var oTarget = e.target || e.srcElement,
					oIframe = _CAL.$("iframe", that.container)[0];	
				that._setPos();
				that.show();
				oTarget.select && oTarget.select();
				oIframe && (oIframe.style.width = that.container.offsetWidth + "px", oIframe.style.height = that.container.offsetHeight + "px");
			});

			_CAL.on(this.triggerNode, "blur", function() {								
				that.closeTimer = setTimeout(function() {
					that.hide();
				}, 150)
			});
			
			_CAL.on(document, "click", function(e) {
				that.isHide && that.hide()
			});
			
			_CAL.on(window, "resize", function() {
				that._setPos()	
			})
		}
		//��������Ϣ��������¼�
		if(this.oDateInfo) {
			_CAL.on(this.oDateInfo, "click", function(e) {
				that.focus();
				_CAL.halt(e || event)	
			})	
		}
		//�Զ����¼�outsiteClick
		_CAL.on(document, "click", function(e) {
			e = _CAL.fixEvent(e);
			if(_CAL.contains(that.container, e.target)) return;	
			that.run("outsiteClick", e);
		});	
	},
	/**
	 * ��Ⱦ����
	 * @name Calendar#render
	 * @param {object|string} date ָ��������Ⱦ���ڣ�������Ϊ���ڶ���new Date(yyyy, mm, dd)���ַ���yyyy-mm-dd
	 * @function
	 */
	render: function(date) {
		var date = date || this.date,
			aCal  = _CAL.$(".cal-container", this.container),
			year, month, i;
			date = typeof date === "string" ? new Date(date.split(this.reg)[0], _CAL.formatNum(date.split(this.reg)[1] - 1)) : date;
			year  = date.getFullYear();
			month = date.getMonth() + 1;
		this.year = year;
		this.month = month;
		for(i = 0, len = aCal.length; i < len; i++) {
			year += (month + (i ? 1 : 0)) > 12 ? 1 : 0;
			month = (month + (i ? 1 : 0)) % 12 || 12;	
			this._draw(aCal[i], {year: year, month: month})	
		}
	},	
	/**
	 * ��Ⱦ��������
	 * @name Calendar#nextMonth
	 * @function
	 */
	nextMonth: function() {
		this.render(new Date(this.year, this.month + (this.monthStep - 1), 1));
		this.run("nextMonthClick")
	},
	/**
	 * ��Ⱦ��������
	 * @name Calendar#prevMonth
	 * @function
	 */
	prevMonth: function() {
		this.render(new Date(this.year, this.month - (this.monthStep + 1), 1));
		this.run("prevMonthClick")
	},
	/**
	 * ��ʾ����
	 * @name Calendar#show
	 * @function
	 */
	show: function() {
		this.container.style.display = "block";		
		this.run("show");
		this.run("outsiteClick");
		return this
	},
	/**
	 * ��������
	 * @name Calendar#hide
	 * @function
	 */
	hide: function() {
		this.container.style.display = "none";
		this.isMessage && this.hideMessage();
		this.run("hide");
		return this
	},
	/**
	 * ������ʾ������Ϣ
	 * @name Calendar#setDateInfo
	 * @param {string} str ������Ϣ����	 
	 * @function
	 */
	setDateInfo: function(sDate) {
		sDate = sDate || this.triggerNode.value;
		this.oDateInfo.innerHTML = this.rDate.test(sDate) ? (this.triggerNode.value = sDate, this.render(sDate), this.getDateInfo(sDate)[this.isHoliday ? "holiday" : "week"]) : ""
	},
	/**
	 * ��ȡָ���������
	 * @name Calendar#getDate
	 * @param {string} sDate �����ַ���yyyy-mm-dd��yyyy/mm/dd
	 * @param {number} iDiff ���ڲ���, ��Ϊ����
	 * @function
	 */		
	getDate: function(sDate, iDiff) {
		var aDate = sDate.split(this.reg);
		return _CAL.formatStrDate(new Date(aDate[0], aDate[1] - 1, aDate[2] - 0 + (iDiff || 0)))
	},
	/**
	 * ��ȡ������Ϣ
	 * @name Calendar#getDateInfo
	 * @param {string} sDate �����ַ���yyyy-mm-dd��yyyy/mm/dd
	 * @function
	 */	
	getDateInfo: function(sDate){
		var that = this,
			aDate = sDate.split(this.reg),
			oDate = new Date(aDate[0], aDate[1] - 1, aDate[2]),
			aDateName = ["\u4eca\u5929", "\u660e\u5929", "\u540e\u5929"],
			sWeekName = "\u661f\u671f" + ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"][oDate.getDay()],
			iDiff, p;
		return {
			week: sWeekName,
			holiday: function() {
				//�ڼ���
				for(p in _holidays) if(new RegExp(sDate).test(_holidays[p])) return _dateName[p];
				//����/����/����
				iDiff = _CAL.formatIntDate(sDate) - _CAL.formatIntDate(new Date);
				if(iDiff >= 0 && iDiff <= 2) return aDateName[iDiff];
				//�ڼ���ǰ1-3��/��1-3��������
				return that.isHolidayTips ? _dateMap[sDate] || sWeekName : sWeekName
			}()
		}
	},		
	/**
	 * ��ʾ�����������ھ࿪ʼ���ڵ�ʱ���
	 * @name Calendar#showRange
	 * @function
	 */	
	showRange: function() {
		var that = this;
		_CAL.on(this.container, "mouseover", function(e) {
			e = e || event;
			var oTarget = e.target || e.srcElement,
				aEl = _CAL.$("a", that.container),
				iBegin = _CAL.indexOf("start-date", aEl),
				i;
			if(!that.startDate) return;
			oTarget.parentNode.tagName.toUpperCase() === "A" && (oTarget = oTarget.parentNode);
			if(oTarget.tagName.toUpperCase() === "A") {
				var iNow = _CAL.indexOf(oTarget, aEl);
				clearClass();
				for(i = iBegin + 1; i < iNow; i++) _CAL.hasClass(aEl[i].children[0] || aEl[i], "end-date") || _CAL.addClass(aEl[i].children[0] || aEl[i], "hover")
			}
			else {
				clearClass()
			}
			function clearClass() {
				for(i = aEl.length; i--;) _CAL.removeClass(aEl[i].children[0] || aEl[i], "hover")
			}
		})
	},
	/**
	 * ����ʽ����ʱ���ô���Ԫ�ػ�ȡ����
	 * @name Calendar#focus
	 * @function
	 */		
	focus: function() {
		this.triggerNode.focus()	
	},
	/**
	 * ����Ԫ��ΪINPUTʱ��keyup�¼�
	 * @name Calendar#keyup
	 * @function
	 */
	keyup: function() {
		var that = this,
			Cal_S = that.CalStart,
			Cal_E = that.CalEnd;
		_CAL.on(that.triggerNode, "keyup", function(e) {
			e = e || event;
			var oTarget = e.target || e.srcElement,
				sValue = oTarget.value;
			if(that.rDate.test(sValue)) {				
				sValue = _CAL.formatStrDate(sValue);				
				if(sValue != (that.isCal_start ? that.startDate : that.endDate)) {
					if(that.isCalStart) {
						Cal_S.startDate = Cal_E.startDate = sValue;
						Cal_S.render(sValue);
						that.setDateInfo(that.triggerNode.value);						
						Cal_E.render(Cal_E.endDate || sValue);
					}
					else if(that.isCalEnd) {
						Cal_S.endDate = Cal_E.endDate = sValue;
						Cal_E.render(sValue);			
						that.setDateInfo(that.triggerNode.value);
						Cal_S.render();
					}
				}
			}
			else {				
				if(that.isCalStart) {
					Cal_S.startDate = Cal_E.startDate = "";
					Cal_S.render(new Date);					
					Cal_E.render(new Date);
				}
				else if(that.isCalEnd) {
					Cal_S.endDate = Cal_E.endDate = "";
					Cal_S.render(new Date);					
					Cal_E.render(new Date);						
				}
				that.setDateInfo("")
			}		
		});		
	},
	/**
	 * ��ʾ������ʾ��Ϣ
	 * @name Calendar#showMessage
	 * @param {string} message ������ʾ��Ϣ����	 
	 * @function
	 */	
	showMessage: function(message) {
		if(this.oMsg) {
			this.oMsg.innerHTML = message;
			this.oMsg.style.display = "block";
			this.focus()
		}
	},
	/**
	 * ����������ʾ��Ϣ
	 * @name Calendar#hideMessage
	 * @function
	 */
	hideMessage: function() {
		this.oMsg && (this.oMsg.style.display = "none")
	},
	/**
	 * ����Զ����¼�
	 * @name Calendar#_addCustomEvent
	 * @param {string} type �¼���
	 * @param {function} handler �¼��������
	 * @function
	 * @private
	 */
	_addCustomEvent: function(type, handler) {
		if(!this._eventQueue) this._eventQueue = {};
		this._eventQueue[type] ? this._eventQueue[type].push(handler) : this._eventQueue[type] = [handler]
	},
	/**
	 * ɾ���Զ����¼�
	 * @name Calendar#_delCustomEvent
	 * @param {string} type �¼���
	 * @param {function} handler �¼��������	 
	 * @function
	 * @private
	 */
	_delCustomEvent: function(type, handler) {
		if(this._eventQueue) {
			var aHandler = this._eventQueue[type];
			if(aHandler) {
				for(var i = aHandler.length; i--;) {
					if(!handler) {
						aHandler[i] = null;
						aHandler.splice(i, 1);
					}
					else {
						aHandler[i] == handler && (aHandler[i] = null, aHandler.splice(i, 1))
					}
				}	
			}
		}
	},
	/**
	 * ִ���Զ����¼�
	 * @name Calendar#_fireCustomEvent
	 * @param {string} type �¼���
	 * @function
	 * @private
	 */	
	_fireCustomEvent: function(type) {
		if(this._eventQueue) {
			var aHandler = this._eventQueue[type];
			if(aHandler) {
				for(var i = 0, len = aHandler.length; i < len; i++) {
					aHandler[i] && aHandler[i].apply(this, arguments[1] || [])	
				}	
			}
		}
	},
	/**
	 * ����Զ����¼�<br />
	 * �����Զ����¼����£�<br />
	 * show - ������ʾ�¼�<br />
	 * hide - ���������¼�<br />
	 * dateClick - ���ڵ���¼�<br />
	 * nextMonthClick - ���°�ť����¼�<br />
	 * prevMonthClick - ���°�ť����¼�<br />
	 * outsiteClick - ��������������	 
	 * @name Calendar#on
	 * @param {string} type �¼���
	 * @param {function} handler �¼��������
	 * @function
	 */
	on: function(type, handler) {
		this._addCustomEvent(type, handler)
	},
	/**
	 * ɾ���Զ����¼�
	 * @name Calendar#un
	 * @param {string} type �¼���
	 * @param {function} handler �¼��������	 
	 * @function
	 */	
	un: function(type, handler) {
		this._delCustomEvent(type, handler)	
	},
	/**
	 * ִ���Զ����¼�
	 * @name Calendar#run
	 * @param {string, ...} type �¼���, ...Ҫ���ݵ����ɲ���
	 * @function
	 */		
	run: function(type) {
		var arg = _CAL.toArray(arguments);
		this._fireCustomEvent(arg.shift(), arg)
	}
};
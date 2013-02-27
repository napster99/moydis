//@charset "utf-8";
var o = '';
(function() {

	var block = href.getParam('block');
	switch(block){
		case 'newsCard':
		case 'hotCard':
		case 'sendCard':
		case 'cardDetail':
			$('.titleUL').find('li[type=cardIndex]').addClass('selectTitle');
		break;
		default: 
		$('.titleUL').find('li[type="' + block + '"]').addClass('selectTitle');
	}
	
	
	//主菜单切换
	$('.titleUL').find('li.liContent').click(function() {
		$(this).parent().find('li.liContent').removeClass('selectTitle');
		$(this).addClass('selectTitle');
		switch (this.type) {
			//首页
			case 'index':
				window.location = "index.jsp?block=index";
				break;
			//帖子专区
			case 'cardIndex':
				window.location = "cardIndex.jsp?block=cardIndex";
				break;
			//陌芽联盟
			case 'alliance':
				window.location = 'allianceIndex.jsp?block=alliance';
				break;
			//我的家园
			case 'myHome':
				window.location = "myHome.jsp?block=myHome";
				break;
			//关于陌芽
			case 'about':
				window.location = "about.jsp?block=about";
				break;
			default:
				window.location = "index.jsp?block=index";
			}
		});

	//二级菜单展示 
	$('.titleUL').find('li').mouseover(function() {
		if(this.type){
			$('#' + this.type).show();
		}
	});

	$('.titleUL').find('li').mouseout(function() {
		if(!this.type) return;
		var type = this.type;
		o = setTimeout(function() {
			$('#' + type).hide();
		}, 200);
	});

	$('.nap').mouseover(function() {
		clearTimeout(o);
	});

	$('.nap').mouseout(function(event) {
		if (event.target.tagName == 'LI')
			return;
		$(this).hide();
	});

	/* 帖子专区  */
	$('#cardIndex').find('li').click(function(){
		var name = $(this).attr('name');
		switch(name){
			case 'newsCard':
				window.location.href = "./cardIndex.jsp?block=newsCard";
				break;
			case 'hotCard':
				window.location.href = "./cardIndex.jsp?block=hotCard";
				break;
			case 'sendCard':
				window.location.href = "./cardIndex.jsp?block=sendCard";
				break;
			default : 
				window.location.href = "./cardIndex.jsp?block=cardIndex";
		}
		return false;
	});
	
	
	
	
	$('.headDiv').find('input').click(function() {

		switch (this.name) {

		case 'manage':
			manage();
			break;
		case 'register':
			register();
			break;
		case 'login':
			login();
			break;
		default:
			//do nothing

		}

		//后台管理
		function manage() {
			alert('后台管理');
		}

		//用户注册
		function register() {
			Util.maskTip($('body'),$('#registerBlock'));
			$('#registerBlock').find('.regBtnCls').find('input[name=reset]').trigger('click');
		}

		//用户登陆
		function login() {
			Util.maskTip($('body'),$('#loginBlock'));
			$('#loginFailTip').hide();
			//清空原有账号和密码
			$('#loginBlock').find('.accountCls').find('input[type=text]').val('');
			$('#loginBlock').find('.accountCls').find('input[type=password]').val('');
		}

	});

})();

//获取本地时间计数器
function countSecond() {
	var date = new Date();
	$('#timer').text(
			date.toLocaleDateString() + ' (' + date.toLocaleTimeString() + ')');
　	setTimeout("countSecond()", 1000);
}

countSecond();

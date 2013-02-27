//@charset "utf-8";
/**
 * 登陆模块JS代码
 * zxj 2012-10-24 22:15 星期三
 */
(function() {
	var $account = $('#loginBlock').find('.accountCls').find('input[type=text]');
	var $pwd = $('#loginBlock').find('.accountCls').find('input[type=password]');
	var oldAccount = '';
	/**
	 * 检查输入是否合法
	 * @return {TypeName} 
	 */
	function loginCheck() {
		if ($account.val() && $pwd.val()) {

			return true;
		}

		return false;
	}
	/**
	 * 登陆按钮发起账号密码校验请求
	 */
	function sendLoginAjax(account, pwd) {
		var param = {
			'method' : 'login',
			'account' : account,
			'pwd' : pwd
		}
		var data = {
			'url' : 'userInfo.do',
			'type' : 'post',
			'param' : param,
			'dataType' : 'text',
			'async'  : false,
			'beforeSend' : null,
			'success' : success,
			'failure' : failure
		}
		
		Util.sendRequest(data);
	
		//登陆成功
		function success(data){
			if(data == 'successLogin'){
				hideAllDiv();
				
				//1.发送Ajax获得用户nickname
				var param = {
					'method' : 'getUserInfo',
					'account' : $('#loginBlock').find('.accountCls').find('input[type=text]').val()
				}
				var data = {
					'url' : 'userInfo.do',
					'type' : 'get',
					'param' : param,
					'dataType' : 'json',
					'async'  : false,
					'beforeSend' : null,
					'success' : function(data){
						var avatar = data['avatar'];
						if(avatar)
							$('.headDiv').find('img').attr('src',avatar);
						$('#showNickname').text(data['nickname']);
					}
				}
				
				Util.sendRequest(data);
			
				$('.headDiv').find('input[name=login]').val('用户退出').attr('name','logout');
				
			}else{
				$('#loginFailTip').show();
			}
		}
		
		//登陆失败
		function failure(){
			
		}
	}
	
	//Esc 按钮事件回调函数
	function cancelCallBack() {
//		$('#loginCancelBtn').trigger('click');
		hideAllDiv();
	}

	$account.keydown(function() {
		$(this).css('border', 'none');
	});

	$pwd.keydown(function() {
		$(this).css('border', 'none');
	});
	try {
		Util.keyPress($('body'), 'BODY', cancelCallBack);
	} catch (e) {
		alert(e.message);
	}
	
	//登录事件
	$('#loginBtn').click(function() {
		if (loginCheck()) {
			sendLoginAjax($account.val(), $pwd.val());
		} else {
			if (!$account.val()) {
				$account.css('border', '1px solid red');
			}
			if (!$pwd.val()) {
				$pwd.css('border', '1px solid red');
			}
		}
	});

	//取消事件
	$('#loginCancelBtn').click(function() {
//		$('.maskDiv').remove();
//		$('#loginBlock').hide();
//		$('#registerBlock').hide();
		
		hideAllDiv();
	});
	
	function hideAllDiv(){
		$('.maskDiv').remove();
		$('#loginBlock').hide();
		$('#registerBlock').hide();
		$('#registerResultBlock').hide();
	}
	
	//忘记密码事件
	$('.loginToolsCls').find('a[name=forgetPwd]').click(function(){
		
	});
	//****************************register*********************************************
	
	function registerCheck(){
		var inputs = $("#registerBlock").find('input'),flag = true;
		for(var i=0; i<inputs.length; i++){
			var name = inputs.eq(i)[0].name;
			if(name == 'register' || name == 'reset') continue;
			if(inputs.eq(i).attr('isOk') == 'false'){
				inputs.eq(i).css('border','1px solid red');
				flag = false;
			}
		}
		
		return flag;
	}
	
	//用户注册事件
	$('.loginToolsCls').find('a[name=register]').click(function(){
//		$('#loginCancelBtn').trigger('click');
		hideAllDiv();
		$('#registerBlock').find('input[name=reset]').trigger('click');
		Util.maskTip($('body'),$('#registerBlock'));
	});
	
	
	//注册按钮事件
	$('.regBtnCls').find('input[name=register]').click(function(){
		if(registerCheck()){
//			alert('可以注册');
			var $el = $('#registerBlock');
			var param = {
				'method' : 'register',
				'nickname' : $el.find('input[name=nickname]').val(),
				'account' : $el.find('input[name=account]').val(),
				'pwd' : $el.find('input[name=pwd]').val(),
				'rank' : 1,
				'userInfo' :  $el.find('textarea').val() 
			}
			
			function registerSucc(data){
				if(data == 'success'){
					hideAllDiv();
					Util.maskTip($('body'),$('#registerResultBlock'));					
					$('#regResultAccount').text(param['account']);
					$('#regResultPwd').text(param['pwd']);
					
				}else{
					
				}
			}
			
			function registerFail(){
				alert('注册系统出错，请联系管理员....');
			}
			
			var data = {
				'url' : 'userInfo.do',
				'type' : 'post',
				'param' : param,
				'dataType' : 'text',
				'async'  : false,
				'beforeSend' : null,
				'success' : registerSucc,
				'failure' : registerFail
			}
			Util.sendRequest(data);
		}
	});
	
	//重置注册
	$('.regBtnCls').find('input[name=reset]').click(function(){
		var type = this.name,$el = $("#registerBlock");
		$el.find('input').val('').css('border','none');
		$el.find('input[name=register]').val('注册');
		$el.find('input[name=reset]').val('置空');
		$el.find('input[name=cancel]').val('取消');
		
		$el.find('input[name=nickname]').next().text('*0~10个字符*').css('color','');
		$el.find('input[name=account]').next().text('*6~12字符*').css('color','');
		$el.find('input[name=pwd]').next().text('*请输入6~10位数密码*').css('color','');
		$el.find('input[name=pwdAgain]').next().text('').css('color','');
		$el.find('textarea').val('');
	});
	//注册取消
	$('.regBtnCls').find('input[name=cancel]').click(function(){
		
		hideAllDiv();
		
	});
	
	/**
	 * 注册DIV验证信息
	 * @memberOf {TypeName} 
	 * @return {TypeName} 
	 */
	$("#registerBlock").find('input').blur(function(){
		var self = this,
			type = this.name;
		if(type == 'register' ||　type == 'reset') return;
		
		switch(type){
			case 'nickname':
				if(!$(this).val()){
					showError($(this).next('em'),'*昵称不能为空*');
					return;
				}else if($(this).val().length >= 10){
					showError($(this).next('em'),'*0~10个字符*');
					return;
				}
				//昵称可以使用
				showRightTip($(this).next('em'));
				break;
			case 'account':
				var account = $(this).val();
				if(!account){
					showError($(this).next('em'),'*账号不能为空*');
					return;
				}else if(account.length < 6 || account.length > 12){
					showError($(this).next('em'),'*6~12字符*');
					return;
				}
				if(oldAccount == account)  return;
				
				var data = {
					'url' : 'userInfo.do',
					'type' : 'post',
					'param' : {
						'account' : account,
						'method' : 'isExsit'
					},
					'dataType' : 'text',
					'async'  : true,
					'beforeSend' : function(){
						$(self).next('em').text('');
						$(self).nextAll("img").show();
					},
					'success' : function(data){
						$(self).nextAll("img").hide();
						if(data == 'Error'){
							$(self).next('em').text('该账号已经存在').css('color','red');
						}else{
							showRightTip($(self).next('em'));
							oldAccount = account;
						}
					}
				}
				Util.sendRequest(data);
				break;
			case 'pwd':
				var pwd = $(this).val();
				if(!pwd){
					showError($(this).next('em'),'*密码不能为空*');
					return;
				}else if(pwd.length < 6 || pwd.length > 12){
					showError($(this).next('em'),'*请输入6~10位数密码*');
					return;
				}
				//密码可以使用
				showRightTip($(this).next('em'));
				break;
			case 'pwdAgain':
				var pwdAgain = $(this).val(),
					pwd = $("#registerBlock").find('input[name=pwd]').val();
				if(!pwdAgain){
					showError($(this).next('em'),'*确认密码不能为空*');
					return;
				}
				if(!pwdAgain){
					showError($(this).next('em'),'*密码不能为空*');
					return;
				}else if(pwdAgain.length < 6 || pwdAgain.length > 12){
					showError($(this).next('em'),'*请输入6~10位数密码*');
					return;
				}
				
				if(pwd != pwdAgain){
					showError($(this).next('em'),'*两次密码不一致*');
				}else{
					showRightTip($(this).next('em'));
				}
				break;
			default:
				//do nothing
		}
	});
	
	//显示错误信息
	function showError($dom, msg){
		$dom.text(msg).css('color','red').show();
		$dom.prev().attr('isOk',false);
	}
	//显示Ok
	function showRightTip($dom){
		$dom.text('OK').css('color','blue').show();
		$dom.prev().attr('isOk',true);
	}
	
	//回车事件捕捉
	$('body').keyup(function(event){
		var keyCode = event.keyCode || event.which;
		if(keyCode == 13){
			if($('#loginBlock').css('display') == 'block'){
				$('#loginBtn').trigger('click');
			}			
			
			if($('#registerBlock').css('display') == 'block'){
				$('.regBtnCls').find('input[name=register]').trigger('click');
			}
			
		}
	});
	
	//************************************registerResult****************************************************
	//进入论坛首页事件
	$('#goMoydis').click(function(){
		hideAllDiv();
		var nickName = $('#registerBlock').find('input[name=nickname]').val();
		$('#showNickname').text(nickName);
		$('.headDiv').find('input[name=login]').val('用户退出').attr('name','logout');
		$('.headDiv').find('img').attr('src','./images/vistor.png');
		
	});
	//设置密保问题事件
	$('#goQues').click(function(){
		alert(3)
	});
	
	//系统
	$('.headDiv').find('input[name=logout]').live('click',function(){
			var param = {
				'method' : 'logout',
				'account' : $account.val(),
				'pwd' : $pwd.val()
			}
			
			var data = {
				'url' : 'userInfo.do',
				'type' : 'post',
				'param' : param,
				'dataType' : 'text',
				'async'  : false,
				'beforeSend' : null,
				'success' : successLogout
			}
			
			Util.sendRequest(data);
		
			function successLogout(data){
				if(data == 'ok'){
					$('.headDiv').find('img').attr('src','./images/vistor.png');
					$('#showNickname').text('游客');
					$('.headDiv').find('input[name=logout]').val('用户登录').attr('name','login');
					//判断当前模块是否在我的家园
					
					
				}
					
			}
	});
	
	//自动登录功能
	function autoLogin(){
		
		var param = {
			'method' : 'autoLogin'
		};
		
		var data = {
			'url' : 'userInfo.do',
			'type' : 'post',
			'param' : param,
			'dataType' : 'json',
			'async'  : true,
			'beforeSend' : null,
			'success' : success,
			'failure' : failure
		}
		Util.sendRequest(data);
		function success(data){
			if(data['account']){
				var avatar = data['avatar'];
				if(avatar){
					$('.headDiv').find('img').attr('src',avatar);
				}else{
					$('.headDiv').find('img').attr('src','./images/vistor.png');
				}
				$('#showNickname').text(data['nickname']);
				$('.headDiv').find('input[name=login]').val('用户退出').attr('name','logout');
			}
		}
		function failure(){
			
		}
	}
	autoLogin();
	
})();

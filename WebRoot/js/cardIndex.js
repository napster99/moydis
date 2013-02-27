//@charset "utf-8";
/**
 * 帖子专区模块
 * zxj 2012-11-26 21:46 星期一
 */
(function(){
	/*  左侧导航栏 事件  */
	var navLis = $('.cardLeftNav').find('li'),
		navTitleA = $('.cardTitleNav').find('a');
	
	navLis.hover(function(){
		var curName = $(this).attr('name'),
			cur = $(this).attr('cur');
		if(curName == "cardIndex" || cur == 'true') return;
		navLis.css('background','').css('color','');
		$('.cardLeftNav').find('li[name=cardIndex]');
		for(var i=0; i<navLis.length; i++){
			if(navLis.eq(i).attr('cur') == 'true'){
				navLis.eq(i).css('background','#fff');
			}
		}
		
		$(this).css('background','#fff').css('cursor','pointer');
	},function(){
		var curName = $(this).attr('name'),
			cur = $(this).attr('cur');
		if(curName == "cardIndex" || cur == 'true') return;
		$(this).css('background','').css('color','');
		$('.cardLeftNav').find('li[name=cardIndex]');
		for(var i=0; i<navLis.length; i++){
			if(navLis.eq(i).attr('cur') == 'true'){
				navLis.eq(i).css('background','#fff');
			}
		}
	}).click(function(){
		var curName = $(this).attr('name');
		if(curName == "cardIndex") return;
		navLis.css('background','').css('color','');
		$('.cardLeftNav').find('li[name=cardIndex]');
		$(this).css('background','#fff');
		navLis.attr('cur','false');
		$(this).attr('cur','true');
//		window.location.href = "./cardIndex.jsp?block="+curName
		showWitchBlock(curName);
	});
	var block = href.getParam("block");
	
	w(block);
	
	function w(block){
		$('.card-detail').hide();
		$('.card-classify').show();
		if((block == 'cardIndex' && !href.getParam('cardId')  )  ||  block == 'allCard'  ){
			navLis.eq(1).trigger('click');
		}else if(block == 'newsCard'){
			navLis.eq(2).trigger('click');
		}else if(block == 'hotCard'){
			navLis.eq(3).trigger('click');
		}else if(block == 'sendCard'){
			navLis.eq(4).trigger('click');
		}else{
			var cardID = href.getParam('cardId');
			showCardDetail(cardID);
		}
	}
	
	//标题导航栏事件监听
	navTitleA.click(function(){
		var name = this.name;
		w(name);
	});
	
	function showWitchBlock(block){
		var param = {
			'method' : ''
		}
		$('.cardShowContent').find('div[name=cards]').show();
		$('.cardShowContent').find('div[name=sendCardContent]').hide();
		
		switch(block){
			case 'allCard':
				navTitleA.eq(1).text('全部分类').attr('name','allCard');
				param['method'] = 'getAllCard'; 
				break;
			case 'newsCard':
				navTitleA.eq(1).text('最新帖子').attr('name','newsCard');
				param['method'] = 'getNewsCard';
				param['count'] = 10;
				break;
			case 'hotCard':
				navTitleA.eq(1).text('热帖排行').attr('name','hotCard');
				param['method'] = 'getHotCard'; 
				param['count'] = 10;
				break;
			case 'sendCard':
				navTitleA.eq(1).text('我要发帖').attr('name','sendCard');
				param['method'] = 'sendCard'; 
				$('.cardShowContent').find('div[name=cards]').hide();
				$('.cardShowContent').find('div[name=sendCardContent]').show();
				break;
			default:
				method = 'getAllCard';	 
		}
		
		var data = {
			'url' : 'cardInfo.do',
			'type' : 'post',
			'param' : param,
			'dataType' : 'json',
			'async'  : true,
			'beforeSend' : null,
			'success' : renderBlock
		}
		if(param['method'] != 'sendCard') {
			Util.sendRequest(data);
		}
		//渲染右侧模块
		function renderBlock(data){
//			alert('返回信息'+$.toJSON(data));
			$('.cardShowContent').find('div[name=cardShowContent]').hide();
			$('.cardShowContent').find('div[name=cards]').show();
			
			var $ul = $('.cardShowContent').find('ul'),
				htmlArr = [],
				obj = {};  //存放uid cardid
				
			$.each(data,function(key,val){
				var cardTitle = val['cardTitle'],
					cardContent = val['cardContent'],
					userId = val['userId'],
					cardId = val['cardId'],
					clickNum = val['clickNum'],
					sendTime = val['sendTime'];
				if(!obj[cardId]) obj[cardId] = {};
				
				obj[cardId]['cardId'] = cardId;
				obj[cardId]['userId'] = userId;
				
				htmlArr.push(' <li class="clearfix">  										 ');
				htmlArr.push('		<img src="./images/vistor.png" />	 ');
				htmlArr.push('		<dl>									 ');
				htmlArr.push('			<dt>'+cardTitle+'</dt>				 ');
				htmlArr.push('  		<dd><a href="./cardIndex.jsp?block=cardDetail&cardId='+cardId+'" title="点击查看">'+cardContent+'</a></dd>			 ');
				htmlArr.push(' 		</dl>									 ');
				htmlArr.push('		<div name="cardstatus_'+userId+'" class="cardStutas">				 ');
				htmlArr.push('		发表人：<span name="nickname">Morrison</span>	');
				htmlArr.push('		发表时间：<span name="sendtime">'+sendTime+'</span>	');
				htmlArr.push('		回复数：<span name="replynum">0</span>	');
				htmlArr.push('		点击数：<span name="clicknum">'+clickNum+'</span>	');
				htmlArr.push('		</div>											');
				htmlArr.push(' </li> 												');
			});
			
			$ul.html(htmlArr.join(''));
			
			//获取对应的帖子信息 发表人
			$.each(obj,function(key,val){
				var uid = val['userId'];
				var param = {
					'method' : 'getUserInfo',
					'account' : uid
				}
				var data = {
					'url' : 'userInfo.do',
					'type' : 'post',
					'param' : param,
					'dataType' : 'json',
					'async'  : true,
					'beforeSend' : null,
					'success' : function(data){
						var nickname = data['nickname'];
						var avatar = data['avatar'];
						$('div[name=cardstatus_'+data['account']+']').find('span[name=nickname]').text(nickname);
						if(avatar){
							$('div[name=cardstatus_'+data['account']+']').prevAll('img').attr('src',avatar);
						}else{
							$('div[name=cardstatus_'+data['account']+']').prevAll('img').attr('src','./images/vistor.png');
						}
					}
				}
				Util.sendRequest(data);
			});
			
			//获取对应的帖子的回复数
			$.each(obj,function(key,val){
				var cardId = val['cardId'],
					userId = val['userId'];
				var param = {
					'method' : 'getReplyCount',
					'cardId' : cardId,
					'userId' : userId
				}
				var data = {
					'url' : 'cardReplyInfo.do',
					'type' : 'post',
					'param' : param,
					'dataType' : 'json',
					'async'  : true,
					'beforeSend' : null,
					'success' : function(data){
//						{"count":0,"userId":"22"}
						$('div[name=cardstatus_'+data['userId']+']').find('span[name=replynum]').text(data['count']);
					}
				}
				Util.sendRequest(data);
			});
			
			
			
		}
	}
	
	
	//显示单独帖子及回复
	function showCardDetail(cardID){
		var oUserId = '',uids = [], owner = '';
		navTitleA.eq(1).text('帖子明细').attr('name','detail');
		$('#cardReplyDiv').find('.reply-btn').find('input[name=reply]').data('cardId',cardID);
		$('#cardReplyDiv').find('textarea').val('');
		$('.card-classify').hide();
		$('.card-detail').show();
		
		/* Ajax 请求1 通过cardId 获得帖子信息            */		
		var param1 = {
			'method' : 'getCardInfo',
			'cardId' : cardID
		}
		
		var data1 = {
			'url' : 'cardInfo.do',
			'type' : 'post',
			'param' : param1,
			'dataType' : 'json',
			'async'  : false,
			'beforeSend' : null,
			'success' : function(data){
	//			{"id":1,"userId":"11","cardId":"111","clickNum":0,"cardTitle":"111111111111111111111111111111111",
	//			"cardContent":"111111111111111111111111111111111111111111111","sendTime":"2012-11-23"}
				//1. 加载详细帖子 头部信息   点击数  回复数  及帖子标题
				$('.card-detail').find('.click-num').text(data['clickNum']);	
				$('.card-detail').find('.card-title-name').text(data['cardTitle']);
	//			$('.card-detail').find('.reply-num').find('span').text('222');
				owner = data['userId'];
				uids.push(data['userId']);
				var htmlArr = [];
				
				htmlArr.push(' <div name="card_'+data['userId']+'" class="cardDiv clearfix">   ');
					htmlArr.push(' 		<div class="leftDiv clearfix">   ');
					htmlArr.push(' 			<img class="card-head-img" src="./images/vistor.png" />   ');
					htmlArr.push(' 			<div class="card-nickname">xxxx</div>  ');
					htmlArr.push(' 			<p name="userInfo" class="wb">坚持不要脸是一种生活态度</p>   ');
					htmlArr.push(' 			<p name="ranks">等级：<span>一代宗师</span></p>   ');
					htmlArr.push('		</div>');
					
					htmlArr.push('     <div class="rightDiv">');
					htmlArr.push('     		<div class="floorInfo">');
					htmlArr.push('     				<span class="replyCls">发表于：'+data['sendTime']+'</span>');
					
					htmlArr.push('    				<span class="floorCls">楼主</span> ');	
					
					htmlArr.push('    		</div> ');
					htmlArr.push('     		<div class="cardContent">'+data['cardContent']+'</div>');
					htmlArr.push('     </div>');
					htmlArr.push(' </div>    ');
				
				 $('#owner_info').html(htmlArr.join(''));
					
			}
		}
		Util.sendRequest(data1);
		
		
		/* Ajax 请求2 通过cardId 获得回复帖子信息  包括用户id        */		
		var param2 = {
			'method' : 'getCardReply',
			'cardId' : cardID
		}
		
		var data2 = {
			'url' : 'cardReplyInfo.do',
			'type' : 'post',
			'param' : param2,
			'dataType' : 'json',
			'async'  : false,
			'beforeSend' : null,
			'success' : function(data){
//	[
//	{"id":1,"userId":"22","cardId":"55","replyContent":"hahahahahhahahahhahahhahh","replyTime":"2012-12-04"},
//]
			var htmlArr = [], layer = 1;
				$.each(data,function(key,val){
					uids.push(val['userId']);
					
					htmlArr.push(' <div name="card_'+val['userId']+'" class="cardDiv clearfix">   ');
					htmlArr.push(' 		<div class="leftDiv clearfix">   ');
					htmlArr.push(' 			<img class="card-head-img" src="./images/vistor.png" />   ');
					htmlArr.push(' 			<div class="card-nickname">xxxx</div>  ');
					htmlArr.push(' 			<p name="userInfo" class="wb" >坚持不要脸是一种生活态度</p>   ');
					htmlArr.push(' 			<p name="ranks">等级：<span>一代宗师</span></p>   ');
					htmlArr.push('		</div>');
					
					htmlArr.push('     <div class="rightDiv">');
					htmlArr.push('     		<div class="floorInfo">');
					htmlArr.push('     				<span class="replyCls">回复于：'+val['replyTime']+'</span>');
					
					if(layer == 1)
						htmlArr.push('    				<span class="floorCls">沙发</span> ');	
					else
						htmlArr.push('    				<span class="floorCls">#'+layer+'楼</span> ');
					
					htmlArr.push('    		</div> ');
					htmlArr.push('     		<div class="cardContent">'+val['replyContent']+'</div>');
					htmlArr.push('     </div>');
					htmlArr.push(' </div>    ');
					
					layer++;
				});
				
				$('.card-detail').find('.reply-num').find('span').text(layer-1);
//				$('#owner_info').after(htmlArr.join(''));
				$('#replyArea').html(htmlArr.join(''));
			}
		}
		
		Util.sendRequest(data2);
		
		/* Ajax 请求3 通过uId 获得回复用户基本信息        */		
		
		for(var i=0; i<uids.length; i++){
			
			getReplyUserInfo(uids[i]);
			
		}
		
	}
	
	/* 获取楼主及回复人的基本信息 */
	function getReplyUserInfo(userid){
		var param = {
			'method' : 'getUserInfo',
			'account' : userid
		}
		
		var data = {
			'url' : 'userInfo.do',
			'type' : 'post',
			'param' : param,
			'dataType' : 'json',
			'async'  : true,
			'beforeSend' : null,
			'success' : function(data){
				var container = $('div[name=card_'+data['account']+']');
				if(data['avatar']) //有头像的话 显示头像 否侧显示默认头像
					container.find('.leftDiv').find('img').attr('src',data['avatar']);
				container.find('.card-nickname').text(data['nickname']);
				if(data['userInfo']){
					container.find('p[name=userInfo]').text(data['userInfo']);
				}else{
					container.find('p[name=userInfo]').text('暂无');					
				}
				container.find('p[name=ranks]').find('span').text(Config[data['ranks']]);
			}
		}
		
		Util.sendRequest(data);
		
		
		
	}
	
	
	//帖子回复功能
	
	var  cardReplyFun   = {
		
		init : function(){
			cardReplyFun.addEventListener();
		},
		container : $('#cardReplyDiv'),
		addEventListener : function(){
			var self = this;
			this.container.find('.reply-btn').find('input').live('click',function(){
				var name = this.name;
				if(name == 'reply'){
					var content = self.container.find('.reply-textarea').val();
					if(!$.trim(content)){
						self.container.find('textarea').css('border','1px solid red');
						self.container.find('textarea').next().show();
						return;
					}
					var cardId = $(this).data('cardId');				
					var param = {
						'method' : 'replyCard',
						'replyContent' : content,
						'cardId'  : cardId
					}
					var data = {
						'url' : 'cardReplyInfo.do',
						'type' : 'post',
						'param' : param,
						'dataType' : 'text',
						'async'  : true,
						'beforeSend' : function(){ Util.showTip("正在提交...请稍后！")  },
						'success' : function(data){
							if(data == 'nologin'){
								Util.hideTip();
								Util.maskTip($('body'),$('#loginBlock'));						
							}else if(data == 'ok'){
								Util.showTip("回复成功！");
								setTimeout(function(){
									Util.hideTip();
									showCardDetail(cardId);
								},1000);
							}
						}
					}
					Util.sendRequest(data);
				}else{
					self.container.find('.reply-textarea').val('');
					self.container.find('textarea').css('border','');
					self.container.find('textarea').next().hide();
				}
				
			});
			
			this.container.find('textarea').keyup(function(){
				if($.trim($(this).val())){
					$(this).css('border','');
					$(this).next().hide();
				}else{
					$(this).css('border','1px solid red');
					$(this).next().show();
				}
			});
			
		}
		
	}
	// END 帖子回复功能
	new cardReplyFun.init();
	
	
	
	var sendCard = {
		
		init : function(){
			
			sendCard.addEventListener();
		},
		
		addEventListener : function(){
			var container = $('div[name=sendCardContent]');
			
			container.find('.relayBtn').find('input').click(function(){
				var name = this.name,
				titleName = container.find('.cardTitle').find('input').val(),
				cardContent = container.find('.cardContent').find('textarea').val();
				if(name == 'send'){
					if(sendCard.checkCardInfo(titleName,cardContent)){
						//发送ajax请求
						var param = {
							'method' : 'sendCard',
							'cardTitle' : titleName,
							'cardContent' : cardContent
						}
						
						var data = {
								'url' : 'cardInfo.do',
								'type' : 'post',
								'param' : param,
								'dataType' : 'text',
								'async'  : true,
								'beforeSend' : function(){ Util.showTip("正在提交...请稍后！")  },
								'success' : function(data){
									if(data == 'nologin'){
										Util.hideTip();
										Util.maskTip($('body'),$('#loginBlock'));						
									}else if(data == 'ok'){
										Util.showTip("发表成功！");
										setTimeout(function(){
											Util.hideTip();
											container.find('.cardTitle').find('input').css('border','').val('');
											container.find('.cardContent').find('textarea').css('border','').val('');
										},1000);
									}
								}
							}
							Util.sendRequest(data);
					}
				}else if(name == 'cancel'){
					container.find('.cardTitle').find('em').fadeOut(1000);
					container.find('.cardTitle').find('input').css('border','').val('');
					container.find('.cardContent').find('textarea').css('border','').val('');
				}
			});
			
			//title事件监听  textarea事件监听
			container.find('.cardTitle').find('input').keyup(function(){
				if($(this).val()){
					$(this).css('border','');
					container.find('.cardTitle').find('em').fadeOut(1000);
				}
			});
			
			container.find('.cardContent').find('textarea').keyup(function(){
				if($(this).val()){
					$(this).css('border','');
				}
			});
			
		},
		
		checkCardInfo : function(titleName,cardContent){
			if(!titleName || titleName.length > 100){
				 $('div[name=sendCardContent]').find('.cardTitle').find('input').css('border','1px solid red');
				 $('div[name=sendCardContent]').find('.cardTitle').find('em').show();
				
				 if(!cardContent){
					$('div[name=sendCardContent]').find('.cardContent').find('textarea').css('border','1px solid red');
					return false;
				}
				 return false;
			}
			
			 if(!cardContent){
				$('div[name=sendCardContent]').find('.cardContent').find('textarea').css('border','1px solid red');
				return false;
			}
			
			return true;
			
		}
		
		
		
	}
	
	new sendCard.init();
	
})();









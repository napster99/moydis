//@charset "utf-8";
/**
 * 首页模块（最新动态  热帖排行  联盟排行  论坛公告）
 * zxj 2012-11-21 22:33 星期三
 */
(function(){
	var user = {};
	
	
	//***************首页样式相关***********************
	var hotCardLis = $('#hotCard').find('ul li'); 
	hotCardLis.click(function(){
		hotCardLis.css('background','');
		$(this).css('background','#D3D3D3');
	});
	
	function getNicknameByUid(uids,setUser){
			var param = {
				'method' : 'getUsers',
				'uids'	: uids.join(',')
			}
			
			var data = {
				'url' 		:  'userInfo.do',
				'type'		: 'post',
				'param' 	: param,
				'dataType'  : 'json',
				'async'  	: true,
				'beforeSend': null,
				'success' 	: setUser
			}
			
			Util.sendRequest(data);	
			
		}
	
	
	//****************最新动态******************************
	var newsCard = function(){
		var $container = $('#newsCard');
		var $content = $container.find('.contentContent');
		
		this.init = function(){
			this.sendRequest();
		}
		
		this.sendRequest = function(){
			var param = {
				'method' : 'getNewsCard',
				'count' : 6
			}
			var data = {
				'url' : 'cardInfo.do',
				'type' : 'post',
				'param' : param,
				'dataType' : 'json',
				'async'  : true,
				'beforeSend' : null,
				'success' : this.renderData
			}
			
			Util.sendRequest(data);	
		}
		
		this.renderData = function(data){
			var htmlArr = [] , uids = [];
			htmlArr.push('<ul>');
			$.each(data,function(key,val){
				var cardTitle = val['cardTitle'];
				if(val['cardTitle'].length > 15 ){
					cardTitle = val['cardTitle'].substring(0,20) + '...';
				}
				htmlArr.push('<li>');
				htmlArr.push('<span uid="'+val['userId']+'" name="nickname">""</span>');
				htmlArr.push('发表了<a href="./cardIndex.jsp?block=cardIndex&cardId='+val['cardId']+'" cid="'+val['cardId']+'" name="cardTitle" title="'+val['cardTitle']+'">『'+cardTitle+'』</a> ');
				htmlArr.push(' <span name="time">'+val['sendTime']+'</span> ');
				htmlArr.push('</li>');
				user[val['userId']] = val['userId'];
				uids.push(val['userId']);
			});
			htmlArr.push('</ul>');
			
			$('#newsCard').find('.contentContent').html(htmlArr.join(''));
			getNicknameByUid(uids,function(data){
				$.each(data,function(key , val){
					$content.find('li').eq(key).find('span').eq(0).text('"'+val['nickname']+'"');
				})
			});
		}
		
		
		
		
	}
	
	
	//****************热帖排行******************************
	var hotCard = function(){
		var $container = $('#hotCard');
		var $content = $container.find('.contentContent');
	
		
		this.init = function(){
			this.sendRequest();
		}
		
		this.sendRequest = function(){
			var param = {
				'method' : 'getHotCard',
				'count' : 6
			}
			
			var data = {
				'url' : 'cardInfo.do',
				'type' : 'post',
				'param' : param,
				'dataType' : 'json',
				'async'  : true,
				'beforeSend' : null,
				'success' : this.renderData
			}
			
			Util.sendRequest(data);	
		}
		
		this.renderData = function(data){
			$container.find('img').hide();
			$content.find('ul').show();
			var  uids = [];
			$.each(data,function(key,val){
				try{
				var cardTitle = val['cardTitle'];
				if(val['cardTitle'].length > 15 ){
					cardTitle = val['cardTitle'].substring(0,20) + '...';
				}
				$content.find('li').eq(key).find('a[name=cardTitle]').text(cardTitle).attr('href','./cardIndex.jsp?block=cardIndex&cardId='+val['cardId']).attr('title',val['cardTitle']);   // 热帖标题
				$content.find('li').eq(key).find('span[name=clickNum]').text(val['clickNum']); //热帖点击数
				$content.find('li').eq(key).find('span[name=replyCount]').text(val['replyNum'] - 1); //热帖回复数
				
				$content.find('li').eq(key).attr('id','hot_'+val['userId']);
				
				user[val['userId']] = val['userId'];
				uids.push(val['userId']);
				}catch(e){alert(e.message)}
			});
			getNicknameByUid(uids,function(data){
				$.each(data,function(key,val){
					$('#hot_'+val['account']).find('span[name=hotnickname]').text(val['nickname']);
				});
			});
			
		}
		
		
		
		
	}
	
	
	try{
		new newsCard().init();
		
		new hotCard().init();
		
	}catch(e){
		alert(e.message)
	}
	
	
	
})();


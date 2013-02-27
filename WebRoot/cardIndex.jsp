<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<link href="./css/base.css" rel="stylesheet" type="text/css" />
		<link href="./css/cardIndex.css" rel="stylesheet" type="text/css" />
		<link href="./css/publicCard.css" rel="stylesheet" type="text/css" />
	</head>

	<body>
		<jsp:include page="head.html"></jsp:include>
		<div id="content" class="clearfix">
			<div class="cardIndex clearfix">
				<div class="cardTitleNav">
					>
					<a name="allCard" href="./cardIndex.jsp?block=cardIndex">帖子专区</a>>
					<a name="allCard" href="#">全部分类</a>
				</div>

				<div class="cardMain clearfix">
					<!-- 帖子明细  -->
					<div class="card-detail" style="display: none;">
						<div class="cardDiv clearfix">
							<!-- 帖子左侧个人信息 -->
							&nbsp;&nbsp;查看 ：
							<span class="click-num">51221</span>
							<!-- 帖子右侧的帖子信息 -->
							<span class="card-title-name wb">
								xxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsss
							</span>

							<span class="reply-num">回复：<span>455223</span> </span>
						</div>
						<div id="owner_info">


						</div>
						<!-- 帖子回复 区域 -->
						<div id="replyArea">


						</div>
						<!-- 回复帖子 -->
						<div id="cardReplyDiv" class="cardDiv clearfix">
							<!-- 帖子左侧个人信息 -->
							<div class="leftDiv reply-left-div">
							</div>
							<!-- 回复内容 -->
							<div class="rightDiv">
								<textarea class="reply-textarea" placeholder="在此输入帖子内容~~~"></textarea>
								<p
									style="color: red; margin: -25px 100px 0 0; float: right; display: none;">
									*回复内容不能为空...
								</p>
								<div class="reply-btn">
									<input name="reply" type="button" value="回复" />
									<input name="reset" type="button" value="重置" />
								</div>
							</div>
						</div>
						<!-- /回复帖子 -->
					</div>
					<!-- /帖子明细  -->

					<!-- 帖子分类  -->
					<div class="card-classify clearfix">
						<div class="cardLeftNav">
							<ul>
								<li name="cardIndex" style="font-weight: bold;">
									帖子专区
								</li>
								<li cur="false" name="allCard">
									全部分类
								</li>
								<li cur="false" name="newsCard">
									最新帖子
								</li>
								<li cur="false" name="hotCard">
									热帖排行
								</li>
								<li cur="false" name="sendCard">
									我要发帖
								</li>
							</ul>
						</div>
						<div class="cardShowContent">
							<div name="cards">
								<div>
									---------------------------------------------分页栏------------------------------------------
								</div>
								<ul>

								</ul>

								<div>
									---------------------------------------------分页栏------------------------------------------
								</div>

							</div>

							<div name="sendCardContent" class="publishCardDiv">
								<div class="cardTitle">
									<span>帖子标题：</span>
									<input type="text" placeholder="输入帖子标题" />
									<em style="display:none;">Error</em>
								</div>
								<div class="cardContent">
									<span style="float: left;">帖子内容：</span>
									<textarea placeholder="在此输入帖子内容"></textarea>
								</div>
								<div class="relayBtn">
									<input name="send" type="button" value="发表" />
									<input name="cancel" type="button" value="重置" />
								</div>
							</div>
						</div>
					</div>
					<!-- /帖子分类 -->
				</div>
			</div>
		</div>
		<jsp:include page="footer.html"></jsp:include>
	</body>
	<script type="text/javascript" src="./js/lib/jquery-1.4.2.min.js">
	
</script>
	<script type="text/javascript" src="./js/lib/jquery.json-2.2.min.js">
	
</script>
	<script type="text/javascript" src="./js/common/config.js">
	
</script>
	<script type="text/javascript" src="./js/common/initPage.js">
	
</script>
	<script type="text/javascript" src="./js/cardIndex.js">
	
</script>
</html>

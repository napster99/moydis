<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<link href="./css/index.css" rel="stylesheet" type="text/css" />
	</head>

	<body>
		<jsp:include page="head.html"></jsp:include>
		<div id="content">
			<div id="newsCard" class="contentDiv">
				<div class="contentTitle">
					最新动态
				</div>
				<div class="contentContent">
					<img class="contentLoading" src="./images/loading.gif" />
					<!-- ul>
						<li><span name="nickname">"Morrison"</span>发表了<span name="cardTitle" title="点击查看">《Java虚拟机执行机制剖析》</span>   <span name="time">3分钟前</span> </li>
						<li><span name="nickname">"Morrison"</span>发表了<span name="cardTitle" title="点击查看">《Java虚拟机执行机制剖析》</span>   <span name="time">3分钟前</span> </li>
						<li><span name="nickname">"Morrison"</span>发表了<span name="cardTitle" title="点击查看">《Java虚拟机执行机制剖析》</span>   <span name="time">3分钟前</span> </li>
						<li><span name="nickname">"Morrison"</span>发表了<span name="cardTitle" title="点击查看">《Java虚拟机执行机制剖析》</span>   <span name="time">3分钟前</span> </li>
						<li><span name="nickname">"Morrison"</span>发表了<span name="cardTitle" title="点击查看">《Java虚拟机执行机制剖析》</span>   <span name="time">3分钟前</span> </li>
						<li><span name="nickname">"Morrison"</span>发表了<span name="cardTitle" title="点击查看">《Java虚拟机执行机制剖析》</span>   <span name="time">3分钟前</span> </li>
					</ul -->
				</div>
			</div>

			<div id="hotCard" class="contentDiv">
				<div class="contentTitle">
					热帖排行
				</div>
				<div class="contentContent">
					<img class="contentLoading" src="./images/loading.gif" />
					<ul style="display:none;">
						<li><span name="hotCardRank" style="color:#FF0629">1</span> <a href="javascript:;" name="cardTitle" >[Java虚拟机执行机制剖析]</a><span name="numSpan" ><span name="clickNum">1532</span>/<span name="replyCount">34</span></span><span name="hotnickname">Morrison</span></li>
						<li><span name="hotCardRank" style="color:#FF4F02">2</span> <a href="javascript:;" name="cardTitle" >[Java虚拟机执行机制剖析]</a><span name="numSpan" ><span name="clickNum">1532</span>/<span name="replyCount">34</span></span><span name="hotnickname">Morrison</span></li>
						<li><span name="hotCardRank" style="color:#FD9305">3</span> <a href="javascript:;" name="cardTitle" >[Java虚拟机执行机制剖析]</a><span name="numSpan" ><span name="clickNum">1532</span>/<span name="replyCount">34</span></span><span name="hotnickname">Morrison</span></li>
						<li><span name="hotCardRank">4</span> <a href="javascript:;" name="cardTitle" >[Java虚拟机执行机制剖析]</a><span name="numSpan" ><span name="clickNum">1532</span>/<span name="replyCount">34</span></span><span name="hotnickname">Morrison</span></li>
						<li><span name="hotCardRank">5</span> <a href="javascript:;" name="cardTitle" >[Java虚拟机执行机制剖析]</a><span name="numSpan" ><span name="clickNum">1532</span>/<span name="replyCount">34</span></span><span name="hotnickname">Morrison</span></li>
						<li><span name="hotCardRank">6</span> <a href="javascript:;" name="cardTitle" >[Java虚拟机执行机制剖析]</a><span name="numSpan" ><span name="clickNum">1532</span>/<span name="replyCount">34</span></span><span name="hotnickname">Morrison</span></li>
					</ul>
					
				</div>
			</div>

			<div id="userList" class="contentDiv">
				<div class="contentTitle">
					联盟排行
				</div>
				<div class="contentContent">
					<img class="contentLoading" src="./images/loading.gif" />
				</div>
			</div>

			<div id="myNotice" class="contentDiv">
				<div class="contentTitle">
					论坛公告
				</div>
				<div class="contentContent">
					<img class="contentLoading" src="./images/loading.gif" />
				</div>
			</div>
			<br style="clear: both" />
		</div>
		<jsp:include page="footer.html"></jsp:include>
	</body>
	<script type="text/javascript" src="./js/lib/jquery-1.4.2.min.js">
</script>
	<script type="text/javascript" src="./js/lib/jquery.json-2.2.min.js">
</script>
	<script type="text/javascript" src="./js/common/initPage.js">
</script>
	<script type="text/javascript" src="./js/index.js">
</script>
</html>

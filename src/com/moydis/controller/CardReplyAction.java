package com.moydis.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.moydis.entity.CardReply;
import com.moydis.service.CardReplyService;
import com.moydis.temclass.ReplyTemp;

@Controller
@RequestMapping("/cardReplyInfo.do")
public class CardReplyAction {

	private CardReplyService cardReplyService;

	public CardReplyService getCardReplyService() {
		return cardReplyService;
	}

	public void setCardReplyService(CardReplyService cardReplyService) {
		this.cardReplyService = cardReplyService;
	}

	/**
	 * 获取某个帖子的回复数
	 * 
	 * @param cardId
	 * @return
	 */
	@RequestMapping(params = "method=getReplyCount")
	@ResponseBody
	public ReplyTemp getReplyCount(@RequestParam("cardId") String cardId,
			@RequestParam("userId") String userId) {
		int count = this.cardReplyService.getReplyCount(cardId);
		ReplyTemp rt = new ReplyTemp();
		rt.setCount(count);
		rt.setUserId(userId);

		return rt;
		// return userId+"|"+count;

		// return 111;

	}

	/**
	 * 通过帖子id获取回复信息（回复用户id 回复时间 回复内容 ）
	 * 
	 * @param cardId
	 * @return
	 */
	@RequestMapping(params = "method=getCardReply")
	@ResponseBody
	public List<CardReply> getReplyInfoByCardId(
			@RequestParam("cardId") String cardId) {
		return cardReplyService.getCardReplyByCardId(cardId);
	}

	/**
	 * 用户提交回复帖子
	 * 
	 * @param cardId
	 * @return
	 */
	@RequestMapping(params = "method=replyCard")
	@ResponseBody
	public String replyCard(@RequestParam("replyContent") String replyContent, @RequestParam("cardId") String cardId,
			HttpServletRequest request) {
		System.out.println(replyContent);
		String account = (String) request.getSession().getAttribute(
				"moydis_account");

		if (account == null) {
			return "nologin";
		} else {
			CardReply c = new CardReply();
			c.setCardId(cardId);
			c.setUserId(account);
			c.setReplyContent(replyContent);
			cardReplyService.insertCard(c);
			return "ok";
		}
	}

}

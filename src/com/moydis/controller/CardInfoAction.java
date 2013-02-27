package com.moydis.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.moydis.entity.CardInfo;
import com.moydis.service.CardInfoService;

@Controller
@RequestMapping("/cardInfo.do")
public class CardInfoAction {
	
	private CardInfoService cardInfoService;

	public CardInfoService getCardInfoService() {
		return cardInfoService;
	}

	public void setCardInfoService(CardInfoService cardInfoService) {
		this.cardInfoService = cardInfoService;
	}
	/**
	 * 获取首页最新动态帖子
	 * @param count
	 * @return
	 */
	@RequestMapping(params="method=getNewsCard")
	@ResponseBody
	public List<CardInfo> getNewsCard(@RequestParam("count") int count){
		return cardInfoService.newestCards(count);
	}
	/**
	 * 获取全部帖子信息 包括（帖子 id  帖子标题    帖子内容     发表人id  发表时间   点击数）
	 * @return
	 */
	@RequestMapping(params="method=getAllCard")
	@ResponseBody
	public List<CardInfo> getAllCards(){
		return cardInfoService.getAllCards();
	}
	/**
	 * 通过帖子id获取该贴的信息
	 * @param cardId
	 * @return
	 */
	@RequestMapping(params="method=getCardInfo")
	@ResponseBody
	public CardInfo getCardInfoByCardId(@RequestParam("cardId") String cardId){
		return cardInfoService.getCardInfoByCardId(cardId);
	}
	
	/**
	 * 获取热门帖子
	 * @return
	 */
	@RequestMapping(params="method=getHotCard")
	@ResponseBody
	public List<CardInfo> getHotCards(@RequestParam("count") int count){
		
		return cardInfoService.hotestCards(count);
	}
	
	/**
	 * 用户发表帖子
	 * @param cardTitle
	 * @param cardContent
	 * @return
	 */
	@RequestMapping(params="method=sendCard")
	@ResponseBody
	public String sendCard(@RequestParam("cardTitle") String cardTitle, @RequestParam("cardContent") String cardContent,HttpServletRequest request){
				String account = (String) request.getSession().getAttribute(
				"moydis_account");
		
		if (account == null) {
			return "nologin";
		} else {
			cardInfoService.sendCard(cardTitle, cardContent, account);
			return "ok";
		}
	}
	
	
	
}

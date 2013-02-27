package com.moydis.service.impl;

import java.util.List;

import com.moydis.dao.CardDao;
import com.moydis.entity.CardInfo;
import com.moydis.service.CardInfoService;

public class CardInfoServiceImpl implements CardInfoService{

	private CardDao cardDao;


	public CardDao getCardDao() {
		return cardDao;
	}

	public void setCardDao(CardDao cardDao) {
		this.cardDao = cardDao;
	}


	/**
	 * 获取最新动态贴子
	 */
	public List<CardInfo> newestCards(int count) {
		
		return cardDao.getNewsCards(count);
	}
	
	/**
	 * 获得最新热帖
	 */
	public List<CardInfo> hotestCards(int count) {
		return cardDao.hotestCards(count);
	}
	
	/**
	 * 获取全部帖子信息
	 */
	public List<CardInfo> getAllCards() {
		
		return cardDao.getAllCards();
	}
	
	/**
	 * 通过帖子id获取该帖子信息
	 */
	public CardInfo getCardInfoByCardId(String cardId) {
		return cardDao.getCardInfoByCardId(cardId);
	}
	
	/**
	 * 用户发帖
	 */
	public void sendCard(String title, String content,String userID) {
		cardDao.sendCard(title, content, userID);
	}
}

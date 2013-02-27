package com.moydis.service.impl;

import java.util.List;

import com.moydis.dao.CardDao;
import com.moydis.entity.CardInfo;
import com.moydis.entity.CardReply;
import com.moydis.service.CardInfoService;
import com.moydis.service.CardReplyService;

public class CardReplyServiceImpl implements CardReplyService{



	private CardDao cardDao;
	
	public CardDao getCardDao() {
		return cardDao;
	}
	public void setCardDao(CardDao cardDao) {
		this.cardDao = cardDao;
	}
	/**
	 * 获取某个帖子的回复数
	 */
	public int getReplyCount(String cardId) {
		
		return cardDao.getReplyCount(cardId);
	}
	
	/**
	 * 通过帖子id获取回复信息（回复用户id  回复时间   回复内容 ）
	 */
	public List<CardReply> getCardReplyByCardId(String cardId) {
		return cardDao.getCardReplyByCardId(cardId);
	}
	
	/**
	 * 回复帖子
	 */
	public void insertCard(CardReply c) {
		cardDao.insertCard(c);
	}
	
}

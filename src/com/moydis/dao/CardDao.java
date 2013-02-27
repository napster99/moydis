package com.moydis.dao;

import java.util.List;

import com.moydis.entity.CardInfo;
import com.moydis.entity.CardReply;

public interface CardDao {
	
	/**
	 * 获取最新15条消息
	 * @return
	 */
	List<CardInfo> getNewsCards(int count);
	/**
	 * 获取热门帖子
	 * @param count
	 * @return
	 */
	List<CardInfo> hotestCards(int count);
	
	/**
	 * 获取全部帖子
	 * @return
	 */
	List<CardInfo> getAllCards();
	
	/**
	 * 通过传入的帖子id获取该贴的回复数量
	 * @param cardId
	 * @return
	 */
	int getReplyCount(String cardId);
	
	/**
	 * 通过帖子id获取该贴信息
	 * @param cardId
	 * @return
	 */
	CardInfo getCardInfoByCardId(String cardId);
	
	/**
	 * 通过帖子id获取回复信息（回复用户id  回复时间   回复内容 ）
	 * @param cardId
	 * @return
	 */
	List<CardReply> getCardReplyByCardId(String cardId);
	
	/**
	 * 回复帖子
	 * @param c
	 */
	void insertCard(CardReply c);
	
	/**
	 *用户发帖 
	 * @param title
	 * @param content
	 */
	void sendCard(String title,String content ,String userID);
}

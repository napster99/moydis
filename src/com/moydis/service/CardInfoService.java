package com.moydis.service;

import java.util.List;

import com.moydis.entity.CardInfo;

public interface CardInfoService {
	
	/**
	 * 获得最新帖子动态
	 * @param count
	 * @return
	 */
	List<CardInfo> newestCards(int count);
	
	/**
	 * 热门帖子动态
	 * @param count
	 * @return
	 */
	List<CardInfo> hotestCards(int count);
	/**
	 * 获取全部帖子信息
	 * @return
	 */
	List<CardInfo> getAllCards();
	
	/**
	 *  通过帖子id获取该帖子信息
	 * @param cardId
	 * @return
	 */
	CardInfo getCardInfoByCardId(String cardId);
	
	/**
	 * 用户发帖
	 * @param title
	 * @param content
	 */
	void sendCard(String title,String content,String userID);
}

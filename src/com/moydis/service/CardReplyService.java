package com.moydis.service;

import java.util.List;

import com.moydis.entity.CardReply;


public interface CardReplyService {
	/**
	 * 获取某个帖子的回复数
	 * @param cardId
	 * @return
	 */
	int getReplyCount(String cardId);
	
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
}

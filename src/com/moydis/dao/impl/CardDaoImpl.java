package com.moydis.dao.impl;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.moydis.dao.CardDao;
import com.moydis.entity.CardInfo;
import com.moydis.entity.CardReply;
import com.moydis.entity.UserCard;

public class CardDaoImpl extends SqlMapClientDaoSupport implements CardDao {

	/**
	 * 获取最新帖子
	 */
	@SuppressWarnings("unchecked")
	public List<CardInfo> getNewsCards(int count) {
		return getSqlMapClientTemplate().queryForList("selectNewsCards",count);
	}


	/**
	 * 获取热门帖子
	 * @param count
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<CardInfo> hotestCards(int count){
		return getSqlMapClientTemplate().queryForList("selectReplyCount",count);
	}
	/**
	 * 获取全部帖子内容
	 */
	@SuppressWarnings("unchecked")
	public List<CardInfo> getAllCards() {

		return getSqlMapClientTemplate().queryForList("selectAllCards");
	}
	
	/**
	 * 获取某个帖子的回复数
	 */
	public int getReplyCount(String cardId) {
		return Integer.parseInt(String.valueOf(getSqlMapClientTemplate().queryForObject("getReplyCount",cardId)));
	}

	/**
	 * 通过帖子id获取该该贴信息
	 */
	public CardInfo getCardInfoByCardId(String cardId) {
		return (CardInfo)getSqlMapClientTemplate().queryForObject("selectCard", cardId);
	}

	/**
	 * 通过帖子id获取回复信息（回复用户id  回复时间   回复内容 ）
	 */
	@SuppressWarnings("unchecked")
	public List<CardReply> getCardReplyByCardId(String cardId) {
		return	getSqlMapClientTemplate().queryForList("getCardReplyByCardId",cardId);
	}
	
	/**
	 * 用户回复一个帖子
	 * @param userId
	 * @param cardId
	 * @param replyContent
	 */
	public void insertCard(CardReply cardReply){
		try {
			getSqlMapClient().startTransaction();
			getSqlMapClient().insert("insertReplyCard", cardReply);
			int curCount = getReplyCount(cardReply.getCardId());
			Map map = new HashMap();
			map.put("curCount", curCount+1);
			map.put("cardId", cardReply.getCardId());
			getSqlMapClient().update("replyAddOne", map);
			getSqlMapClient().commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			try {
				getSqlMapClient().endTransaction();  // 事务结束
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 用户发帖
	 */
	public void sendCard(String title, String content , String userID) {
		try {
			String cardID = new Date().getTime()+"";
			System.out.println(cardID);
			CardInfo cardInfo = new CardInfo();
			cardInfo.setUserId(userID);
			cardInfo.setCardId(cardID);
			cardInfo.setCardTitle(title);
			cardInfo.setCardContent(content);

			UserCard userCard = new UserCard();
			userCard.setCardId(cardID);
			userCard.setCardTitle(title);
			userCard.setCardContent(content);
			userCard.setUserId(userID);
			
			
			getSqlMapClient().startTransaction();
			getSqlMapClient().insert("insertCardInfo", cardInfo);
			
			getSqlMapClient().insert("insertUserCard", userCard);
			
			getSqlMapClient().commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			try {
				getSqlMapClient().endTransaction();  // 事务结束
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
}

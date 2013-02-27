package com.moydis.entity;

import java.sql.Date;
/**
 * 用户帖子
 * @author nap
 *
 */
public class UserCard {
	
	private int id;
	private String userId;
	private String cardId;
	private String cardTitle;
	private String cardContent;
	private Date sendTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getCardId() {
		return cardId;
	}

	public void setCardId(String cardId) {
		this.cardId = cardId;
	}

	public String getCardTitle() {
		return cardTitle;
	}

	public void setCardTitle(String cardTitle) {
		this.cardTitle = cardTitle;
	}

	public String getCardContent() {
		return cardContent;
	}

	public void setCardContent(String cardContent) {
		this.cardContent = cardContent;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

}

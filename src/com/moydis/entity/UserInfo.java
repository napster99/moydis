package com.moydis.entity;

/**
 * 用户信息
 * 
 * @author nap
 * 
 */
public class UserInfo {

	private int id;
	private String account;
	private String password;
	private String nickname;
	private String avatar;
	private String ranks;
	private String userInfo;
	private String ques;
	private String answer;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getRanks() {
		return ranks;
	}

	public void setRanks(String ranks) {
		this.ranks = ranks;
	}

	public String getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(String userInfo) {
		this.userInfo = userInfo;
	}

	public String getQues() {
		return ques;
	}

	public void setQues(String ques) {
		this.ques = ques;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String toString() {

		return "account=" + account + "  password=" + password;
	}

}

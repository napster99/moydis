package com.moydis.service;

import java.util.List;

import com.moydis.entity.UserInfo;

public interface UserService {
	
	/**
	 * 登陆验证
	 * @param account
	 * @param password
	 * @return
	 */
	boolean login(String account, String password);
	
	/**
	 * 获取等级较高的用户
	 * @param count
	 * @return
	 */
	List<UserInfo> rankHighUser(int count);
	
	/**
	 * 检验账号是否存在
	 * @param account
	 * @return
	 */
	boolean isExsit(String account);
	
	/**
	 * 注册用户
	 * @param strings
	 * @return
	 */
	boolean register(String ... strings);
	
	/**
	 * 根据用户账号获得用户昵称
	 * @param account
	 * @return
	 */
	UserInfo getNicknameByAccount(String account);
	
	List<UserInfo> getUsers(String[] uids);
	
}

package com.moydis.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.moydis.dao.UserDao;
import com.moydis.entity.UserInfo;
import com.moydis.service.UserService;

public class UserServiceImpl implements UserService {

	private UserDao userDao;
	
	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
	/**
	 * 登录验证
	 */
	public boolean login(String account, String password) {
		
		UserInfo user = userDao.findUserByAccount(account);
		
		if(user != null ){
			if(user.getAccount().equals(account) && user.getPassword().equals(password)){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}

	
	/**
	 * 根据用户id获取用户信息
	 */
	public List<UserInfo> getUsers(String[] uids) {
		List<UserInfo> userList = new ArrayList<UserInfo>();
		
 		for(String e : uids){
 			userList.add(userDao.findUserByAccount(e));
 		}
 	
		return userList;
	}

	/**
	 * 级别前几名用户
	 */
	public List<UserInfo> rankHighUser(int count) {
		
		
		return null;
	}
	
	/**
	 * 检测账号是否存在
	 */
	public boolean isExsit(String account) {
		UserInfo userInfo = userDao.findUserByAccount(account);
		if(userInfo == null){
			return false;
		}

		return true;
	}
	/**
	 * 用户注册
	 */
	public boolean register(String ... strings) {
		
		String nickname = strings[0];
		String account = strings[1];
		String pwd = strings[2];
		String rank = strings[3];
		String userInfo = strings[4];
		
		UserInfo u = new UserInfo();
		u.setNickname(nickname);
		u.setAccount(account);
		u.setPassword(pwd);
		u.setRanks(rank);
		u.setUserInfo(userInfo);
		try{
			userDao.insertUserInfo(u);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	/**
	 * 通过用户账号获取单个用户信息
	 */
	public UserInfo getNicknameByAccount(String account) {
		
		return userDao.findUserByAccount(account);
	}

}

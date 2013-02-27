package com.moydis.dao;

import java.util.List;

import com.moydis.entity.UserInfo;

/**
 * 用户相关数据层接口
 * @author nap
 *
 */
public interface UserDao {
		/**
		 * 根据用户账号找到用户信息
		 * @param account
		 * @return
		 */
		UserInfo findUserByAccount(String account);
		
		/**
		 * 获取所有用户信息
		 * @return
		 */
		List<UserInfo> getAllUsers();
		
		/**
		 * 注册用户信息
		 * @param u
		 * @return
		 */
		int insertUserInfo(UserInfo u);
		
		/**
		 * 修改用户信息
		 * @param u
		 * @return
		 */
		int updateUserInfo(UserInfo u);
		
		/**
		 * 删除指定用户信息
		 * @param u
		 * @return
		 */
		int delUserInfo(UserInfo u);
		
		
		
		
}

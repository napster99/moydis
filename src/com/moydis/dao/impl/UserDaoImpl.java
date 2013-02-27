package com.moydis.dao.impl;

import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.moydis.dao.UserDao;
import com.moydis.entity.UserInfo;

public class UserDaoImpl extends SqlMapClientDaoSupport implements UserDao {

	int c = 0 ;
	
	public UserInfo findUserByAccount(String account) {
		return (UserInfo)getSqlMapClientTemplate().queryForObject("selectUser",account);
	}

	public List<UserInfo> getAllUsers() {
		// TODO Auto-generated method stub
		return null;
	}

	public int insertUserInfo(UserInfo u) {
		getSqlMapClientTemplate().insert("insertUser", u);
		return 0;
	}

	public int updateUserInfo(UserInfo u) {
		// TODO Auto-generated method stub
		return 0;
	}

	public int delUserInfo(UserInfo u) {
		// TODO Auto-generated method stub
		return 0;
	}

}

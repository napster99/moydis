package com.moydis.controller;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.moydis.entity.UserInfo;
import com.moydis.service.UserService;

@Controller
@RequestMapping("/userInfo.do")
public class UserInfoAction /*implements Controller*/{

	private UserService userService;
	
	private String viewName;
	
	private static HttpSession session;
	
	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public String getViewName() {
		return viewName;
	}

	public void setViewName(String viewName) {
		this.viewName = viewName;
	}
	
	public void setSession(HttpSession session , String account , String password){
		session.setAttribute("moydis_account", account);
		session.setAttribute("moydis_password", password);
		
	}
	
	/**
	 * 用户登录验证
	 * @param account
	 * @param pwd
	 * @param request
	 * @return
	 */
	@RequestMapping(params="method=login")
	@ResponseBody
	public String login(@RequestParam("account") String account, @RequestParam("pwd") String pwd, HttpServletRequest request){
		
		if(userService.login(account, pwd)){
			
			session = request.getSession();
			setSession(session,account,pwd);
			
			return "successLogin";
		}else{
			return "failureLogin";
		}
		
	}
	/**
	 * 用户登出，删除session
	 * @param account
	 * @param pwd
	 * @param request
	 */
	@RequestMapping(params="method=logout")
	@ResponseBody
	public String logout(@RequestParam("account") String account, @RequestParam("pwd") String pwd , HttpServletRequest request){
		session = request.getSession();
		session.removeAttribute("moydis_account");
		session.removeAttribute("moydis_password");
		
		return "ok";
	}
	
	/**
	 * 通过账号获取用户信息
	 * @param account
	 * @return
	 */
	@RequestMapping(params="method=getUserInfo")
	@ResponseBody
	public UserInfo getUserInfo(@RequestParam("account") String account){
		return userService.getNicknameByAccount(account);
	}
	
	/**
	 * 验证账号是否已经存在
	 * @param account
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(params="method=isExsit")
	@ResponseBody
	public String getAccount(@RequestParam("account") String account, HttpServletRequest request,
			HttpServletResponse response){
		if(userService.isExsit(account)){
			return "Error";
		}else{
			return "OK";
		}

	}
	/**
	 * 用户注册
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(params="method=register")
	@ResponseBody
	public String register(HttpServletRequest request, HttpServletResponse response){
		String nickname = request.getParameter("nickname");
		String account = request.getParameter("account");
		String pwd = request.getParameter("pwd");
		String rank = request.getParameter("rank");
		String userInfo = request.getParameter("userInfo");
		//用户注册成功 设置session
		if(userService.register(nickname,account,pwd,rank,userInfo)){
			 session = request.getSession();
			
			 setSession(session,account,pwd);
			
			
			return "success";
		}else{
			return "failure";
		}
	}
	
	@RequestMapping(params="method=getUsers")
	@ResponseBody
	public List<UserInfo> getUsers(@RequestParam("uids") String uids){
		
		String[] uidArr = uids.split(",");
		
		return userService.getUsers(uidArr);
	}
	
	/**
	 * 自动检测登录情况
	 * @param request
	 * @return
	 */
	@RequestMapping(params="method=autoLogin")
	@ResponseBody
	public UserInfo autoLogin(HttpServletRequest request){
		UserInfo userInfo = new UserInfo();
		session = request.getSession();
		String account = session.getAttribute("moydis_account")+"";
		if(account != null && !"".equals(account)){
			userInfo =  getUserInfo(account);
		}
		return userInfo;
	}
	
	
}

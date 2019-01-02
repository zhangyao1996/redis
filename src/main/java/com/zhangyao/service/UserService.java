package com.zhangyao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zhangyao.dao.UserMapper;
import com.zhangyao.entity.PageBean;
import com.zhangyao.entity.User;

/**
 * @author zhangyao
 * @date Jan 2, 2019
 */
@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;

	public PageBean getAllUser(Integer pageCode, Integer pageSize) {

		PageHelper.startPage(pageCode, pageSize);

		List<User> users = userMapper.selectAll();

		Page<User> page = (Page<User>) users;

		return new PageBean(page.getTotal(), page.getResult());
	}

	public int addUser(User user) {
		return userMapper.insert(user);
	}
	
	public User getUserById(Long id) {
		return userMapper.selectByPrimaryKey(id);
	}
	
	public int editUser(User user) {
		return userMapper.updateByPrimaryKey(user);
	}
	
	public int deleteUserById(Long id) {
		return userMapper.deleteByPrimaryKey(id);
	}
}

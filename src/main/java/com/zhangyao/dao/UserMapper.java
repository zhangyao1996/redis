package com.zhangyao.dao;

import org.apache.ibatis.annotations.Mapper;

import com.zhangyao.entity.User;

import tk.mybatis.mapper.common.BaseMapper;

/**
 * @author zhangyao
 *@date Jan 2, 2019
 */
@Mapper
public interface UserMapper extends BaseMapper<User>{
	
}

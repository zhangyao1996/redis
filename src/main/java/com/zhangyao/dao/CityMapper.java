package com.zhangyao.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.zhangyao.entity.City;

import tk.mybatis.mapper.common.BaseMapper;

/**
 * @author zhangyao
 *@date Dec 28, 2018
 */
@Mapper
public interface CityMapper extends BaseMapper<City>{

	
}

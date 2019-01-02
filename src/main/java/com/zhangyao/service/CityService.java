package com.zhangyao.service;

import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zhangyao.dao.CityMapper;
import com.zhangyao.entity.City;
import com.zhangyao.entity.PageBean;

/**
 * @author zhangyao
 * @date Dec 28, 2018
 */
@Service
public class CityService {
	private static final Logger LOGGER = LoggerFactory.getLogger(CityService.class);

	@Autowired
	private CityMapper cityMapper;

	@Autowired
	private RedisTemplate redisTemplate;

	/*
	 * 获取城市逻辑： 如果缓存存在，从缓存中获取城市信息 如果缓存不存在，从DB中获取城市信息，然后插入缓存
	 */
	public City getCityById(Long id) {
		// 从缓存中获取城市信息
		String key = "city_" + id;
		ValueOperations<String, City> operations = redisTemplate.opsForValue();
		System.out.println("operations" + operations);

		// 获取缓存key
		boolean haskey = redisTemplate.hasKey(key);
		// 缓存存在
		if (haskey) {
			City city = operations.get(key);
			LOGGER.info("从缓存中获取城市信息》》" + city);
			return city;
		} else {
			// 从DB中获取城市信息
			City city = cityMapper.selectByPrimaryKey(id);
			// 插入缓存,并设置缓存时间
			operations.set(key, city, 2, TimeUnit.MINUTES);
			LOGGER.info("城市信息插入缓存中》》" + city);
			return city;
		}
	}

	/*
	 * 添加城市
	 */
	public int addCity(City city) {
		return cityMapper.insert(city);
	}

	/*
	 * 更新城市逻辑 先数据库更新 如果缓存存在，删除 如果缓存不存在，不操作
	 */
	public int updateCity(City city) {
		int result = cityMapper.updateByPrimaryKey(city);
		String key = "city_" + city.getId();
		boolean haskey = redisTemplate.hasKey(key);
		// 缓存中存在信息
		if (haskey) {
			redisTemplate.delete(key);
			LOGGER.info("从缓存中删除城市>>" + city);
		}
		return 0;
	}

	/*
	 * 删除城市逻辑 从数据库中删除城市 如果缓存中存在，则删除
	 */
	public int deleteCity(Long id) {
		int result = cityMapper.deleteByPrimaryKey(id);
		String key = "city_" + id;
		boolean haskey = redisTemplate.hasKey(key);
		if (haskey) {
			redisTemplate.delete(key);
			LOGGER.info("从缓存中删除城市id>>" + id);
		}
		return result;
	}

	public PageBean cityList(Integer pageNumber, Integer pageSize) {
	
		// 使用Mybatis分页插件
		PageHelper.startPage(pageNumber, pageSize);
		// 调用分页查询方法，其实就是查询所有数据，mybatis自动帮我们进行分页计算
		Page<City> page = (Page<City>) cityMapper.selectAll();
		
		return new PageBean(page.getTotal(),page.getResult());

	}

}

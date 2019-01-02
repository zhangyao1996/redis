package com.zhangyao.entity;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;



import lombok.Data;

/**
 * @author zhangyao
 * @date Dec 28, 2018
 */
@Data
@Table(name="city")
//要缓存的 Java 对象必须实现 Serializable 接口，因为 Spring 会将对象先序列化再存入 Redis
public class City implements Serializable{

    /**
     * 城市编号
     */
	@Id
	private Long id;

	/**
	 * 省份编号
	 */
	private Long provinceId;

	/**
	 * 城市名称
	 */
	private String cityName;

	/**
	 * 描述
	 */
	private String description;
}

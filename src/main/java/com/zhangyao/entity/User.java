package com.zhangyao.entity;

import java.io.Serializable;

import javax.persistence.Id;

import lombok.Data;

/**
 * @author zhangyao
 * @date Jan 2, 2019
 */
@Data
public class User implements Serializable {
	
	@Id
	private Long id;
	
	private String username;
	
	private String password;
	
	private String img;
}

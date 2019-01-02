package com.zhangyao.entity;

import java.util.List;

import lombok.Data;

/**
 * @author zhangyao
 *@date Dec 28, 2018
 */
@Data
public class PageBean {

	private long total;
	private List rows;
	/**
	 * @param total
	 * @param data
	 */
	public PageBean(long total, List rows) {
		super();
		this.total = total;
		this.rows = rows;
	}
	
	
}

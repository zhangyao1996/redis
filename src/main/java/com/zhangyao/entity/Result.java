package com.zhangyao.entity;

import lombok.Data;

/**
 * @author zhangyao
 *@date Dec 28, 2018
 */
@Data
public class Result {
	private boolean result;
	private String msg;
	/**
	 * @param result
	 * @param msg
	 */
	public Result(boolean result, String msg) {
		super();
		this.result = result;
		this.msg = msg;
	}
	
}

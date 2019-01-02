package com.zhangyao.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.github.pagehelper.Page;
import com.zhangyao.entity.PageBean;
import com.zhangyao.entity.Result;
import com.zhangyao.entity.User;
import com.zhangyao.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author zhangyao
 * @date Jan 2, 2019
 */
@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	private String src;

	@RequestMapping("/list")
	public String userList() {
		return "user/user";
	}

	@GetMapping("/userList")
	@ResponseBody
	public PageBean getUserList(@RequestParam(value = "pageNumer", required = false) Integer pageCode,
			@RequestParam(value = "pageSize", required = false) Integer pageSize) {
		PageBean pageBean = userService.getAllUser(pageCode, pageSize);
		return pageBean;
	}

	@RequestMapping("/upload")
	@ResponseBody
	public Map<String, Object> upload(MultipartFile file) throws IllegalStateException, IOException {
		System.out.println("upload");
		// 原始图片名称
		String oldFileName = file.getOriginalFilename(); // 获取上传文件的原名
		System.out.println("oldFileName:" + oldFileName);
		// 存储路径
		// E://ZhangYao//spring-boot-redis//src//main//resources//static//lib//img
		String saveFilePath = "E://ZhangYao//spring-boot-redis//src//main//resources//static//lib//img";
		Map<String, Object> map = new HashMap<>();
		// 上传图片
		if (file != null && oldFileName != null && oldFileName.length() > 0) {
			// 新的图片名称
			String newFileName = UUID.randomUUID() + oldFileName.substring(oldFileName.lastIndexOf("."));
			System.out.println("newfilename:" + newFileName);
			// 新图片
			File newFile = new File(saveFilePath + "\\" + newFileName);
			// 将内存中的数据写入磁盘
			file.transferTo(newFile);
			// 将图片返回前端

			map.put("success", "成功");
			map.put("src", newFileName);
			return map;
		} else {
			map.put("error", "图片不合法");
			return map;
		}

	}

	@PostMapping("/add")
	@ResponseBody
	public Result addUser(@RequestBody User user) {
		System.out.println("user" + user);
		try {
			userService.addUser(user);
			return new Result(true, "添加成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new Result(false, "添加失败");
		}

	}

	@GetMapping("/get")
	@ResponseBody
	public User getUserById(Long id) {
		try {
			return userService.getUserById(id);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@PostMapping("/edit")
	@ResponseBody
	public Result editUser(@RequestBody User user) {
		System.out.println("user" + user);
		try {
			userService.editUser(user);
			return new Result(true, "修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new Result(false, "修改失败");
		}

	}

	@DeleteMapping("/delete")
	@ResponseBody
	public Result deleteUserById(Long id) {

		try {
			userService.deleteUserById(id);
			return new Result(true, "删除成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new Result(false, "删除失败");
		}
	}
}

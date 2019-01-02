package com.zhangyao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhangyao.entity.City;
import com.zhangyao.entity.PageBean;
import com.zhangyao.entity.Result;
import com.zhangyao.service.CityService;

/**
 * @author zhangyao
 * @date Dec 28, 2018
 */
@Controller
@RequestMapping("/city")
public class CityController {
	@Autowired
	private CityService cityService;

	@RequestMapping("/")
	public String City() {
		System.out.println("city.html");
		return "city/city";
	}

	@GetMapping("/cityList")
	@ResponseBody
	public PageBean cityList(@RequestParam(value = "pageNumer", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize) {

		System.out.println("num" + pageNumber + "size" + pageSize);
		System.out.println(cityService.cityList(pageNumber, pageSize));
		return cityService.cityList(pageNumber, pageSize);
	}

	// 增
	@PostMapping("/add")
	@ResponseBody
	public Result addCity(@RequestBody City city) {
		System.out.println(city);

		try {
			cityService.addCity(city);
			return new Result(true, "添加成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new Result(false, "添加失败");
		}

	}

	// 删
	@DeleteMapping("/delete")
	@ResponseBody
	public Result deleteCity(Long id) {
		System.out.println("id:" + id);

		try {
			cityService.deleteCity(id);
			return new Result(true, "删除成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new Result(false, "删除失败");
		}
	}

	// 批量删除
	@DeleteMapping("/deleteIds")
	@ResponseBody
	public Result deleteIds(String ids) {
		String[] arr = ids.split(",");
		try {
			for (int i = 0; i < arr.length; i++) {
				cityService.deleteCity(Long.valueOf(arr[i]));
			}
			return new Result(true, "删除成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new Result(false, "删除失败");
		}
	}

	// 改
	@PostMapping("/edit")
	@ResponseBody
	public Result editCity(@RequestBody City city) {
		System.out.println(city);
		try {
			cityService.updateCity(city);
			return new Result(true, "修改成功");
		} catch (Exception e) {
			// TODO: handle exception
			return new Result(false, "修改失败");
		}
	}

	// 查
	@GetMapping("/get")
	@ResponseBody
	public City getCityById(Long id) {
		System.out.println("id:" + id);
		City city = cityService.getCityById(id);
		System.out.println(city);
		return city;
	}

}

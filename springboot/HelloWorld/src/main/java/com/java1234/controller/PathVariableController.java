package com.java1234.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/pathVariable")
public class PathVariableController {
	
	/**
	 * 获取URL路径参数
	 * @param id
	 * @return
	 */
	@RequestMapping("/{id}")
	public ModelAndView getPathVariable(@PathVariable Integer id) {
		ModelAndView mv = new ModelAndView();
		mv.addObject("id", id);
		mv.setViewName("PathVariable");
		return mv;
		
	}

}

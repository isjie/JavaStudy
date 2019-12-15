package com.java1234.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/RequestParam")
public class RequestParamController {

	@RequestMapping("/query")
	public ModelAndView getRequestParam(@RequestParam(value = "name", required = false) String name) {
		ModelAndView mv = new ModelAndView();
		mv.addObject("RequestParam", name);
		mv.setViewName("RequestParam");
		return mv;
		
	}
}

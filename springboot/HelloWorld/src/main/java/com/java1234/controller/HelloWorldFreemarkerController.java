package com.java1234.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/freemarker")
public class HelloWorldFreemarkerController {
	
	@RequestMapping("/say")
	public ModelAndView say() {
		ModelAndView mv = new ModelAndView();
		mv.addObject("msg", "hello Freemarker");
		mv.setViewName("HelloWorld");
		return mv;
		
	}
}

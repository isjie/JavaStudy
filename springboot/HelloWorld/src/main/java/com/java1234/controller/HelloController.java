package com.java1234.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java1234.config.JDBCConfig;

@RestController
@EnableConfigurationProperties(JDBCConfig.class)
public class HelloController {
	
	@Autowired
	JDBCConfig jDBCConfig;

	@RequestMapping("/hello")
	public String start() {
		return "HelloWorld, begin with a good day" + jDBCConfig.getUrl() +jDBCConfig.getDriverClassName();
	}
}

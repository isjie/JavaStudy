package com.itheima.crm.utils;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;
import java.io.IOException;

public class MyTag extends TagSupport {
    @Override
    public int doStartTag() throws JspException {
        JspWriter out = super.pageContext.getOut();
        try {
            out.print("<span>这个是自定义标签输出的内容</span>");
        } catch (IOException e) {
            e.printStackTrace();
        }

        return super.doStartTag();
    }
}

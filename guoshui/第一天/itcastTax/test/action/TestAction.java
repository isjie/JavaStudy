package action;

import service.TestService;

import javax.annotation.Resource;

import static com.opensymphony.xwork2.Action.SUCCESS;

public class TestAction {
    @Resource
    private TestService userService;

    public String execute(){
        userService.say();
        return SUCCESS;
    }


}

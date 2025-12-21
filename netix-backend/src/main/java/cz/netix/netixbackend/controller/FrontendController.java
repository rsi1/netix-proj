package cz.netix.netixbackend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    @RequestMapping(value = { "/", "/{path:^(?!api|static|favicon\\.ico).*}/**" })
    public String forwardReactRoutes() {
        return "forward:/index.html";
    }
}

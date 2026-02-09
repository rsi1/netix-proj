package cz.netix.netixbackend.resus.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

@RequestMapping(value = { "/", "/{path:^(?!api|actuator|static|favicon\\.ico).*}/**" })
public String forwardReactRoutes() {
    return "forward:/index.html";
}

}

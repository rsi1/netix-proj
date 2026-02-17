package cz.netix.netixbackend.admin.dev;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/test-cors")
    public String testCors() {
        return "CORS OK – Backend běží a React má povolený přístup!";
    }
}

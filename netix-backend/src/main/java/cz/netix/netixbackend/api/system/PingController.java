package cz.netix.netixbackend.api.system;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/system")
public class PingController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}


package cz.netix.netixbackend.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    // Response DTO matching the expected frontend structure
    public static class BackendResponse {
        private final String message;
        private final String status;
        private final String version;

        public BackendResponse(String message, String status, String version) {
            this.message = message;
            this.status = status;
            this.version = version;
        }

        public String getMessage() {
            return message;
        }

        public String getStatus() {
            return status;
        }

        public String getVersion() {
            return version;
        }
    }


    public BackendResponse hello() {
        return new BackendResponse(
            "Hello from Spring Boot!",
            "success",
            "1.0.0"
        );
    }
}

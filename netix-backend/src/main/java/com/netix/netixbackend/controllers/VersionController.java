package com.netix.netixbackend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VersionController {

    @GetMapping("/api/version")
    public String getVersion() {
        return "NETIX Backend v1.0.0";
    }
}

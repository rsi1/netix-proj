package cz.netix.netixbackend.api.users.dto;

import java.util.Set;

public record AppUserDto(
        Long id,
        String username,
        boolean enabled,
        Set<String> roles
) {}
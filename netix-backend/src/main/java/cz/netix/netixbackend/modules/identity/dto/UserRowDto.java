package cz.netix.netixbackend.modules.identity.dto;

import java.util.List;

import cz.netix.netixbackend.modules.identity.entity.AppRole;
import cz.netix.netixbackend.modules.identity.entity.AppUser;

public record UserRowDto(
        Long id,
        String username,
        Boolean enabled,
        List<String> roles
) {

    public static UserRowDto from(AppUser u) {

        List<String> roleNames = u.getRoles() == null
                ? List.of()
                : u.getRoles().stream()
                        .map(AppRole::getName)
                        .toList();

        return new UserRowDto(
                u.getId(),
                u.getUsername(),
                u.isEnabled(),
                roleNames
        );
    }
}
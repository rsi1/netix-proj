package cz.netix.netixbackend.admin.dto;

import cz.netix.netixbackend.model.security.AppRole;
import cz.netix.netixbackend.model.security.AppUser;

import java.util.List;

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
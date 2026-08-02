package cz.netix.netixbackend.security;

import jakarta.persistence.*;

@Entity
@Table(name = "app_role")
public class AppRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    private String label;

    @Column(nullable = false)
    private String name;

    protected AppRole() {
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public String getLabel() {
        return label;
    }

    public String getName() {
        return name;
    }
}
package cz.netix.netixbackend.ruian.okres.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
 

@Entity
@Table(name = "okres", schema = "ruian")
@Getter
@Setter
public class Okres {
    @Id
    private Integer kod;        // RÚIAN kód (PK)

    private String nazev;

    @Column(name = "kraj_kod")
    private Integer krajKod;

    private Boolean aktivni;
}
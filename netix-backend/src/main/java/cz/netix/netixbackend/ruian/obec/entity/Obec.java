package cz.netix.netixbackend.ruian.obec.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "obec", schema = "ruian")
@Getter
@Setter
public class Obec {

    @Id
    private Integer kod;        // RÚIAN kód (PK)

    private String nazev;

    @Column(name = "okres_kod")
    private Integer okresKod;

    private Boolean aktivni;
}

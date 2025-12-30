package cz.netix.netixbackend.ruian.obec.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "obec", schema = "ruian")
@Getter
@Setter
@NoArgsConstructor

public class Obec {
    @Id
    @Column(name = "kod", nullable = false)
    private Integer kod;

    @Column(name = "nazev", nullable = false)
    private String nazev;

    @Column(name = "okres_kod", nullable = false)
    private Integer okresKod;

    @Column(name = "aktivni", nullable = false)
    private boolean aktivni;

    // Zachování `getAktivni()` pro kompatibilitu (Lombok vytvoří i `isAktivni()`)
    public boolean getAktivni() {
        return aktivni;
    }
}
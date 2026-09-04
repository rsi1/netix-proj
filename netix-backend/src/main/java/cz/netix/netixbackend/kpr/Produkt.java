package cz.netix.netixbackend.kpr;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "k_produkt")
public class Produkt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30)
    private String kod;

    @Column(nullable = false, length = 150)
    private String nazev;

    @Column(length = 500)
    private String popis;

    @Column(precision = 10, scale = 3)
    private BigDecimal hmotnost;

    @Column(length = 10)
    private String jednotka;

    @Column(precision = 12, scale = 2)
    private BigDecimal cena;

    @Column(nullable = false)
    private boolean aktivni = true;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    protected Produkt() {
    }

    public Long getId() {
        return id;
    }

    public String getKod() {
        return kod;
    }

    public void setKod(String kod) {
        this.kod = kod;
    }

    public String getNazev() {
        return nazev;
    }

    public void setNazev(String nazev) {
        this.nazev = nazev;
    }

    public String getPopis() {
        return popis;
    }

    public void setPopis(String popis) {
        this.popis = popis;
    }

    public BigDecimal getHmotnost() {
        return hmotnost;
    }

    public void setHmotnost(BigDecimal hmotnost) {
        this.hmotnost = hmotnost;
    }

    public String getJednotka() {
        return jednotka;
    }

    public void setJednotka(String jednotka) {
        this.jednotka = jednotka;
    }

    public BigDecimal getCena() {
        return cena;
    }

    public void setCena(BigDecimal cena) {
        this.cena = cena;
    }

    public boolean isAktivni() {
        return aktivni;
    }

    public void setAktivni(boolean aktivni) {
        this.aktivni = aktivni;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
CREATE TABLE netx.k_baleni (
    id BIGINT NOT NULL AUTO_INCREMENT,

    vyroba_id BIGINT NOT NULL,
    produkt_id BIGINT NOT NULL,

    datum_baleni DATE NOT NULL,

    pocet_kusu INT NOT NULL,

    poznamka VARCHAR(255) NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_k_baleni_vyroba
        FOREIGN KEY (vyroba_id)
        REFERENCES netx.k_vyroba(id),

    CONSTRAINT fk_k_baleni_produkt
        FOREIGN KEY (produkt_id)
        REFERENCES netx.k_produkt(id)
);
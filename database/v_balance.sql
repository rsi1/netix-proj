CREATE TABLE v_balance (
    id BIGINT NOT NULL AUTO_INCREMENT,

    datum DATE NOT NULL,

    typ_id BIGINT NOT NULL,

    castka DECIMAL(12,2) NOT NULL,

    popis VARCHAR(500),

    produkt_id BIGINT NULL,
    surovina_id BIGINT NULL,

    mnozstvi DECIMAL(12,3) NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_v_balance_typ
        FOREIGN KEY (typ_id)
        REFERENCES app_domain_value(id)
);
CREATE TABLE netx.k_vyroba (
    id BIGINT NOT NULL AUTO_INCREMENT,

    datum_vyroby DATE NOT NULL,
    cas_vyroby TIME NULL,

    mnozstvi_kg DECIMAL(12,3) NOT NULL,

    sarze VARCHAR(50) NOT NULL,
    datum_spotreby DATE NULL,

    poznamka VARCHAR(500) NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uk_k_vyroba_sarze (sarze)
);
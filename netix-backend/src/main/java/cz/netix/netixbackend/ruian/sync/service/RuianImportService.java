package cz.netix.netixbackend.ruian.sync.service;

import cz.netix.netixbackend.ruian.obec.entity.Obec;
import cz.netix.netixbackend.ruian.obec.repository.ObecRepository;
import cz.netix.netixbackend.ruian.sync.exception.RuianImportException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class RuianImportService {

    private final ObecRepository obecRepository;

    @Transactional
    public void importAll() {
        importObce();
    }

    private void importObce() {
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(
                        getClass().getResourceAsStream("/ruian/OBEC.csv"),
                        StandardCharsets.UTF_8
                )
        )) {

            br.lines()
              .skip(1) // hlavička CSV
              .forEach(line -> {
                  String[] c = line.split(";");

                  Obec obec = new Obec();
                  obec.setKod(Integer.valueOf(c[0]));
                  obec.setNazev(c[1]);
                  obec.setOkresKod(Integer.valueOf(c[2]));
                  obec.setAktivni(true);

                  obecRepository.save(obec);
              });

        } catch (Exception e) {
            throw new RuianImportException("Import RÚIAN selhal", e);
        }
    }
}

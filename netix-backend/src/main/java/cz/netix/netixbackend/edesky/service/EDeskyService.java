package cz.netix.netixbackend.edesky.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import cz.netix.netixbackend.edesky.dto.EDeskyResponseDto;

@Service
@Profile("edesky")
public class EDeskyService {

    private static final Logger logger = LoggerFactory.getLogger(EDeskyService.class);

    // API key z application.properties
    @Value("${edesky.api.key}")
    private String apiKey;

    public EDeskyResponseDto search(String query) {

        // pro kontrolu:
        System.out.println("Používám eDesky API KEY: " + apiKey);

 
        logger.info("📄 eDesky – začínám hledat výraz: {}", query);
        logger.debug("Používám API klíč: {}", apiKey);

        // Zatím vrátíme fake data, aby backend běžel
        EDeskyResponseDto dto = new EDeskyResponseDto();
        dto.setTitle("Výsledek pro: " + query);
        dto.setMunicipality("N/A");
        dto.setUrl("N/A");
        dto.setResultsCount(0);

        logger.info("📄 eDesky – vracím fake výsledek, API zatím není volané.");

        return dto;
    }
}

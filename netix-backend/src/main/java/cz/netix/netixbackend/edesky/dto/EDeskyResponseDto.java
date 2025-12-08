package cz.netix.netixbackend.edesky.dto;

public class EDeskyResponseDto {
    private String title;
    private String municipality;
    private String url;
    private int resultsCount;

  // ----- GETTERS & SETTERS -----

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getResultsCount() {
        return resultsCount;
    }

    public void setResultsCount(int resultsCount) {
        this.resultsCount = resultsCount;
    }
       
}


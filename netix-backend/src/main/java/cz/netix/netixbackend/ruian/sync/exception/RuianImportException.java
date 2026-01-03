package cz.netix.netixbackend.ruian.sync.exception;

public class RuianImportException extends RuntimeException {
    public RuianImportException(String message) {
        super(message);
    }

    public RuianImportException(String message, Throwable cause) {
        super(message, cause);
    }
}

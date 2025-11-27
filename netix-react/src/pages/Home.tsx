import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>("Načítám...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        setMessage(text);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Nepodařilo se načíst zprávu z backendu.");
      });
  }, []);

  return (
    <div>
      <h1>NETIX – React + TypeScript + Java</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>
          <strong>Backend říká:</strong> {message}
        </p>
      )}
    </div>
  );
};

export default Home;
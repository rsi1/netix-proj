import { useEffect, useState } from "react";
import axios from "axios";

export default function HelloApi() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/hello")
      .then(response => setMessage(response.data))
      .catch(error => console.error("API Error:", error));
  }, []);

  return (
    <div>
      <h2>Backend zpráva:</h2>
      <p>{message}</p>
    </div>
  );
}
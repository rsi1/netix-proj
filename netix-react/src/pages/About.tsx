const About: React.FC = () => {
  return (
    <div>
      <h2>O aplikaci</h2>
      <p>
        Toto je testovací NETIX frontend v Reactu + TypeScriptu. Data bere z
        Java backendu (Spring Boot) na <code>http://localhost:8080/api/hello</code>.
      </p>
    </div>
  );
};

export default About;

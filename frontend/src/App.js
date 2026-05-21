function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        DevOps Monitoring Dashboard
      </h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>CPU Usage</h2>
          <p>Loading...</p>
        </div>

        <div style={styles.card}>
          <h2>Memory Usage</h2>
          <p>Loading...</p>
        </div>

        <div style={styles.card}>
          <h2>Disk Usage</h2>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
    padding: "40px",
    fontFamily: "Arial"
  },

  title: {
    textAlign: "center",
    marginBottom: "40px"
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
    width: "250px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
  }
};

export default App;
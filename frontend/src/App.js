import { useEffect, useState } from "react";

function App() {
  const [metrics, setMetrics] = useState({
  cpu_usage: 0,
  memory_usage: 0,
  disk_usage: 0
});

const [status, setStatus] = useState("Connecting...");
const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    fetchMetrics();

    const interval = setInterval(() => {
      fetchMetrics();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/metrics");

      const data = await response.json();

      setMetrics(data);
      setStatus("Connected");

setLastUpdated(
  new Date().toLocaleTimeString()
);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      setStatus("Backend Disconnected");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        DevOps Monitoring Dashboard
      </h1>
      <div style={styles.statusContainer}>
  <p>Status: {status}</p>
  <p>Last Updated: {lastUpdated}</p>
</div>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>CPU Usage</h2>
          <p>{metrics.cpu_usage}%</p>
        </div>

        <div style={styles.card}>
          <h2>Memory Usage</h2>
          <p>{metrics.memory_usage}%</p>
        </div>

        <div style={styles.card}>
          <h2>Disk Usage</h2>
          <p>{metrics.disk_usage}%</p>
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
  },
  statusContainer: {
  textAlign: "center",
  marginBottom: "30px",
  color: "#94a3b8"
}
};

export default App;
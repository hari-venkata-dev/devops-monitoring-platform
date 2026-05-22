import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function App() {
  const [metrics, setMetrics] = useState({
    cpu_usage: 0,
    memory_usage: 0,
    disk_usage: 0
  });

  const [status, setStatus] = useState("Connecting...");
  const [lastUpdated, setLastUpdated] = useState("");

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchMetrics();

    const interval = setInterval(() => {
      fetchMetrics();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/metrics"
      );

      const data = await response.json();

      setMetrics(data);

      setHistory((prevHistory) => [
        ...prevHistory.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          cpu: data.cpu_usage,
          memory: data.memory_usage
        }
      ]);

      setStatus("Connected");

      setLastUpdated(
        new Date().toLocaleTimeString()
      );

    } catch (error) {
      console.error(
        "Error fetching metrics:",
        error
      );

      setStatus("Backend Disconnected");
    }
  };

  const getColor = (value) => {
    if (value < 50) return "#22c55e";

    if (value < 80) return "#facc15";

    return "#ef4444";
  };

  const MetricCard = ({ title, value }) => (
    <div style={styles.card}>
      <h2>{title}</h2>

      <p
        style={{
          ...styles.metricValue,
          color: getColor(value)
        }}
      >
        {value}%
      </p>

      <div style={styles.progressBarBackground}>
        <div
          style={{
            ...styles.progressBarFill,
            width: `${value}%`,
            backgroundColor: getColor(value)
          }}
        />
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        DevOps Monitoring Dashboard
      </h1>

      <div style={styles.statusContainer}>
        <p>Status: {status}</p>

        <p>
          Last Updated: {lastUpdated}
        </p>
      </div>

      <div style={styles.cardContainer}>
        <MetricCard
          title="CPU Usage"
          value={metrics.cpu_usage}
        />

        <MetricCard
          title="Memory Usage"
          value={metrics.memory_usage}
        />

        <MetricCard
          title="Disk Usage"
          value={metrics.disk_usage}
        />
      </div>

      <div style={styles.chartContainer}>
        <div style={styles.chartCard}>
          <h2>CPU Usage Trend</h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="cpu"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <h2>Memory Usage Trend</h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="memory"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
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
    marginBottom: "20px",
    fontSize: "42px"
  },

  statusContainer: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#94a3b8",
    fontSize: "18px"
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap"
  },

  chartContainer: {
    marginTop: "50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px"
  },

  chartCard: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "16px",
    width: "600px",
    color: "white"
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "16px",
    width: "280px",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    transition: "transform 0.3s ease"
  },

  metricValue: {
    fontSize: "40px",
    fontWeight: "bold",
    margin: "20px 0"
  },

  progressBarBackground: {
    backgroundColor: "#334155",
    borderRadius: "10px",
    height: "16px",
    overflow: "hidden"
  },

  progressBarFill: {
    height: "100%",
    borderRadius: "10px",
    transition: "width 0.5s ease"
  }
};

export default App;
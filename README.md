# DevOps Monitoring Platform

This project is a simple full-stack monitoring dashboard that I built while learning more about backend development, containers, and DevOps workflows.

The idea was to build something practical instead of only reading documentation or watching tutorials. I wanted to understand how frontend applications communicate with backend APIs, how Docker containers work, and how services can run together using Docker Compose.

The platform collects live system metrics from the machine and displays them in a dashboard with charts and status monitoring.

---

# What this project does

The application tracks:

- CPU usage
- Memory usage
- Disk usage

The backend collects the metrics using Python and exposes them through REST APIs. The frontend continuously fetches the data and displays it in real time.

The dashboard also shows:

- Connection status
- Last updated time
- Live usage charts
- Progress indicators

---

# Tech Stack

Frontend:
- React
- Recharts
- NGINX

Backend:
- Python
- FastAPI
- psutil

DevOps / Infrastructure:
- Docker
- Docker Compose
- Git
- GitHub

---

# Project Structure

```text
Monitoring/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── Dockerfile
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml
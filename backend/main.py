from fastapi import FastAPI
import psutil

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "DevOps Monitoring Platform Running"
    }


@app.get("/metrics")
def get_metrics():
    return {
        "cpu_usage": psutil.cpu_percent(),
        "memory_usage": psutil.virtual_memory().percent,
        "disk_usage": psutil.disk_usage('/').percent
    }
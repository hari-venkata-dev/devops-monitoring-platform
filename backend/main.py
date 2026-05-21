from fastapi import FastAPI
from routes.metrics import router as metrics_router
from routes.health import router as health_router

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "DevOps Monitoring Platform Running"
    }


app.include_router(metrics_router)
app.include_router(health_router)
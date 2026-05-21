from fastapi import FastAPI
from routes.metrics import router as metrics_router

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "DevOps Monitoring Platform Running"
    }


app.include_router(metrics_router)
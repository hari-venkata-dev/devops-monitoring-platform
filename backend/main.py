from fastapi import FastAPI
from routes.metrics import router as metrics_router
from routes.health import router as health_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "DevOps Monitoring Platform Running"
    }


app.include_router(metrics_router)
app.include_router(health_router)
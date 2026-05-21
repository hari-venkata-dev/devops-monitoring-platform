from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "DevOps Monitoring Platform Running"
    }
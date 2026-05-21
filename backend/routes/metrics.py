from fastapi import APIRouter
from services.system_metrics import get_system_metrics

router = APIRouter()


@router.get("/metrics")
def metrics():
    return get_system_metrics()
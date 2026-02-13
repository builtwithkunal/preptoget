from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/protected", tags=["Protected"])

@router.get("/")
def protected_route(current_user: User = Depends(get_current_user)):
    return {"message": f"Hello {current_user.email}"}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user import User
from app.api.schemas.user_schema import UserCreate, UserLogin, UserResponse
from app.core.security import hash_password, verify_password, create_access_token
from fastapi.security import OAuth2PasswordRequestForm



router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    if len(user.password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=400,
            detail="Password too long (max 72 bytes)"
        )

    hashed_password = hash_password(user.password)

    new_user = User(
        email=user.email,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    token = create_access_token({"user_id": new_user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }




@router.post("/login")
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.email == form_data.username).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"user_id": db_user.id})
    return {
        "access_token": token,
        "token_type": "bearer"
    }


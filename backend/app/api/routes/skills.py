from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.skill import Skill
from app.api.schemas.skill_schema import SkillCreate, SkillResponse

router = APIRouter(prefix="/skills", tags=["Skills"])

@router.post("/", response_model=SkillResponse)
def create_skill(skill: SkillCreate, db: Session = Depends(get_db)):
    new_skill = Skill(name=skill.name)
    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)
    return new_skill

@router.get("/", response_model=list[SkillResponse])
def get_skills(db: Session = Depends(get_db)):
    return db.query(Skill).all()
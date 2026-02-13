from fastapi import APIRouter, UploadFile, File, Depends
import os
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.models.resume_skill import ResumeSkill
from app.services.resume_parser import extract_text_from_resume
from app.services.skill_extractor import extract_skills_from_text

router = APIRouter(prefix="/resume", tags=["Resume"])

UPLOAD_DIR = "app/uploads"

@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    file_path = f"{UPLOAD_DIR}/{current_user.id}_{file.filename}"

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    text = extract_text_from_resume(file_path)
    skills = extract_skills_from_text(text, db)

    for skill in skills:
        exists = db.query(ResumeSkill).filter(
            ResumeSkill.user_id == current_user.id,
            ResumeSkill.skill_id == skill.id
        ).first()

        if not exists:
            record = ResumeSkill(
                user_id=current_user.id,
                skill_id=skill.id
            )
            db.add(record)
         

    db.commit()

    return {
        "extracted_skills": [skill.name for skill in skills]
    }

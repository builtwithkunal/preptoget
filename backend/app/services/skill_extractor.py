from sqlalchemy.orm import Session
from app.models.skill import Skill

def extract_skills_from_text(text: str, db: Session):
    skills = db.query(Skill).all()
    matched_skills = []

    for skill in skills:
        if skill.name.lower() in text:
            matched_skills.append(skill)

    return matched_skills

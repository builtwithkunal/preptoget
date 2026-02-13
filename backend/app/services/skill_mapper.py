from sqlalchemy.orm import Session
from app.models.skill import Skill

def get_skill_ids(skill_names: list, db: Session):
    skills = db.query(Skill).filter(Skill.name.in_(skill_names)).all()
    return [skill.id for skill in skills]

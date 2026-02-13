from sqlalchemy.orm import Session
from app.models.resume_skill import ResumeSkill
from app.models.skill import Skill

def get_resume_skills(user_id: int, db: Session):
    skills = (
        db.query(Skill.name)
        .join(ResumeSkill, ResumeSkill.skill_id == Skill.id)
        .filter(ResumeSkill.user_id == user_id)
        .all()
    )

    return [s[0] for s in skills]

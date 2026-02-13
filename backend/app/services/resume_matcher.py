from sqlalchemy.orm import Session
from app.models.resume_skill import ResumeSkill
from app.models.skill import Skill

def calculate_resume_match(user_id: int, required_skills: list, db: Session) -> int:
    user_skills = (
        db.query(Skill.name)
        .join(ResumeSkill, ResumeSkill.skill_id == Skill.id)
        .filter(ResumeSkill.user_id == user_id)
        .all()
    )

    user_skill_names = [s[0].lower() for s in user_skills]

    matched = sum(1 for skill in required_skills if skill in user_skill_names)
    total = len(required_skills)

    return int((matched / total) * 100) if total > 0 else 0

from sqlalchemy.orm import Session
from app.models.user_skill_score import UserSkillScore
from app.models.skill import Skill
from app.services.role_requirements import ROLE_REQUIREMENTS


def analyze_skill_gaps(user_id: int, role_name: str, db: Session):
    gaps = []

    required_skills = ROLE_REQUIREMENTS.get(role_name)
    if not required_skills:
        return gaps

    for skill_name, required_score in required_skills.items():
        skill = db.query(Skill).filter(Skill.name == skill_name).first()
        if not skill:
            continue

        score = (
            db.query(UserSkillScore.score)
            .filter(
                UserSkillScore.user_id == user_id,
                UserSkillScore.skill_id == skill.id
            )
            .order_by(UserSkillScore.id.desc())
            .first()
        )

        user_score = score[0] if score else 0

        if user_score < required_score:
            gaps.append({
                "skill": skill_name,
                "current_score": user_score,
                "required_score": required_score
            })

    return gaps

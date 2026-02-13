from sqlalchemy.orm import Session
from app.services.role_requirements import ROLE_REQUIREMENTS
from app.models.skill import Skill
from app.models.user_skill_score import UserSkillScore

def get_role_skill_status(user_id: int, role_name: str, db: Session):
    role_skills = ROLE_REQUIREMENTS[role_name]
    result = []

    for skill_name, required_score in role_skills.items():
        skill = db.query(Skill).filter(Skill.name == skill_name).first()

        user_score = None
        if skill:
            score_row = (
                db.query(UserSkillScore.score)
                .filter(
                    UserSkillScore.user_id == user_id,
                    UserSkillScore.skill_id == skill.id
                )
                .order_by(UserSkillScore.id.desc())
                .first()
            )
            user_score = score_row[0] if score_row else None

        result.append({
            "skill": skill_name,
            "required_score": required_score,
            "score": user_score,
            "status": "Tested" if user_score is not None else "Not Tested"
        })

    return result

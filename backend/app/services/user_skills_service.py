from sqlalchemy.orm import Session
from app.models.user_skill_score import UserSkillScore
from app.models.skill import Skill

def get_user_skills(user_id: int, db: Session):
    rows = (
        db.query(Skill.name, UserSkillScore.score)
        .join(UserSkillScore, Skill.id == UserSkillScore.skill_id)
        .filter(UserSkillScore.user_id == user_id)
        .order_by(UserSkillScore.id.desc())
        .all()
    )


    seen = {}
    for skill, score in rows:
        if skill not in seen:
            seen[skill] = score

    return [
        {"skill": skill, "score": score}
        for skill, score in seen.items()
    ]

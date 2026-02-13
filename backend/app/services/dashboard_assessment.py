from sqlalchemy.orm import Session
from app.models.user_skill_score import UserSkillScore
from app.models.skill import Skill

def get_assessment_scores(user_id: int, db: Session):
    records = (
        db.query(Skill.name, UserSkillScore.score)
        .join(UserSkillScore, UserSkillScore.skill_id == Skill.id)
        .filter(UserSkillScore.user_id == user_id)
        .all()
    )

    return [{"skill": r[0], "score": r[1]} for r in records]

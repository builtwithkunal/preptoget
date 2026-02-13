from sqlalchemy.orm import Session
from app.models.user_skill_score import UserSkillScore

def calculate_assessment_score(user_id: int, skill_ids: list, db: Session) -> int:
    scores = []

    for skill_id in skill_ids:
        latest_score = (
            db.query(UserSkillScore.score)
            .filter(
                UserSkillScore.user_id == user_id,
                UserSkillScore.skill_id == skill_id
            )
            .order_by(UserSkillScore.id.desc())  
            .first()
        )

        if latest_score:
            scores.append(latest_score[0])

    if not scores:
        return 0

    return int(sum(scores) / len(scores))

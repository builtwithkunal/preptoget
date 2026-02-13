from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.question import Question
from app.api.schemas.question_schema import QuestionResponse
from app.api.schemas.question_schema import AnswerSubmit
from app.models.user_skill_score import UserSkillScore
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/questions",
    tags=["Assessment"]
)

@router.get("/{skill_id}", response_model=list[QuestionResponse])
def get_questions(skill_id: int, db: Session = Depends(get_db)):
    questions = db.query(Question).filter(Question.skill_id == skill_id).all()
    return questions
@router.post("/submit/{skill_id}")
def submit_answers(
    skill_id: int,
    answers: list[AnswerSubmit],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    correct = 0
    total_questions = (
        db.query(Question)
        .filter(Question.skill_id == skill_id)
        .count()
    )


    for ans in answers:
        question = db.query(Question).filter(
            Question.id == ans.question_id,
            Question.skill_id == skill_id
        ).first()

        if question and question.correct_answer.lower() == ans.answer.lower():
            correct += 1

    score = int((correct / total_questions) * 100) if total_questions > 0 else 0
    

    existing = db.query(UserSkillScore).filter(
        UserSkillScore.user_id == current_user.id,
        UserSkillScore.skill_id == skill_id
    ).order_by(UserSkillScore.id.desc()).first()

    if existing:
        existing.score = score
    else:
        new_score = UserSkillScore(
            user_id=current_user.id,
            skill_id=skill_id,
            score=score
        )
        db.add(new_score)

    db.commit()

    return {
        "skill_id": skill_id,
        "score": score,
        "correct": correct,
        "total_questions": total_questions
    }

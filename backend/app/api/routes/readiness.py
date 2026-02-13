from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.role_requirements import ROLE_REQUIREMENTS
from app.services.resume_matcher import calculate_resume_match
from app.services.assessment_calculator import calculate_assessment_score
from app.services.skill_mapper import get_skill_ids



router = APIRouter(prefix="/readiness", tags=["Readiness"])

@router.get("/{role_name}")
def get_readiness(
    role_name: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if role_name not in ROLE_REQUIREMENTS:
        raise HTTPException(status_code=404, detail="Role not found")

    role_skills_dict = ROLE_REQUIREMENTS[role_name]
    required_skill_names = list(role_skills_dict.keys())


    skill_ids = get_skill_ids(required_skill_names, db)
    if not skill_ids:
        raise HTTPException(
            status_code=400,
            detail="Required skills not configured for this role"
        )

    assessment_score = calculate_assessment_score(current_user.id, skill_ids, db)
    resume_score = calculate_resume_match(
        current_user.id,
        required_skill_names,
        db
    )


    final_score = int((0.6 * assessment_score) + (0.4 * resume_score))

    return {
        "role": role_name,
        "assessment_score": assessment_score,
        "resume_match_score": resume_score,
        "role_readiness_score": final_score
    }

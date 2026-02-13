from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.dashboard_assessment import get_assessment_scores
from app.services.dashboard_resume import get_resume_skills
from app.services.role_requirements import ROLE_REQUIREMENTS
from app.services.skill_mapper import get_skill_ids
from app.services.assessment_calculator import calculate_assessment_score
from app.services.resume_matcher import calculate_resume_match
from app.services.skill_gap_analyzer import analyze_skill_gaps
from app.services.guidance_generator import generate_guidance
from app.services.user_skills_service import get_user_skills
from app.services.role_skill_status import get_role_skill_status


router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/{role_name}")
def get_dashboard(
    role_name: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if role_name not in ROLE_REQUIREMENTS:
        raise HTTPException(status_code=404, detail="Role not found")
    
    required_skills = list(ROLE_REQUIREMENTS[role_name].keys())

    

    all_scores = get_assessment_scores(current_user.id, db)
    
    assessment_scores = [
        s for s in all_scores if s["skill"] in required_skills
    ]
    role_skills_status = get_role_skill_status(
        current_user.id,
        role_name,
        db
    )
    

    resume_skills = get_resume_skills(current_user.id, db)

    
    skill_ids = get_skill_ids(required_skills, db)
    if not skill_ids:
        raise HTTPException(
            status_code=400,
            detail="Required skills not found in database"
        )


    assessment_score = calculate_assessment_score(current_user.id, skill_ids, db)
    resume_score = calculate_resume_match(current_user.id, required_skills, db)
    readiness_score = int((0.6 * assessment_score) + (0.4 * resume_score))

    gaps_raw = analyze_skill_gaps(current_user.id, role_name, db)
    gaps = []

    for gap in gaps_raw:
        gaps.append({
            "skill": gap["skill"],
            "current_score": gap["current_score"],
            "required_score": gap["required_score"],
            "guidance": generate_guidance(gap["skill"])
        })
    your_skills = get_user_skills(current_user.id, db) or []

    return {
        "user": current_user.email,
        "role": role_name,
        "assessment_scores": assessment_scores,
        "resume_skills": resume_skills,
        "your_skills": your_skills,
        "role_skills_status": role_skills_status,
        "role_readiness_score": readiness_score,
        "skill_gaps": gaps
    }

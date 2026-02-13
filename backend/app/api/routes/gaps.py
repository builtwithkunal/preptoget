from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.role_requirements import ROLE_REQUIREMENTS
from app.services.skill_mapper import get_skill_ids
from app.services.skill_gap_analyzer import analyze_skill_gaps
from app.services.guidance_generator import generate_guidance

router = APIRouter(prefix="/gaps", tags=["Skill Gaps"])

@router.get("/{role_name}")
def get_skill_gaps(
    role_name: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if role_name not in ROLE_REQUIREMENTS:
        raise HTTPException(status_code=404, detail="Role not found")

    required_skills = ROLE_REQUIREMENTS[role_name]["skills"]
    skill_ids = get_skill_ids(required_skills, db)

    gaps = analyze_skill_gaps(current_user.id, skill_ids, db)

    response = []
    for gap in gaps:
        guidance = generate_guidance(gap["skill"])
        response.append({
            "skill": gap["skill"],
            "current_score": gap["current_score"],
            "required_score": gap["required_score"],
            "guidance": guidance
        })

    return {
        "role": role_name,
        "total_gaps": len(response),
        "gaps": response
    }

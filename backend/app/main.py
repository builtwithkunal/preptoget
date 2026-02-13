from fastapi import FastAPI
from app.api.routes.skills import router as skill_router
from app.api.routes.roles import router as role_router
from app.api.routes.users import router as user_router
from app.db import database
from app.api.routes.protected import router as protected_router
from app.api.routes.questions import router as question_router
from app.api.routes.resume import router as resume_router
from app.api.routes.readiness import router as readiness_router
from app.api.routes.gaps import router as gap_router
from app.api.routes.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware






app = FastAPI(title="Skill Readiness Platform")

app.include_router(skill_router)

app.include_router(role_router)

app.include_router(user_router)

app.include_router(protected_router)

app.include_router(question_router)

app.include_router(resume_router)

app.include_router(readiness_router)

app.include_router(gap_router)

app.include_router(dashboard_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/health")
def health_check():
    return {"status": "OK"}
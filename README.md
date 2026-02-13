# Skill Readiness Evaluation Platform (V1)

An AI-assisted backend system that evaluates a candidate’s real skills through assessments,
verifies resume claims, estimates role readiness for predefined job roles,
and provides actionable improvement guidance.


## Problem Statement

Many candidates list skills on their resumes without objective proof of actual ability.
Recruiters and candidates lack a clear, structured way to measure readiness for specific roles.

This project addresses that gap by combining:
- Skill-based assessments
- Resume skill verification
- Role-specific readiness evaluation
- Actionable skill improvement guidance


## V1 Scope

Included:
- User registration and secure authentication (JWT)
- Skill assessment engine with scoring
- Resume upload and rule-based skill extraction
- Predefined job roles and requirements
- Role readiness score calculation
- Skill gap analysis with improvement guidance
- Aggregated dashboard API
- Frontend UI

Not Included:
- Live job scraping
- Hiring prediction or selection decisions
- Recruiter ATS features

## System Architecture

The system follows a layered backend architecture:

- API Layer (FastAPI)
- Authentication & Security Layer (JWT)
- Business Logic Layer (Assessment, Readiness, Guidance)
- Data Layer (MySQL via SQLAlchemy)

Each layer is isolated to ensure maintainability and scalability.


## User Flow

1. User registers and logs in
2. User completes skill assessments
3. User uploads resume
4. System extracts and verifies claimed skills
5. User selects target job role
6. System calculates role readiness score
7. Skill gaps and improvement guidance are generated
8. User views consolidated dashboard


## Tech Stack

Backend:
- Python
- FastAPI
- SQLAlchemy
- JWT Authentication

Database:
- MySQL

Security:
- Password hashing (bcrypt)
- JWT-based access control


## API Overview

Authentication:
- POST /users/register
- POST /users/login

Master Data:
- GET /skills
- GET /roles

Assessment:
- GET /questions/{skill_id}
- POST /questions/submit/{skill_id}

Resume:
- POST /resume/upload

Evaluation:
- GET /readiness/{role_name}
- GET /gaps/{role_name}
- GET /dashboard/{role_name}


## Future Enhancements (V2)

- Adaptive skill assessments
- Learning roadmap generation based on market demand
- Role-based access control
- Recruiter analytics dashboard
- Frontend application
- Job data integration via APIs


## Interview Summary

This project demonstrates:
- Backend system design
- Secure authentication
- Data modeling and integrity
- Explainable decision logic
- Real-world problem solving

It focuses on correctness, clarity, and extensibility rather than over-promising AI capabilities.


## Frontend (V1)

The frontend is built using React (Vite) and connects directly to the FastAPI backend.

### Features
- User authentication (JWT-based)
- Skill assessment UI
- Resume upload and skill extraction
- Role readiness dashboard
- Skill gap analysis with guidance



### Deployment
The frontend is production-ready and can be deployed on platforms like Vercel or Netlify.
Backend deployment is environment-dependent and can be configured accordingly.
## Environment Variables

Sensitive configuration such as database credentials and JWT secrets
are managed using environment variables.

The `.env` files are intentionally excluded from version control.

Required variables (example):
- DB_USER
- DB_PASSWORD
- DB_HOST
- DB_NAME
- SECRET_KEY
- ALGORITHM
- ACCESS_TOKEN_EXPIRE_MINUTES
## Local Setup (Optional)

1. Clone the repository
2. Create a `.env` file for backend configuration
3. Install dependencies:
   - Backend: `pip install -r requirements.txt`
   - Frontend: `npm install`
4. Run backend:
   `uvicorn app.main:app --reload`
5. Run frontend:
   `npm run dev`

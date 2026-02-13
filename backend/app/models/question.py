from sqlalchemy import Column, Integer, String, ForeignKey
from app.models.base import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    question_text = Column(String(500), nullable=False)
    correct_answer = Column(String(255), nullable=False)

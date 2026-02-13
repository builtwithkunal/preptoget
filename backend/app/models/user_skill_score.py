from sqlalchemy import Column, Integer, ForeignKey
from app.models.base import Base

class UserSkillScore(Base):
    __tablename__ = "user_skill_scores"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"))
    score = Column(Integer, nullable=False)
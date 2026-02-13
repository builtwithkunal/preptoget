from pydantic import BaseModel

class SkillCreate(BaseModel):
    name: str

class SkillResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
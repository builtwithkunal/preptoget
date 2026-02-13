from pydantic import BaseModel

class QuestionResponse(BaseModel):
    id: int
    question_text: str

    class Config:
        orm_mode = True


class AnswerSubmit(BaseModel):
    question_id: int
    answer: str

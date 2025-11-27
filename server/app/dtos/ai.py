from typing import Literal

from pydantic import BaseModel


class CreateSummaryDTO(BaseModel):
    source: str


class SummaryDTO(BaseModel):
    text: str


class MessageDTO(BaseModel):
    role: Literal["user", "assistant"]
    message: str

class ChatDTO(BaseModel):
    messages: list[MessageDTO]

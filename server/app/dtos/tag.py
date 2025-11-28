from __future__ import annotations

from pydantic import BaseModel


class PostTagDTO(BaseModel):
    name: str


class TagDTO(BaseModel):
    id: str
    name: str

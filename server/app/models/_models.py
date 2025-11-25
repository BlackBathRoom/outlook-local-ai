from uuid import uuid4

from sqlmodel import Field, SQLModel


class Tag(SQLModel, table=True):
    id: str = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(max_length=255)

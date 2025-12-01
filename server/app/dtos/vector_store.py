from pydantic import BaseModel


class PostMailDTO(BaseModel):
    id: str
    mail: str
    tags: list[str]


class MailDTO(BaseModel):
    id: str
    mail_part: str
    section_id: int


class SearchDTO(BaseModel):
    query: str
    tags: list[str]

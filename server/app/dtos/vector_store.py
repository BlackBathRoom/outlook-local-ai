from pydantic import BaseModel


class PostMailDTO(BaseModel):
    id: str
    mail: str
    tags: list[str]


class MailDTO(BaseModel):
    id: str
    mail_part: str
    section_id: int


class ConceptDTO(BaseModel):
    id: str
    label: str


class ConceptSearchResultDTO(BaseModel):
    concept: ConceptDTO
    mails: list[MailDTO]


class SearchDTO(BaseModel):
    query: str
    tags: list[str]

from pydantic import BaseModel


class PostMailDTO(BaseModel):
    mail: str
    tags: list[str]

from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import uuid4

from langchain_core.documents import Document

from app.services.ai.rag.ruri_prefix import DOCUMENT_PREFIX
from app.services.ai.rag.splitter import text_splitter

if TYPE_CHECKING:
    from app.models import Tag


class VectorMail(Document):
    def __init__(
        self, mail_part: str, mail_id: str | None = None, section_id: int | None = None, tags: list[Tag] | None = None
    ) -> None:
        tags_dict = {tag.name: tag.id for tag in tags} if tags is not None else {}
        super().__init__(
            page_content=mail_part,
            metadata={
                "mail_id": mail_id,
                "section_id": section_id,
                **tags_dict,
            },
        )

    @property
    def mail_part(self) -> str:
        return self.page_content.removeprefix(DOCUMENT_PREFIX)

    @property
    def mail_id(self) -> str | None:
        return self.metadata.get("mail_id")

    @mail_id.setter
    def mail_id(self, value: str) -> None:
        self.metadata["mail_id"] = value

    @property
    def section_id(self) -> int | None:
        return self.metadata.get("section_id")

    @section_id.setter
    def section_id(self, value: int) -> None:
        self.metadata["section_id"] = value

    def to_ruri_retrieved_format(self) -> Document:
        """Ruri の情報取得用フォーマットに変換する."""
        return Document(
            page_content=f"{DOCUMENT_PREFIX}{self.page_content}",
            metadata=self.metadata,
        )

    @staticmethod
    def from_pure_mail(mail: str, mail_id: str = str(uuid4()), tags: list[Tag] | None = None) -> list[VectorMail]:
        return [
            VectorMail(mail_part=s, mail_id=mail_id, section_id=i, tags=tags)
            for i, s in enumerate(text_splitter(mail), start=1)
        ]

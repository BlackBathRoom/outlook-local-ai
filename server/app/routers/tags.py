from typing import Annotated

from fastapi import APIRouter, Depends, Response
from sqlalchemy import Engine

from app.dtos.tag import PostTagDTO, TagDTO
from app.models import Tag
from app.services.database.engine import get_engine
from app.services.database.operation import create, read

router = APIRouter(prefix="/tags", tags=["Tags"])


@router.get("/")
def get_tags(engine: Annotated[Engine, Depends(get_engine)]) -> list[TagDTO]:
    tags = read(engine, Tag)
    return [TagDTO.model_validate(tag) for tag in tags]


@router.post("/")
def create_tag(body: PostTagDTO, engine: Annotated[Engine, Depends(get_engine)]) -> Response:
    tag = Tag(name=body.name)
    create(engine, tag)
    return Response(status_code=201)

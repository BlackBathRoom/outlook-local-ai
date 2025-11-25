from __future__ import annotations

from typing import TYPE_CHECKING

from sqlmodel import create_engine

from app.app_conf import DATABASE_PATH

if TYPE_CHECKING:
    from sqlalchemy.engine import Engine

connect_args = {"check_same_thread": False}


def get_engine() -> Engine:
    return create_engine(f"sqlite:///{DATABASE_PATH}", echo=True, connect_args=connect_args)

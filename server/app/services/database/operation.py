from __future__ import annotations

from functools import wraps
from typing import TYPE_CHECKING, Any, Literal

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError, OperationalError, ProgrammingError, SQLAlchemyError
from sqlmodel import Session, select

from app.utils.logging import get_logger

if TYPE_CHECKING:
    from collections.abc import Callable, Sequence

    from sqlalchemy import Engine
    from sqlmodel import SQLModel
    from sqlmodel.sql.expression import SelectOfScalar

logger = get_logger(__name__)


def db_error_handler[**P, R](func: Callable[P, R]) -> Callable[P, R]:
    @wraps(func)
    def _wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        try:
            return func(*args, **kwargs)
        except IntegrityError as e:
            logger.exception("IntegrityError")
            raise HTTPException(status_code=409, detail=str(e)) from e
        except OperationalError as e:
            logger.exception("OperationalError")
            raise HTTPException(status_code=503, detail=str(e)) from e
        except ProgrammingError as e:
            logger.exception("ProgrammingError")
            raise HTTPException(status_code=400, detail=str(e)) from e
        except SQLAlchemyError as e:
            logger.exception("SQLAlchemyError")
            raise HTTPException(status_code=500, detail=str(e)) from e
        except Exception as e:
            logger.exception("Exception")
            raise HTTPException(status_code=500, detail=str(e)) from e

    return _wrapper


@db_error_handler
def create(engine: Engine, obj: SQLModel) -> None:
    logger.debug("Creating %s", obj)
    with Session(engine) as session:
        session.add(obj)
        session.commit()
        session.refresh(obj)


type Operator = Literal["==", "!=", "<", "<=", ">", ">="]
type Condition = tuple[str, Operator, Any]

CONDITION_MAP: dict[Operator, Callable[[Any, Any], bool]] = {
    "==": lambda field, value: field == value,
    "!=": lambda field, value: field != value,
    "<": lambda field, value: field < value,
    "<=": lambda field, value: field <= value,
    ">": lambda field, value: field > value,
    ">=": lambda field, value: field >= value,
}


def _resolve_condition[M: SQLModel](
    model: type[M], statement: SelectOfScalar[M], where: list[Condition]
) -> SelectOfScalar[M]:
    stmt = statement
    for field_name, operator, value in where:
        field = getattr(model, field_name)
        if field is None:
            msg = f"Field '{field_name}' does not exist on model '{model.__name__}'"
            logger.error(msg)

        condition = CONDITION_MAP[operator](field, value)
        stmt = stmt.where(condition)

    return stmt


@db_error_handler
def read[T: SQLModel](engine: Engine, model: type[T], where: list[Condition] | None = None) -> Sequence[T]:
    logger.debug("Reading %s", model)
    with Session(engine) as session:
        statement = select(model)
        if where is not None:
            statement = _resolve_condition(model, statement, where)

        return session.exec(statement).all()


@db_error_handler
def update(engine: Engine, model: type[SQLModel], values: dict[str, Any], where: list[Condition] | None = None) -> None:
    logger.debug("Updating %s", model)
    with Session(engine) as session:
        stmt = select(model)
        if where is not None:
            stmt = _resolve_condition(model, stmt, where)
        target = session.exec(stmt).all()

        for key, value in values.items():
            if getattr(model, key) is None:
                msg = f"Field '{key}' does not exist on model '{model.__name__}'"
                logger.error(msg)
                raise ValueError(msg)

            for obj in target:
                setattr(obj, key, value)
                session.add(obj)
        session.commit()


@db_error_handler
def delete(engine: Engine, obj: SQLModel) -> None:
    logger.debug("Deleting %s", obj)
    with Session(engine) as session:
        session.delete(obj)
        session.commit()

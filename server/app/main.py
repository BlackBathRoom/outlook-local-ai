from __future__ import annotations

from contextlib import asynccontextmanager
from typing import TYPE_CHECKING

from fastapi import BackgroundTasks, FastAPI
from sqlmodel import SQLModel
from starlette.middleware.cors import CORSMiddleware

from app.app_resource import app_resource
from app.services.database.engine import get_engine
from app.utils.logging import get_logger

if TYPE_CHECKING:
    from collections.abc import AsyncGenerator

logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncGenerator:
    engine = get_engine()
    try:
        SQLModel.metadata.create_all(engine)
        yield
    except Exception:
        logger.exception("Error during lifespan")
    finally:
        engine.dispose()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def startup_tasks() -> None:
    app_resource.load_models()


@app.post("/trigger-startup")
def trigger_startup(background_task: BackgroundTasks) -> None:
    background_task.add_task(startup_tasks)


@app.get("/")
async def demo() -> dict[str, str]:
    return {"message": "Hello World"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )

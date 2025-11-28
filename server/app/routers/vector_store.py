from fastapi import APIRouter, Response

from app.dtos.vector_store import PostMailDTO
from app.services.ai.rag import VectorMail, VectorStore

router = APIRouter(prefix="/vector-store", tags=["Vector Store"])


@router.post("/")
def add_mail_to_vector_store(body: PostMailDTO) -> Response:
    vs = VectorStore()
    mails = VectorMail.from_pure_mail(body.mail)
    vs.add_documents(mails)
    return Response(status_code=200)


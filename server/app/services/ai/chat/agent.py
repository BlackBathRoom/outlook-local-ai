from __future__ import annotations

from typing import TYPE_CHECKING, Literal

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage
from langgraph.graph import END, START, StateGraph

from app.app_resource import app_resource
from app.services.ai.shared import BaseGraph, BaseState

if TYPE_CHECKING:
    from collections.abc import Iterator

type Role = Literal["user", "assistant"]


class ChatAgentState(BaseState[str]):
    messages: list[HumanMessage | AIMessage] | list[tuple[Role, str]]


message_role_map: dict[Role, type[HumanMessage | AIMessage]] = {"user": HumanMessage, "assistant": AIMessage}


class ChatAgent(BaseGraph[ChatAgentState, str]):
    def __init__(self) -> None:
        self.state_type = ChatAgentState
        super().__init__()

    def create_graph(self, builder: StateGraph[ChatAgentState]) -> StateGraph[ChatAgentState]:
        builder.add_node("check_message", self._check_message)
        builder.add_node("chat", self._chat)

        builder.add_edge(START, "check_message")
        builder.add_edge("check_message", "chat")
        builder.add_edge("chat", END)

        return builder

    def _convert_message(self, message: BaseMessage | tuple[Role, str]) -> BaseMessage:
        if isinstance(message, tuple):
            return message_role_map[message[0]](content=message[1])
        return message

    def _check_message(self, state: ChatAgentState) -> dict[str, list[BaseMessage]]:
        return {"messages": list(map(self._convert_message, state["messages"]))}

    def _chat(self, state: ChatAgentState) -> dict[str, str]:
        with app_resource.chat_model.use_model() as model:
            res = model.invoke(state["messages"])

        if not isinstance(res.content, str):
            msg = "Unexpected response type"
            raise TypeError(msg)
        return {"response": res.content}

    def stream(self, state: ChatAgentState) -> Iterator[str]:
        messages = self._check_message(state)["messages"]
        with app_resource.chat_model.use_model() as model:
            for chunk in model.stream(messages):
                if isinstance(chunk.content, str):
                    yield chunk.content


if __name__ == "__main__":
    app_resource.load_models()
    agent = ChatAgent()
    state = ChatAgentState(messages=[("user", "こんにちは、あなたは何ができますか?")])
    for chunk in agent.stream(state):
        print(chunk, end="")  # noqa: T201

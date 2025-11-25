import * as React from "react";
import { Input, Button, Card, Title3 } from "@fluentui/react-components";

const Chat: React.FC = () => {
  const [messages, setMessages] = React.useState<string[]>([]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, `あなた: ${input}`, `AI: ${input}（ダミー応答）`]);
    setInput("");
  };

  return (
    <Card>
      <Title3>AIチャット</Title3>
      <div style={{ minHeight: 100, marginBottom: 8 }}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <Input
        value={input}
        onChange={(_, data) => setInput(data.value)}
        placeholder="メッセージを入力"
      />
      <Button onClick={handleSend} appearance="primary" style={{ marginTop: 8 }}>
        送信
      </Button>
    </Card>
  );
};

export default Chat;
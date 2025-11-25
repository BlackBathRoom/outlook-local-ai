import * as React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import Chat from "../Chat";

interface ChatAppProps {
  title?: string;
}

const ChatApp: React.FC<ChatAppProps> = ({ title }) => {
  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ minHeight: "100vh", padding: 24 }}>
        {title && <h2>{title}</h2>}
        <Chat />
      </div>
    </FluentProvider>
  );
};

export default ChatApp;
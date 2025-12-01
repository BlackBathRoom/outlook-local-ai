import { makeStyles } from "@fluentui/react-components";

const useChatStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    minHeight: "100%",
  },
  message: {
    padding: "6px",
    borderRadius: "4px",
    background: "#e3e7ee",
    color: "#333",
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  userMessage: {
    padding: "6px",
    borderRadius: "4px",
    background: "#d1f0ff",
    color: "#333",
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  messagesArea: {
    flexGrow: 1,
    gap: "8px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  inputArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "6px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    background: "#fff",
    minWidth: 0, // 追加: flexアイテムのはみ出し防止
  },
  sendButton: {
    padding: "8px 16px",
    borderRadius: "4px",
    background: "#0078d4",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    "&:hover": {
      background: "#005a9e",
    },
  },
});

export default useChatStyles;

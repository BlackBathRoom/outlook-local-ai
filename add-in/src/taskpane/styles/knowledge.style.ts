import { makeStyles } from "@fluentui/react-components";

const useKnowledgeStyles = makeStyles({
  // モーダル
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.3)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    background: "#fff",
    padding: "12px",         // パディングを12pxに変更
    borderRadius: "8px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
    marginLeft: "12px",      // マージンを12pxに変更
    marginRight: "12px",     // マージンを12pxに変更
  },
  // ボタン
  openButton: {
    top: "1rem",
    right: "1rem",
    background: "#eee",
    border: "none",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    boxShadow: "none", // 影を消す
  },
  closeButton: {
    background: "#eee",
    border: "none",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    marginTop: "1em", // メール本文の下に余白を追加
    display: "block", // 横幅いっぱいに表示（必要なら）
    marginLeft: "auto",
    marginRight: "auto",
  },
  saveButton: {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "6px 16px",
    cursor: "pointer",
    fontSize: "0.95em",
    marginTop: "0.5em",
  },
});

export default useKnowledgeStyles;
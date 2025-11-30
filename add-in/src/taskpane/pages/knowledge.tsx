import React, { useState } from "react";
import { MailBodyProvider, useMailBody } from "../feature/context";
import { Tag } from "../types";
import useKnowledgeStyles from "../styles/knowledge.style";

const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> = ({ open, onClose, children }) => {
  const styles = useKnowledgeStyles();
  if (!open) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {children}
        <button className={styles.closeButton} onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

const tagList: Tag[] = [
  { id: "1", name: "重要" },
  { id: "2", name: "対応済み" },
  { id: "3", name: "要確認" },
  // 必要に応じてタグ追加
];

const KnowledgePage: React.FC = () => {
  const mailBody = useMailBody();
  const [open, setOpen] = useState(false);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const styles = useKnowledgeStyles();

  const handleTagChange = (id: string) => {
    setSelectedTagIds(prev =>
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    );
  };




  return (
    <div>
      <h2>抽出したメール本文</h2>
      <button className={styles.openButton} onClick={() => setOpen(true)}>
        メール本文を表示
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <pre>{mailBody}</pre>
      </Modal>

    </div>
  );
};

const Knowledge: React.FC = () => (
  <MailBodyProvider>
    <KnowledgePage />
  </MailBodyProvider>
);

export default Knowledge;
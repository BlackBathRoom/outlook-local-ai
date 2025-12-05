import React, { useState } from "react";
import useSearchStyles from "../styles/search.style";
import { apiClient } from "../apiClient";
import { VectorMail } from "../types";
import { openMailItem } from "../taskpane";
import Modal from "../components/Modal";

const SearchPage: React.FC = () => {
  const styles = useSearchStyles();
  const [query, setQuery] = useState<string>("");
  const [modalItem, setModalItem] = useState<VectorMail | null>(null);
  const [results, setResults] = useState<VectorMail[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const res = await apiClient.vectorStore.search.post({ query, tagIds: [] });
    setResults(res);
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.searchBox} onSubmit={handleSearch}>
          <input
            className={styles.input}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索ワードを入力"
          />
          <button className={styles.searchButton} type="submit">
            検索
          </button>
        </form>
        <ul className={styles.resultList}>
          {results.map((result, idx) => (
            <li key={idx} className={styles.resultItem} onClick={() => setModalItem(result)}>
              <span className={styles.resultItemText}>{result.part}</span>
            </li>
          ))}
        </ul>
      </div>
      {modalItem !== null && (
        <Modal open={modalItem !== null} onClose={() => setModalItem(null)}>
          <div className={styles.modalContainer}>
            <p className={styles.mailPart}>{modalItem.part}</p>
            <button className={styles.openMailButton} onClick={() => openMailItem(modalItem.id)}>
              メールを開く
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SearchPage;

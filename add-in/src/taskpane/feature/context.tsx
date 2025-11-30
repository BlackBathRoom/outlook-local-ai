import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMailBody } from "../feature/getMailBody";

const MailBodyContext = createContext<string>("");

export const useMailBody = () => useContext(MailBodyContext);

export const MailBodyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mailBody, setMailBody] = useState<string>("");
useEffect(() => {
  fetchMailBody()
    .then(body => {
      // ここで本文を加工
      const cleanedBody = body
      // ここに消したい文字・記号を入力する
        // アンダースコアが5個以上連続する部分を削除
        .replace(/_{5,}/g, "")
        .replace(/。/g, "\n")
      // 「ID:」「パスワード:」の直後以外のスペースを改行
        .replace(
        /(?<!ID:|パスワード:|Password:|password:|PW:|pw:|Pass:|pass:|PASS:|PASSWD:|passwd:|パス:|パスワード:|パスコード:|\d) /g, "\n");
      setMailBody(cleanedBody);
    })
    .catch(() => setMailBody("メール本文の取得に失敗しました"));
}, []);

  return (
    <MailBodyContext.Provider value={mailBody}>
      <div style={{ fontSize: "0.9em" }}>
        {children}
      </div>
    </MailBodyContext.Provider>
  );
};
export interface Tag {
  id: string;
  name: string;
}

export interface VectorMail {
  // メールの一部を表示
  id: string;
  part: string;
  sectionId: string;
  tag: Tag[];
}

export interface RegisterVectorMail {
  // 新規登録用
  id: string;
  body: string;
  tagIds: string[];
}

interface RegistMail {
  id: string;
  body: string;
  tags: string[];
}

interface MailDTO {
  id: string;
  mail_part: string;
  section_id: number;
}

interface SearchDTO {
  query: string;
  tags: string[];
}

export type {
  RegistMail,
  MailDTO,
  SearchDTO,
};

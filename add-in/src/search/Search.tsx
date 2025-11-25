import * as React from "react";
import { Input, Button, Card, Title3 } from "@fluentui/react-components";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<string | null>(null);

  // ダミー検索処理
  const handleSearch = () => {
    setSearchResult(`「${searchQuery}」の検索結果（ダミー）`);
  };

  return (
    <Card>
      <Title3>検索</Title3>
      <Input
        value={searchQuery}
        onChange={(_, data) => setSearchQuery(data.value)}
        placeholder="キーワードを入力"
      />
      <Button onClick={handleSearch} appearance="primary" style={{ marginTop: 8 }}>
        検索
      </Button>
      {searchResult && (
        <div style={{ marginTop: 8 }}>
          <strong>検索結果:</strong> {searchResult}
        </div>
      )}
    </Card>
  );
};

export default Search;
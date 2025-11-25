import * as React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import Search from "../Search";

interface SearchProps {
  title?: string;
}

const SearchApp: React.FC<SearchProps> = ({ title }) => {
  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ minHeight: "100vh", padding: 24 }}>
        {title && <h2>{title}</h2>}
        <Search />
      </div>
    </FluentProvider>
  );
};

export default SearchApp;
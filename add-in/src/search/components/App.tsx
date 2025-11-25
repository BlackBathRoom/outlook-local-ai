import * as React from "react";
import SearchApp from "../components/SearchApp";
import { makeStyles } from "@fluentui/react-components";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = (props: AppProps) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <SearchApp title={props.title ?? "検索"} />
    </div>
  );
};

export default App;
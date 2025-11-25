import * as React from "react";
import ChatApp from "../components/ChatApp";
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
      <ChatApp title={props.title ?? "AIチャット"} />
    </div>
  );
};

export default App;
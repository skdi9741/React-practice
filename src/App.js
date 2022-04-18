import Button from "./Button"
import styles from "./App.module.css"
import { useState } from "react";

function App() {
  const [counter, setValue] = useState();
  return (
    <div>
      <h1 className={styles.title}>Welcome back!</h1>
      <Button text={"Continue"}/>
    </div>
  );
}

export default App;

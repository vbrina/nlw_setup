import { Habit } from "components/Habit/Habit";
import "styles/Global.css";

function App() {
  return (
    <div className="App">
      <Habit completed={3} />
      <Habit completed={13} />
      <Habit completed={23} />
      <Habit completed={33} />
    </div>
  );
}

export default App;

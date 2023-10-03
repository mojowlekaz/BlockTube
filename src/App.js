import "./App.css";
import Navbar from "/Users/macbook/stuipfs/src/component/Navbar.jsx";
import { CounterProvider } from "/Users/macbook/stuipfs/src/context/Counter.js";
import Mainpage from "/Users/macbook/stuipfs/src/component/Mainpage.jsx";
import Sidebar from "/Users/macbook/stuipfs/src/component/Sidebar.jsx";

function App() {
  return (
    <div className="App">
      <CounterProvider>
        <Navbar />
        <div className="homedisplay">
          <Mainpage />
          <Sidebar />
        </div>
      </CounterProvider>
    </div>
  );
}

export default App;

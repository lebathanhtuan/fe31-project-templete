import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Footer, { name, className } from "./Footer";

function App() {
  const content = "Hello 123";
  return (
    <div className="wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

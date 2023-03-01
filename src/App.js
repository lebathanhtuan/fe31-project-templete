import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Footer, { name, className } from "./Footer";

function App() {
  const content = "Hello, test git";
  return (
    <div className="wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

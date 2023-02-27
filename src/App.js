import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Footer, { name, className } from "./Footer";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Main />
      <Footer />
      {name} - {className}
    </div>
  );
}

export default App;

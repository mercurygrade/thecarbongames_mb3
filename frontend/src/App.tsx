import { BrowserRouter } from "react-router-dom";
import Router from "routes";
import "App.css";
const App = () => {
  if (process.env.REACT_APP_STAGE === "Production") {
    console.log = function no_console() {};
  }
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};
export default App;

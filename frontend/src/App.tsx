import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.scss";
import { Navbar } from "./components/Navbar";
import CartPage from "./Pages/CartPage";
import CreateProductPage from "./Pages/CreateProductPage";
import MainPage from "./Pages/MainPage";
import NoMatchPage from "./Pages/NoMatchPage";
import ProductsPage from "./Pages/ProductsPage";
import { lightTheme } from "./theme";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route
            exact
            path="/admin/create-product"
            component={CreateProductPage}
          />
          <Route path="*" component={NoMatchPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;

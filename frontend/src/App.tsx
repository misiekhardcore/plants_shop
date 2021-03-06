import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import CartPage from "./Pages/CartPage";
import { CheckoutPage } from "./Pages/CheckoutPage";
import CreateProductPage from "./Pages/CreateProductPage";
import { LoginPage } from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import NoMatchPage from "./Pages/NoMatchPage";
// import NoMatchPage from "./Pages/NoMatchPage";
import { ProductPage } from "./Pages/ProductPage";
import ProductsPage from "./Pages/ProductsPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { RegisterPage } from "./Pages/RegisterPage";
import { lightTheme } from "./theme";

const App: React.FC = () => {
  const api_regex = /^\/api\/.*/;
  // if using "/api/" in the pathname, don't use React Router
  if (api_regex.test(window.location.pathname)) {
    return <div />; // must return at least an empty div
  } else {
    return (
      <ThemeProvider theme={lightTheme}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/cart" component={CartPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/products" component={ProductsPage} />
            <Route exact path="/products/:id" component={ProductPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route
              exact
              path="/admin/create-product"
              component={CreateProductPage}
            />
            <Route path="*" component={NoMatchPage} />
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    );
  }
};

export default App;

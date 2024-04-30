import React, { useEffect, useState } from "react";
import { Login } from "./auth/Login.js";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from "./pages/Home/Home.js";
import { Register } from "./auth/Register.js";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("isAuthenticated"));
    }, [isAuthenticated]);

    return (
        <Router>
            <Switch>
                <Route path='/register' component={Register} />
                {isAuthenticated && <Route path="/products" render={() => <Home  setIsAuthenticated={setIsAuthenticated} /> } />}
                <Route path='/' exact render={() => isAuthenticated? <Redirect to='/products' /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}

export default App;

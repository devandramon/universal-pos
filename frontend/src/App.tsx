import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ApiTest from "./pages/ApiTest";
import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/api-test"
                    element={<ApiTest />}
                />

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        path="/categories"
                        element={<Categories />}
                    />

                    <Route
                        path="/products"
                        element={<Products />}
                    />

                </Route>

                <Route
                    path="*"
                    element={<Login />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
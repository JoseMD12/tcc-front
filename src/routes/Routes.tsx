import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../app/layout";
import Inventory from "../app/inventory";
import Tracking from "../app/tracking";
import Deposit from "../app/deposit";
import Orders from "../app/orders";

function AppRoutes() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path='/' element={<Inventory />} />
                    <Route path='/inventory' element={<Inventory />} />
                    <Route path='/tracking' element={<Tracking />} />
                    <Route path='/deposit' element={<Deposit />} />
                    <Route path='/orders' element={<Orders />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default AppRoutes;

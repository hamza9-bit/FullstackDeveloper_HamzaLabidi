import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductsList } from "./pages/ProductsList";
import { ProductDetail } from "./pages/ProductDetail";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  </Router>
);
export default AppRouter;

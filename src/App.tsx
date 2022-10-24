import "./App.css";
import BookPage from "./routes/BookPage";
import SearchPage from "./routes/SearchPage";
import { useApp } from "./hook";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
    const props = useApp();

    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<BookPage {...props} />} />
                    <Route path="/search" element={<SearchPage {...props} />} />
                </Routes>
            </Router>
        </div>
    );
}

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

function App() {
  return (
    <>
      <Layout>
        <Router basename="/">
          <Routes>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            {/* <Route path="/signup" element={<Signup />} />
            <Route path="/add-book" element={<AddBook />}>
              <Route path=":bookId" element={<AddBook />} />
            </Route>
            <Route path="/book/:bookId" element={<Details />} /> */}
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

export default App;

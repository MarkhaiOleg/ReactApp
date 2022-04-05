import { Route, Routes } from "react-router";
import React from 'react';
import About from "../pages/About";
import Posts from "../pages/Posts";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
        </Routes>
    )
}

export default AppRouter;
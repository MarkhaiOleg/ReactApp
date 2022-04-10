import { Route, Routes } from "react-router";
import React, { useContext } from 'react';
import { publicRoutes, privateRoutes } from "./router/routes";
import Posts from "../pages/Posts";
import Login from "../pages/Login";
import { AuthContext } from "./context";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }
    return (
        isAuth ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Posts />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Login />} />
            </Routes>
    )
}

export default AppRouter;


//<Routes>
//<Route path="posts" element={<Posts />} />
//<Route path="about" element={<About />} />
//<Route path="posts/:id" element={<PostIdPage />} />
//</Routes>
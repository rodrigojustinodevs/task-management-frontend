import { PageLayout } from "@presentation/layouts/page-layout";
import { Login } from "@presentation/page/login";
import { Register } from "@presentation/page/register";
import { Navigate, RouteObject } from "react-router-dom";
import { Home } from "@presentation/page/home";

const routes: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                index: true,
                element: <Navigate to={"/login"} />
            },
            {
                path: "login",
                element: <PageLayout>
                    <Login />
                </PageLayout>
            },
            {
                path: "register",
                element: <PageLayout>
                    <Register />
                </PageLayout>
            },
            {
                path: "home",
                element: <PageLayout isFullContent>
                    <Home />
                </PageLayout>
            }
        ]
    }
]

export { routes }
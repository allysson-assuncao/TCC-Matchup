import {Suspense, lazy} from "react";
import {Navigate, useRoutes} from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import AuthLayout from "../layouts/auth";

// config
import {DEFAULT_PATH} from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={<LoadingScreen/>}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: "/auth",
            element: <AuthLayout/>,
            children: [
                {path: "login", element: <LoginPage/>},
                {path: "register", element: <RegisterPage/>},
                {path: "cadastro", element: <SignUp/>},
                {path: "reset-password", element: <ResetPasswordPage/>},
                {path: "new-password", element: <NewPasswordPage/>},
                {path: "verify", element: <VerifyPage/>},
            ],
        },
        {
            path: "/",
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to={DEFAULT_PATH} replace/>, index: true},
                {path: "index", element: <AppIndex/>},
                {path: "app", element: <GeneralApp/>},
                {path: "group", element: <Group/>},
                {path: "settings", element: <Settings/>},
                {path: "conversation", element: <Conversation/>},
                {path: "chats", element: <Chats/>},
                {path: "contact", element: <Contact/>},
                {path: "profile", element: <Profile/>},
                {path: "old-profile", element: <GeneralInfo/>},
                {path: "cadastro_de_interesses", element: <RegisterInterest/>},
                {path: "gerenciamento_de_interesses", element: <InterestManagement/>},

                {path: "call", element: <CallPage/>},

                {path: "404", element: <Page404/>},
                {path: "*", element: <Navigate to="/404" replace/>},
            ],
        },

        {path: "*", element: <Navigate to="/404" replace/>},
    ]);
}

const AppIndex = Loadable(lazy(() => import("../pages/our/AppIndex")));
const GeneralInfo = Loadable(lazy(() => import("../containers/options/GeneralInfo")));
const RegisterInterest = Loadable(lazy(() => import("../pages/our/RegisterInterests")));
const InterestManagement = Loadable(lazy(() => import("../pages/our/InterestManagement")));

const GeneralApp = Loadable(lazy(() => import("../pages/dashboard/GeneralApp")));

const Conversation = Loadable(
    lazy(() => import("../pages/dashboard/Conversation"))
);
const Chats = Loadable(lazy(() => import("../pages/dashboard/Chats")));
const Group = Loadable(lazy(() => import("../pages/dashboard/Group")));
const CallPage = Loadable(lazy(() => import("../pages/dashboard/Call")));
const Contact = Loadable(lazy(() => import("../sections/Dashboard/Contact")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));

const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const SignUp = Loadable(lazy(() => import("../pages/our/SignUp")));
const VerifyPage = Loadable(lazy(() => import("../pages/auth/Verify")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const ResetPasswordPage = Loadable(
    lazy(() => import("../pages/auth/ResetPassword"))
);
const NewPasswordPage = Loadable(
    lazy(() => import("../pages/auth/NewPassword"))
);

// Settings
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const Profile = Loadable(
    lazy(() => import("../pages/dashboard/Settings/Profile"))
);

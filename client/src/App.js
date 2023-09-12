import { BrowserRouter } from 'react-router-dom';
import {Routes, Route, Navigate} from 'react-router'
import { gapi } from "gapi-script";
import jwt_decode from "jwt-decode";
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import Main from "./pages/main/Main";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import ScanPage from "./pages/product/ScanPage";
import Overview2 from "./pages/product/Overview2";
import Index from "./pages/restart-password/Index";
import RestartPassword from "./pages/restart-password/RestartPassword";
import VerifyEmail from "./pages/restart-password/VerifyEmail";
import RestrictionsMenu from "./pages/user/profile/RestrictionsMenu";
import UpdateUserInfo from "./pages/user/profile/UpdateUserInfo";
import RequireAuth from "./pages/user/RequireAuth";
import ChangePassword from "./pages/user/profile/ChangePassword";
import Profile2 from "./pages/user/profile/Profile2";
import createCustomTheme from "./MUI/muiTheme";
import Reviews from "./pages/product/Reviews";
import ProductSearchList from "./pages/product/ProductSearchList";
import PageNotFound from "./common/components/PageNotFound";
import UserLayout from "./common/components/UserLayout";
import AdminLayout from "./admin/components/common/AdminLayout";
import Menu from "./admin/components/Menu/Menu";
import ResourcesContainer from "./admin/components/resources/ResourcesContainer";
import ListResource from "./admin/pages/ListResource";
import ShowResource from "./admin/pages/ShowResource";
import PromotionalEmail from "./admin/pages/PromotionalEmail";
import NewResource from "./admin/pages/NewResource";
import EditResource from "./admin/pages/EditResource";
import Dashboard from "./admin/pages/Dashboard";
import GoogleAuthWrapper from "./common/components/GoogleAuthWrapper";
import SendNotification from "./admin/pages/SendNotification";
import {useSelector} from "react-redux";
import {selectThemeMode} from "./state/authSlice";
import ErrorHandler from "./common/components/ErrorHandler";

const App = () => {

    const themeStyle = useSelector(selectThemeMode) ?? 'light';

    const theme = createCustomTheme(themeStyle);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route element={<ErrorHandler />}>
                        <Route path="/" element={<Navigate to="/product/scan" />} />
                        <Route path="restart-password" element={<Index />} />
                        <Route element={<GoogleAuthWrapper />}>
                            <Route path="login" element={<SignIn />} />
                            <Route path="register" element={<SignUp />} />
                        </Route>
                        <Route path="" element={<UserLayout />}>
                            <Route path="user" element={<Main />}>
                                <Route path="profile" element={<RequireAuth />}>
                                    <Route path="" element={<Profile2 />}>
                                        <Route path="info" element={<UpdateUserInfo />} />
                                        <Route path="restrictions" element={<RestrictionsMenu />} />
                                        <Route path="change-password" element={<ChangePassword />} />
                                    </Route>
                                </Route>
                            </Route>
                            <Route path="product" element={<Main />}>
                                <Route path="scan" element={<ScanPage />} />
                                <Route path="search" element={<ProductSearchList />} />
                                <Route path=":code" element={<Overview2 />} />
                                <Route path=":code/reviews" element={<Reviews />} />
                            </Route>
                        </Route>
                        <Route path="admin" element={<AdminLayout />}>
                            <Route element={<Menu />}>
                                <Route path="" element={<Navigate to="/admin/dashboard" />} />
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="resources">
                                    <Route path="" element={<Navigate to="/admin/dashboard" />} />
                                    <Route path=":resource" element={<ResourcesContainer />}>
                                        <Route path="list" element={<ListResource />} />
                                        <Route path="show/:id" element={<ShowResource />} />
                                        <Route path="new" element={<NewResource />} />
                                        <Route path="edit/:id" element={<EditResource />} />
                                    </Route>
                                </Route>
                                <Route path="promotional-email" element={<PromotionalEmail />} />
                                <Route path="send-notification" element={<SendNotification />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

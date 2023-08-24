import { BrowserRouter } from 'react-router-dom';
import {Routes, Route, Navigate} from 'react-router'
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import MenuCard from "./layout/sidebar/menu-card/MenuCard";
import Main from "./pages/main/Main";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import ScanPage from "./pages/product/ScanPage";
import Overview from "./pages/product/Overview";
import Profile from "./pages/user/profile/Profile";
import Index from "./pages/restart-password/Index";
import RestartPassword from "./pages/restart-password/RestartPassword";
import VerifyEmail from "./pages/restart-password/VerifyEmail";
import ProfileMenu from "./pages/user/profile/ProfileMenu";
import UserInfo from "./pages/user/profile/UserInfo";
import UpdateUserInfo from "./pages/user/profile/UpdateUserInfo";
import RequireAuth from "./pages/user/RequireAuth";
import ChangePassword from "./pages/user/profile/ChangePassword";
import Profile2 from "./pages/user/profile/Profile2";
import createCustomTheme from "./MUI/muiTheme";
import Reviews from "./pages/product/Reviews";
import LeaveReview from "./pages/product/LeaveReview";
import ProductSearchList from "./pages/product/ProductSearchList";
import PageNotFound from "./common/components/PageNotFound";
import UserLayout from "./common/components/UserLayout";
import AdminLayout from "./admin/components/common/AdminLayout";
import Menu from "./admin/components/Menu/Menu";
import ResourcesContainer from "./admin/components/resources/ResourcesContainer";
import ListResource from "./admin/components/resources/ListResource";
import ShowResource from "./admin/components/resources/ShowResource";
import PromotionalEmail from "./admin/pages/PromotionalEmail";
import NewResource from "./admin/components/resources/NewResource";
import EditResource from "./admin/components/resources/EditResource";

const App = () => {

    // TODO(premjesti u drugi fajl)
    // const theme = createTheme({
    //     typography: {
    //         fontFamily: ['Wix Madefor Text', 'sans-serif'].join(',')
    //     },
    //     palette: {
    //         mode: 'dark',
    //         primary: {
    //             light: '#eef2f6',
    //             main: '#2196f3',
    //             dark: '#1e88e5'
    //         },
    //         secondary: {
    //             light: '#ede7f6',
    //             main: '#673ab7',
    //             dark: '#5e35b1'
    //         },
    //         background: {
    //             default: '#282828',
    //             paper: '#282828'
    //         }
    //     },
    //
    // });

    const theme = createCustomTheme('light');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="login" element={<SignIn />} />
                    <Route path="register" element={<SignUp />} />
                    <Route path="restart-password" element={<Index />} />
                    <Route path="" element={<UserLayout />}>
                        <Route path="user" element={<Main />}>
                            <Route path="profile" element={<RequireAuth />}>
                                <Route path="" element={<Profile2 />}>
                                    <Route path="info" element={<UpdateUserInfo />} />
                                    <Route path="restrictions" element={<ProfileMenu />} />
                                    <Route path="change-password" element={<ChangePassword />} />
                                </Route>
                            </Route>
                        </Route>
                        <Route path="product" element={<Main />}>
                            <Route path="scan" element={<ScanPage />} />
                            <Route path="search" element={<ProductSearchList />} />
                            {/*TODO probaj :code wrapovat u route*/}
                            <Route path=":code" element={<Overview />} />
                            <Route path=":code/reviews" element={<Reviews />} />
                            <Route path=":code/leave-review" element={<LeaveReview />} />
                        </Route>
                    </Route>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route element={<Menu />}>
                            {/*todo mozda ovo ne treba*/}
                            <Route path="" element={<Navigate to="/admin/dashboard" />} />
                            <Route path="dashboard" element={<p>nn</p>} />
                            <Route path="resources" element={<ResourcesContainer />}>
                                <Route path="" element={<Navigate to="/admin" />} />
                                <Route path=":resource">
                                    <Route path="list" element={<ListResource />} />
                                    <Route path="show/:id" element={<ShowResource />} />
                                    <Route path="new" element={<NewResource />} />
                                    <Route path="edit/:id" element={<EditResource />} />
                                </Route>
                            </Route>
                            <Route path="promotional-email" element={<PromotionalEmail />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
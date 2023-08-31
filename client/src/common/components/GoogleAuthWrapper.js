import { GoogleOAuthProvider } from '@react-oauth/google';
import { Outlet } from "react-router";

const clientId = "751064780599-08be9ah5chk34indqkbivnpf916lq45s.apps.googleusercontent.com";

const GoogleAuthWrapper = () => {

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Outlet />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthWrapper;
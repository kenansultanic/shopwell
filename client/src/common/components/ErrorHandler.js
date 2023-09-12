import {Outlet} from "react-router";
import {Alert, IconButton, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import {selectError, setError} from "../../state/authSlice";

const ErrorHandler = () => {

    const error = useSelector(selectError);

    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => dispatch(setError({ error: '' }))}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <>
            <Outlet />
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleClose}
                message={error ?? 'An error occurred'}
                action={action}
                sx={{ '.MuiPaper-root': { bgcolor: 'error.light' } }}
            />
        </>
    );
};

export default ErrorHandler;
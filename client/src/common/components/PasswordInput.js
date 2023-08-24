import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const PasswordInput = ({ handleChange, handleBlur, passwordValue, passwordError, passwordTouched, placeholder='Password', nameID='password' }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordField = () => setShowPassword(!showPassword);

    return (
        <TextField
            required
            fullWidth
            margin="normal"
            name={nameID}
            label={placeholder}
            type={ showPassword ? 'text' : 'password' }
            id={nameID}
            autoComplete="current-password"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordField}
                            edge="end"
                        >
                            { showPassword ? <VisibilityOff/> : <Visibility/> }
                        </IconButton>
                    </InputAdornment>
                )
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={passwordValue}
            error={passwordError && passwordTouched}
            helperText={passwordError && passwordTouched ? passwordError : ''}
        />
    );
};

export default PasswordInput;
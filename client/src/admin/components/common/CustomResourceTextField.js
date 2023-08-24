import TextField from "@mui/material/TextField";

const CustomResourceTextField = ({ item, errors, touched, status, handleChange, handleBlur, isSelect, children }) => {

    return (
        <TextField
            fullWidth
            size="small"
            margin="normal"
            multiline={!!item.multiline}
            select={isSelect}
            minRows={item.multiline && 3}
            defaultValue={item.options && item.options[0].value}
            id={item.field}
            label={item.headerName}
            name={item.field}
            //value={values[item.field]}
            required={item.required}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(errors[item.field] && touched[item.field]) || (status && !!status[item.field])}
            helperText={
                (errors[item.field] && touched[item.field] ? errors[item.field] : ' ') ||
                (status[item.field] ? status[item.field] : ' ')
            }
        >
            { children }
        </TextField>
    );
};

export default CustomResourceTextField;
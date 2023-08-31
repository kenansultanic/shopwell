import { useState } from "react";
import {
    Chip,
    FormControl,
} from "@material-ui/core";
import {Box, IconButton, InputAdornment} from "@mui/material";
import TextField from "@mui/material/TextField";



const MultipleInput = ({ value=[], setMultipleFieldValue, fieldName, label, required, error, helperText, handleBlur }) => {

    const [values, setValues] = useState([...value]);
    const [currentValue, setCurrentValue] = useState('');

    const handleKeyPress = event => {

        const newValue = event.target.value.trim();

        if (!newValue)
            return;

        if (event.code === 'Space' && !values.includes(newValue)) {
            const newValues = [...values, newValue];
            setValues(newValues);
            setMultipleFieldValue([...newValues], fieldName);
            setCurrentValue('');
        }
    };

    const handleAddButton = newValue => {
        if (values.includes(newValue))
            return;

        setValues([...values, newValue]);
        setCurrentValue('');
    };

    const handleChange = event => {
        setCurrentValue(event.target.value);
    };

    const handleDelete = (item, index) =>{
        let arr = [...values];
        arr.splice(index,1);
        setValues(arr);
        setMultipleFieldValue([...arr], fieldName);
    };

    return (
        <Box sx={{ '.MuiFormControl-root': { width: '100%' }, }}>
            <FormControl
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    border: '2px solid lightgray',
                    padding: 4,
                    borderRadius: '4px',
            }}>
                <Box
                    sx={{
                        gap: '8px',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        mt: 1.5
                    }}
                >
                    { values.map((item, index) => (
                        <Chip key={item} size="small" onDelete={() => handleDelete(item, index)} label={item} />
                    )) }
                </Box>
                <TextField
                    fullWidth
                    variant="standard"
                    margin="normal"
                    label={label}
                    value={currentValue}
                    name={fieldName}
                    id={fieldName}
                    required={required}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    onBlur={handleBlur}
                    error={error}
                    helperText={helperText}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() => handleAddButton(currentValue)}
                                    style={{ margin: '0 8px', fontSize: 'small' }}
                                >
                                    Add
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default MultipleInput;
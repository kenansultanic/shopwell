import List from "@mui/material/List";
import {
    Box,
    DialogTitle,
    DialogContent,
    Dialog,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled,
    DialogActions, FormGroup, InputAdornment, OutlinedInput, Collapse, RadioGroup, Radio, FormLabel
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useEffect, useReducer, useRef, useState} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from "@mui/icons-material/Search";
import {compareRestrictions, searchFilter, selectRestrictionByType} from "../../../util/utils";
import PerfectScrollbar from "react-perfect-scrollbar";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, selectRestrictions, setUser} from "../../../state/authSlice";
import MosqueIcon from '@mui/icons-material/Mosque';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PropTypes from "prop-types";
import { StyledListItemButton } from "../../../layout/sidebar/menu-list/MenuList";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import { suggestRestrictionSchema } from "../../../common/schemas/validationSchema";
import {initialMenuDialogOpen, menuDialogReducer} from "../../../reducers/MenuDialogReducer";
import {getRestrictions, updateUserRestrictions} from "../../../actions/users";
import {suggestNewRestriction} from "../../../api/user";

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    padding: '2px',
    minWidth: '0 !important',
    borderRadius: '50%',
    marginLeft: '16px',
    marginRight: '36px'
}));

const CustomDialog = ({ open, handleClose, type, data }) => {

    const dispatch = useDispatch();
    const [currentData, setCurrentData] = useState(data);

    const radioGroupRef = useRef(null);
    const [value, setValue] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    const { dietaryRestrictions } = useSelector(selectCurrentUser);

    const [selectedRestrictions, setSelectedRestrictions] = useState(selectRestrictionByType(dietaryRestrictions, type));

    const saveChanges = () => {
        dispatch(updateUserRestrictions(selectedRestrictions, type))
            .then(response => {
                console.info(response)
            })
            .catch(error => {

            });
    };

    const handleChange = event => {

        const { value, checked } = event.target;

        if (checked) {
            if (type === 'religious')
                setSelectedRestrictions([value]);

            else if (!selectedRestrictions.includes(value))
                setSelectedRestrictions([...selectedRestrictions, value]);
        }
        else setSelectedRestrictions(selectedRestrictions.filter(item => item !== value));
    };

    const handleEntering = () => {
        if (radioGroupRef.current != null)
            radioGroupRef.current.focus();
    };

    const handleCancel = () => {
        handleClose();
        setSearchValue('');
        setSelectedRestrictions(selectRestrictionByType(dietaryRestrictions, type));
    }

    const handleSave = () => {
        //setAllergies()
        saveChanges();
        handleClose()
    }

    useEffect(() => {
        setCurrentData(searchFilter(searchValue, data));
    }, [searchValue]);

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
        >
            <DialogTitle>
                <OutlinedInput
                    fullWidth
                    id="input-search-header"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Search"
                    endAdornment={
                        <InputAdornment position="start">
                            <SearchIcon stroke={'1.5'} size="1rem" color={'primary'} />
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                />
            </DialogTitle>
            <DialogContent dividers>
                <PerfectScrollbar>
                    <FormGroup
                        ref={radioGroupRef}
                        aria-label="ringtone"
                        name="ringtone"
                        value={value}
                    >
                        {
                            currentData.map(option =>
                                option.type === type ?
                                    <FormControlLabel
                                        key={option.name}
                                        label={option.name}
                                        value={option.name}
                                        control={
                                            <Checkbox checked={selectedRestrictions.includes(option.name)} />
                                        }
                                        onChange={handleChange}
                                    />
                                    : undefined
                            )
                        }
                    </FormGroup>
                </PerfectScrollbar>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    disabled={compareRestrictions(dietaryRestrictions, selectedRestrictions, type)}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CustomDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['allergy', 'religious', 'intolerance']).isRequired,
    data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
};

const RestrictionsMenu = () => {

    const dispatchRestrictions = useDispatch();

    const [open, dispatch] = useReducer(menuDialogReducer, initialMenuDialogOpen);
    const restrictions = useSelector(selectRestrictions);

    const [suggestionDialogOpen, setSuggestionDialogOpen] = useState(false);

    useEffect(() => {
        if (!restrictions)
            dispatchRestrictions(getRestrictions())
                .then(response => {

                })
                .catch(error => {
                    console.error(error)
                })
    }, []);

    const submitNewSuggestion = ({ name, type, description }, actions) => {
        suggestNewRestriction( name, type, description)
            .then(response => {
                setSuggestionDialogOpen(false);
                actions.resetForm();
            })
            .catch(error => {
                console.log(error)
            })
    };

    const { values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
        validationSchema: suggestRestrictionSchema,
        initialValues: { name: '', type: 'allergy', description: '' },
        onSubmit: submitNewSuggestion
    });

    const handleDialogOpen = id => {
        dispatch({ type: 'OPEN', id });
    };

    const handleDialogClose = id => {
        dispatch({ type: 'CLOSE', id });
    };

    return (
        <Box sx={{
            width: {
                sm: '90%',
                md: '55%',
                lg: '36%'
            },
            mt: 8,
            ml: 1,
        }}>
            <List disablePadding>
                <StyledListItemButton onClick={() => handleDialogOpen('allergies')}>
                    <StyledListItemIcon>
                        <LocalHospitalIcon/>
                    </StyledListItemIcon>
                    <ListItemText primary="Allergies" />
                    <ListItemIcon>
                        <ArrowForwardIosIcon fontSize="small" />
                    </ListItemIcon>
                </StyledListItemButton>
                <StyledListItemButton onClick={() => handleDialogOpen('religious')}>
                    <StyledListItemIcon>
                        <MosqueIcon/>
                    </StyledListItemIcon>
                    <ListItemText primary="Religious restrictions" />
                    <ListItemIcon>
                        <ArrowForwardIosIcon fontSize="small" />
                    </ListItemIcon>
                </StyledListItemButton>
                <StyledListItemButton onClick={() => handleDialogOpen('intolerances')}>
                    <StyledListItemIcon>
                        <DoNotDisturbAltIcon/>
                    </StyledListItemIcon>
                    <ListItemText primary="Intolerances" />
                    <ListItemIcon>
                        <ArrowForwardIosIcon fontSize="small" />
                    </ListItemIcon>
                </StyledListItemButton>
                <StyledListItemButton onClick={() => setSuggestionDialogOpen(true)}>
                    <StyledListItemIcon>
                        <PostAddIcon/>
                    </StyledListItemIcon>
                    <ListItemText primary="Suggest new restriction" />
                    <ListItemIcon>
                        <ArrowForwardIosIcon fontSize="small" />
                    </ListItemIcon>
                </StyledListItemButton>
            </List>
            {
                restrictions &&
                <>
                    <CustomDialog open={open[0].open} handleClose={() => handleDialogClose('allergies')}
                                  type="allergy" data={restrictions} />
                    <CustomDialog open={open[1].open} handleClose={() => handleDialogClose('religious')}
                                  type="religious" data={restrictions} />
                    <CustomDialog open={open[2].open} handleClose={() => handleDialogClose('intolerances')}
                                  type="intolerance" data={restrictions} />
                </>
            }
            <Dialog open={suggestionDialogOpen} sx={{ '& .MuiDialog-paper': { width: '80%' } }} >
                <Box component="form" noValidate onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
                <DialogTitle>Suggest new restriction</DialogTitle>
                <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={10} style={{ marginTop: '4px' }}>
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    name="name"
                                    id="name"
                                    label="Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.name && touched.name}
                                    helperText={errors.name && touched.name ? errors.name : ' '}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <FormLabel>Type</FormLabel>
                                <RadioGroup
                                    onChange={handleChange}
                                    name="type"
                                    id="type"
                                    value={values.type}
                                    style={{ marginLeft: '8px' }}
                                >
                                    <FormControlLabel
                                        value="allergy"
                                        control={<Radio />}
                                        label="Allergy"
                                    />
                                    <FormControlLabel
                                        value="religious"
                                        control={<Radio />}
                                        label="Religious"
                                    />
                                    <FormControlLabel
                                        value="intolerance"
                                        control={<Radio />}
                                        label="Intolerance"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="description"
                                    label="Short description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={(errors.description && touched.description) || !!status?.description}
                                    helperText={
                                        (errors.description && touched.description ? errors.description : ' ') ||
                                        (status?.description ? status.description : ' ')
                                    }
                                />
                            </Grid>
                        </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => { setSuggestionDialogOpen(false); resetForm(); }}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>Send</Button>
                </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
}

export default RestrictionsMenu;
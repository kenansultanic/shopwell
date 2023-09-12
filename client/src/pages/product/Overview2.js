import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {axiosClient} from "../../api/AxiosClient";
import {
    Box,
    Card,
    CircularProgress,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    Grid, ListItem,
    ListItemIcon,
    ListItemText, Paper, Rating,
    styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import { StyledListItemButton } from "../../layout/sidebar/menu-list/MenuList";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArticleIcon from '@mui/icons-material/Article';
import ReviewsIcon from '@mui/icons-material/Reviews';
import {StyledListItemIcon} from "../user/profile/RestrictionsMenu";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import backgroundImage1 from "../../images/backgroundImage1.png";
import backgroundImage2 from "../../images/backgroundImage2.png";
import List from "@mui/material/List";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../actions/products";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import PerfectScrollbar from "react-perfect-scrollbar";
import {selectCurrentUser, setError} from "../../state/authSlice";
import { checkForIngredientsWithAllergies} from "../../util/utils";

const ingredientsList =
    ['Sugar', 'Palm Oil', 'Wheat Flour', 'Cocoa Butter', 'Skimmed Milk Powder', 'Cocoa Mass', 'Whey Powder (from Milk)',
        'Milk Fat', 'Fat-Reduced Cocoa', 'Emulsifiers (Soy Lecithin, Sunflower Lecithin)', 'Wheat Starch',
        'Glucose-Fructose Syrup', 'Raising Agents (Potassium Hydrogen Carbonate, Ammonium Hydrogen Carbonate,' +
    'Sodium Hydrogen Carbonate)', 'Salt', 'Flavorings (Vanillin)', 'Milk Chocolate contains Milk Solids 14% minimum and' +
    ' Cocoa Solids 30% minimum', 'May contain traces of Peanuts, Nuts, Eggs, and Sesame']


const MiniCard = styled(Card)(({ theme }) => ({
    height: '80px',
    borderRadius: '10px',
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
}));


const Overview = () => {

    const { code } = useParams();

    const dispatch = useDispatch();

    const product = useSelector(state => state.data.products.find(item => item.code === code)) ?? {};
    const user = useSelector(selectCurrentUser);

    const badIngredients = user ? checkForIngredientsWithAllergies(ingredientsList, user?.dietaryRestrictions.allergies) : [];

    useEffect(() => {
        if (Object.keys(product).length === 0) {
            dispatch(getProduct(code))
                .then(response => {
                    console.info(response)
                })
                .catch(error => {
                    dispatch(setError({ error: error.message ?? 'An error occurred' }));
                });
        }
    }, []);

    return (
        product ?
            (
                Object.keys(product).length !== 0  ?
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Grid container spacing={3} sx={{ margin: 2, alignItems: 'start', alignContent: 'baseline', overflow: 'hidden' }}>
                            <Grid item xs={12} sm={6} lg={4}>
                                <Paper
                                    elevation={6}
                                    style={{ height: '29.5vh', position: 'relative', borderRadius: '10px' }}
                                >
                                    <Box sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                                        <Box
                                            component="img"
                                            src={product.imageURL}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                position: 'static',
                                                borderRadius: '10px'
                                            }}
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                lg={4}
                            >
                                <Paper
                                    style={{
                                        backgroundImage: `url(${backgroundImage2})`,
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        color: 'white',
                                        height: '29.5vh',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography variant="h3">{ product.name }</Typography>
                                </Paper>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                lg={4}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    padding: '10px',
                                }}
                            >
                                <MiniCard sx={{ backgroundImage: `url(${backgroundImage1})`, color: 'white' }}>
                                    <Typography variant="h5" sx={{ bgcolor: 'transparent' }}>
                                        { product.categories[0] }
                                    </Typography>
                                </MiniCard>
                                <MiniCard sx={{ backgroundImage: `url(${backgroundImage2})`, color: 'white' }}>
                                    <Typography variant="h5" sx={{ bgcolor: 'transparent' }}>
                                        Calories { product.calories }/kcal
                                    </Typography>
                                </MiniCard>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={8}
                            >
                                <Paper
                                    style={{
                                        minHeight: '60vh',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box
                                        padding={2}
                                        display="flex"
                                        flexWrap="wrap"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography variant="h5" fontWeight="800">Ingredients</Typography>
                                        <Typography variant="subtitle2" color="error.main">
                                        {
                                        badIngredients.length ?
                                            'This product is not suited for you because it contains ingredients you are allergic to'
                                            : user && product?.religiousRestrictions.includes(user?.dietaryRestrictions.religious[0]) ?
                                                'This product doesn\'t satisfy your religious restrictions'
                                                : user && product?.notSuitedForIntolerances.includes(user?.dietaryRestrictions.intolerances[0]) ?
                                                    'You have a intolerance to this problem'
                                                    : undefined

                                        }
                                        </Typography>
                                    </Box>
                                    <Box padding={2}>
                                        {
                                            product.ingredients.map((ingredient, i) => (
                                                    <Typography
                                                        paragraph
                                                        display="inline"
                                                        key={i}
                                                        sx={{
                                                            color: badIngredients.includes(ingredient) ? 'error.main' : 'initial'
                                                        }}
                                                    >
                                                        { ingredient }
                                                        { i < ingredientsList.length - 1 ? ', ' : null }
                                                    </Typography>
                                            ))
                                        }
                                    </Box>
                                    <Box flexGrow={1} />
                                    <Box display="flex" justifyContent="end" paddingX={2} paddingY={4}>
                                        <Typography component={NavLink} to={`/product/${code}/reviews`}>
                                            Read reviews
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <Paper
                                    style={{
                                        height: '60vh',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <Typography variant="h5" fontWeight="800" padding={2}>
                                        Nutritional value per 100g
                                    </Typography>
                                    <Box padding={2} height="100%" overflow="hidden">
                                        <PerfectScrollbar>
                                        <List style={{ marginBottom: '40px' }}>
                                            {
                                                product.nutritionalValuePer100grams.map(item => (
                                                    <ListItem divider key={item.name}>
                                                        <ListItemText>
                                                            <Typography variant="h6">{ item.name }</Typography>
                                                        </ListItemText>
                                                        <ListItemText>
                                                            <Typography variant="subtitle1" color="secondary.dark" fontWeight="800">
                                                                { item.value }g
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                        </PerfectScrollbar>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                    : <Typography textAlign="center" sx={{ pt: 30 }}>No such product is registered</Typography>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                    <CircularProgress />
                </Box>
            )
    );
}

export default Overview;
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
import {StyledListItemIcon} from "../user/profile/ProfileMenu";
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

const ingredientsList =
    ['Sugar', 'Palm Oil', 'Wheat Flour', 'Cocoa Butter', 'Skimmed Milk Powder', 'Cocoa Mass', 'Whey Powder (from Milk)',
        'Milk Fat', 'Fat-Reduced Cocoa', 'Emulsifiers (Soy Lecithin, Sunflower Lecithin)', 'Wheat Starch',
        'Glucose-Fructose Syrup', 'Raising Agents (Potassium Hydrogen Carbonate, Ammonium Hydrogen Carbonate,' +
    'Sodium Hydrogen Carbonate)', 'Salt', 'Flavorings (Vanillin)', 'Milk Chocolate contains Milk Solids 14% minimum and' +
    ' Cocoa Solids 30% minimum', 'May contain traces of Peanuts, Nuts, Eggs, and Sesame']

const CustomGridItem = styled(Grid)(({ theme }) => ({
    maxHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '010px',
    justifyContent: 'flex-start',

}));

const MiniCard = styled(Card)(({ theme }) => ({
    height: '80px',
    borderRadius: '10px',
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    //color: theme.palette.secondary.dark,
    //backgroundColor: theme.palette.secondary.light
}));

const ItemBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '50%'
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '10px !important',
    padding: '8px 18px',
    margin: '4px auto',
    minWidth: '33%',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        ':hover, svg': {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.dark
        }
    },
    ':hover': {
        backgroundColor: theme.palette.secondary.light
    }

}));

const DialogTable = ({ open, setOpen, title }) => {

    const data = [
        {
            br: 100
        },
        {
            br: 12
        },
        {
            br: 12
        }, {br: 12}, {br: 12}, {br: 12}, {br: 12}, {br: 12}, {br: 12}, {br: 12}, {br: 12}, {br: 12}, {br: 12}, {br: 12}, {br: 12}
    ]
    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'secondary.light', 'th': { fontWeight: 700 } }}>
                                <TableCell>Item</TableCell>
                                <TableCell>Per 100g</TableCell>
                                <TableCell>Per 15g</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((item, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{'ime neko' + item.br}</TableCell>
                                        <TableCell>{item.br}</TableCell>
                                        <TableCell>{item.br * 15/100}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const DialogIngredients = ({ open, setOpen, ingredients }) => {

    const sortIngredientsAZ = () => data.sort((a, b) => {let x = a.name.localeCompare(b.name); console.log(x); return x;})
    const sortIngredientsZA = () => data.sort((a, b) => b.name.localeCompare(a.name));

    const data = [{name: 'jsa'},{name: 'jsa'},{name: 'jsa'},{name: 'jsa'},{name: 'asa'},{name: 'jsa'},{name: 'jsa'},{name: 'jsa'},{name: 'jsa'},{name: 'jsa'},{name: 'jsa'},{name: 'jsa'}]
    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>Ingredients</DialogTitle>
            <DialogContent>
                <List dense={true}>
                    {
                        data.map(({ name }, i) => (
                            <ListItem key={i}>
                                <ListItemText primary={name} />
                            </ListItem>
                        ))
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={sortIngredientsAZ}>Name A-Z</Button>
                <Button onClick={sortIngredientsZA}>Name Z-A</Button>
                <Button onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const Overview = () => {

    const { code } = useParams();

    const dispatch = useDispatch();

    const product = useSelector(state => state.data.products.find(item => item.code === code));

    const [viewAllNutritionalValue, setViewAllNutritionalValue] = useState(false);
    const [openNutritionalValue, setOpenNutritionalValue] = useState(false);
    const [openIngredientsList, setOpenIngredientsList] = useState(false);

    useEffect(() => {

        if (!product) {
            dispatch(getProduct(code))
                .then(response => {
                    console.info(response)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, []);

    return (
        product ?
            (
                Object.keys(product).length !== 0 ?
                    <>
                        {/*<Box
                            sx={{
                                minHeight: 'calc(100vh - 100px)',
                                width: '100%',
                                padding: 3,
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gridAutoRows:' minmax(100px, auto)',
                                gap: 2.5,
                                '@media (max-width: 600px)': {
                                    gridTemplateColumns: '1fr',
                                }
                            }}
                        >
                            <ItemBox>
                                <Box
                                    component="img"
                                    src={product.imageURL}
                                    style={{
                                        height: '100%',
                                        maxWidth: '100%',
                                        padding: '10px',
                                        paddingBottom: '28px',
                                    }}
                                />
                            </ItemBox>
                            <ItemBox
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    padding: '10px',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <MiniCard sx={{ backgroundImage: `url(${backgroundImage1})`, color: 'secondary.dark' }}>
                                    <Typography variant="h5" sx={{ bgcolor: 'transparent' }}>{product.name}</Typography>
                                </MiniCard>
                                <MiniCard sx={{ backgroundImage: `url(${backgroundImage2})`, color: 'primary.dark' }}>
                                    <Typography variant="h5" sx={{ bgcolor: 'transparent' }}>Callories 81/kcal</Typography>
                                </MiniCard>
                                <MiniCard>
                                    <Typography variant="h5" sx={{ bgcolor: 'transparent' }}>Callories 81/kcal</Typography>
                                </MiniCard>
                            </ItemBox>
                            <ItemBox>
                                <StyledListItemButton onClick={() => setOpenIngredientsList(true)}>
                                    <StyledListItemIcon>
                                        <ArticleIcon/>
                                    </StyledListItemIcon>
                                    <ListItemText primary="Ingridients" />
                                    <ListItemIcon>
                                        <ArrowForwardIosIcon fontSize="small" />
                                    </ListItemIcon>
                                </StyledListItemButton>
                                <StyledListItemButton onClick={() => setOpenNutritionalValue(true)}>
                                    <StyledListItemIcon>
                                        <ArticleIcon/>
                                    </StyledListItemIcon>
                                    <ListItemText primary="Nutritional value" />
                                    <ListItemIcon>
                                        <ArrowForwardIosIcon fontSize="small" />
                                    </ListItemIcon>
                                </StyledListItemButton>
                            </ItemBox>
                            <ItemBox sx={{ textAlign: 'center' }}>
                                <Typography variant="body2">
                                    {
                                        product.rating ? 'Average user rating:'
                                            : 'This product has not been rated yet'
                                    }
                                </Typography>
                                <Rating readOnly  precision={0.5} value={product.rating} />
                                <StyledListItemButton component={NavLink} to={`/product/${code}/leave-review`}>
                                    <StyledListItemIcon>
                                        <ReviewsIcon />
                                    </StyledListItemIcon>
                                    <ListItemText primary="Leave your own review" />
                                    <ListItemIcon>
                                        <ArrowForwardIosIcon fontSize="small" />
                                    </ListItemIcon>
                                </StyledListItemButton>
                            </ItemBox>
                        </Box>
                        <DialogTable open={openNutritionalValue} setOpen={setOpenNutritionalValue} />
                        <DialogIngredients open={openIngredientsList} setOpen={setOpenIngredientsList} />*/}
                        <Grid container spacing={3} sx={{ margin: 2, alignItems: 'start', alignContent: 'baseline', overflow: 'hidden' }}>
                            <Grid item xs={12} sm={4}>
                                <Paper
                                    elevation={6}
                                    style={{ height: '29.5vh', position: 'relative', borderRadius: '10px' }}
                                >
                                    <Box sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                                        <Box
                                            component="img"
                                            src="https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png"
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
                                sm={4}
                            >
                                <Paper
                                    style={{
                                        backgroundImage: `url(${backgroundImage2})`,
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        color: 'white',
                                        height: '29.5vh',
                                        borderRadius: '10px'
                                    }}
                                >
                                    <Typography>mksssa</Typography>
                                </Paper>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    padding: '10px',
                                }}
                            >
                                <MiniCard sx={{ backgroundImage: `url(${backgroundImage1})`, color: 'white' }}>
                                    <Typography variant="h5" sx={{ bgcolor: 'transparent' }}>{product.name}</Typography>
                                </MiniCard>
                                <MiniCard sx={{ backgroundImage: `url(${backgroundImage2})`, color: 'white' }}>
                                    <Typography variant="h5" sx={{ bgcolor: 'transparent' }}>Callories 81/kcal</Typography>
                                </MiniCard>
                                {/*<MiniCard>
                                    <Typography variant="h5" sx={{ bgcolor: 'transparent' }}>Callories 81/kcal</Typography>
                                </MiniCard>*/}
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
                                        <Typography variant="subtitle2" color="error.main">This product is not suited for you</Typography>
                                    </Box>
                                    <Box padding={2}>
                                        <Typography variant="body1">{ ingredientsList.join(', ') }.</Typography>
                                    </Box>
                                    <Box flexGrow={1} />
                                    <Box display="flex" justifyContent="end" paddingX={2} paddingY={4}>
                                        <Typography component={NavLink} to="/reviews">
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
                                        Energetic value
                                    </Typography>
                                    <Box padding={2} height="100%" overflow="hidden">
                                        <PerfectScrollbar>
                                        <List style={{ marginBottom: '40px' }}>
                                            <ListItem divider>
                                                <ListItemText>
                                                    <Typography variant="h6">neki test</Typography>
                                                </ListItemText>
                                                <ListItemText>
                                                    <Typography variant="subtitle1" color="secondary.dark" fontWeight="800">
                                                        33g
                                                    </Typography>
                                                </ListItemText>
                                                <ListItemIcon><ArticleIcon /></ListItemIcon>
                                            </ListItem>
                                            <ListItem divider>
                                                <ListItemText>
                                                    <Typography variant="h6">neki test</Typography>
                                                </ListItemText>
                                                <ListItemText>
                                                    <Typography variant="subtitle1" color="secondary.dark" fontWeight="800">
                                                        33g
                                                    </Typography>
                                                </ListItemText>
                                                <ListItemIcon><ArticleIcon /></ListItemIcon>
                                            </ListItem>
                                            <ListItem divider>
                                                <ListItemText>
                                                    <Typography variant="h6">neki test</Typography>
                                                </ListItemText>
                                                <ListItemText>
                                                    <Typography variant="subtitle1" color="secondary.dark" fontWeight="800">
                                                        33g
                                                    </Typography>
                                                </ListItemText>
                                                <ListItemIcon><ArticleIcon /></ListItemIcon>
                                            </ListItem>
                                            <ListItem divider>
                                                <ListItemText>
                                                    <Typography variant="h6">neki test</Typography>
                                                </ListItemText>
                                                <ListItemText>
                                                    <Typography variant="subtitle1" color="secondary.dark" fontWeight="800">
                                                        33g
                                                    </Typography>
                                                </ListItemText>
                                                <ListItemIcon><ArticleIcon /></ListItemIcon>
                                            </ListItem>
                                            <ListItem divider>
                                                <ListItemText>
                                                    <Typography variant="h6">neki test</Typography>
                                                </ListItemText>
                                                <ListItemText>
                                                    <Typography variant="subtitle1" color="secondary.dark" fontWeight="800">
                                                        33g
                                                    </Typography>
                                                </ListItemText>
                                                <ListItemIcon><ArticleIcon /></ListItemIcon>
                                            </ListItem>
                                            <ListItem divider>
                                                <ListItemText>
                                                    <Typography variant="h6">neki test</Typography>
                                                </ListItemText>
                                                <ListItemText>
                                                    <Typography variant="subtitle1" color="secondary.dark" fontWeight="800">
                                                        33g
                                                    </Typography>
                                                </ListItemText>
                                                <ListItemIcon><ArticleIcon /></ListItemIcon>
                                            </ListItem>
                                            <ListItem divider>
                                                <ListItemText>
                                                    <Typography variant="h6">neki test</Typography>
                                                </ListItemText>
                                                <ListItemText>
                                                    <Typography variant="subtitle1" color="secondary.dark" fontWeight="800">
                                                        33g
                                                    </Typography>
                                                </ListItemText>
                                                <ListItemIcon><ArticleIcon /></ListItemIcon>
                                            </ListItem>
                                            <ListItem divider>
                                                <ListItemText>
                                                    <Typography variant="h6">neki test</Typography>
                                                </ListItemText>
                                                <ListItemText>
                                                    <Typography variant="subtitle1" color="secondary.dark" fontWeight="800">
                                                        33g
                                                    </Typography>
                                                </ListItemText>
                                                <ListItemIcon><ArticleIcon /></ListItemIcon>
                                            </ListItem>
                                        </List>
                                        </PerfectScrollbar>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </>
                    : <Typography>No such product is registered</Typography>
            )
            : <CircularProgress />
    );
}

export default Overview;
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
import ArticleIcon from '@mui/icons-material/Article';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReviewsIcon from '@mui/icons-material/Reviews';
import {StyledListItemIcon} from "../user/profile/ProfileMenu";
import backgroundImage1 from "../../images/backgroundImage1.png";
import backgroundImage2 from "../../images/backgroundImage2.png";
import List from "@mui/material/List";
import {NavLink} from "react-router-dom";


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

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [openNutritionalValue, setOpenNutritionalValue] = useState(false);
    const [openIngredientsList, setOpenIngredientsList] = useState(false);

    useEffect(() => {
        axiosClient.get(`/product/${code}`)
            .then(response => {
                const { product } = response.data;
                product.rating = response.data.rating;
                setTimeout(() => setProduct(product), 1500)
                //setProduct(response.data?.product);
            })
            .catch(error => {
                if (error.status === 404)
                    setProduct({});
            });
    }, []);

    return (
        product ?
            (
                Object.keys(product).length !== 0 ?
                <>
                    <Box
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
                    <DialogIngredients open={openIngredientsList} setOpen={setOpenIngredientsList} />
                </>
                : <Typography>No such product is registered</Typography>
            )
            : <CircularProgress />
    );
}

export default Overview;
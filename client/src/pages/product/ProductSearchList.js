import {useSearchParams} from "react-router-dom";
import List from "@mui/material/List";
import {Box, CircularProgress, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {axiosClient} from "../../api/AxiosClient";
import PerfectScrollbar from "react-perfect-scrollbar";
import {StyledListItemButton} from "../../layout/sidebar/menu-list/MenuList";

const obj = [
    {
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",code: '11111',
    name: "ddmmmmmčl",category: 'drinks',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",code: '11111',
    name: "ddmmmmmčl",category: 'drinks',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
},{
    _id:  "64a72111113f5cf53d5c2697",
    name: "ddmmmmmčl",category: 'drinks',code: '11111',
    imageURL: "https://res.cloudinary.com/dotbacugu/image/upload/v1688674578/zxovnqlswtwchpvlunht.png",
}]

const ProductSearchList = () => {

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('query');

    const navigate = useNavigate();

    const [products, setProducts] = useState(null);

    useEffect(() => {
        axiosClient.get('/product/search', { params: { searchQuery } })
            .then(response => {
                console.log(response)
                setProducts(response.data.products);
            })
            .catch(error => {
                console.log(error)
            })
    }, [searchQuery]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <PerfectScrollbar>
            <List
                sx={{
                    width: '85vw',
                    bgcolor: 'background.paper',
                    my: 4,
                    borderRadius: 2.5,
                    display: 'flex',
                    justifyContent: 'center',
            }}>
                {
                    !products ?
                        <CircularProgress />
                        : products.length === 0 ? (
                                <Typography>No products found</Typography>
                            ) : (
                                products.map(({ code, name, imageURL, categories }, i) => (
                                    <StyledListItemButton
                                        alignItems="center"
                                        key={i}
                                        onClick={() => navigate(`/product/${code}`)}
                                        style={{
                                            cursor: 'pointer',
                                            margin: '2px 0',
                                            borderBottom: '1px solid lightgray',
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt="Product photo" src={imageURL} />
                                        </ListItemAvatar>
                                        <ListItemText primary={name} secondary={categories[0]} />
                                        <ListItemIcon>
                                            <ArrowForwardIosIcon fontSize="small" />
                                        </ListItemIcon>
                                    </StyledListItemButton>
                                )))
                }
            </List>
            </PerfectScrollbar>
        </Box>
    );
};

export default ProductSearchList;
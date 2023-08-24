import {ButtonBase, InputAdornment, OutlinedInput} from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";
import {axiosClient} from "../../../api/AxiosClient";
import {useNavigate} from "react-router";

const Search = ({ display = true }) => {

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const search = event => {

        event.preventDefault();

        if (!searchQuery.trim())
            return;
        navigate(`/product/search?query=${searchQuery.trim()}`);
    };

    return (
        <Box
            component="form"
            noValidate
            onSubmit={search}
            sx={{ display: display || { xs: 'none', md: 'block' }, width: '40%' }}
        >
            <OutlinedInput
                id="input-search-header"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon stroke={'1.5'} size="1rem" />
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <ButtonBase sx={{ borderRadius: '12px' }} onClick={search}>
                            Search
                        </ButtonBase>
                    </InputAdornment>
                }
                sx={{
                    borderRadius: 3,
                    height: '40px'
                }}
            />
        </Box>
    );
}

export default Search;
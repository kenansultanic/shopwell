import {Box, Breadcrumbs, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Outlet, useLocation, useParams} from "react-router";
import {Link as BrowserLink} from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from "@mui/material/Link";
import {styled} from "@mui/material/styles";

const CustomLink = styled(Link)(() => ({
    textTransform: 'capitalize',
    textDecoration: 'none'
}));

const ResourcesContainer = () => {

    const { resource } = useParams();

    const location = useLocation();

    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        ['users', 'products', 'restrictions', 'product-reviews'].includes(resource) ? (
            <Box style={{ width: '100%', padding: '16px', marginTop: '24px' }}>
                <Breadcrumbs aria-label="breadcrumb" style={{ fontSize: '1.5rem' }}>
                    <CustomLink color="inherit" to="/admin" component={BrowserLink}>
                        Home
                    </CustomLink>
                    {
                        pathnames.map((name, index) => {
                            const routeTo = `/admin/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;

                            return ['new', 'show', 'edit', 'list'].includes(name) ? (
                                <Typography color="text.primary" textTransform="capitalize" key={index}>
                                    { name }
                                </Typography>
                            ) : (
                                pathnames[index-1] === 'resources' || pathnames[index-2] === 'resources' ?
                                    <CustomLink color="inherit" to={routeTo} key={index} component={BrowserLink}>
                                        { name }
                                    </CustomLink>
                                    : undefined
                            )
                        })
                    }
                </Breadcrumbs>
                <Outlet />
            </Box>
        ) : (
            <Box display="flex" justifyContent="center">
                <Typography>Unknown resource type</Typography>
            </Box>
        )
    );
};

export default ResourcesContainer;
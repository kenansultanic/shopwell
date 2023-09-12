import {Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUsers, setUsers} from "../../../state/dataSlice";
import {getUsers} from "../../actions/users";
import {useSearchParams} from "react-router-dom";
import {useNavigate, useParams} from "react-router";
import {getListResourceSchema} from "../../common/schemas/list-resource-schema";
import {deleteRequiredResources, getRequiredResources} from "../../common/functions";
import {deleteResources, getResources} from "../../actions/resources";
import {getNumberOfResources} from "../../../api/admin";
import {parseResource} from "../../../util/utils";

const ListResource = () => {

    const { resource } = useParams();
    const navigate = useNavigate();

    const parsedResource = parseResource(resource);

    const resources = useSelector(state => state.data[parsedResource]);
    const dispatch = useDispatch();

    const renderAfterCalled = useRef(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedRows, setSelectedRows] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [totalRows, setTotalRows] = useState(resources.length);
    const page = Number(searchParams.get('page')) - 1;

    const columnsSchema = getListResourceSchema(resource);
    //const getResources = getRequiredResources(resource);

    const handlePaginationModelChange = model => {
        if (model.pageSize !== pageSize) {
            setPageSize(model.pageSize);
            setSearchParams('page=1');
            return;
        }
        setSearchParams(`page=${model.page + 1}`);
    };

    const deleteAllSelected = () => {
        dispatch(deleteResources(selectedRows, resource))
            .then(response => console.log("res",response))
            .catch(error => console.error(error))
    };

    const handleCreateNewButtonClick = () => navigate(`/admin/resources/${resource}/new`);

    useEffect(() => {
        const getTotalRows = async () => {
            try {
                const response = await getNumberOfResources(resource);

                if (response.status === 200)
                    setTotalRows(response.data.total);
                else console.info("dodaj i warning")
            }
            catch (error) {

            }
        }
        getTotalRows();
        setSearchParams('page=1');
    }, [resource]);


    useEffect(() => {
        if (renderAfterCalled.current)
            renderAfterCalled.current = false;

        else if (!resources.length || (totalRows > page * pageSize && resources.length < totalRows) /*Math.ceil(resources.length / pageSize) < page*/) {
            //setIsLoading(true);
            dispatch(getResources(page, pageSize, resource))
                .then(response => {
                    //totalPages =
                    /*setTotalPages(response.total);
                    setIsLoading(false);*/
                })
                .catch(error => {
                    console.error(error.message);
                });
            renderAfterCalled.current = true;
        }
    }, [page, resource]);

    return (
        ['users', 'products', 'restrictions', 'product-reviews'].includes(resource) ?
        <>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: { xl: 5, md: 3 },
                    my: 3,
                }}
            >
                <Typography variant="h5" textTransform="capitalize">{ resource }</Typography>
                <Box style={{ flexGrow: 1 }} />
                <Button variant="outlined" style={{ textTransform: 'none' }} onClick={handleCreateNewButtonClick}>
                    <AddIcon fontSize="small" /> &nbsp; Create new
                </Button>
                <Button><FilterAltIcon fontSize="small" style={{ textTransform: 'none' }} /> &nbsp; Filter</Button>
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: 'common.white',
                    borderRadius: 1,
                    mt: 5,
                    '.MuiDataGrid-columnHeaders': {
                        bgcolor: theme => theme.palette.grey[100]
                    }
                }}
            >
                { selectedRows.length > 0 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: { xs: '-32px', lg: '-24px' },
                            zIndex: 1,
                            bgcolor: 'primary.dark',
                            color: 'common.white',
                            display: 'flex',
                            gap: 3.5,
                            py: .5,
                            px: 1.5,
                            mx: '2.2%',
                            borderRadius: 1
                        }}
                    >
                        <Typography color="inherit" marginTop="3px">Selected&nbsp;({selectedRows.length})</Typography>
                        <Button
                            size="small"
                            color="inherit"
                            variant="outlined"
                            sx={{ textTransform: 'none', borderRadius: '14px !important' }}
                            onClick={deleteAllSelected}
                        >
                            Delete all
                        </Button>
                    </Box>
                )}
                <DataGrid
                    rows={resources}
                    columns={columnsSchema}
                    getRowId={row => row._id}
                    pagination
                    re
                    //paginationMode="server"
                    rowCount={totalRows}
                    //loading={isLoading}
                    //totalPages={3}
                    pageSizeOptions={[5, 10, 20]}
                    paginationModel={{ pageSize, page }}
                    onPaginationModelChange={handlePaginationModelChange}
                    onRowDoubleClick={row => navigate(`/admin/resources/${resource}/show/${row.id}`)}
                    checkboxSelection
                    onRowSelectionModelChange={s => setSelectedRows(s)}
                    sx={{
                        p: { sm: 1, md: 2, lg: 3 },
                        fontSize: '4rem',
                        ...{ bgcolor: theme => theme.palette.mode === 'dark' ? theme.palette.grey[900] : undefined },
                        '.MuiDataGrid-columnHeaders': {
                            bgcolor: 'inherit'
                        },
                        '.MuiDataGrid-footerContainer': {
                            fontSize: '1.1rem'
                        }
                    }}
                />
            </Box>
        </> : <Box display="flex" justifyContent="center"><Typography>You cant list selected resource</Typography></Box>
    );
};

export default ListResource;
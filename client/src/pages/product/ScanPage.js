import {Grid, Typography, Box} from "@mui/material";
import BarcodeScanner from "../../common/components/BarcodeScanner";
import {useNavigate} from "react-router";

const ScanPage = () => {

    const navigate = useNavigate();

    const onNewScanResult = (decodedText, decodedResult) => {
        console.log(decodedText)
        navigate(`/product/${decodedText}`);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="calc(100vh - 88px)"
        >
        <Box
          sx={{
              width: { xs: '90%', md: '60%', lg: '50%' },
              height: { xs: '90%', md: '70%', lg: '60%' },
              padding: 2,
              borderColor: 'primary.main',
              fontSize: 'large',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              'button': {
                  bgcolor: 'secondary.light',
                  color: 'secondary.dark',
                  cursor: 'pointer',
                  fontSize: '.875rem',
                  lineHeight: '1.75',
                  textTransform: 'capitalise',
                  minWidth: '64px',
                  padding: '6px 16px',
                  border: 'none',
                  borderRadius: 3,
                  transition: 'all .2s ease-in-out',
                  ':hover': {
                      bgcolor: 'secondary.dark',
                      color: 'secondary.light'
                  }
              }
          }}
        >
            <BarcodeScanner
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
                style={{ minWidth: '200px' }}
            />
        </Box>
        </Box>
      // <Grid
      //     container
      //     spacing={0}
      //     direction="column"
      //     alignItems="center"
      //     justifyContent="center"
      //     style={{ minHeight: '50vh', minWidth: '50%' }}
      // >
      //   <Grid item minHeight="100%" minWidth="50%">
      //       <Box
      //           sx={{
      //               width: '100%',
      //               height: '100%',
      //               padding: 2,
      //               border: '1px dashed',
      //               borderColor: 'primary.main',
      //           }}
      //       >
      //           <Typography>TEST</Typography>
      //       </Box>
      //   </Grid>
      // </Grid>
    );
};

export default ScanPage;
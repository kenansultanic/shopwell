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
          sx={{
              width: { xs: '90%', md: '80%', lg: '50%' },
              height: { xs: '90%', md: '70%', lg: '60%' },
              padding: 2,
              border: '1px dashed',
              borderColor: 'primary.main',
              'button': {
                  bgcolor: 'secondary.light',
                  color: 'secondary.dark',
                  cursor: 'pointer',
                  fontSize: '.875rem',
                  lineHeight: '1.75',
                  textTransform: 'uppercase',
                  minWidth: '64px',
                  padding: '6px 16px',
                  border: 'none',
                  borderRadius: 2,
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
                style={{minWidth: '200px' }}
            />
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
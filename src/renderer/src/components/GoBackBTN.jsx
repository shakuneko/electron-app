import {
    useNavigate,
  } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function GoBackBTN() {
    const navigate = useNavigate();

    return (
        <div style={{ marginBottom:"16px", marginRight:"12px" }}>
            <IconButton style={{color:"#DFC994"}} onClick={() => navigate(-1)}>
                <ArrowBackIosNewIcon />
            </IconButton>
        </div>
    );
}
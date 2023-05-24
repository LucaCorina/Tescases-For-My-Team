import React from 'react';

import './Main.css'
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import './Home.css';
function Home() {
    return (
        <div id="content">
            <div class='mainAction'>
                <Box>
                    <Button sx={{
                        '&.MuiButton-outlined': { color: 'white' },
                        "&.MuiButton-root": { border: "2px white solid" },
                        mr: 2,
                    }} startIcon={<HowToRegOutlinedIcon />} variant="outlined" size="large" href="/register">Register</Button>
                </Box>
                <Box >
                    <Button sx={{
                        '&.MuiButton-outlined': { color: 'white' },
                        "&.MuiButton-root": { border: "2px white solid" },
                    }} startIcon={<LoginOutlinedIcon />} variant="outlined" size="large" href="/login">Login</Button>
                </Box>
            </div>
        </div>



    );

};

export default Home;
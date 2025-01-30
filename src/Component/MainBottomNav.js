import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate =useNavigate();

  useEffect(() => {
  if(value===0) navigate("/")
  else if (value===1) navigate("/movies")
  else if (value===2) navigate("/series")
  else navigate("/search")

// eslint-disable-next-line
  }, [value,navigate])
  
  return (
    <Box sx={{
      width: '100%',
      position: 'fixed',
      bottom: 0,
      color: 'white',
      zIndex: 100,
      backgroundColor: '#29303b',
      '& .MuiBottomNavigation-root': {
        backgroundColor: '#29303b',
      },
    }}
  >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}

import Box from '@mui/material/Box';
import SearchBar from './SearchBar';
import MainPageContent from './MainPageContent';

function MainPage() {
  return (
   <Box sx={{ display: 'flex' }}>
      <MainPageContent />
      <SearchBar />
    </Box>
  );
}

export default MainPage;

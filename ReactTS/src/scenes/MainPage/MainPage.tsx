import Box from '@mui/material/Box'
import SearchBar from '../../components/SearchBar'
import MainPageContent from './MainPageContent'
import styles from './User.module.scss'

function MainPage() {
  return (
    <Box className={styles.box}>
      <MainPageContent />
      <SearchBar />
    </Box>
  )
}

export default MainPage

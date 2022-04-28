import {Box} from '@mui/material'
import {Routes, Route} from 'react-router-dom'
import Banner from "../components/Banner";
import HomePage from "../pages/HomePage";
import MyDiaryPage from "../pages/MyDiaryPage";
import DiaryCreationForm from "../components/DiaryCreationForm";
import DiaryInfoPage from "../pages/DiaryInfoPage";
import PublicDiaryPage from "../pages/PublicDiaryPage";
import FutureLetterPage from "../pages/FutureLetterPage";
import FutureLetterInfoPage from "../pages/FutureLetterInfoPage";
import UnreadLetterPage from "../pages/UnreadLetterPage";

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Banner />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/diary' element={<MyDiaryPage />} />
        <Route path='/diary/create' element={<DiaryCreationForm />} />
        <Route path='/diary/:diaryId' element={<DiaryInfoPage />} />
        <Route path='/public' element={<PublicDiaryPage />} />
        <Route path='/future' element={<FutureLetterPage />} />
        <Route path='/future/unread' element={<UnreadLetterPage />} />
        <Route path='/future/:letterId' element={<FutureLetterInfoPage />} />
      </Routes>
    </Box>
  )
}

export default Dashboard

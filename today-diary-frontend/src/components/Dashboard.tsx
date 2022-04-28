import {Box} from '@mui/material'
import {Routes, Route} from 'react-router-dom'
import Banner from "./Banner";
import HomePage from "./HomePage";
import MyDiaryPage from "./MyDiaryPage";
import DiaryCreationForm from "./DiaryCreationForm";
import DiaryInfoPage from "./DiaryInfoPage";
import PublicDiaryPage from "./PublicDiaryPage";
import FutureDiaryPage from "./FutureDiaryPage";
import FutureLetterInfoPage from "./FutureLetterInfoPage";
import UnreadLetterPage from "./UnreadLetterPage";

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
        <Route path='/future' element={<FutureDiaryPage />} />
        <Route path='/future/unread' element={<UnreadLetterPage />} />
        <Route path='/future/:letterId' element={<FutureLetterInfoPage />} />
      </Routes>
    </Box>
  )
}

export default Dashboard

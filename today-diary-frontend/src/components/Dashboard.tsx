import {Box} from '@mui/material'
import {Routes, Route} from 'react-router-dom'
import Banner from "./Banner";
import HomePage from "./HomePage";
import MyDiaryPage from "./MyDiaryPage";
import DiaryCreationForm from "./DiaryCreationForm";
import DiaryInfoPage from "./DiaryInfoPage";
import PublicDiaryPage from "./PublicDiaryPage";

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
      </Routes>
    </Box>
  )
}

export default Dashboard

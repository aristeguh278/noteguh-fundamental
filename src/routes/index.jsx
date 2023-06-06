import HomePage from '../pages'
import PageNotFound from '../pages/404'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CreateOrEdit from '../pages/CreateOrEdit'
import ArchivePage from '../pages/archive'
import NoteDetailPage from '../pages/detail'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/archive" element={<ArchivePage/>} />
        <Route path="/notes/:id" element={<NoteDetailPage />} /> 
        <Route path="/CreateorEdit" element={<CreateOrEdit/>}/>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate replace to="404" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router
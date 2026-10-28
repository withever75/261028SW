import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Research from './pages/Research'
import Teaching from './pages/Teaching'
import Discussion from './pages/Discussion'
import PostDetail from './pages/PostDetail'
import DiscussionGate from './components/DiscussionGate'
import Qna from './pages/Qna'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route element={<DiscussionGate />}>
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/discussion/:id" element={<PostDetail />} />
          <Route path="/qna" element={<Qna />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

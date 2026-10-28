import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AccessGate from './components/AccessGate'
import Home from './pages/Home'
import Research from './pages/Research'
import ProjectDetail from './pages/ProjectDetail'
import Teaching from './pages/Teaching'
import Discussion from './pages/Discussion'
import PostDetail from './pages/PostDetail'
import Qna from './pages/Qna'
import About from './pages/About'
import NotFound from './pages/NotFound'

// 모든 페이지는 AccessGate 안에 있어 로그인·승인된 사용자만 볼 수 있습니다.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<AccessGate />}>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:id" element={<ProjectDetail />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/discussion/:id" element={<PostDetail />} />
          <Route path="/qna" element={<Qna />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  )
}

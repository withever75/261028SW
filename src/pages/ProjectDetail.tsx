import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import MaterialsSection from '../components/MaterialsSection'
import PreviewBanner from '../components/PreviewBanner'
import { getProject } from '../services/researchService'
import { useAsync } from '../hooks'

export default function ProjectDetail() {
  const { id = '' } = useParams()
  const { data: project, loading } = useAsync(() => getProject(id).then((p) => p ?? null), [id])

  if (loading) return <Loading />
  if (!project) {
    return (
      <>
        <PageTitle title="프로젝트를 찾을 수 없습니다" />
        <Link to="/research" className="text-navy-700 underline">연구 목록으로</Link>
      </>
    )
  }
  return (
    <>
      <Link to="/research" className="text-sm text-navy-700 underline">← 연구 목록</Link>
      <div className="mt-4"><PageTitle title={project.title} desc={`${project.status} · ${project.period}`} /></div>
      <PreviewBanner />
      <p>{project.summary}</p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="키워드">
        {project.keywords.map((k) => <li key={k} className="tag">#{k}</li>)}
      </ul>
      <MaterialsSection projectId={project.id} />
    </>
  )
}

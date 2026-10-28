import PageTitle from '../components/PageTitle'
import Loading from '../components/Loading'
import CourseCard from '../components/CourseCard'
import { getCourses } from '../services/teachingService'
import { useAsync } from '../hooks'

export default function Teaching() {
  const { data, loading } = useAsync(getCourses)
  return (
    <>
      <PageTitle title="수업" desc="과목별 주차 자료입니다. 자료는 외부 링크로 연결됩니다." />
      {loading ? <Loading /> : (
        <div className="space-y-4">
          {data?.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </>
  )
}

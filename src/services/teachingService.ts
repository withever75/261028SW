import { courses } from '../data/teachingData'
import type { Course } from '../types'

// 2단계: 이 파일 안에서만 교체하면 됩니다.
export async function getCourses(): Promise<Course[]> {
  return courses
}

import { researchProjects } from '../data/researchData'
import type { ResearchProject } from '../types'

// 2단계: 이 파일 안에서만 Firestore 호출로 교체하면 됩니다.
export async function getProjects(): Promise<ResearchProject[]> {
  return researchProjects
}

export async function getProject(id: string): Promise<ResearchProject | undefined> {
  return researchProjects.find((p) => p.id === id)
}

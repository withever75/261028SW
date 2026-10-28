import { researchProjects } from '../data/researchData'
import { publications, scholarUrl } from '../data/publicationsData'
import type { Publication, ResearchProject } from '../types'

// 2단계: 이 파일 안에서만 Firestore 호출로 교체하면 됩니다.
export async function getProjects(): Promise<ResearchProject[]> {
  return researchProjects
}

export async function getProject(id: string): Promise<ResearchProject | undefined> {
  return researchProjects.find((p) => p.id === id)
}

export async function getPublications(): Promise<Publication[]> {
  return [...publications].sort((a, b) => b.year - a.year)
}

export const getScholarUrl = (): string => scholarUrl

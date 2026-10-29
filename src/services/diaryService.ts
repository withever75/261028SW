import { createStore } from './privateStore'
import type { DiaryEntry } from '../types'

export const diaryStore = createStore<DiaryEntry>('diaries')

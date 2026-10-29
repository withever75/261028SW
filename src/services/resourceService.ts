import { createStore } from './privateStore'
import type { ResourceItem } from '../types'

export const resourceStore = createStore<ResourceItem>('resources')

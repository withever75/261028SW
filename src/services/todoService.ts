import { createStore } from './privateStore'
import type { Todo } from '../types'

export const todoStore = createStore<Todo>('todos')

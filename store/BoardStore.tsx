import { getTodosGroupedColumn } from '@/lib/getTodosGroupedColumn';
import { create } from 'zustand'

interface BoardState {
    board: Board;
    getBoard: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async() => {
    const board = await getTodosGroupedColumn()
    set({ board })

  }
}))
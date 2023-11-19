import { create } from 'zustand'

interface BoardState {
    board: Board;
    getBoard: () => void;
}

const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypeColumn, Column>()
  },
  getBoard: async() => {
    // const board = await getTodosGroupedColumn( )
  }
}))
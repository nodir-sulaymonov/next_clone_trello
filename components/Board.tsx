'use client'

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function Board() {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);

useEffect(()=> {
  getBoard();
}, [getBoard]);

console.log(board);

  return (
    <DragDropContext onDragEnd={Board}>
        <Droppable droppableId='board' direction='horizontal' type='column'>
            {(provided) => (
                <div>
                    {/* rednderiim */}
                </div>
            )}
        </Droppable>
    </DragDropContext>
  )
}

export default Board;
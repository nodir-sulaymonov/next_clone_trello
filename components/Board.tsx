'use client'

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import StrictModeDroppable from '@/lib/useStrictModeDroppable';

function Board() {
  const [board, getBoard, setBoardState] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
  ]);


useEffect(()=> {
  getBoard();
}, [getBoard]);


const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return

    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board, 
        columns: rearrangedColumns,
      })
    }

    const columns = Array.from(board.columns);
    const startColumnIndex = columns[Number(source.droppableId)]
    const finishColumnIndex = columns[Number(destination.droppableId)]

    const startCol: Column = {
      id: startColumnIndex[0],
      todos: startColumnIndex[1].todos,
    }

    const finishCol: Column = {
      id: finishColumnIndex[0],
      todos: finishColumnIndex[1].todos,
    }
    
    if (!startCol || !finishCol) return;

    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);

      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns); 
      newColumns.set(startCol.id, newCol);

      setBoardState({
        ...board,
        columns: newColumns
      });
    } else {
        // draging to another column

      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns); 
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      //update DB

      setBoardState({
        ...board,
        columns: newColumns
      });
    }
}
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
     
            <StrictModeDroppable droppableId={"board"} direction='horizontal' type="column">
            {(provided, snapshot) => (
                <div 
                className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                {...provided.droppableProps}
                ref={provided.innerRef}
                >{
                      Array.from(board.columns.entries()).map(([id, column], index) => (
                        <Column 
                        key={id}
                        id={id}
                        todos={column.todos}
                        index={index}
                        />
                      ))
                    }
                    {provided.placeholder}
                </div>
            )}
        </StrictModeDroppable>
        
    </DragDropContext>
  )
}

export default Board;
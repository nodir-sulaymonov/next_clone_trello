'use client'

import { 
    DraggableProvidedDragHandleProps, 
    DraggableProvidedDraggableProps 
} from "react-beautiful-dnd";

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function TodoCard({
    todo,
    index,
    id,
    innerRef,
    draggableProps,
    dragHandleProps
}: Props) {
  return (
    <div
    className="bg-white rounded-md space-x-2 drop-shadow-md"
    {...draggableProps}
    {...dragHandleProps}
    ref={innerRef} 
    >
        Hello
    </div>
  )
}

export default TodoCard
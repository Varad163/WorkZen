import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult
} from "react-beautiful-dnd";

import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot
} from "react-beautiful-dnd";

interface KanbanBoardProps {
  tasks: {
    _id: string;
    title: string;
    description?: string;
    status: string;
    dueDate?: string;
  }[];

  updateStatus: (taskId: string, newStatus: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, updateStatus }) => {
  const columns = [
    { id: "todo", title: "📝 To Do" },
    { id: "in-progress", title: "⚙️ In Progress" },
    { id: "completed", title: "✅ Completed" }
  ];

  // Group tasks by status
  const grouped: Record<string, any[]> = {
    "todo": [],
    "in-progress": [],
    "completed": []
  };

  tasks.forEach((task) => grouped[task.status].push(task));

  // Handle drag end
  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    const newStatus = destination.droppableId;

    updateStatus(draggableId, newStatus);
  };

  return (
    <div className="mt-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {columns.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-lg shadow min-h-[400px] transition border 
                  
                  ${snapshot.isDraggingOver ? "bg-blue-100" : "bg-gray-100"}`}
                >
                  <h2 className="text-xl font-bold mb-3">{col.title}</h2>

                  {grouped[col.id].map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(providedDr: DraggableProvided, snap: DraggableStateSnapshot) => (
                        <div
                          ref={providedDr.innerRef}
                          {...providedDr.draggableProps}
                          {...providedDr.dragHandleProps}
                          className={`p-4 mb-3 rounded-lg border shadow bg-white transition 
                            ${snap.isDragging ? "bg-blue-50 scale-[1.02]" : ""}`}
                        >
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.description}</p>

                          {task.dueDate && (
                            <p className="text-xs text-blue-600 mt-2">
                              Due: {task.dueDate.split("T")[0]}
                            </p>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;

import { useEffect } from "react";
import { useState } from "react";
import {
  createTable,
  retrieveTable,
  saveTable,
  generateDay,
} from "../class schedule/scheduleBackend";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { notify } from "../notification/notificationBackend";
import Notification from "../notification/Notification";
let noti = [];

const current = new Date();

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;

  const { source, destination } = result;

  const updatedColumns = [...columns];

  // Retrieve the source and destination column objects
  const sourceColumn = updatedColumns.find(
    (column) => column.block.toString() === source.droppableId
  );
  const destColumn = updatedColumns.find(
    (column) => column.block.toString() === destination.droppableId
  );

  // Retrieve the source and destination items
  const sourceItems = [...sourceColumn.items];
  const destItems = [...destColumn.items];

  // Remove the dragged item from the source items
  const [removed] = sourceItems.splice(source.index, 1);

  // Insert the dragged item into the destination items at the desired index
  destItems.splice(destination.index, 0, removed);

  // Update the source column with the modified items
  sourceColumn.items = sourceItems;

  // Update the destination column with the modified items
  destColumn.items = destItems;

  // Update the state with the modified columns
  setColumns(updatedColumns);

  //Notification for Added
  const addedItem = destItems[destination.index];
  const addedDay = generateDay(destination.droppableId);
  const period = destination.droppableId % 7;

  noti.push({
    period: period,
    blockDay: addedDay,
    code: addedItem.code,
    day: current.toLocaleDateString(),
    time: current.toLocaleTimeString(),
    type: "added",
  });
};

const TeacherTable = ({ uid }) => {
  const [data, setData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  //adding an even

  const fetchData = async () => {
    try {
      const retrievedData = await retrieveTable(uid);
      setData(retrievedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveTable = async () => {
    try {
      await saveTable(data, uid);
      fetchData(); // Fetch the updated data after saving
      notify(noti, uid);
      noti.splice(0, noti.length);
    } catch (error) {
      console.error(error);
    }
  };

  const onAdd = (columnIndex) => {
    const newItem = {
      id: `${uuid()}`,
      code: itemName,
      date: Timestamp.fromDate(new Date()),
    };

    setData((prevData) => {
      const newData = [...prevData];
      newData[columnIndex].items.push(newItem);
      return newData;
    });

    setItemName("");
    setAddOpen(!addOpen);
  };

  const onDelete = (columnIndex, index) => {
    const newData = [...data];

    noti.push({
      period: columnIndex % 7,
      blockDay: generateDay(columnIndex),
      code: newData[columnIndex].items[0].code,
      day: current.toLocaleDateString(),
      time: current.toLocaleTimeString(),
      type: "removed",
    });

    newData[columnIndex].items.splice(index, 1);
    setData(newData);
    console.log("deleted");
  };

  return (
    <div className="w-full px-4">
      <h1 className="text-gray-600 text-2xl px-4 font-bold">Your Schedule</h1>
      <Notification userID={uid} />
      <button
        onClick={() => createTable(uid)}
        className="bg-red-400 p-4 rounded-lg"
      >
        Add Table
      </button>

      <button onClick={handleSaveTable}>Save Table</button>
      {data.length !== 0 ? (
        <div className="grid grid-cols-8 gap-1 my-4">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, data, setData)}
          >
            {data.map((column, columnIndex) => (
              <div
                key={column.block}
                className={`${
                  columnIndex === 0
                    ? "bg-gray-400 row-span-6 h-[460px] w-32 rounded-sm p-2"
                    : "bg-red-400 shadow-sm h-14 w-32"
                } rounded-sm p-2`}
              >
                {columnIndex === 0 && (
                  <>
                    <div onClick={() => setAddOpen(!addOpen)}>+</div>
                    {addOpen && (
                      <div className="modal">
                        <div className="modal-content">
                          <h2>Enter Item Name</h2>
                          <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                          />
                          <button onClick={() => onAdd(columnIndex)}>
                            Add
                          </button>
                          <button onClick={() => setAddOpen(!addOpen)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <Droppable droppableId={column.block}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {column.items &&
                        column.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                key={item.id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-blue-300 rounded-sm p-2"
                              >
                                <div className="h-4 w-28">
                                  {item.code}
                                  <button
                                    onClick={() => onDelete(columnIndex, index)}
                                  >
                                    d
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        </div>
      ) : (
        <p>No object</p>
      )}
    </div>
  );
};

export default TeacherTable;

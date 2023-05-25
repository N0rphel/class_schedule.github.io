import { useState } from "react";
import {
  retrieveTable,
  createClass,
  generateDay,
  saveTable,
  getRole,
  retrieveUsername,
} from "./class";
import { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { notify } from "../notification/notificationBackend";
import Notification from "../notification/Notification";
import { FaSave } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";
import { getAuth } from "firebase/auth";
import NotifyEmail from "../notification/NotifyEmail";

let noti = [];
const current = new Date();
const uid = "class2IT";
const asd = getAuth();
const user = asd.currentUser;

const RenderTable = () => {
  const [data, setData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [role, setRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUsername, setIsUsername] = useState("");

  // Call the getRole function to retrieve the role value
  getRole(user).then((userRole) => {
    setRole(userRole);
  });

  //console.log(role);

  const fetchUsername = async () => {
    try {
      const retrievedName = await retrieveUsername(user.uid);
      setIsUsername(retrievedName);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchData = async () => {
    try {
      const retrievedData = await retrieveTable();
      setData(retrievedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNotifyEmailCancel = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSaveTable = async () => {
    try {
      await saveTable(data);
      fetchData(); // Fetch the updated data after saving
      notify(noti, uid);
      noti.splice(0, noti.length);
      setIsModalOpen(true);
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
      author: isUsername,
    });

    newData[columnIndex].items.splice(index, 1);
    setData(newData);
    console.log("deleted");
  };

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
      author: isUsername,
    });
  };

  return (
    <div>
      <div>
        <div className="px-4">
          {data.length !== 0 ? (
            <div className="grid grid-cols-8">
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, data, setData)}
              >
                {data.map((column, columnIndex) => (
                  <div
                    key={column.block}
                    className={`${
                      columnIndex === 0
                        ? "bg-gray-400 row-span-6 h-[460px] w-32 rounded-lg p-2  "
                        : "bg-red-400 shadow-sm h-14 w-32 flex items-center justify-center"
                    } rounded-sm`}
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
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
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
                                    <div className="h-4 w-24">
                                      {item.code}
                                      {role !== "student" && (
                                        <button
                                          onClick={() =>
                                            onDelete(columnIndex, index)
                                          }
                                        >
                                          <IoTrashBin />
                                        </button>
                                      )}
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
            <div className="absolute h-screen duration-300 bg-gray-700  flex items-center justify-center inset-0">
              <img src="./pictures/1490.gif" alt="GIF" className="w-24 h-24" />
            </div>
          )}

          {role !== null && role !== "student" ? (
            <div className="w-full px-4 flex ">
              <div
                onClick={handleSaveTable}
                className="flex cursor-pointer hover:scale-105  duration-500 p-1 gap-1 items-center"
              >
                <FaSave size={20} />
                <span className="text-gray-900 gap-1text-lg ">save</span>
              </div>
              <button
                onClick={createClass}
                className="flex cursor-pointer hover:scale-105 duration-500  gap-1 p-1 items-center"
              >
                <AiOutlineClear size={20} />
                <span>Reset</span>
              </button>
            </div>
          ) : (
            ""
          )}
          <Notification userID={uid} />
          {isModalOpen && (
            <NotifyEmail userID={uid} onCancel={handleNotifyEmailCancel} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderTable;

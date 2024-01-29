import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Task 1",
      description: "Deskripsi Task 1",
      list: "todo-list-item",
    },
    {
      id: 2,
      text: "Task 2",
      description: "Deskripsi Task 2",
      list: "todo-list-item",
    },
    {
      id: 3,
      text: "Task 3",
      description: "Deskripsi Task 3",
      list: "todo-list-item",
    },
    {
      id: 4,
      text: "Task 4",
      description: "Deskripsi Task 4",
      list: "todo-list-item",
    },
    {
      id: 5,
      text: "Task 5",
      description: "Deskripsi Task 5",
      list: "todo-list-item",
    },
  ]);

  const [doneItems, setDoneItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [sourceList, setSourceList] = useState(null);

  const handleDragStart = (e, id, sourceList) => {
    setDraggedItem(id);
    setSourceList(sourceList);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetList) => {
    e.preventDefault();

    if (draggedItem !== null && sourceList !== null) {
      const draggedItemId = draggedItem;

      // Check if the target box is different from the source box
      if (targetList === "todo-list-done" && sourceList === "todo-list-item") {
        // Move the item from todo-list-item to done
        const draggedTask = tasks.find((task) => task.id === draggedItemId);

        setDoneItems((prevDoneItems) => [...prevDoneItems, { ...draggedTask }]);

        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== draggedItemId)
        );
      } else if (
        targetList === "todo-list-item" &&
        sourceList === "todo-list-done"
      ) {
        // Move the item from done to todo-list-item
        const draggedDoneItem = doneItems.find(
          (item) => item.id === draggedItemId
        );

        setTasks((prevTasks) => [...prevTasks, { ...draggedDoneItem }]);

        setDoneItems((prevDoneItems) =>
          prevDoneItems.filter((item) => item.id !== draggedItemId)
        );
      }

      setDraggedItem(null);
      setSourceList(null);
    }
  };

  const handleClickMove = (id, targetList) => {
    if (targetList === "todo-list-done") {
      const itemToMove = tasks.find((task) => task.id === id);

      setDoneItems((prevDoneItems) => [...prevDoneItems, { ...itemToMove }]);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } else if (targetList === "todo-list-item") {
      const itemToMove = doneItems.find((item) => item.id === id);

      setTasks((prevTasks) => [...prevTasks, { ...itemToMove }]);
      setDoneItems((prevDoneItems) =>
        prevDoneItems.filter((item) => item.id !== id)
      );
    }
  };

  const handleSortTask = (list) => {
    const sortedList = list === "todo-list-done" ? doneItems : tasks;
    const sortedItems = [...sortedList].sort((a, b) => a.id - b.id);

    if (list === "todo-list-done") {
      setDoneItems(sortedItems);
    } else {
      setTasks(sortedItems);
    }
  };

  const handleClearDoneTasks = () => {
    setDoneItems([]);
  };

  const [modalVisible, setModalVisible] = useState(true);

  const handleRemoveModal = () => {
    setModalVisible(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="container">
      <div
        id="todo-list-item"
        className="box"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, "todo-list-item")}
      >
        <h1>
          To Do List{" "}
          <div>
            <span
              id="sort-item"
              onClick={() => handleSortTask("todo-list-item")}
            >
              Sort Task
            </span>
          </div>
        </h1>
        <div className="todo-wrapper">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`miniBox ${task.id === draggedItem ? "dragging" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id, "todo-list-item")}
              onClick={() => handleClickMove(task.id, "todo-list-done")}
            >
              <h3>{task.text}</h3>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        id="todo-list-done"
        className="box"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, "todo-list-done")}
      >
        <h1>
          Done{" "}
          <div>
            <span id="clear-task" onClick={handleClearDoneTasks}>
              Clear Task
            </span>
            <span
              id="sort-done"
              onClick={() => handleSortTask("todo-list-done")}
            >
              Sort Task
            </span>
          </div>
        </h1>
        <div className="todo-wrapper">
          {doneItems.map((item) => (
            <div
              key={item.id}
              className={`miniBox ${item.id === draggedItem ? "dragging" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id, "todo-list-done")}
              onClick={() => handleClickMove(item.id, "todo-list-item")}
            >
              <h3>{item.text}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {modalVisible && (
        <div className="modal-bg">
          <div className="modal">
            <h1>WELCOME TO REACT TODO LIST 🤩</h1>
            <p>
              Ini Merupakan Aplikasi Web To Do List Sederhana Menggunakan React,
              <br />
              Cara menggunakan aplikasi ini cukup mudah kalian bisa melakukan
              drag item todo <br />
              list ke list done atau kalian juga bisa klik tasknya
            </p>
            <span id="remove-modal" onClick={handleRemoveModal}>
              Klik Untuk Mencoba 😊
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import CardSection from "./components/CardSection";
import Header from "./components/Header";
import dummyData from "./constant/dummyData";
import timeData from "./constant/dummyTime";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, ListRestart } from "lucide-react";
import { useLocalStorage, useTimeStorage } from "./hooks/useLocalStorage";
import { Reorder, useDragControls } from "framer-motion";

function App() {
  const { setItem, getItem } = useLocalStorage("data");
  const { setLocalTime, getLocalTime } = useTimeStorage("time");
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("09:00");
  const [cards, setCards] = useState(getItem() || dummyData);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [timeEntries, setTimeEntries] = useState(getLocalTime() || timeData);
  const totalCount = cards.length;
  const [greenCount, setGreenCount] = useState(0);
  const [redCount, setRedCount] = useState(0);
  const dragControls = useDragControls();

  const handleClear = () => {
    setName("");
    setTask("");
    setLocation("");
    setTime("09:00");
  };

  const handleDelete = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    const updatedTimeEntries = timeEntries.filter((_, i) => i !== index);
    setCards(updatedCards);
    setTimeEntries(updatedTimeEntries);
    if (editIndex === index) setEditIndex(null);
  };

  const handleEdit = (index: number, updatedData: (typeof cards)[0]) => {
    const updatedCards = [...cards];
    updatedCards[index] = updatedData;
    setCards(updatedCards);
    setEditIndex(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const timeExists = timeEntries.some(
      (entry) => entry.time === time && editIndex === null
    );
    if (timeExists) {
      alert(
        `An event is already scheduled at ${time}. Please choose a different time.`
      );
      return;
    }

    const newCard = {
      id: editIndex !== null ? cards[editIndex].id : Date.now(),
      name,
      task,
      location,
      attendedTask: null,
    };

    if (editIndex !== null) {
      handleEdit(editIndex, newCard);
      const updatedTimeEntries = [...timeEntries];
      updatedTimeEntries[editIndex] = { time };
      setTimeEntries(updatedTimeEntries);
    } else {
      const updatedCards = [...cards, newCard];
      const updatedTimeEntries = [...timeEntries, { time }];

      const sortedEntries = updatedCards
        .map((card, index) => ({ card, time: updatedTimeEntries[index].time }))
        .sort((a, b) => a.time.localeCompare(b.time));

      setCards(sortedEntries.map((entry) => entry.card));
      setTimeEntries(sortedEntries.map((entry) => ({ time: entry.time })));
    }

    handleClear();
  };

  const updateAttendedTask = (index: number, newStatus: boolean | null) => {
    const updatedCards = [...cards];
    updatedCards[index].attendedTask = newStatus;
    setCards(updatedCards);
  };

  useEffect(() => {
    setItem(cards);
    setLocalTime(timeEntries);
  }, [cards, setItem, timeEntries, setLocalTime]);

  useEffect(() => {
    const green = cards.filter((card) => card.attendedTask === true).length;
    const red = cards.filter((card) => card.attendedTask === false).length;
    setGreenCount(green);
    setRedCount(red);
  }, [cards]);

  const handleReset = () => {
    setItem([]);
    setCards([]);
    setTimeEntries([]);
    alert("List Cleared!");
  };

  return (
    <>
      <Header
        totalCount={totalCount}
        greenCount={greenCount}
        redCount={redCount}
      />
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="m-1 p-1 border-2 rounded-full">
              <Plus size={15} />
            </button>
          </DialogTrigger>
          <div className="float-right" onClick={handleReset}>
            <ListRestart className="m-1 p-1 border-2 rounded-full" />
          </div>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>
                {editIndex === null ? "Add Client" : "Edit Client"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Task</label>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter task"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                  required
                  min="09:00"
                  max="18:00"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
              >
                {editIndex === null ? "Submit" : "Save Changes"}
              </button>
            </form>
          </DialogContent>
        </Dialog>

        <Reorder.Group axis="y" values={cards} onReorder={setCards}>
          {cards.map((card, index) => {
            const timeFromData = timeEntries[index]?.time || "09:00";
            return (
              <CardSection
                key={card.id}
                card={card}
                name={card.name}
                task={card.task}
                location={card.location}
                time={timeFromData}
                attendedTask={card.attendedTask}
                index={index + 1}
                totalCount={totalCount}
                onDelete={() => handleDelete(index)}
                onEdit={(updatedData) => handleEdit(index, updatedData)}
                updateAttendedTask={(newStatus) =>
                  updateAttendedTask(index, newStatus)
                }
                dragControls={dragControls}
              />
            );
          })}
        </Reorder.Group>
      </div>
    </>
  );
}

export default App;

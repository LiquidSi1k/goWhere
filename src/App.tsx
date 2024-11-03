import { useState, useEffect } from "react";
import CardSection from "./components/CardSection";
import Header from "./components/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, ListRestart } from "lucide-react";
import { useLocalStorage, useTimeStorage } from "./hooks/useLocalStorage";
import { Reorder } from "framer-motion";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "./hooks/use-toast";

interface Card {
  id: number;
  name: string;
  task: string;
  location: string;
  time: string;
  postalCodes: string;
  attendedTask: boolean | null;
}

interface TimeEntry {
  time: string;
}

function App() {
  const { getItem, setItem } = useLocalStorage<Card[]>("cards");
  const { setLocalTime, getLocalTime } = useTimeStorage("time");
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("09:00");
  const [cards, setCards] = useState<Card[]>(getItem() || []);
  const [postalCodes, setPostalCodes] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(getLocalTime());
  const totalCount = cards.length;
  const [greenCount, setGreenCount] = useState(0);
  const [redCount, setRedCount] = useState(0);
  const { toast } = useToast();

  const handleClear = () => {
    setName("");
    setTask("");
    setLocation("");
    setTime("09:00");
    setPostalCodes("");
  };

  const handleDelete = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    const updatedTimeEntries = timeEntries.filter((_, i) => i !== index);
    setCards(updatedCards);
    setTimeEntries(updatedTimeEntries);
    if (editIndex === index) setEditIndex(null);
  };

  const handleEdit = (index: number, updatedData: Partial<Card>) => {
    const updatedCards = [...cards];
    const existingCard = updatedCards[index];

    updatedCards[index] = {
      ...existingCard,
      ...updatedData,
    };

    setCards(updatedCards);
    setEditIndex(null);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const timeExists = timeEntries.some(
      (entry) => entry.time === time && editIndex === null,
    );
    if (timeExists) {
      toast({
        variant: "destructive",
        title: "Uh oh! Same timing.",
        description: `An event is already scheduled at ${time} hours. Please choose a different time.`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    const newCard: Card = {
      id:
        editIndex !== null && Array.isArray(cards)
          ? cards[editIndex].id
          : Date.now(),
      name,
      task,
      location,
      time,
      attendedTask: null,
      postalCodes,
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
    toast({
      description: "List Cleared!",
    });
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <Header
        totalCount={totalCount}
        greenCount={greenCount}
        redCount={redCount}
      />
      <main className="flex-grow mt-8">
        <Dialog>
          <div className="flex w-full  justify-between">
            <DialogTrigger asChild>
              <button className="m-1 p-1 border-2 rounded-full bg-[#F7B195] text-slate-800">
                <Plus size={20} />
              </button>
            </DialogTrigger>
            <ListRestart
              className="m-1 p-1 border-2 rounded-full bg-[#F7B195] text-slate-800"
              onClick={() => {
                toast({
                  variant: "destructive",
                  title: "Are you sure?",
                  description: "This action will clear your list.",
                  action: (
                    <ToastAction altText="Confirm reset" onClick={handleReset}>
                      Confirm
                    </ToastAction>
                  ),
                });
              }}
              size={30}
            />
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
                <label className="block text-sm font-medium">Postal Code</label>
                <input
                  type="text"
                  value={postalCodes}
                  onChange={(e) => setPostalCodes(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
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
                className="mt-4 w-full bg-[#009688] text-white py-2 px-4 rounded-md text-sm"
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
                time={timeFromData}
                index={index + 1}
                totalCount={totalCount}
                onDelete={() => handleDelete(index)}
                onEdit={(updatedData) => handleEdit(index, updatedData)}
                updateAttendedTask={(newStatus) =>
                  updateAttendedTask(index, newStatus)
                }
              />
            );
          })}
        </Reorder.Group>
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;

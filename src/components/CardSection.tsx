import React, { useState, useEffect } from "react";
import Card from "./Card";
import { GripHorizontal } from "lucide-react";
import { Reorder, useMotionValue, useDragControls } from "framer-motion";
import { useRaisedShadow } from "../hooks/useRaisedShadow";

interface CardSectionProps {
  time?: string;
  card: {
    id: number;
    name: string;
    task: string;
    location: string;
    time?: string;
    postalCodes: string;
    attendedTask: boolean | null;
  };
  index: number;
  totalCount: number;
  onDelete: () => void;
  onEdit: (updatedData: {
    name: string;
    task: string;
    location: string;
    time?: string;
  }) => void;
  updateAttendedTask: (attendedTask: boolean | null) => void;
}

const CardSection: React.FC<CardSectionProps> = ({
  card,
  index,
  totalCount,
  onDelete,
  onEdit,
  updateAttendedTask,
  time,
}) => {
  const {
    id,
    name,
    task,
    location,
    attendedTask: initialAttendedTask,
    postalCodes,
  } = card;

  const [attendedTask, setAttendedTask] = useState<boolean | null>(
    initialAttendedTask,
  );

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  useEffect(() => {
    setAttendedTask(initialAttendedTask);
  }, [initialAttendedTask]);

  const handleTickClick = () => {
    setAttendedTask(true);
    updateAttendedTask(true);
  };

  const handleXClick = () => {
    setAttendedTask(false);
    updateAttendedTask(false);
  };

  const startDrag = (event: React.PointerEvent) => {
    event.preventDefault();
    dragControls.start(event);
  };

  return (
    <div className="w-full h-28 flex justify-around items-center sm:h-36">
      <div className="flex items-center gap-2">
        <div
          className={`w-[0.8rem] h-[0.8rem] rounded-full border-2 ${
            attendedTask === true
              ? "bg-green-500"
              : attendedTask === false
                ? "bg-red-500"
                : "bg-slate-500"
          } animate-pulse`}
        />
        <p className="font-semibold text-sm sm:text-base">{time}</p>
      </div>

      <Reorder.Item
        key={id}
        value={card}
        style={{ boxShadow, y }}
        className="rounded-2xl"
        dragListener={false}
        dragControls={dragControls}
      >
        <div className="relative rounded-2xl">
          <Card
            name={name}
            task={task}
            location={location}
            time={time}
            index={index}
            totalCount={totalCount}
            onDelete={onDelete}
            onEdit={onEdit}
            settingTaskT={handleTickClick}
            settingTaskX={handleXClick}
            attendedTask={attendedTask}
            postalCodes={postalCodes}
          />
          <button
            className="absolute bottom-0 right-1 cursor-pointer drag-handle"
            onPointerDown={startDrag}
            aria-label="Drag handle"
          >
            <GripHorizontal />
          </button>
        </div>
      </Reorder.Item>
    </div>
  );
};

export default CardSection;

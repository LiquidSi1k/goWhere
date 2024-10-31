import React, { useState, useEffect } from "react";
import Card from "./Card";
import { DragControls } from "framer-motion";
import { GripHorizontal } from "lucide-react";
import { Reorder, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "../hooks/useRaisedShadow";

interface CardSectionProps {
  time: string;
  card: {
    id: number;
    name: string;
    task: string;
    location: string;
    time: string;
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
    time: string;
  }) => void;
  updateAttendedTask: (attendedTask: boolean | null) => void;
  dragControls: DragControls;
}

const CardSection: React.FC<CardSectionProps> = ({
  card,
  index,
  totalCount,
  onDelete,
  onEdit,
  updateAttendedTask,
  dragControls,
  time,
  postalCodes,
}) => {
  const { id, name, task, location, attendedTask: initialAttendedTask } = card;
  const [attendedTask, setAttendedTask] = useState<boolean | null>(
    initialAttendedTask,
  );

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

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

  return (
    <div className=" w-full h-28 flex justify-around items-center">
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full border-2 ${
            attendedTask === true
              ? "bg-green-500"
              : attendedTask === false
                ? "bg-red-500"
                : "bg-slate-500"
          } animate-pulse`}
        />
        <p className="text-sm">{time}</p>
      </div>

      <Reorder.Item
        key={id}
        value={card}
        // dragListener={false}
        // dragControls={dragControls}
        style={{ boxShadow, y }}
        className="rounded-2xl"
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
            className="absolute bottom-0 right-1 cursor-pointer"
            onPointerDown={(e) => dragControls.start(e)}
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

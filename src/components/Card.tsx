import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, X, CarTaxiFront, Ellipsis } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CardProps {
  name: string;
  location: string;
  task: string;
  index?: number;
  totalCount?: number;
  onDelete: () => void;
  onEdit: (updatedData: {
    name: string;
    task: string;
    location: string;
    time?: string;
  }) => void;
  settingTaskT: () => void;
  settingTaskX: () => void;
  attendedTask: boolean | null;
}

const Card: React.FC<CardProps> = ({
  name,
  location,
  task,
  time,
  index,
  totalCount,
  onDelete,
  onEdit,
  settingTaskT,
  settingTaskX,
}) => {
  const [editName, setEditName] = useState(name);
  const [editTask, setEditTask] = useState(task);
  const [editLocation, setEditLocation] = useState(location);
  const [open, setOpen] = useState(false);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const handleEditSave = (e) => {
    e.preventDefault();
    wait().then(() => setOpen(false));
    onEdit({
      name: editName,
      task: editTask,
      location: editLocation,
      time,
    });
  };

  return (
    <div className="border w-72 h-24 rounded-2xl flex justify-around items-center">
      <div className="w-44 m-2">
        <p className="text-xs">
          case {index}/{totalCount}
        </p>
        <div className="w-full flex items-center gap-2 justify-between">
          <p className="text-nowrap text-lg font-bold truncate">{name}</p>
          <p className="text-right text-xs truncate">{task}</p>
        </div>
        <p className="text-sm">{location}</p>
      </div>

      <div className="h-full">
        <div className="w-full text-right">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="mt-1 mr-1" size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="text-sm py-1 px-2">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger>Edit</DialogTrigger>
                  <DialogContent className="rounded-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Client</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleEditSave} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium">
                          Name
                        </label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Task
                        </label>
                        <input
                          type="text"
                          value={editTask}
                          onChange={(e) => setEditTask(e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Location
                        </label>
                        <input
                          type="text"
                          value={editLocation}
                          onChange={(e) => setEditLocation(e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
                      >
                        Save Changes
                      </button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="pt-3">
          <button
            className="border p-1 rounded-full bg-slate-200"
            onClick={settingTaskT}
          >
            <Check size={15} />
          </button>
          <button
            className="border p-1 rounded-full bg-slate-200 ml-1"
            onClick={settingTaskX}
          >
            <X size={15} />
          </button>
          <button className="border p-1 rounded-full bg-slate-200 ml-1">
            <CarTaxiFront size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

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
import { useToast } from "@/hooks/use-toast";

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
  postalCodes: string;
  time?: string;
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
  postalCodes,
}) => {
  const [editName, setEditName] = useState(name);
  const [editTask, setEditTask] = useState(task);
  const [editLocation, setEditLocation] = useState(location);
  const [open, setOpen] = useState(false);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const { toast } = useToast();

  const handleEditSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    wait().then(() => setOpen(false));
    onEdit({
      name: editName,
      task: editTask,
      location: editLocation,
      time,
    });
  };

  // const openGrabApp = async () => {
  //   const grabUrl = "grab://open"; // URI for the Grab app
  //   const playStoreUrl =
  //     "https://play.google.com/store/apps/details?id=com.grabtaxi.driver"; // For Android
  //   const appStoreUrl = "https://apps.apple.com/app/grab/id647268330"; // For iOS
  //   const grabWeb = "https://www.grab.com/sg/";

  //   try {
  //     await navigator.clipboard.writeText(postalCodes);
  //     alert("Destination copied! Opening Grab...");

  //     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  //     const isAndroid = /Android/.test(navigator.userAgent);

  //     if (isIOS) {
  //       window.location.href = grabUrl; // This may work for iOS
  //       setTimeout(() => {
  //         // Fallback to App Store after a short delay
  //         window.location.href = appStoreUrl;
  //       }, 2000); // Adjust delay as needed
  //     } else if (isAndroid) {
  //       // Attempt to open the Grab app
  //       const opened = window.open(grabUrl, "_system");
  //       if (!opened) {
  //         // If the Grab app does not open, fallback to the Play Store
  //         window.open(playStoreUrl, "_blank");
  //       }
  //     } else {
  //       // Fallback for desktop users
  //       alert(
  //         "Grab app is not available on this device. Please use your mobile device or click here to visit the Grab website.",
  //       );
  //       window.open(grabWeb, "_blank"); // Provide a link to the Play Store or a website
  //     }
  //   } catch (error) {
  //     console.error("Error opening Grab app:", error);
  //   }
  // };

  const openGrabApp = () => {
    const grabUrl = "grab://open"; // URI for the Grab app
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.grabtaxi.driver"; // For Android
    // const appStoreUrl = "https://apps.apple.com/app/grab/id647268330"; // For iOS
    const grabWeb = "https://www.grab.com/sg/";

    try {
      navigator.clipboard.writeText(postalCodes);
      // alert("Destination copied! Opening Grab...");
      toast({
        description: "Destination copied! Opening Grab...",
      });

      // Attempt to open the Grab app
      const opened = window.open(grabUrl, "_self");

      if (!opened) {
        // If the Grab app does not open, fallback to the Play Store
        window.location.href = playStoreUrl;
      }
    } catch (error) {
      console.error("Error opening Grab app:", error);
      // Fallback for desktop users
      alert(
        "Grab app is not available on this device. Please visit the Grab website.",
      );
      window.open(grabWeb, "_blank"); // Provide a link to the Grab website
    }
  };

  return (
    <div className="w-72 h-24 rounded-2xl flex justify-around items-center bg-white neumorphism sm:w-96 sm:h-32 sm:justify-between sm:p-2">
      <div className="w-44 m-2">
        <p className="text-xs sm:text-sm">
          case {index}/{totalCount}
        </p>
        <div className="w-full flex items-center gap-2 justify-between">
          <p className="text-nowrap text-lg sm:text-2xl font-bold truncate">
            {name}
          </p>
          <p className="text-right text-xs sm:text-sm truncate">{task}</p>
        </div>
        <p className="text-sm sm:text-base">{location}</p>
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
                        className="mt-4 w-full bg-[#009688] text-white py-2 px-4 rounded-md text-sm"
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
        <div className="pt-2 sm:pt-3">
          <button
            className="border p-1 rounded-full bg-[#009688] text-white"
            onClick={settingTaskT}
          >
            <Check className="size-4 sm:size-5" />
          </button>
          <button
            className="border p-1 rounded-full bg-[#ff6b6b] text-white ml-1"
            onClick={settingTaskX}
          >
            <X className="size-4 sm:size-5" />
          </button>
          <button
            className="border p-1 rounded-full bg-[#28a745] text-white ml-1"
            onClick={openGrabApp}
          >
            <CarTaxiFront className="size-4 sm:size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

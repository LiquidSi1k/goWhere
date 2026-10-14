import { TramFront, Utensils, Check, X } from "lucide-react";

interface HeaderProps {
  totalCount: number;
  greenCount: number;
  redCount: number;
}

const Header: React.FC<HeaderProps> = ({
  totalCount,
  greenCount,
  redCount,
}) => {
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }

  const bedokGoogleMap = () => {
    window.location.href =
      "https://www.google.com/maps/search/?api=1&query=460534";
  };

  const amkGoogleMap = () => {
    window.location.href =
      "https://www.google.com/maps/search/?api=1&query=569766";
  };

  const mrtGoogleMap = () => {
    window.location.href =
      "https://www.google.com/maps/search/?api=1&query=mrt+near+me";
  };

  const foodGoogleMap = () => {
    window.location.href =
      "https://www.google.com/maps/search/?api=1&query=food+near+me";
  };

  return (
    <section className="w-full h-36 flex">
      <div className="w-1/2 h-full flex p-1 pr-0">
        <div className="h-full w-1/2 rounded-2xl grid text-center bg-[#355C7D] text-[#F7B195] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <p className="place-self-center text-xs font-extrabold">
            Total Clients
          </p>
          <p className="font-bold">{totalCount}</p>
        </div>
        <div className="h-full w-1/2 pl-1 pb-1">
          <div className="h-1/2 rounded-2xl w-full relative grid bg-[#F7B195] text-[#3c5c78] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <Check
              size={25}
              className="absolute right-0 top-0 border rounded-full p-1 mt-[2px] mr-[2px] bg-[#009688] text-white"
            />
            <p className="place-self-center font-extrabold">{greenCount}</p>
          </div>
          <div className="h-1/2 rounded-2xl w-full relative grid mt-1 bg-[#F7B195] text-[#355C7D] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <X
              size={25}
              className="absolute right-0 top-0 border rounded-full p-1 mt-[2px] mr-[2px] bg-[#ff6b6b] text-white"
            />
            <p className="place-self-center font-extrabold">{redCount}</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full p-1">
        <div className=" rounded-2xl h-4/6 flex flex-col items-end pr-1 container text-[#FFF4E6] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] overflow-hidden">
          <p className="text-3xl font-extrabold bg-white drop-shadow-[0_0_0.4rem_black] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5">
            GoWhere
          </p>
          <p className="text-sm drop-shadow-[0_0_0.4rem_black] font-bold bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5">
            {getDate()}
          </p>
        </div>
        <div className="flex justify-end gap-1 my-1">
          <button
            className="border-2 p-1 rounded-full text-xs bg-[#F7B195] text-gray-700"
            onClick={amkGoogleMap}
            disabled
          >
            <p className="text-sm font-semibold">AMK</p>
          </button>
          <button
            className="border-2 p-1 rounded-full text-xs bg-[#F7B195] text-gray-700"
            onClick={bedokGoogleMap}
            disabled
          >
            <p className="text-sm font-semibold">Bedok</p>
          </button>
          <button
            className="border-2 p-1 px-2 rounded-full bg-[#F7B195] text-gray-700"
            onClick={mrtGoogleMap}
          >
            <TramFront size={16} />
          </button>
          <button
            className="border-2 py-1 px-2 rounded-full bg-[#F7B195] text-gray-700"
            onClick={foodGoogleMap}
          >
            <Utensils size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;

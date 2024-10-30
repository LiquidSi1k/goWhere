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

  return (
    <section className="w-full h-36 flex">
      <div className="w-1/2 h-full flex p-1 pr-0">
        <div className="h-full w-1/2 rounded-2xl grid text-center bg-[#007bff] text-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <p className="place-self-center text-xs font-semibold">
            Total Clients
          </p>
          <p className="font-bold">{totalCount}</p>
        </div>
        <div className="h-full w-1/2 pl-1 pb-1">
          <div className="h-1/2 rounded-2xl w-full relative grid bg-[#009688] text-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <Check
              size={25}
              className="absolute right-0 top-0 border rounded-full p-1 mt-[2px] mr-[2px]"
            />
            <p className="place-self-center">{greenCount}</p>
          </div>
          <div className="h-1/2 rounded-2xl w-full relative grid mt-1 bg-[#ff6b6b] text-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <X
              size={25}
              className="absolute right-0 top-0 border rounded-full p-1 mt-[2px] mr-[2px]"
            />
            <p className="place-self-center">{redCount}</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full p-1">
        <div className=" rounded-2xl h-4/6 text-right pr-1 container text-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <p className="text-2xl font-bold drop-shadow-[0_0_0.4rem_black]">
            GoWhere
          </p>
          <p className="text-xs drop-shadow-[0_0_0.4rem_black]">{getDate()}</p>
        </div>
        <div className="flex justify-end gap-1 my-1">
          <button className="border-2 p-1 rounded-full text-xs">AMK</button>
          <button className="border-2 p-1 rounded-full text-xs">Bedok</button>
          <button className="border-2 p-1 rounded-full">
            <TramFront size={15} />
          </button>
          <button className="border-2 p-1 rounded-full">
            <Utensils size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;

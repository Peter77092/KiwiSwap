/* eslint-disable react/prop-types */
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const SquareItem = ({ itemLeft, icon, title, timeLeft, href }) => {
  return (
    <Link to={href} className="aspect-square bg-gradient-to-b from-green-500 flex justify-center items-center to-slate-700 rounded-lg">
      <div className="w-[96%] h-[96%] relative bg-[#6aaf83] rounded-lg p-5 flex flex-col items-center justify-center gap-2">
        {itemLeft ? (
          <div className="animate-spin absolute w-1.5 h-1.5 rounded-full top-2 right-2 bg-white" />
        ) : (
          <div className="absolute rounded-full -top-2 -right-2 flex justify-center items-center">
            <IoMdCheckmarkCircleOutline color="blue" size={22} />
          </div>
        )}

        <div className="w-full flex justify-center">{icon}</div>

        <p className="text-xs text-white">{title}</p>

        <p className="text-xs text-white">{timeLeft}</p>
      </div>
    </Link>
  );
};

export default SquareItem;

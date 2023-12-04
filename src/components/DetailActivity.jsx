import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BiTime, BiLinkExternal } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { HiStatusOnline } from "react-icons/hi";
import { Link } from "react-router-dom";
import { getFormatDate, getTimeWITA } from "../utils";
import { MdMyLocation } from "react-icons/md";

const DetailActivity = ({ date, startTime, endTime, location, link }) => {
  return (
    <div className="bg-base-200 rounded-md p-4 ">
      <div className="grid md:grid-cols-2 gap-4 ">
        <div className="flex items-center gap-4">
          <AiTwotoneCalendar className="h-7 w-7" />
          <div>
            <h4 className="text-xs font-semibold">Tanggal</h4>
            <p className="text-xs">{getFormatDate(date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BiTime className="h-7 w-7" />
          <div>
            <h4 className="text-xs font-semibold">Mulai - Selesai</h4>
            <div className="flex items-center">
              <p className="text-xs">{getTimeWITA(startTime)}</p>
              <p className="text-xs mx-2">-</p>
              <p className="text-xs">{getTimeWITA(endTime)}</p>
            </div>
          </div>
        </div>
        {!link ? (
          <div className="flex items-center gap-4">
            <MdMyLocation className="h-7 w-7" />
            <div>
              <h4 className="text-xs font-semibold">Location</h4>
              <p className="text-xs">{location}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <HiStatusOnline className="h-7 w-7" />
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-semibold">Online</h4>
              <Link to={link} className="p-0">
                <BiLinkExternal />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailActivity;

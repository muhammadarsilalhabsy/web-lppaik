import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import ActivityGrid from "./ActivityGrid";
import ActivityList from "./ActivityList";

const ActivitiesContainer = () => {
  const { activities } = useLoaderData();

  const [layout, setLayout] = useState("grid");
  const setActivityStyle = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`;
  };
  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-base-300 mt-8 pb-5">
        <h4 className="font-medium text-md">{activities.length} kegiatan</h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => setLayout("grid")}
            className={setActivityStyle("grid")}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            onClick={() => setLayout("list")}
            className={setActivityStyle("list")}
          >
            <BsList />
          </button>
        </div>
      </div>
      {/* ACTIVITIS */}
      <div>
        {activities.length === 0 ? (
          <h1 className="text-2xl mt-16">
            Sorry, no activity matched your search...
          </h1>
        ) : layout === "grid" ? (
          <ActivityGrid />
        ) : (
          <ActivityList />
        )}
      </div>
    </>
  );
};

export default ActivitiesContainer;

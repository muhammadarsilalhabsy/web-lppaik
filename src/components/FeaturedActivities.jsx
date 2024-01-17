import ActivityGrid from "./ActivityGrid";
import SectionTitle from "./SectionTitle";

const FeaturedActivities = () => {
  return (
    <div className="pt-24">
      <SectionTitle text="Kegiatan Rutin" size="text-xl" />
      <ActivityGrid />
    </div>
  );
};

export default FeaturedActivities;

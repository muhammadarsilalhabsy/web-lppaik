import ActivityGrid from "./ActivityGrid";
import SectionTitle from "./SectionTitle";

const FeaturedActivities = () => {
  return (
    <div className="pt-24">
      <SectionTitle text="Kegaitan wajib" size="text-xl" />
      <ActivityGrid />
    </div>
  );
};

export default FeaturedActivities;

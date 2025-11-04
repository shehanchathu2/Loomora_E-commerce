import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-white rounded-xl shadow p-4">
        <Skeleton height={160} />
        <Skeleton width="80%" height={20} className="mt-3" />
        <Skeleton width="60%" height={20} />
        <Skeleton width="40%" height={25} />
      </div>
    ))}
  </div>
);

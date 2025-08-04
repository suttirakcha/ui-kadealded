import Loading from "@/components/icons/Loading";
import useDealStore from "@/stores/useDealStore";
import { useEffect } from "react";
import { useParams } from "react-router";

function AdminSingleDeal() {
  const { id } = useParams();
  const { currentDeal: deal, getDealById, clearCurrentDeal } = useDealStore();

  useEffect(() => {
    const run = async () => {
      await getDealById(id);
    };

    run();
    return () => clearCurrentDeal();
  }, []);

  if (!deal) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3 p-5">Deal detail</h2>

      <div className="space-y-6">
        <div>
          <h1>{deal?.title}</h1>
          <p>{deal?.description}</p>
        </div>

        <div className="space-y-4">
          <h1 className="text-xl font-bold">Images</h1>
          <div className="flex items-center gap-2">
            {deal?.images?.map((image) => (
              <img
                src={image.image_url}
                alt={image.id}
                key={image.id}
                className="w-20 h-20 rounded-md object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSingleDeal;

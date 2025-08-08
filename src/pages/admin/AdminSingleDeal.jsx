import Loading from "@/components/icons/Loading";
import useDealStore from "@/stores/useDealStore";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CustomInput from "@/components/custom/CustomInput";
import useCategoryStore from "@/stores/useCategoryStore";
import useSellerStore from "@/stores/useSellerStore";
import { DatePicker } from "@/components/custom/DatePicker";
import AdminDealForm from "@/components/AdminDealForm";

function AdminSingleDeal() {
  const { id } = useParams();
  const {
    currentDeal: deal,
    getDealById,
    clearCurrentDeal,
  } = useDealStore();

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      await getDealById(id);
    };

    run();
    return () => clearCurrentDeal();
  }, [id, getDealById]);

  if (!deal) return <Loading />;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Edit deal: {deal?.title || ""}</h2>
      <AdminDealForm deal={deal} />
    </div>
  );
}

export default AdminSingleDeal;

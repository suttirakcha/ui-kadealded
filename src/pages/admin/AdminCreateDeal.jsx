import AdminDealForm from "@/components/AdminDealForm";

function AdminCreateDeal() {
  return (
    <div className="flex flex-col justify-between mb-4">
      <h2 className="text-3xl font-bold">Create deal</h2>
      <AdminDealForm />
    </div>
  );
}
export default AdminCreateDeal;

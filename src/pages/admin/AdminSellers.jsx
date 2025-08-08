import { useEffect, useState } from "react";
import Sidebar from "../../components/custom/Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSellerStore from "@/stores/useSellerStore";
import EditSellerDialog from "@/components/dialogs/EditSellerDialog";
import { format } from "date-fns";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Loading from "@/components/icons/Loading";
import DeleteSellerDialog from "@/components/dialogs/DeleteSellerDialog";
import useAuthStore from "@/stores/useAuthStore";

function AdminSellers() {
  const { user } = useAuthStore();
  const { sellers, fetchAllSellers, loading } = useSellerStore();
  const [selectedSellerToUpdate, setSelectedSellerToUpdate] = useState(null);
  const [selectedSellerToDelete, setSelectedSellerToDelete] = useState(null);

  useEffect(() => {
    const run = async () => {
      await fetchAllSellers();
    };
    run();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <h2 className="text-3xl font-bold">Sellers</h2>
        <Link to="/admin/create-seller">
          <Button className="flex items-center gap-2 text-base">
            <PlusCircle className="h-6 w-6" />
            Create seller
          </Button>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Company</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-left">Phone</TableHead>
              <TableHead className="text-left">Created at</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellers.length > 0 ? (
              <>
                {sellers?.map((seller) => (
                  <TableRow key={seller?.id}>
                    <TableCell className="text-left">{seller?.name}</TableCell>
                    <TableCell className="text-left">{seller?.email}</TableCell>
                    <TableCell className="text-left">
                      {seller?.tel_number}
                    </TableCell>
                    <TableCell className="text-left">
                      {seller?.created_at
                        ? format(new Date(seller?.created_at), "dd MMMM yyyy")
                        : ""}
                      {/* {new Date(seller?.created_at).toLocaleDateString("en-GB")} */}
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        className="text-white bg-blue-500 hover:bg-blue-700 px-5 py-1 rounded"
                        onClick={() => setSelectedSellerToUpdate(seller)}
                      >
                        Edit
                      </button>
                      {user?.role === "SUPERADMIN" && (
                        <button
                          className="text-white bg-red-500 hover:bg-red-700 px-5 py-1 rounded ml-5"
                          onClick={() => setSelectedSellerToDelete(seller)}
                        >
                          Delete
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No Sellers
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {selectedSellerToUpdate && (
        <EditSellerDialog
          open={selectedSellerToUpdate}
          onOpenChange={setSelectedSellerToUpdate}
          seller={selectedSellerToUpdate}
        />
      )}
      {selectedSellerToDelete && (
        <DeleteSellerDialog
          open={selectedSellerToDelete}
          onOpenChange={setSelectedSellerToDelete}
          seller={selectedSellerToDelete}
        />
      )}
    </div>
  );
}

export default AdminSellers;

import { useEffect, useState } from 'react';
import Sidebar from '../../components/custom/Sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSellerStore from '@/stores/userSellerStore';
import EditSellerDialog from '@/components/dialogs/EditSellerDialog';

function AdminSellers() {
  const { sellers, fetchAllSellers, deleteSeller } = useSellerStore();
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    const run = async () => {
       await fetchAllSellers();
    }
    run();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบ Seller นี้หรือไม่?");
    if (!confirmDelete) return;
    await deleteSeller(id);
  };

  return (
    <>
    <h2 className="text-xl font-bold mb-3 p-5">Sellers</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">Company</TableHead>
              <TableHead className="text-right">Email</TableHead>
              <TableHead className="text-right">Phone</TableHead>
              <TableHead className="text-right">Created At</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           {sellers.length > 0 ? <>{sellers.map((seller) => (
              <TableRow key={seller?.id}>
                <TableCell className="text-right">{seller?.name}</TableCell>
                <TableCell className="text-right">{seller?.email}</TableCell>
                <TableCell className="text-right">{seller?.tel_number}</TableCell>
                <TableCell className="text-right">
                  {new Date(seller?.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  <button
                    className='text-white bg-blue-500 hover:bg-blue-700 px-5 py-1 rounded'
                    onClick={() => setSelectedSeller(seller)}
                  >
                    Edit
                  </button>
                  <button
                    className='text-white bg-red-500 hover:bg-red-700 px-5 py-1 rounded ml-5'
                    onClick={() => handleDelete(seller.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}</> : "No Sellers" }
          </TableBody>
        </Table>

        {selectedSeller && (
          <EditSellerDialog
            open={selectedSeller}
            onOpenChange={setSelectedSeller}
            seller={selectedSeller}
          />
        )}
    </>
  );
}

export default AdminSellers;

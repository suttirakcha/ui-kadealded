import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDealStore from "@/stores/useDealStore";
import { useEffect } from "react";
import Loading from "@/components/icons/Loading";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { format } from "date-fns";

function AdminDeals() {
  const navigate = useNavigate();
  const { deals, getAllDeals } = useDealStore();
  useEffect(() => {
    const run = async () => {
      await getAllDeals();
    };

    run();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <h2 className="text-3xl font-bold">Total deals</h2>
        <Link to="/admin/create-deal">
          <Button className="flex items-center gap-2 text-base">
            <PlusCircle className="h-6 w-6" />
            Create deal
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[100px] text-left">Title</TableHead>
            <TableHead className="text-right">Max Participants</TableHead>
            <TableHead className="text-right">Start at</TableHead>
            <TableHead className="text-right">Deadline</TableHead>
            <TableHead className="text-right">Total Coins</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals ? (
            <>
              {deals.length > 0 ? (
                <>
                  {deals?.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell>
                        <img
                          src={deal?.images[0]?.image_url}
                          alt="promotion"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell
                        className="text-left"
                        onClick={() => navigate(`/admin/deal/${deal.id}`)}
                      >
                        {deal.title}
                      </TableCell>
                      <TableCell className="text-right">
                        {deal.max_participants}
                      </TableCell>
                      <TableCell className="text-right">
                        {format(new Date(deal?.start_at), "dd MMMM yyyy")}
                        {/* {new Date(deal?.start_at).toLocaleDateString("en-GB")} */}
                      </TableCell>
                      <TableCell className="text-right">
                        {format(new Date(deal?.deadline), "dd MMMM yyyy")}
                        {/* {new Date(deal?.deadline).toLocaleDateString("en-GB")} */}
                      </TableCell>
                      <TableCell className="text-right">50</TableCell>
                      <TableCell className="text-right">
                        <div className="justify-end flex items-center gap-2">
                          <button
                            className={`px-2 py-1 rounded text-white font-medium
                             ${
                               deal.deal_status === "EXPIRED"
                                 ? "bg-red-600"
                                 : deal.deal_status === "PRE_OPEN"
                                 ? "bg-green-500"
                                 : deal.deal_status === "COMPLETED"
                                 ? "bg-blue-600"
                                 : deal.deal_status === "OPEN"
                                 ? "bg-green-600"
                                 : "bg-gray-400"
                             }`}
                          >
                            {deal.deal_status}
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => navigate(`/admin/deal/${deal.id}`)}
                          className="text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900 px-5 py-1 rounded"
                        >
                          Edit
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No Deals
                  </TableCell>
                </TableRow>
              )}
            </>
          ) : (
            <Loading />
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminDeals;

import useUserStore from "@/stores/useUserStore";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/icons/Loading";
import { format } from "date-fns";
import useAuthStore from "@/stores/useAuthStore";
import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function DealHistoryPage() {
  const { user } = useAuthStore();
  const { dealHistory, getDealHistory, loading } = useUserStore();
  const history = dealHistory?.joinDeals;

  useEffect(() => {
    const run = async () => {
      await getDealHistory();
    };

    run();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-[#083b63] mb-6 border-b pb-2">
        Deal history
      </h2>

      {loading ? (
        <Loading />
      ) : (
        <>
          {history?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px] font-medium">Deal</TableHead>
                  <TableHead className="font-medium">Notes</TableHead>
                  <TableHead className="text-center font-medium">
                    Status
                  </TableHead>
                  <TableHead className="text-right font-medium">
                    Confirmed at
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={history.id}>
                    <TableCell
                      className={cn(
                        "font-medium"
                      )}
                    >
                      {item.deal?.title}
                    </TableCell>
                    <TableCell>
                      {item.notes || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.participation_status}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.confirm_at
                        ? format(new Date(item.confirm_at), "dd MMMM yyyy")
                        : "Not confirmed"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No deal history</p>
          )}
        </>
      )}
    </div>
  );
}

export default DealHistoryPage;

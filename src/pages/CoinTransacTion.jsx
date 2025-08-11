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

function CoinTransaction() {
  const { user } = useAuthStore();
  const { coinHistory, getCoinHistory, loading } = useUserStore();
  const history = coinHistory?.coinTransaction;

  useEffect(() => {
    const run = async () => {
      await getCoinHistory();
    };

    run();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-[#083b63] mb-6 border-b pb-2">
        Coin transaction
      </h2>

      {loading ? (
        <Loading />
      ) : (
        <>
          {history?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px] font-medium">Type</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="text-right font-medium">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={history.id}>
                    <TableCell
                      className={cn(
                        "font-medium flex items-center gap-2",
                        { "text-red-600": item.type === "JOIN_USE" },
                        { "text-green-600": item.type === "TOPUP" }
                      )}
                    >
                      {item.type === "TOPUP" ? (
                        <ArrowUpRight className="text-green-600" />
                      ) : item.type === "JOIN_USE" ? (
                        <ArrowDownRight className="text-red-600" />
                      ) : (
                        <Clock />
                      )}
                      {item.type}
                    </TableCell>
                    <TableCell>
                      {item.created_at
                        ? format(new Date(item.created_at), "dd MMMM yyyy")
                        : ""}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-medium",
                        { "text-red-600": item.type === "JOIN_USE" },
                        { "text-green-600": item.type === "TOPUP" }
                      )}
                    >
                      {item.type === "JOIN_USE" ? "-" : ""}
                      {item.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Current coins</TableCell>
                  <TableCell className="text-right">{user?.coin}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ) : (
            <p>No coin transaction history</p>
          )}
        </>
      )}
    </div>
  );
}

export default CoinTransaction;

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
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

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
                  <TableHead className="text-right font-medium">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={history.id}>
                    <TableCell className="font-medium">
                      {item.type === "TOPUP" ? <ArrowUpRight className="text-green-500"/> : <ArrowDownRight className="text-red-500"/>}
                      {item.type}
                    </TableCell>
                    <TableCell>
                      {item.created_at
                        ? format(new Date(item.created_at), "dd MMMM yyyy")
                        : ""}
                    </TableCell>
                    <TableCell className="text-right">{item.type === "JOIN_USE" ? "-" : ""}{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total Coins</TableCell>
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

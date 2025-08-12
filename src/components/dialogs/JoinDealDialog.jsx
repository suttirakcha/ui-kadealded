import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";

export function JoinDealDialog({ open, setOpen, deal, onConfirmJoin, coupon, onRefresh }) {
  const { user } = useAuthStore();
  const [step, setStep] = useState("confirm");
  const [loading, setLoading] = useState(false);
  // const [coupon, setCoupon] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setStep("confirm");
      setLoading(false);
      setCopied(false);
    }
  }, [open]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirmJoin(deal.id);
      // setCoupon(qrCodeId);
      setStep("success");
      toast.success("เข้าร่วมดีลสำเร็จ!");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการเข้าร่วมดีล");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
      toast.info("คูปองถูกคัดลอกแล้ว!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm: max-w-[425px]">
        {user ? (
          <>
            {step === "confirm" && (
              <>
                <DialogHeader>
                  <DialogTitle>ยืนยันการเข้าร่วมดีล?</DialogTitle>
                  <DialogDescription>
                    คุณต้องการเข้าร่วมดีล **{deal?.title}** ใช่หรือไม่?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">ยกเลิก</Button>
                  </DialogClose>
                  <Button onClick={handleConfirm} disabled={loading}>
                    {loading ? "กำลังดำเนินการ..." : "ยืนยัน"}
                  </Button>
                </DialogFooter>
              </>
            )}

            {step === "success" && (
              <>
                <DialogHeader>
                  <DialogTitle>ดีลสำเร็จแล้ว!</DialogTitle>
                  <DialogDescription>
                    ใช้คูปองนี้กับทางร้านค้าเพื่อรับสิทธิพิเศษ
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <Badge className="text-xl font-bold p-4">
                    รหัสคูปอง: {coupon}
                  </Badge>
                  <Button onClick={handleCopy} disabled={copied}>
                    <CopyIcon className="mr-2 h-4 w-4" />{" "}
                    {copied ? "คัดลอกแล้ว!" : "คัดลอกรหัส"}
                  </Button>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={onRefresh}>ปิด</Button>
                  </DialogClose>
                </DialogFooter>
              </>
            )}
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>กรุณาเข้าสู่ระบบเพื่อเข้าร่วมดีล</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>ปิด</Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

import Sidebar from '../../components/custom/Sidebar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AllDeal } from '../../data/items'

function AdminDeals() {
  return (
    <>
<h2 className="text-xl font-bold mb-3 p-5">Total Deals</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Deals</TableHead>
              <TableHead className="w-[100px] text-left">Name</TableHead>
              <TableHead className="text-right">Total Users</TableHead>
              <TableHead className="text-right">Total Joined</TableHead>
              <TableHead className="text-right">Total Coins</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AllDeal.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell><img src={deal.imgSrc} alt="promotion" className='w-full h-full object-cover' /></TableCell>
                <TableCell className="text-left">{deal.title}</TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">50</TableCell>
                <TableCell className="text-right"><button className='text-white bg-green-500 px-5 py-1 rounded'>Status</button></TableCell>
                <TableCell className="text-right"><button className='text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900 px-5 py-1 rounded'>Edit</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </>
  )
}

export default AdminDeals


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
    <div className='flex'>
      <Sidebar />
      <div className="p-6 h-full">
        <h2 className="text-xl font-bold mb-3 p-5">Total Deals</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Deals</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Total Users</TableHead>
              <TableHead>Total Joined</TableHead>
              <TableHead className="text-right">Total Coins</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-center">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AllDeal.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell><img src={deal.imgSrc} alt="promotion" className='w-full h-full object-cover' /></TableCell>
                <TableCell>{deal.title}</TableCell>
                <TableCell>-</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">50</TableCell>
                <TableCell><button className='text-white bg-green-500 px-2 rounded'>Status</button></TableCell>
                <TableCell><button className='text-white bg-blue-600 px-2 rounded'>Edit</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    </div>
  )
}

export default AdminDeals


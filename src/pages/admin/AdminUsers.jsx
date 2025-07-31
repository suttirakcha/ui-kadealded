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

function AdminUsers() {
  return (
    <>
    <h2 className="text-xl font-bold mb-3 p-5">Users</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="w-[100px] text-right">Name</TableHead>
              <TableHead className="text-right">Email</TableHead>
              <TableHead className="text-right">Phonenumber</TableHead>
              <TableHead className="text-right">Birth_Date</TableHead>
              <TableHead className="text-right">Level</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AllDeal.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell><img src={deal.imgSrc} alt="promotion" className='w-full h-full object-cover rounded-2xl' /></TableCell>
                <TableCell className="text-right">Test</TableCell>
                <TableCell className="text-right">test@gmail.com</TableCell>
                <TableCell className="text-right">018-xxx-xxxx</TableCell>
                <TableCell className="text-right">26-01-23</TableCell>
                <TableCell className="text-right">Platinum</TableCell>
                <TableCell className="text-right"><button className='text-white bg-green-500 px-2 rounded'>Status</button></TableCell>
                <TableCell className="text-right"><button className='text-white bg-blue-600 px-2 rounded'>Edit</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </>
  )
}

export default AdminUsers


import EditUserDialog from "@/components/dialogs/EditUserDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useUserStore from "@/stores/useUserStore";
import { useEffect, useState } from "react";

function AdminUsers() {
  const { users, loading, fetchAllUsers } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const run = async () => {
      await fetchAllUsers();
    }
    run();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3 p-5">Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="w-[100px] text-left">Name</TableHead>
              <TableHead className="w-[100px] text-right">Lastname</TableHead>
              <TableHead className="text-right">Email</TableHead>
              <TableHead className="text-right">Phonenumber</TableHead>
              <TableHead className="text-right">BirthDate</TableHead>
              <TableHead className="text-right">Role</TableHead>
              <TableHead className="text-right">Coin</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? users.map((user) => (
              <TableRow key={user.id}>
                <TableCell><img src={user.profile_image || "/default-profile.png"} className='w-15 h-15 object-cover rounded-2xl' /></TableCell>
                <TableCell className="text-left">{user?.name}</TableCell>
                <TableCell className="text-right">{user?.last_name}</TableCell>
                <TableCell className="text-right">{user?.email}</TableCell>
                <TableCell className="text-right">{user?.tel_number}</TableCell>
                <TableCell className="text-right">{user?.birth_date ? new Date(user?.birth_date).toLocaleDateString('en-GB') : "-"}</TableCell>
                <TableCell className="text-right"><button className={`px-2 py-1 rounded text-white font-medium
                    ${user.role === "SUPERADMIN" ? "bg-red-600" :
                    user.role === "ADMIN" ? "bg-blue-600" :
                      user.role === "CUSTOMER" ? "bg-green-600" : "bg-gray-400"}`}
                >{user?.role}</button></TableCell>
                <TableCell className="text-right">{user?.coin}</TableCell>
                <TableCell className="text-right font-medium">
                  <button
                    className='text-white bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded'
                    onClick={() => setSelectedUser(user)}
                  >
                    Edit
                  </button>
                   {/* <button
                    className='text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded ml-5'
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button> */}
                </TableCell>
              </TableRow>
            )) : (<TableRow><TableCell colSpan={9} className="text-center">No Users</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {selectedUser && (
        <EditUserDialog
          open={selectedUser}
          onOpenChange={setSelectedUser}
          user={selectedUser}
        />
      )}
    </div>
  );
}

export default AdminUsers


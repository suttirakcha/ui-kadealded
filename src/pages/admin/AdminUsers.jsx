import EditUserDialog from "@/components/dialogs/EditUserDialog";
import Loading from "@/components/icons/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuthStore from "@/stores/useAuthStore";
import useUserStore from "@/stores/useUserStore";
import { format } from "date-fns";
import { useEffect, useState } from "react";

function AdminUsers() {
  const { user: userAdmin } = useAuthStore();
  const { users, loading, fetchAllUsers } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const run = async () => {
      await fetchAllUsers();
    };
    run();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Users</h2>
      {loading ? (
        <Loading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="w-[160px] text-left">Name</TableHead>
              <TableHead className="w-[160px] text-left">Last name</TableHead>
              <TableHead className="w-[200px] text-right">Email</TableHead>
              <TableHead className="w-[160px] text-right max-xl:hidden">Phone number</TableHead>
              <TableHead className="w-[120px] text-right max-xl:hidden">Birth date</TableHead>
              <TableHead className="w-[160px] text-right">Role</TableHead>
              <TableHead className="w-[120px] text-center">Coin</TableHead>
              <TableHead className="w-[240px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users
                .filter(
                  (user) =>
                    user.role !==
                    (userAdmin.role === "ADMIN" ? "SUPERADMIN" : "")
                )
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <img
                        src={user.profile_image || "/default-profile.png"}
                        className="w-15 h-15 object-cover rounded-2xl"
                      />
                    </TableCell>
                    <TableCell className="text-left">{user?.name}</TableCell>
                    <TableCell className="text-left">
                      {user?.last_name}
                    </TableCell>
                    <TableCell className="text-right">{user?.email}</TableCell>
                    <TableCell className="text-right max-xl:hidden">
                      {user?.tel_number}
                    </TableCell>
                    <TableCell className="text-right max-xl:hidden">
                      {user?.birth_date
                        // ? new Date(user?.birth_date).toLocaleDateString("en-GB")
                        ? format(new Date(user?.birth_date), "dd MMMM yyyy")
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        className={`px-2 py-1 rounded text-white font-medium
                    ${
                      user.role === "SUPERADMIN"
                        ? "bg-red-600"
                        : user.role === "ADMIN"
                        ? "bg-blue-600"
                        : user.role === "CUSTOMER"
                        ? "bg-green-600"
                        : "bg-gray-400"
                    }`}
                      >
                        {user?.role}
                      </button>
                    </TableCell>
                    <TableCell className="text-center">{user?.coin}</TableCell>
                    <TableCell className="text-center font-medium">
                      <button
                        className="text-white bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded"
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
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  No Users
                </TableCell>
              </TableRow>
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

export default AdminUsers;

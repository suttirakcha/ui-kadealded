import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/components/custom/CustomInput";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useCategoryStore from "@/stores/useCategoryStore";
import { categorySchema } from "@/schemas/categorySchema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import EditCategoryDialog from "@/components/dialogs/EditCategoryDialog";
import { format } from "date-fns";
import DeleteCategoryDialog from "@/components/dialogs/DeleteCategoryDialog";
import useAuthStore from "@/stores/useAuthStore";

function AdminCategory() {
  const { user } = useAuthStore();
  const { createCategory, categories, fetchAllCategories } = useCategoryStore();
  const {
    register: category,
    handleSubmit,
    formState,
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
  });
  const { errors, isSubmitting } = formState;

  const [selectedCategoryToUpdate, setSelectedCategoryToUpdate] =
    useState(null);
  const [selectedCategoryToDelete, setSelectedCategoryToDelete] =
    useState(null);

  useEffect(() => {
    const run = async () => {
      await fetchAllCategories();
    };
    run();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await createCategory(data);
      toast.success(res.data.message);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || error.message);
    }
  };
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Categories</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Notes</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0
            ? categories.map((category) => (
                <TableRow key={category?.id}>
                  <TableCell className="text-left">{category?.name}</TableCell>
                  <TableCell className="text-left">{category?.notes}</TableCell>
                  <TableCell className="text-right">
                    {category?.created_at
                      ? format(new Date(category?.created_at), "dd MMMM yyyy")
                      : ""}
                  </TableCell>
                  <TableCell className="text-center flex gap-3 justify-center">
                    <button
                      className="text-white bg-blue-500 hover:bg-blue-700 px-5 py-1 rounded"
                      onClick={() => setSelectedCategoryToUpdate(category)}
                    >
                      Edit
                    </button>
                    {user?.role === "SUPERADMIN" && (
                      <button
                        className="text-white bg-red-500 hover:bg-red-700 px-5 py-1 rounded"
                        onClick={() => setSelectedCategoryToDelete(category)}
                      >
                        Delete
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            : "No Categories"}
        </TableBody>
      </Table>

      {selectedCategoryToUpdate && (
        <EditCategoryDialog
          open={selectedCategoryToUpdate}
          onOpenChange={setSelectedCategoryToUpdate}
          category={selectedCategoryToUpdate}
        />
      )}
      {selectedCategoryToDelete && (
        <DeleteCategoryDialog
          open={selectedCategoryToDelete}
          onOpenChange={setSelectedCategoryToDelete}
          category={selectedCategoryToDelete}
        />
      )}

      <div className="flex flex-col justify-between">
        <h2 className="text-3xl font-bold">Create category</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-4">
          <CustomInput
            label="Name"
            {...category("name")}
            error={errors.name?.message}
          />
          <CustomInput
            label="Notes"
            type="textarea"
            {...category("notes")}
            error={errors.notes?.message}
          />
          <Button
            variant="default"
            className="px-10 py-2 mt-5"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
export default AdminCategory;

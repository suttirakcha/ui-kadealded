import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '@/components/custom/CustomInput'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import useCategoryStore from '@/stores/useCategoryStore';
import { categorySchema } from '@/schemas/categorySchema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from 'react';
import EditCategoryDialog from '@/components/dialogs/EditCategoryDialog';


function AdminCategory() {
  const { createCategory, categories, fetchAllCategories, deleteCategory } = useCategoryStore();
  const { register: category, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(categorySchema),
  });
  const { errors, isSubmitting } = formState;

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const run = async () => {
      await fetchAllCategories();
    }
    run();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = confirm("คุณต้องการลบ Category นี้หรือไม่?");
      if (!confirmDelete) return;
      await deleteCategory(id);
      toast.success("Delete Complete")
    } catch (error) {
      console.log(error);
      toast.error("This Category is already used on another deal");
    }
  };

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
    <>
      <h2 className="text-xl font-bold mb-3 p-5">Categories</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">Name</TableHead>
            <TableHead className="text-right">Notes</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-center">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? categories.map((category) => (
            <TableRow key={category?.id}>
              <TableCell className="text-right">{category?.name}</TableCell>
              <TableCell className="text-right">{category?.notes}</TableCell>
              <TableCell className="text-right">
                {new Date(category?.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                <button
                  className='text-white bg-blue-500 hover:bg-blue-700 px-5 py-1 rounded'
                  onClick={() => setSelectedCategory(category)}
                >
                  Edit
                </button>
                <button
                  className='text-white bg-red-500 hover:bg-red-700 px-5 py-1 rounded ml-5'
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          )) : ("No Categories")}
        </TableBody>
      </Table>

      {selectedCategory && (
        <EditCategoryDialog
          open={selectedCategory}
          onOpenChange={setSelectedCategory}
          category={selectedCategory}
        />
      )}

      <div className="flex flex-col justify-between mb-4">
        <h2 className="text-xl font-bold mb-3 p-5">Create Categories</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='relative'>
          <div className='mx-auto p-10 w-200'>
            <div className='flex flex-col gap-4 mt-10 mb-15'>
              <CustomInput
                label="Name"
                {...category("name")}
                error={errors.name?.message}
              />
              <textarea
                {...category("notes")}
                placeholder='Notes'
                className='p-3 w-full h-50 border border-gray-200 rounded-sm resize-none' >
              </textarea>
            </div>
            <Button variant="default" className="px-10 py-2 mt-5">Submit</Button>
          </div>
        </form>
      </div>
    </>
  )
}
export default AdminCategory
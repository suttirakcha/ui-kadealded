import { Search } from "lucide-react";

function SearchForm({ onSubmit, value, onChange, placeholder }) {
  return (
    <div className="flex justify-center w-full">
      <form
        onSubmit={onSubmit}
        className="flex items-center px-6 relative w-full max-w-[500px]"
      >
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="shadow-md rounded-md w-full px-4 py-2 border border-gray-100 bg-white"
        />
        {value && (
          <button type="submit" className="absolute right-7 p-2">
            <Search />
          </button>
        )}
      </form>
    </div>
  );
}

export default SearchForm;

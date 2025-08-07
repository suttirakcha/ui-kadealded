function CustomSelectDropdown({ options, label, error, ...props }) {
  return (
    <label className="pt-4">
      <div className="relative">
        <select className="text-input peer h-10 w-full" {...props}>
          {options}
        </select>
        <span className="custom-label">{label}</span>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </label>
  );
}

export default CustomSelectDropdown;

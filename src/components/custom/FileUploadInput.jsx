import { cn } from "@/lib/utils";
import axios from "axios";
import { Image, X } from "lucide-react";
import { useState } from "react";

function FileUploadInput({ label, imgLink, ...props }) {
  const [image, setImage] = useState(imgLink);
  const handleResetImage = (e) => {
    e.preventDefault();
    setImage("");
  };

  const uploadImage = (files) => {
    const formData = new FormData();

    const previewImage = URL.createObjectURL(files[0]);

    formData.append("file", previewImage);
    // formData.append("upload_preset", "<your upload preset>");

    setImage(previewImage);

    // const uploaded = await axios.post("https://api.cloudinary.com/v1_1/kadealded/image/upload", formData);
    // console.log(uploaded)
    // fetch(
    //   "https://api.cloudinary.com/v1_1/kadealded/image/upload",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setImage(data.secure_url);
    //   });
  };

  return (
    <label>
      <div className="relative cursor-pointer">
        <span className="text-sm font-medium">{label}</span>
        <input
          {...props}
          type="file"
          className="hidden"
          onChange={(e) => uploadImage(e.target.files)}
        />
        <div className={cn("border group relative h-40 content-box")}>
          {image ? (
            <>
              <img
                src={image}
                alt="no-image"
                className="p-3 max-h-40 text-center mx-auto"
              />
              <div className="opacity-0 group-hover:opacity-80 flex items-center justify-center bg-white h-full w-full absolute top-0 left-0 transition-opacity duration-300 gap-2">
                Change image here
              </div>
              <X
                className="absolute right-3 top-3"
                onClick={handleResetImage}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full gap-2">
              <Image />
              Upload image here
            </div>
          )}
        </div>
      </div>
    </label>
  );
}

export default FileUploadInput;

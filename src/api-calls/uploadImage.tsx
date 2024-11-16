import { toast } from "react-toastify";

export const postImage = (image: File) => {
  const id = toast.loading("Uploading image...");
  if (image === undefined) {
    toast.update(id, {
      render: "Something went wrong",
      type: "error",
      isLoading: false,
    });
    return;
  }
  if (image.type === "image/jpeg" || image.type === "image/png") {
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
    );
    data.append(
      "cloud_name",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
    );
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        toast.update(id, {
          render: "Image successfully uploaded",
          type: "success",
          isLoading: false,
        });
        // console.log("Image in the server" + data.secure_url.toString());
        return { image_url: data.secure_url.toString() };
      })
      .catch((err) => {
        toast.update(id, {
          render: `${err?.message}`,
          type: "success",
          isLoading: false,
        });
        console.log(err);
      });
  } else {
    toast.update(id, {
      render: "Please select an image",
      type: "error",
      isLoading: false,
    });
    return;
  }
};

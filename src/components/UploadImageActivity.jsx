import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../utils/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { addImage, removeImage } from "../features/activity/activitySlice";

const UploadImageActivity = () => {
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.activityState);

  const [files, setFiles] = useState([]);

  const [uploading, setUploading] = useState(false);
  const handleImagesSubmit = () => {
    if (files.length > 0 && files.length + images.length < 7) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          urls.forEach((url) => {
            dispatch(addImage(url));
          });

          setUploading(false);
        })
        .catch((error) => {
          toast.error("Image Upload failed (max 2 mb per image)");
          setUploading(false);
        });
    } else {
      if (files.length === 0) {
        toast.error("Please select an image");
      } else {
        toast.error("You can only upload 6 image per activity!");
      }
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handelRemoveImageFromList = (index) => {
    dispatch(removeImage(index));
  };

  // components
  return (
    <>
      <span className="text-xs mb-4">
        <span className="font-semibold text-sm ">Image: </span>
        Gambar pertama akan menjadi cover (max 6)
      </span>
      <div className="flex justify-between">
        <input
          onChange={(e) => setFiles(e.target.files)}
          type="file"
          name="images"
          id="images"
          multiple
          accept="images/*"
          className="file-input w-full max-w-sm file-input-sm"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={handleImagesSubmit}
          className="btn btn-primary btn-sm"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      <div>
        <div className="mt-4 max-h-96 overflow-auto p-4">
          {images !== 0 &&
            images.map((url, index) => {
              return (
                <div
                  className="flex justify-evenly items-center mb-3 bg-base-100 rounded-md shadow-lg p-2"
                  key={index}
                >
                  <img
                    src={url}
                    alt="prev-upload"
                    className="w-1/2 h-40 object-cover rounded-lg"
                  />

                  <button
                    onClick={() => handelRemoveImageFromList(index)}
                    type="button"
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default UploadImageActivity;

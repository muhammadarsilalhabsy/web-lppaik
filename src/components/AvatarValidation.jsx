import React, { useEffect, useState } from "react";
import profile from "../assets/haha.jpeg";
import { useSelector } from "react-redux";
import { customFetch, getImage } from "../utils";
import { toast } from "react-toastify";
const AvatarValidation = ({ certificate }) => {
  const { user } = useSelector((state) => state.userState);

  const [avatarImage, setAvatarImage] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // getImage
  async function getAvatar() {
    try {
      const response = await getImage(certificate.avatar);
      setAvatarImage(response);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(certificate);
  const handleVerify = async () => {
    setIsSubmitting(true);

    try {
      const response = await customFetch.post(
        `/email/verify/accept`,
        {
          username: certificate.username,
          id: certificate.token,
          expired: certificate.expired,
        },
        {
          headers: {
            "X-API-TOKEN": `${user.token}`,
          },
        }
      );
      const msg = response.data.message;
      toast.success(msg || "Success Send Email");
      setIsSend(true);
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      toast.error(msg || "Something error with the operation");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (certificate.avatar) {
      getAvatar();
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-200 rounded-lg h-full shadow-lg">
      <div className="avatar">
        <div className="md:w-32 w-24 mask mask-squircle">
          <img src={certificate.avatar ? avatarImage : profile} alt="profile" />
        </div>
      </div>
      <h3 className="mt-4 font-medium text-sm md:text-base">
        ID: {certificate.username}
      </h3>
      <h3 className="mt-2 md:text-3xl text-center font-bold capitalize">
        {certificate.name}
      </h3>
      <div className="md:my-8 space-y-4 my-4">
        <h4 className="md:text-base text-xs text-center font-bold capitalize">
          Program Studi: {certificate.major}
        </h4>
      </div>
      <button
        className="btn btn-primary btn-sm"
        onClick={handleVerify}
        disabled={isSend || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner"></span> sending...
          </>
        ) : (
          "Berikan sertifikat"
        )}
      </button>
    </div>
  );
};

export default AvatarValidation;

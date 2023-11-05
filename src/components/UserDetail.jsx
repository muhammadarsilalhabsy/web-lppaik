import { useSelector } from "react-redux";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormTextArea from "./FormTextArea";
import SubmitButton from "./SubmitButton";

const UserDetail = ({ user, disabled }) => {
  const { name, email, major, gender, motto, completed, certificate } = user;

  const genderINA = gender === "MALE" ? "LAKI - LAKI" : "PEREMPUAN";
  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg">
      {!disabled && (
        <div className="flex justify-end ">
          <SubmitButton
            text="Update profile"
            size="btn-sm"
            color="btn-success"
          />
        </div>
      )}

      <Form method="PATCH" className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormInput
            label="nama"
            type="text"
            size="input-sm"
            name="name"
            defaultValue={name}
            disabled={true}
          />
          <FormInput
            label="email"
            type="email"
            size="input-sm"
            name="email"
            defaultValue={email}
            disabled={disabled}
          />
          {gender && (
            <>
              <FormInput
                label="jenis kelamin"
                type="text"
                size="input-sm"
                name="gender"
                defaultValue={genderINA}
                disabled={true}
              />
            </>
          )}
          <FormInput
            label="jurusan"
            type="text"
            size="input-sm"
            name="jurusan"
            defaultValue={major}
            disabled={true}
          />
          {!motto && !gender && (
            <div>
              <Link
                to={`/certificate?id=${certificate}`}
                className="w-full h-full bg-primary rounded-lg btn"
                disabled={!completed || !certificate}
              >
                {completed ? "Lihat Sertifikat" : "Sertifikat belum ada"}
              </Link>
            </div>
          )}
        </div>

        {(motto || !disabled) && (
          <>
            <div>
              <FormTextArea
                label="motto"
                size="textarea-md"
                name="motto"
                defaultValue={motto}
                disabled={disabled}
              />
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default UserDetail;

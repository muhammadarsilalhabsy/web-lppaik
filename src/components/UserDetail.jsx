import { useSelector } from "react-redux";
import FormInput from "./FormInput";
import { Form } from "react-router-dom";
import FormCheckbox from "./FormCheckbox";
import FormTextArea from "./FormTextArea";
import SubmitButton from "./SubmitButton";

const UserDetail = () => {
  const user = useSelector((state) => state.userState.user);
  const { name, email, jurusan, gender } = user;
  const genderINA = gender === "MALE" ? "LAKI - LAKI" : "PEREMPUAN";
  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg">
      <div className="flex justify-end ">
        <SubmitButton text="Update profile" size="btn-sm" color="btn-success" />
      </div>
      <Form method="PATCH" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="nama"
            type="text"
            size="input-sm"
            name="name"
            defaultValue={name}
          />
          <FormInput
            label="email"
            type="email"
            size="input-sm"
            name="email"
            defaultValue={email}
          />
          <FormInput
            label="jenis kelamin"
            type="text"
            size="input-sm"
            name="gender"
            defaultValue={genderINA}
            disabled={true}
          />
          <FormInput
            label="jurusan"
            type="text"
            size="input-sm"
            name="jurusan"
            defaultValue={jurusan}
            disabled={true}
          />
        </div>
        <div>
          <FormTextArea
            label="motto"
            size="textarea-md"
            name="motto"
            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quod magnam amet laborum possimus quasi impedit tenetur ad veniam? Reiciendis?"
          />
        </div>
      </Form>
    </div>
  );
};

export default UserDetail;

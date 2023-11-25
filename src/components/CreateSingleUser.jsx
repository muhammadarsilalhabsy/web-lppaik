import FormCheckbox from "./FormCheckbox";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import SelectInputForId from "./SelectInputForId";
import { Form, useLoaderData } from "react-router-dom";
import SubmitButton from "./SubmitButton";

const CreateSingleUser = () => {
  const { majors } = useLoaderData();
  console.log(majors);
  const gender = [
    { id: 1, name: "MALE" },
    { id: 2, name: "FEMALE" },
  ];

  return (
    <Form
      method="POST"
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3  items-center shadow-lg border"
    >
      <FormInput name="username" label="Username" size="input-sm" type="text" />
      <FormInput name="name" label="Name" size="input-sm" type="text" />
      <FormInput name="email" label="Email" size="input-sm" type="email" />
      <SelectInputForId
        label="Jurusan"
        name="major"
        list={majors}
        defaultValue={majors[0]}
        size="select-sm"
      />
      <SelectInput
        label="Gender"
        name="gender"
        list={gender}
        defaultValue={gender[0]}
        size="select-sm"
      />
      <div className="flex flex-row justify-between">
        <FormCheckbox
          name="MAHASISWA"
          label="MAHASISWA"
          size="checkbox-sm"
          defaultChecked={true}
        />
        <FormCheckbox name="KATING" label="KATING" size="checkbox-sm" />
        <FormCheckbox name="DOSEN" label="DOSEN" size="checkbox-sm" />
        <FormCheckbox name="TUTOR" label="TUTOR" size="checkbox-sm" />
        <FormCheckbox name="ADMIN" label="ADMIN" size="checkbox-sm" />
      </div>
      <div className="flex flex-row justify-evenly">
        <FormCheckbox name="KETUA" label="KETUA" size="checkbox-sm" />
        <FormCheckbox name="REKTOR" label="REKTOR" size="checkbox-sm" />
      </div>
      <SubmitButton text="Tambahkan" size="btn-sm" color="btn-primary" />
    </Form>
  );
};

export default CreateSingleUser;

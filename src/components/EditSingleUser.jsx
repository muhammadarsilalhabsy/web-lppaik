import { Form, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";
import SubmitButton from "./SubmitButton";
import SelectInputForId from "./SelectInputForId";
import SelectInput from "./SelectInput";

const EditSingleUser = () => {
  const { user, majors } = useLoaderData();

  const gender = [
    { id: 1, name: "MALE" },
    { id: 2, name: "FEMALE" },
  ];

  const defaultMajor = majors.find((major) => major.name === user.major).id;

  return (
    <Form
      method="POST"
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3  items-center shadow-lg border"
    >
      <FormInput
        name="username"
        label="Username"
        size="input-sm"
        type="text"
        defaultValue={user.username}
      />
      <FormInput
        name="name"
        label="Name"
        size="input-sm"
        type="text"
        defaultValue={user.name}
      />
      <FormInput
        name="email"
        label="Email"
        size="input-sm"
        type="email"
        defaultValue={user.email}
      />
      <SelectInputForId
        label="Jurusan"
        name="major"
        list={majors}
        defaultValue={defaultMajor}
        size="select-sm"
      />
      <SelectInput
        label="Gender"
        name="gender"
        list={gender}
        defaultValue={user.gender}
        size="select-sm"
      />
      <FormInput
        name="password"
        label="Password"
        size="input-sm"
        type="password"
      />
      <div className="flex flex-row justify-between">
        {["MAHASISWA", "KATING", "DOSEN", "ADMIN", "TUTOR"].map((role) => (
          <FormCheckbox
            key={role}
            name={role}
            label={role}
            size="checkbox-sm"
            defaultChecked={user.roles.includes(role)}
          />
        ))}
      </div>

      <FormCheckbox
        name="completed"
        label="Sertifikat"
        size="checkbox-sm"
        defaultChecked={user.completed}
      />

      <SubmitButton text="Update" size="btn-sm" color="btn-primary" />
    </Form>
  );
};

export default EditSingleUser;

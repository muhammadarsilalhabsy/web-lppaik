import { Form } from "react-router-dom";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import DateInput from "./DateInput";
import SubmitButton from "./SubmitButton";

const FormControlBook = () => {
  return (
    <Form
      method="POST"
      className="bg-base-200 grid gap-y-4 rounded-md px-8 py-4 shadow-lg my-4"
    >
      <FormInput
        name="lesson"
        type="text"
        size="input-sm"
        label="pelajaran"
        defaultValue=""
      />
      <DateInput name="date" label="tanggal" />
      <FormTextArea label="keterangan" name="description" size="textarea-sm" />
      <SubmitButton
        color="btn-primary"
        text="Tambahkan control book"
        size="btn-sm"
      />
    </Form>
  );
};

export default FormControlBook;

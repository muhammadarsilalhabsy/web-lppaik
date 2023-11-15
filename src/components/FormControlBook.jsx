import { Form } from "react-router-dom";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import DateInput from "./DateInput";
import SubmitButton from "./SubmitButton";

const FormControlBook = ({ lesson, date, description, method, btn }) => {
  return (
    <Form
      method={method}
      className="bg-base-200 grid gap-y-4 rounded-md px-8 py-4 shadow-lg my-4"
    >
      <FormInput
        name="lesson"
        type="text"
        size="input-sm"
        label="pelajaran"
        defaultValue={lesson}
      />
      <DateInput name="date" label="tanggal" defaultValue={date} />
      <FormTextArea
        label="keterangan"
        name="description"
        size="textarea-sm"
        defaultValue={description}
      />
      <SubmitButton color="btn-primary" text={btn} size="btn-sm" />
    </Form>
  );
};

export default FormControlBook;

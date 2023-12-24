import { Form, Link } from "react-router-dom";
import FormInput from "./FormInput";

const Search = ({ name, label, find }) => {
  return (
    <Form
      method="POST"
      className="bg-base-200 grid sm:grid-cols-2 gap-y-4 sm:gap-x-4 rounded-md px-8 py-4 sm:items-center shadow-lg"
    >
      {/* INPUT SEARCH*/}
      <FormInput
        name={name}
        type="search"
        size="input-sm"
        label={label}
        defaultValue={""}
      />
      {/* BUTTONS */}

      <div className="w-full mt-auto">
        <button type="submit" className="btn-primary btn btn-sm w-full">
          {find ? find : "search"}
        </button>
      </div>
    </Form>
  );
};

export default Search;

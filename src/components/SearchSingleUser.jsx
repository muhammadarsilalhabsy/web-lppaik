import { Form } from "react-router-dom";
import FormInput from "./FormInput";

const SearchSingleUser = ({ name, label }) => {
  return (
    <Form className="bg-base-200 grid grid-cols-4 gap-y-4 sm:gap-x-4 gap-x-2 rounded-md px-8 py-4 sm:items-center shadow-lg">
      {/* INPUT SEARCH*/}
      <div className="col-span-3">
        <FormInput
          name={name}
          type="search"
          size="input-sm"
          label={label}
          defaultValue={""}
        />
      </div>
      {/* BUTTONS */}
      <div className="flex mt-auto gap-4">
        <div className="w-full">
          <button type="submit" className="btn-primary btn btn-sm w-full">
            search
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SearchSingleUser;

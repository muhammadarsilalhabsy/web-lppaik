import { Form, Link } from "react-router-dom";
import FormInput from "./FormInput";

const SearchOnly = () => {
  return (
    <Form className="bg-base-200 grid grid-cols-2 gap-x-4 rounded-md px-8 py-4 items-center shadow-lg">
      {/* INPUT SEARCH*/}
      <FormInput
        name="search"
        type="search"
        size="input-sm"
        label="search"
        defaultValue={""}
      />
      {/* BUTTONS */}
      <div className="flex mt-auto gap-4">
        <button type="submit" className="btn-primary btn btn-sm w-1/2">
          search
        </button>
        <Link to="/certificate" className="btn-accent btn btn-sm w-1/2">
          reset
        </Link>
      </div>
    </Form>
  );
};

export default SearchOnly;

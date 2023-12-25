import { useLoaderData, Link, Form } from "react-router-dom";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";

const Filters = ({ text, link }) => {
  //   const { meta, params } = useLoaderData();
  // console.log(meta);
  //   const { search, price, company, category, order, shipping } = params;

  const search = "";
  const category = [
    { id: 1, name: "All" },
    { id: 2, name: "Mahasiswa" },
    { id: 3, name: "Dosen & Tendik" },
    { id: 4, name: "Umum" },
  ];

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center shadow-lg border">
      {/* INPUT SEARCH*/}
      <FormInput
        name={text}
        type="search"
        size="input-sm"
        label="search"
        defaultValue={""}
      />
      {/* SELECT CATEGORIES */}
      <SelectInput
        name="category"
        label="Ketegori"
        size="select-sm"
        list={category}
        defaultValue={category[0]}
      />
      {/* SELECT ORDERS */}
      <SelectInput
        name="babi"
        label="urutkan"
        size="select-sm"
        list={[
          { id: 1, name: "a-z" },
          { id: 2, name: "z-a" },
          { id: 3, name: "date" },
        ]}
        defaultValue={"a-z"}
      />
      {/* BUTTONS */}
      <div className="flex mt-auto gap-4">
        <button type="submit" className="btn-primary btn btn-sm w-1/2">
          search
        </button>
        <Link to={link} className="btn-accent btn btn-sm w-1/2">
          reset
        </Link>
      </div>
    </Form>
  );
};

export default Filters;

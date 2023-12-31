const FormInput = ({ label, name, type, defaultValue, size, disabled }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        // className={`input input-bordered w-full max-w-xs ${size}`}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};

export default FormInput;

const FormTextArea = ({ label, name, defaultValue, size, disabled }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <textarea
        name={name}
        disabled={disabled}
        className={`textarea textarea-bordered w-full h-24 ${size}`}
        placeholder="Bio"
        defaultValue={defaultValue}
      ></textarea>
    </div>
  );
};

export default FormTextArea;

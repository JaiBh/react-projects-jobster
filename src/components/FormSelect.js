const FormSelect = ({ name, value, onChange, options, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText ? labelText : name}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
        id={name}
      >
        {options.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormSelect;

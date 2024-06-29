type PropTypes = {
  title: string;
  type: string;
  name: string;
  className?: string;
  defaultValue?: string;
  onChange?: () => void;
};

const Input = (props: PropTypes) => {
  const { title, type, name, className, defaultValue, onChange } = props;
  return (
    <div className="flex flex-col my-2">
      <label htmlFor={name}>{title}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        defaultValue={defaultValue}
        className={`border p-1.5 ${className}`}
      />
    </div>
  );
};

export default Input;

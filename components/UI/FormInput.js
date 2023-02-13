import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(props, ref) {
  const { name, placeholder, type } = props;

  return (
    <div>
      <label htmlFor={type}>{name}</label>
      <input
        type={type}
        id={type}
        placeholder={placeholder}
        ref={ref}
        className="bg-neutral-50 mt-1 px-4 py-3 rounded shadow-inner text-sm w-full"
        required
      />
    </div>
  );
});

export default FormInput;

import { useForm, type FieldValues } from "react-hook-form";

interface FormData {
  name: string;
  age: number;
}



const FormWithUseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  console.log(errors);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name", { required: true, minLength: 2 })}
          id="name"
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
        />
        {errors.name?.type === "required" && (
          <p className="text-danger mt-2">Name is required</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger mt-2">Name must be at least 2 characters</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { required: true, min: 0 })}
          id="age"
          type="number"
          className={`form-control ${errors.age ? "is-invalid" : ""}`}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormWithUseForm;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  name: z.string().min(3, { message: "Too short." }),
  age: z
    .number({
      error: (issue) => {
        if (issue.code === "invalid_type") {
          return { message: "Age is required" };
        }
        return { message: "Age must be a number" };
      },
    })
    .min(18, "Age must be at least 18"),
});

type FormData = z.infer<typeof schema>;

const FormWithUseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    delayError: 100,
  });

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
          {...register("name")}
          id="name"
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
        />
        {errors.name && (
          <p className="text-danger mt-2">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
          className={`form-control ${errors.age ? "is-invalid" : ""}`}
        />
        {errors.age && <p className="text-danger mt-2">{errors.age.message}</p>}
      </div>
      <button type="submit" disabled={!isValid} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormWithUseForm;

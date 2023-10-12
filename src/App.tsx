import { useForm } from './hooks/useForm';
function App() {
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: { firstName: '', lastName: '' },
    onSubmit: (values) => console.log(values),
  });
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type='text'
          name='firstName'
          value={values.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type='text'
          name='lastName'
          value={values.lastName}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default App;

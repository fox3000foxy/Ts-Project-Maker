import * as yup from 'yup';

export default yup.object().shape({
  name: yup.string().required('Name is required'),
//   age: yup.number().min(0, 'Age must be a positive number').required('Age is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
});

// Example usage:
// await exempleSchema.validate({ name: 'John', age: 25, email: 'john@example.com' });
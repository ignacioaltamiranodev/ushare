import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginPage = () => {
  const { logIn, user } = useAuth();
  const { push } = useRouter();
  if (user) {
    push('/');
  }

  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
        'Email is not valid.'
      )
      .required('Email is required.'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be at most 20 characters.')
      .required('Password is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="form-container flex-column container">
      <form className="mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4 text-center fs-3">Log In</h2>
        <div className="mb-3">
          <label className="d-block mb-2">Email</label>
          <input
            type="email"
            {...register('email')}
            className={errors ? '' : 'mb-3'}
          />
          {errors.email && (
            <p className="text-white my-2">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="d-block mb-2">Password</label>
          <input
            type="password"
            {...register('password')}
            className={errors ? '' : 'mb-3'}
          />
          {errors.password && (
            <p className="text-white mt-2 mb-3">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="btn auth mt-3">
          Log In
        </button>
        <span className="mt-3">Not registered yet?</span>
        <Link className="mt-1 text-black" href="/signup">
          Create an account
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;

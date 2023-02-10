import { useRouter } from 'next/router';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';

const LoginPage = () => {
  const { logIn, user } = useAuth();
  const { push } = useRouter();
  const methods = useForm({ mode: 'onBlur' });

  if (user) {
    push('/');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

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
      <FormProvider {...methods}>
        <form className="mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-4 text-center fs-3">Log In</h2>
          <div className="mb-3">
            <label className="d-block mb-2">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
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
              {...register('password', { required: 'Password is required' })}
              className={errors ? '' : 'mb-3'}
            />
            {errors.password && (
              <p className="text-white mt-1 mb-3">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="btn auth mt-3">
            Log In
          </button>
          <span className="mt-3">Not registered yet?</span>
          <Link href="/signup">
            <a className="mt-1 text-black">Create an account</a>
          </Link>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;

import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase.config';

const SignupPage = () => {
  const { push } = useRouter();
  const { user, signUp } = useAuth();
  const methods = useForm({ mode: 'onSubmit' });
  const provider = new GoogleAuthProvider();

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
      await signUp(data.email, data.password);
      push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(() => {
        push('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="form-container flex-column container">
      <FormProvider {...methods}>
        <form className="mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-4 text-center fs-3">Sign Up</h2>
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
          <div className="mb-3">
            <label className="d-block mb-2">Confirm Password</label>
            <input
              type="password"
              {...register('password_confirm', {
                required: 'Verify your password',
              })}
            />
            {errors.password_confirm && (
              <p className="text-white mt-1">
                {errors.password_confirm.message}
              </p>
            )}
          </div>
          <button type="submit" className="btn auth mt-3">
            Sign Up
          </button>
          <span className="mt-3">Or</span>
          <button onClick={signInWithGoogle} className="btn auth mt-3">
            Sign Up With Google
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignupPage;

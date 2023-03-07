import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignupPage = () => {
  const { push } = useRouter();
  const { user, signUp } = useAuth();
  const provider = new GoogleAuthProvider();

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
      .min(6, 'Password must be at least 6 characters.')
      .max(20, 'Password must be at most 20 characters.')
      .required('Password is required.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords don´t match.')
      .required('Confirm password is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password);
      push('/');
    } catch (error) {
      console.log(error.message);
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        toast.error('The user name has already been taken.');
      }
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(() => {
        push('/');
      })
      .catch((error) => {
        if (error.message === 'Firebase: Error (auth/popup-closed-by-user).')
          return;
      });
  };

  return (
    <div className="form-container flex-column container">
      <form className="mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4 text-center fs-3">Sign Up</h2>
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
            <p className="text-white mt-1 mb-3">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="d-block mb-2">Confirm Password</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <p className="text-white mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button type="submit" className="btn auth mt-3">
          Sign Up
        </button>
        <span className="mt-3">Or</span>
        <button onClick={(e) => signInWithGoogle(e)} className="btn auth mt-3">
          Sign Up With Google
        </button>
      </form>
    </div>
  );
};

export default SignupPage;

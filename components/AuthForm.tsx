'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import { AuthMode } from '@/types/auth';
import { signInSchema, signUpSchema, AuthFormData } from '@/schemas/auth';
import googleIcon from '@/static/images/google-icon.png';
import microsoftIcon from '@/static/images/microsoft-icon.png';

interface AuthFormProps {
  mode: AuthMode;
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const isSignIn = mode === AuthMode.SIGNIN;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    }
  });

  useEffect(() => {
    if (isSignIn) {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setValue('email', rememberedEmail);
        setValue('rememberMe', true);
      }
    }
  }, [isSignIn, setValue]);

  const onSubmit = async (data: AuthFormData) => {
    // for is signin form ======
    if (isSignIn) {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password
        });

        if (result?.error) {
          toast.error('Invalid Email or Password');
          return;
        }

        console.log('Sign In Success:', result);

        // Handling Remember Me-=======
        if (data.rememberMe) {
          localStorage.setItem('rememberedEmail', data.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        toast.success('Sign In Successful!');
        reset();
        return;
      } catch (error) {
        toast.error('Failed to sign in');
        return;
      }
    }

    // for signup for logic and adding dummy api's==
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || 'An error occurred');
        return;
      }

      console.log('Sign Up Success:', result);
      toast.success('Sign Up Successful!');
      reset();

    } catch (error) {
      console.error('API Error:', error);
      toast.error('Failed to connect to the server.');
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      // dummy data's for social login=-
      const socialId = provider.toLowerCase();

      const result = await signIn('credentials', {
        social: socialId,
        redirect: false,
      });

      if (result?.error) {
        toast.error(`${provider} login failed`);
        return;
      }

      if (result?.ok) {
        toast.success(`${provider} Login Successful!`);
      }

    } catch (error) {
      console.error(`${provider} Login Error:`, error);
      toast.error(`${provider} login failed`);
    }
  };

  return (
    <div className="w-full">
      <div className="text-left mb-3 2xl:mb-10">
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-2 2xl:mb-[8px]">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h2>
        <p className="text-sm text-light-white">
          Manage your workspace seamlessly. {isSignIn ? 'Sign in' : 'Sign up'} to continue.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 2xl:mt-[32px]">
        <Input
          id="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register('email')}
        />
        <div className="mt-3 2xl:mt-[25px]">
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete={isSignIn ? "current-password" : "new-password"}
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
        {/* // showing confirm password only for signup form=== */}
        {!isSignIn && (
          <div className="mt-3 2xl:mt-[25px] mb-4 2xl:mb-[44px]">
            <Input
              id="confirm-password"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
              onPaste={(e) => e.preventDefault()}
            />
          </div>
        )}
        {/* // showing remember me for signin form=== */}
        {isSignIn && (
          <div className="mt-2 2xl:mt-3 mb-4 2xl:mb-[43px] flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                label="Remember me"
                {...register('rememberMe')}
              />
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-sm text-primary hover:text-primary-hover transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        )}
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
      <div className="mt-4 2xl:mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-white">
              or
            </span>
          </div>
        </div>
        <div className="mt-3 2xl:mt-[32px] flex flex-col gap-2 2xl:gap-[24px]">
          <Button
            className="h-10 2xl:min-h-[54px] p-3 2xl:p-4 !text-sm !font-normal w-full"
            variant="outline"
            leftIcon={<Image src={googleIcon} alt="Google" width={18} height={18} />}
            onClick={() => handleSocialLogin('Google')}
            type="button"
          >
            Sign In with Google
          </Button>
          <Button
            className="h-10 2xl:min-h-[54px] p-3 2xl:p-4 !text-sm !font-normal w-full"
            variant="outline"
            leftIcon={<Image src={microsoftIcon} alt="microsoft" width={18} height={18} />}
            onClick={() => handleSocialLogin('Microsoft')}
            type="button"
          >
            Sign In with Microsoft
          </Button>
        </div>
      </div>

      <p className="mt-4 2xl:mt-6 text-center text-xs text-light-white">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
        <Link
          href={isSignIn ? "/signup" : "/signin"}
          className="ml-1 font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}

export default AuthForm;

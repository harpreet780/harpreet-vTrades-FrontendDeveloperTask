import AuthForm from '@/components/AuthForm';
import { AuthMode } from '@/types/auth';

const SignUp = () => {
    return <AuthForm mode={AuthMode.SIGNUP} />;
}

export default SignUp;

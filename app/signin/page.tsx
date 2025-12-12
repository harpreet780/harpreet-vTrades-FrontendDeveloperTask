import AuthForm from '@/components/AuthForm';
import { AuthMode } from '@/types/auth';

const SignIn = () => {
    return <AuthForm mode={AuthMode.SIGNIN} />;
}

export default SignIn;

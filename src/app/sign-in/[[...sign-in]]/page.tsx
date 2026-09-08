import { AuthForm } from '@/components/auth-form';

export default function SignInPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4 py-8">
      <AuthForm mode="sign-in" />
    </main>
  );
}

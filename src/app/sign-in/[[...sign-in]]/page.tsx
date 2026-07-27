import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4 py-8">
      <SignIn
        routing="path"
        path="/sign-in"
        forceRedirectUrl="/inbox"
        signUpUrl="/sign-up"
      />
    </main>
  );
}

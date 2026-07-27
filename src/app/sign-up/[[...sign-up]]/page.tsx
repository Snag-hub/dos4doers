import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4 py-8">
      <SignUp
        routing="path"
        path="/sign-up"
        forceRedirectUrl="/inbox"
        signInUrl="/sign-in"
      />
    </main>
  );
}

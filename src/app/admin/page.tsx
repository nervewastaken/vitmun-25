import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function AdminPage() {
  return (
    <>
      <SignedIn>
        <div>
          <h1>Welcome to the Admin Page</h1>
          <p>This page is protected and only accessible to authenticated users.</p>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
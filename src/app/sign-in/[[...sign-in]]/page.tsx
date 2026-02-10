import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Kuvo Co. client portal.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 pt-24 pb-20">
      <div className="w-full">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/portal"
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "#3B82F6",
              colorBackground: "#0A0A0F",
              colorInputBackground: "#1A1A2E",
              colorInputText: "#F8FAFC",
              colorText: "#F8FAFC",
              colorTextSecondary: "#9CA3AF",
            },
            elements: {
              card: "bg-[#1A1A2E] border border-white/10 w-full max-w-none",
              rootBox: "w-full",
              cardBox: "w-full",
              formButtonPrimary:
                "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90",
              footerActionLink: "text-[#3B82F6] hover:text-[#06B6D4]",
            },
          }}
        />
      </div>
    </main>
  );
}

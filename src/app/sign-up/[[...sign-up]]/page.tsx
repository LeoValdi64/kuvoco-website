import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Kuvo Co. account to access the client portal.",
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 pt-24 pb-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
          <p className="text-[#9CA3AF]">
            Create your account to access your client portal
          </p>
        </div>
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
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
              card: "bg-[#1A1A2E] border border-white/10",
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

import { SignUpForm } from "@/components/forms/SignUpForm";

export default function Page() {
  return (
    <div className="flex min-h-[100dvh] w-full lg:min-w-[600px] md:max-w-[600px] items-center justify-center p-6 md:p-10 border-x border-muted-foreground/20">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}

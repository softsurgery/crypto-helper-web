import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthForm } from "@/hooks/use-auth-form";
import { cn } from "@/lib/utils";
import { Spinner } from "./common/Spinner";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

interface SignUpComponentProps {
  className?: string;
  handleSignUp: () => void;
  isPending: boolean;
}

export default function SignUpComponent({
  className,
  handleSignUp,
  isPending,
}: SignUpComponentProps) {
  const authForm = useAuthForm();

  return (
    <div className={cn(className)}>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign-Up</h1>
        <p className="text-balance text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>
      <div className="grid gap-4 mt-4">
        <div className="grid gap-2 text-left">
          <Label>Username</Label>
          <Input
            placeholder="john"
            value={authForm.username}
            onChange={(e) => {
              authForm.set("username", e.target.value);
            }}
          />
        </div>
        <div className="grid gap-2 text-left">
          <Label>Email</Label>
          <Input
            placeholder="john@example.com"
            value={authForm.email}
            onChange={(e) => {
              authForm.set("email", e.target.value);
            }}
          />
        </div>
        <div className="grid gap-2 text-left">
          <Label>Password</Label>
          <Input
            type="password"
            value={authForm.password}
            onChange={(e) => {
              authForm.set("password", e.target.value);
            }}
          />
        </div>
        <div className="grid gap-2 text-left">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            value={authForm.confirmPassword}
            onChange={(e) => {
              authForm.set("confirmPassword", e.target.value);
            }}
          />
        </div>
        <Button className="w-full flex items-center" onClick={handleSignUp}>
          Create an account {isPending && <Spinner className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}

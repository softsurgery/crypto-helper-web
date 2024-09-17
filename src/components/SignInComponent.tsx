import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useAuthForm } from "@/hooks/use-auth-form";
import { Spinner } from "./common/Spinner";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

interface SignInComponentProps {
  className?: string;
  handleSignIn: () => void;
  isPending: boolean;
}

export default function SignInComponent({
  className,
  handleSignIn,
  isPending,
}: SignInComponentProps) {
  const authForm = useAuthForm();

  return (
    <div className={cn(className)}>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign-In</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email and password to log in
        </p>
      </div>
      <div className="grid gap-4 mt-4">
        <div className="grid gap-2 text-left">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="john@example.com"
            value={authForm.email}
            onChange={(e) => {
              authForm.set("email", e.target.value);
            }}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-left">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <Input
            type="password"
            placeholder="******"
            value={authForm.password}
            onChange={(e) => {
              authForm.set("password", e.target.value);
            }}
          />
        </div>
        <Button className="w-full" onClick={handleSignIn}>
          Sign-In
          {isPending && <Spinner className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}

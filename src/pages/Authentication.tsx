import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthForm } from "@/hooks/use-auth-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SignInDto } from "@/types/sign-in.dto";
import { SignUpDto } from "@/types/sign-up.dto";
import { api } from "@/api";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/errors";
import SignInComponent from "@/components/Authentification/SignInComponent";
import SignUpComponent from "@/components/Authentification/SignUpComponent";
import bitcoin from "@/assets/bitcoin.jpg";
import React from "react";

interface AuthenticationPageProps {
  className?: string;
}

export default function AuthenticationPage({
  className,
}: AuthenticationPageProps) {
  const authForm = useAuthForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    const authKey = localStorage.getItem("authToken");
    if (authKey) {
      navigate("/");
    }
  }, [navigate]);

  const { mutate: signIn, isPending: isSignInPending } = useMutation({
    mutationFn: (signInDto: SignInDto) => api.auth.signIn(signInDto),
    onSuccess: () => {
      toast({
        title: "👋 Welcome Back!",
        description:
          "We're delighted to see you again. Log in to continue your journey.",
      });
      authForm.reset();
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "🫢 oops!",
        description: getErrorMessage(
          error,
          "An error occurred during sign-in."
        ),
      });
    },
  });

  const { mutate: signUp, isPending: isSignUpPending } = useMutation({
    mutationFn: (signUpDto: SignUpDto) => api.auth.signUp(signUpDto),
    onSuccess: () => {
      toast({
        title: "🎯 Account Created Successfully",
        description: "You can now login to your account.",
      });
      authForm.reset();
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "🫢 oops!",
        description: getErrorMessage(error, "An error occurred"),
      });
    },
  });

  const handleSignIn = () => {
    const signInDto: SignInDto = {
      usernameOrEmail: authForm.email,
      password: authForm.password,
    };
    const description = api.auth.validateSignInDto(signInDto);
    if (description) {
      toast({ title: "🫢 oops!", description });
    } else {
      signIn(signInDto);
    }
  };

  const handleSignUp = () => {
    const signUpDto: SignUpDto = {
      username: authForm.username,
      email: authForm.email,
      password: authForm.password,
      confirmPassword: authForm.confirmPassword,
    };
    const description = api.auth.validateSignUpDto(signUpDto);
    if (description) {
      toast({ title: "🫢 oops!", description });
    } else {
      delete signUpDto.confirmPassword;
      signUp(signUpDto);
    }
  };
  if (!localStorage.getItem("authToken"))
    return (
      <div className={cn("w-full lg:grid lg:grid-cols-2 h-screen", className)}>
        <div className="flex items-center justify-center">
          <div className="w-[500px] text-center">
            <Tabs defaultValue="sign-up" className="w-full">
              <TabsList>
                <TabsTrigger value="sign-up">Create an Account</TabsTrigger>
                <TabsTrigger value="sign-in">
                  Already have an account?
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sign-up">
                <SignUpComponent
                  className="m-10"
                  handleSignUp={handleSignUp}
                  isPending={isSignUpPending}
                />
              </TabsContent>

              <TabsContent value="sign-in">
                <SignInComponent
                  className="m-10"
                  handleSignIn={handleSignIn}
                  isPending={isSignInPending}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src={bitcoin}
            alt="Cover image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.4] grayscale"
          />
        </div>
      </div>
    );
}

"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const continueAsSeller = () => {
    router.push("?as=seller");
  };
  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const origin = searchParams.get("origin");
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
    mode: "all",
  });

  const { mutate, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("You have been logged in successfully .");
      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push("/sell");
        return;
      }
      router.push("/");
      router.refresh();
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid Email or Password");
      }
    },
  });

  const onSubmit: SubmitHandler<TAuthCredentialsValidator> = ({
    email,
    password,
  }) => {
    // TODO send data to our server
    mutate({ email, password });
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        <div className="flex flex-col items-center space-y-2 text">
          <div className="relative h-40 w-[14rem]">
            <Image
              src={"/logo.svg"}
              fill
              alt="logo"
              className="object-cover object-left-bottom"
            />
          </div>
          <h1 className="text-2xl font-bold">
            Sign in to your {isSeller ? "seller" : ""} account
          </h1>
          <Link
            href="/sign-up"
            className={buttonVariants({
              variant: "link",
              className: "text-muted-foreground gap-1.5",
            })}
          >
            Don&apos;t Have An Account? Sign Up
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-3 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="your-email@company.com"
                  {...register("email")}
                  className={cn({ "focus-visible:ring-red-500": errors.email })}
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-3 py-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="password"
                  className={cn({
                    "focus-visible:ring-red-500": errors.password,
                  })}
                />
                {errors?.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={!isDirty || !isValid}>
                Sign in
              </Button>
            </div>
          </form>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>
          {isSeller ? (
            <Button
              onClick={continueAsBuyer}
              variant={"secondary"}
              disabled={isLoading}
            >
              Continue as customer
            </Button>
          ) : (
            <Button
              onClick={continueAsSeller}
              variant={"secondary"}
              disabled={isLoading}
            >
              Continue as Seller
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;

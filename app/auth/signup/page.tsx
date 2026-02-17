"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icons/google";
import FaceBookIcon from "@/components/icons/facebook";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";
import {
  SignupFormValues,
  signupSchema,
} from "@/lib/validations/signup.schema";
import Image from "next/image";
import { ROUTES } from "@/constants";

export default function SignupPage() {
  const { signup, status, error, clearError } = useAuth();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    clearError();
    await signup(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center ">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="IMETS school of business"
              className="h-12 w-auto"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-gray-600">
            Start your learning journey today
          </p>
        </div>
        <Card>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" size="lg" className="w-full">
                <GoogleIcon />
                Sign up with Google
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <FaceBookIcon />
                Sign up with Facebook
              </Button>
            </div>
            <div className="flex items-center gap-2 my-4">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">
                Or sign up with email
              </span>
              <Separator className="flex-1" />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          fieldSize="lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          fieldSize="lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Create a password"
                          fieldSize="lg"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Must be at least 8 characters with letters and numbers
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Confirm your password"
                          fieldSize="lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms and Privacy */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            I agree to the{" "}
                            <Link
                              href={ROUTES.TERMS}
                              className="text-primary hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href={ROUTES.PRIVACY}
                              className="text-primary hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </FormLabel>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="rounded-md border border-destructive bg-destructive/10 p-3">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button
                  disabled={status === "loading"}
                  type="submit"
                  size="lg"
                  className="w-full"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t">
            <p className="text-sm text-muted-foreground text-center w-full">
              Already have an account?{" "}
              <Link
                href={ROUTES.LOGIN}
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

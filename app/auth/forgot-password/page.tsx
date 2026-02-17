"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  Lightbulb,
  Loader2,
  MailIcon,
} from "lucide-react";
import Image from "next/image";
import { ROUTES } from "@/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import z from "zod";
import { useState } from "react";
import { API_FORGOT_PASSWORD } from "@/constants/api/auth";

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const submit = async (data: ForgotPasswordValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await fetch(API_FORGOT_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setSuccess(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center">
          <Link href={ROUTES.HOME}>
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
          <h2 className="text-3xl font-bold ">Forgot your password?</h2>
          <p className="mt-2 text-muted-foreground">
            Don&apos;t worry, we&apos;ll help you reset it
          </p>
        </div>
        <Card>
          {!success && (
            <CardHeader>
              <Alert variant="info">
                <Lightbulb />
                <AlertTitle>How it works</AlertTitle>
                <AlertDescription>
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
                </AlertDescription>
              </Alert>
            </CardHeader>
          )}
          <CardContent>
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-indigo-200 text-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MailIcon />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Check your email
                </h3>
                <p className="text-gray-600 mb-6">
                  We&apos;ve sent a password reset link to{" "}
                  <strong>{form.getValues("email")}</strong>
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">
                    Didn&apos;t receive the email? Check your spam folder or
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSuccess(false);
                      setError(null);
                    }}
                  >
                    Try again
                  </Button>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submit)}
                  className="space-y-6"
                >
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

                  {error && (
                    <Alert variant="destructive">
                      <AlertTriangleIcon />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button
                    disabled={loading}
                    type="submit"
                    size="lg"
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="bg-gray-50 border-t">
            <Link
              href={ROUTES.LOGIN}
              className="text-primary w-full text-center font-semibold text-sm hover:underline"
            >
              <ArrowLeftIcon className="inline mr-2 size-4" />
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

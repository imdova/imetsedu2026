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
import { PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertTriangleIcon, ArrowLeftIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { ROUTES } from "@/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { use, useState } from "react";
import { API_RESET_PASSWORD } from "@/constants/api/auth";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/lib/validations/reset.schema";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const router = useRouter();
  const { token } = use(searchParams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const submit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(API_RESET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: data.password,
        }),
      });
      router.push(ROUTES.LOGIN);
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
          <h2 className="text-3xl font-bold ">Reset your password?</h2>
          <p className="mt-2 text-muted-foreground">
            Don&apos;t worry, we&apos;ll help you reset it
          </p>
        </div>
        <Card>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
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
                      Setting...
                    </>
                  ) : (
                    "Set New Password"
                  )}
                </Button>
              </form>
            </Form>
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

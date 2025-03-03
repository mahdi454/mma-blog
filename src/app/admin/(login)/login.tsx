"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { signInWithMagicLink } from "./actions";
import { useActionState} from "react";
import { ActionState } from "@/lib/validate";

export function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");

  const [magicLinkState, magicLinkAction, pending] = useActionState<
    ActionState,
    FormData
  >(signInWithMagicLink, { error: "", success: "" });
  return (
    <div className="min-h-[100dvh] bg-gray-950 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 text-gray-50">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <p>logo</p> 
        </div>

        <h1 className="mt-10 text-2xl font-semibold tracking-tight text-center text-gray-50">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-400">
          {mode === "signin"
            ? "Sign in to continue to your account"
            : "Get started with your new account"}
        </p>

        <div className="mt-10">
          {magicLinkState?.success ? (
            <div className="p-6 text-center bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-green-500">
                Check your email
              </h3>
              <p className="mt-2 text-sm text-green-600">
                We&apos;ve sent you a magic link to sign in to your account.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <form action={magicLinkAction} className="space-y-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="px-4 h-12 bg-gray-900 rounded-lg border-gray-700 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 outline-none"
                />

                <Button
                  type="submit"
                  className="w-full h-12 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {pending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Continue with Email"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="flex absolute inset-0 items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="flex relative justify-center">
                  <span className="px-4 text-sm text-gray-300 bg-gray-950 ">
                    or
                  </span>
                </div>
              </div>
            </div>
          )}

          {magicLinkState?.error && (
            <div className="mt-4 text-sm text-red-600">
              {magicLinkState.error}
            </div>
          )}

          <p className="mt-8 text-sm text-center text-gray-50">
            {mode === "signin"
              ? "New to our platform? "
              : "Already have an account? "}
            <Link
              href={`${
                mode === "signin" ? "/admin/sign-up" : "/admin/sign-in"
              }${redirect ? `?redirect=${redirect}` : ""}`}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oCbTF0ALKkY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const LoginPage1 = () => {
  return (
    <div className="flex min-h-screen items-center px-4">
      <div className="mx-auto w-full max-w-md space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold">Login</div>
          <div className="text-gray-500 dark:text-gray-400">
            Enter your email below to login to your account
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" type="email" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <Label className="text-sm" htmlFor="remember-me">
              Remember me
            </Label>
          </div>
          <Button className="w-full">Login</Button>
        </div>
        <div className="text-center text-sm">
          Don't have an account?
          <Link className="underline" href="#">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage1;

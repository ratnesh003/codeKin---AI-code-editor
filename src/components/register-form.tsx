"use client";

import { cn, handleError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" })
    .min(5, { message: "Must be 5 or more characters long" }),
  username: z
    .string({
      required_error: "Name is required",
    })
    .min(4, { message: "Username must be at least 2 characters." }),
  passwordForm: z
    .object({
      password: z
        .string()
        .min(8, { message: "Please enter the password atleast 8 char" })
        .refine((val) => /[A-Z]/.test(val), {
          message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => /[a-z]/.test(val), {
          message: "Password must contain at least one lowercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
          message: "Password must contain at least one number",
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
          message: "Password must contain at least one special character",
        }),
      confirm: z
        .string()
        .min(8, { message: "Please enter the password atleast 8 character" }),
    })
    .refine(
      (data: { password: String; confirm: String }) =>
        data.password === data.confirm,
      {
        message: "Passwords don't match",
        path: ["confirm"], // path of error
      }
    ),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      passwordForm: {
        password: "",
        confirm: "",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, passwordForm, email } = values;
    const { password } = passwordForm;

    try {
      const newUser = await axios.post(
        "/api/auth/sign-up",
        {
          email,
          password,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(newUser);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="text">Username</FormLabel>
                        <FormControl>
                          <Input placeholder="johnDeo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="passwordForm.password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel htmlFor="password">Password</FormLabel>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                          Password must contain at least one uppercase letter,
                          one lowercase letter, one special character, one
                          number
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordForm.confirm"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel htmlFor="password">
                            Confirm Password
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                          confirm password should be same as the above password
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex flex-row gap-4 mt-6">
            <Button variant="outline" className="w-full">
              Register with Google
            </Button>
            <Button variant="outline" className="w-full">
              Register with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href={"/sign-in"} className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

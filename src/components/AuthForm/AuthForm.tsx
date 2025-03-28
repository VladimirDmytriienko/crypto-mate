import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthQuery } from "../../hooks/useAuthQuery";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface AuthFormProps extends React.ComponentPropsWithoutRef<"div"> {
  mode: "signup" | "signin";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, className, ...props }) => {
  const { signUp, signIn, googleSignIn } = useAuthQuery();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const authAction = mode === "signup" ? signUp : signIn;
      authAction(values, {
        onSuccess: () => {
          resetForm();
          navigate({ to: "/" });
        },
      });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6 max-w-lg mx-auto", className)} {...props}>
      <Card className=''>
        <CardHeader>
          <CardTitle className="text-2xl">
            {mode === "signup" ? "Sign Up" : "Login"}
          </CardTitle>
          <CardDescription>
            {mode === "signup"
              ? "Create a new account"
              : "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.email && formik.errors.email ? "border-red-500" : ""}
                required
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {mode === "signin" && (
                  <Link
                    to='/reset-password'
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.password && formik.errors.password ? "border-red-500" : ""}
                required
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>
            <Button type="submit" className="w-full">
              {mode === "signup" ? "Sign Up" : "Login"}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => googleSignIn()}>
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link to={mode === "signup" ? "/sign-in" : "/sign-up"} className="underline underline-offset-4">
              {mode === "signup" ? "Sign in" : "Sign up"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;

import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link, useNavigate } from '@tanstack/react-router'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useAuthQuery } from '@/hooks/useAuthQuery';

export default function NewPassword() {
  const navigate = useNavigate();
  const { updatePassword } = useAuthQuery();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      updatePassword(values.password, {
        onSuccess: () => {
          navigate({ to: "/" });
        },
      });
    },
  });
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Reset Password
          </CardTitle>
          <CardDescription>
            Enter your new password to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your new password"
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
              Reset password
            </Button>

          </form>
          <div className="mt-4 text-center text-sm">
            <Link to={"/sign-in"} className="underline underline-offset-4">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
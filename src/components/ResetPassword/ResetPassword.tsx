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


export default function ResetPassword() {
    const navigate = useNavigate();
    const { resetPassword } = useAuthQuery();
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
        }),
        onSubmit: (values, { }) => {
            resetPassword(values.email, {
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
                        Forgot your password
                    </CardTitle>
                    <CardDescription>
                        Enter the email address associated with your account and we'll send you a link to reset your password.
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
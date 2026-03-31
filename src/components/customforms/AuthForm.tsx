import { useState } from "react";
import { Link} from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useAuth } from "../../hooks/useAuth";

interface Props {
    mode: "signin" | "signup";
}

export default function AuthForm({ mode }: Props) {

    const { loginUser, signupUser,loading} = useAuth();
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const isSignup = mode === "signup";
    const validate = () => {
        const newErrors: any = {};

        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        if (password.length < 6) newErrors.password = "Minimum 6 characters";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setErrors({});
        e.preventDefault();

        if (!validate()) return;
        try {
            if (isSignup) {
                 await signupUser(email, password);

            } else {
                 await loginUser(email, password);

            }

        } catch (err) {
           
            console.log(err);
            const error = err as { email?: string; password?: string; message?: string };
            setErrors({ email: error.email, password: error.password, general: error.message || "Something went wrong" });
        }
    };

   

    return (

        <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2">
            {loading && (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
                </div>
            )}

            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">

                <div>
                    {errors.general && (
                        <div className="mb-4 text-sm text-red-500">
                            {errors.general}
                        </div>
                    )}
                    {errors.email && (
                        <div className="mb-4 text-sm text-red-500">
                            {errors.email}
                        </div>
                    )}
                    {errors.password && (
                        <div className="mb-4 text-sm text-red-500">
                            {errors.password}
                        </div>
                    )}
                    

                    <div className="mb-6">

                        <h1 className="mb-2 font-semibold text-gray-800 text-title-md dark:text-white/90">

                            {isSignup ? "Sign Up" : "Sign In"}

                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">

                            {isSignup
                                ? "Create your account"
                                : "Enter your credentials to continue"}

                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="space-y-6">

                            {/* EMAIL */}

                            <div>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e: any) => setEmail(e.target.value)}
                                    error={!!errors.email}
                                    hint={errors.email}
                                />


                            </div>

                            {/* PASSWORD */}

                            <div>

                                <Label>Password</Label>

                                <div className="relative">

                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e: any) => setPassword(e.target.value)}
                                        error={!!errors.password}
                                        hint={errors.password}
                                    />

                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="size-5" />
                                        ) : (
                                            <EyeCloseIcon className="size-5" />
                                        )}
                                    </span>

                                </div>

                            </div>

                            {/* REMEMBER */}

                            {!isSignup && (
                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-3">

                                        <Checkbox
                                            checked={isChecked}
                                            onChange={setIsChecked}
                                        />

                                        <span className="text-sm text-gray-600">
                                            Keep me logged in
                                        </span>

                                    </div>

                                    <Link
                                        to="/reset-password"
                                        className="text-sm text-brand-500"
                                    >
                                        Forgot password?
                                    </Link>

                                </div>
                            )}

                            {/* TERMS */}

                            {isSignup && (
                                <div className="flex items-center gap-3">

                                    <Checkbox
                                        checked={isChecked}
                                        onChange={setIsChecked}
                                    />

                                    <p className="text-sm text-gray-500">
                                        Agree to Terms & Privacy Policy
                                    </p>

                                </div>
                            )}

                            {/* BUTTON */}

                            <Button variant="outline" className="w-full" size="sm">

                                {loading ? (isSignup ? "Creating Account..." : "Signing In...") : (isSignup ? "Create Account" : "Sign In")}

                            </Button>

                        </div>

                    </form>

                    {/* SWITCH */}

                    <div className="mt-6 text-sm text-center">

                        {isSignup ? (
                            <>
                                Already have an account?{" "}
                                <Link to="/signin" className="text-brand-500">
                                    Sign In
                                </Link>
                            </>
                        ) : (
                            <>
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-brand-500">
                                    Sign Up
                                </Link>
                            </>
                        )}

                    </div>

                </div>

            </div>

        </div>

    );
}
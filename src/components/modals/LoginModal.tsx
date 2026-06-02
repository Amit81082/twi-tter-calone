"use client";
import { useCallback, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "../Input";
import FormModal from "../FormModal";
import UseRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const { mutate: mutateCurrentUser } = useCurrentUser();
  const RegisterModal = UseRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModal.onClose();
    RegisterModal.onOpen();
  }, [isLoading, loginModal, RegisterModal]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // ✅ LOGIN FAILED

      if (response?.error) {
        toast.error(response.error);

        return;
      }

      await mutateCurrentUser();

      // ✅ LOGIN SUCCESS

      toast.success("Logged in");

      loginModal.onClose();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password, mutateCurrentUser]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twi-tter?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <FormModal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit}
      title="Login"
      actionLabel="Sign in"
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
    />
  );
};

export default LoginModal;

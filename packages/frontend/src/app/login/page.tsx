"use client";
import { LoginForm } from "@/components/feature/LoginForm";
import useAuth from "../hooks/useAuth";

const page = () => {
  const { user, loading, signUp, signIn, signOut } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return <LoginForm formType="login" />;
};

export default page;

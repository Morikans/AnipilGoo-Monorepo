'use client'
import { AuthForm } from "@/components";
import useAuth from "../hooks/useAuth";

const page = () => {
  const { user, loading, signUp, signIn, signOut } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return <AuthForm formType="login" />;
};

export default page;

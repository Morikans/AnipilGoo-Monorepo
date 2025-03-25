import { Request, Response } from "express";
import { supabase } from "../../utils";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) throw error;
    res.status(200).send({ message: "新規登録が完了しました！", data });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

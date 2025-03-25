import { Request, Response } from "express";
import { supabase } from "../../utils";

export const logout = async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
    res.status(200).send({ message: 'ログアウトが完了しました' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

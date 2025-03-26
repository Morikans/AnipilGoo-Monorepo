import { Request, Response } from "express";
import { supabase } from "../../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) throw error;

    // ユーザー情報をuserテーブルに保存
    const newProfile = await prisma.user.create({
      data: {
        id: data.user.id, // Supabase Auth の User ID
        email: data.user.email,
      },
    });

    res.status(200).send({ message: "新規登録が完了しました！", data });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

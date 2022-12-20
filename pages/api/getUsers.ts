import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.from("users").select();
  // .eq("id", cookieName);

  // 401 Unauthorized、認証が必要
  if (error) return res.status(401).json({ error: error.message });

  // 200番台は、処理が成功して正常にレスポンスができている状態
  return res.status(200).json(data);
};

export default getUsers;

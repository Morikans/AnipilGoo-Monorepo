import { FC } from "react";
import { Button } from "../common/Button";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export const Header: FC = () => {
  return (
    <nav className="bg-orange-950">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between p-3">
        <Link
          href={"/"}
          className="cursor-pointer text-2xl font-bold text-white"
        >
          Anipilgoo
        </Link>
        <div className="flex items-center gap-8">
          <FaSearch size={20} color="white" className="cursor-pointer" />
          <Link href={"/login"}>
            <Button text="ログイン" btnColor="white" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

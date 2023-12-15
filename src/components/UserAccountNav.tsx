"use client";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { User } from "payload/dist/auth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserAccountNav = ({ user }: { user: User | null }) => {
  const { signOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-60 " align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="text-sm font-medium text-black">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* we will protect this route */}
          <Link href="/sell">Seller Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;

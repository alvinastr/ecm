"use client";
import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import HeaderSearchBar from "./HeaderSearchBar";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";
import { useCartStore } from "@/stores/cart-store";
import { useShallow } from "zustand/shallow";
import { logoutUser } from "@/actions/auth";
import { getStickyHeaderClass, getHeaderContainerClass } from "@/lib/utils";

const AnnouncementBar = () => {
  return (
    <div className="w-full bg-black py-2">
      <div className="container mx-auto flex items-center justify-center px-8">
        <span className="text-center text-sm font-medium tracking-wide text-white">
          FREE SHIPPING ON ALL ORDER • FREE RETURNS
        </span>
      </div>
    </div>
  );
};

type HeaderProps = {
  user: Omit<User, "passwordHash"> | null;
  categorySelector: React.ReactNode;
};

const Header = ({ user, categorySelector }: HeaderProps) => {
  const router = useRouter();

  const { open, getTotalItems } = useCartStore(
    useShallow((state) => ({
      open: state.open,
      getTotalItems: state.getTotalItems,
    }))
  );
  
  const handleLogout = async () => {
    await logoutUser();
    router.refresh();
  };

  return (
    <header className={getStickyHeaderClass()}>
      {/* Announcement Bar - Always visible */}
      <AnnouncementBar />
      
      {/* Main Header - Always visible with better backdrop */}
      <div className={getHeaderContainerClass()}>
        <div className="flex justify-between items-center py-3 sm:py-4">
          <div className="flex justify-between items-center container mx-auto px-8">
            <div className="flex flex-1 justify-start items-center gap-4 sm:gap8">
              <MobileMenu user={user} onLogout={handleLogout} />
              <nav className="hidden md:flex gap-4 lg:gap-6 text-sm font-medium">
                {categorySelector}
                <Link href="#">On Sale!</Link>
              </nav>
            </div>

            <Link
              href={"/"}
              className="absolute left-1/2 transform -translate-x-1/2"
            >
              <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter">
                KLIK MART
              </span>
            </Link>

            <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
              <HeaderSearchBar />

              {user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <ProfileDropdown user={user} />
                </div>
              ) : (
                <React.Fragment>
                  <Link
                    href="/auth/sign-in"
                    className="text-xs sm:text-sm text-gray-700 hover:text-gray-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className="text-xs sm:text-sm text-gray-700 hover:text-gray-900"
                  >
                    Sign Up
                  </Link>
                </React.Fragment>
              )}

              <button onClick={() => open()} className="text-gray-700 hover:text-gray-900 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

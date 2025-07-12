import { getCurrentSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

const ProfilePage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return <ProfileClient user={user} />;
};

export default ProfilePage;

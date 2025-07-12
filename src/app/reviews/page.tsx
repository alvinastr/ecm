import { getCurrentSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import MyReviewsClient from "./MyReviewsClient";

const MyReviewsPage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return <MyReviewsClient user={user} />;
};

export default MyReviewsPage;

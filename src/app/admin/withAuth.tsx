import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/queries/user";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const fetchUser = async () => {
        const userData = await getUser();
        if (!userData?.email) {
          router.push("/admin/sign-in");
        }
      };

      fetchUser();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
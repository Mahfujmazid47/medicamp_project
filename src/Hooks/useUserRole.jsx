import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roleData, isLoading: isRoleLoading, refetch } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role; // ⬅️ role field from backend response
    }
  });

  return { role: roleData || 'participant', isRoleLoading, refetch };
};

export default useUserRole;

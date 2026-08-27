import { useState, useEffect } from "react";

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Supabase auth and RPC call removed - functionality to be restored later
        setIsAdmin(false);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    // Supabase auth state listener removed - functionality to be restored later
    const unsubscribe = () => {
      // no-op
    };

    return () => unsubscribe();
  }, []);

  return { isAdmin, isLoading };
}

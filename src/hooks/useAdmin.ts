import { useState, useEffect } from "react";

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setIsAdmin(false);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    const unsubscribe = () => {
      // no-op
    };

    return () => unsubscribe();
  }, []);

  return { isAdmin, isLoading };
}

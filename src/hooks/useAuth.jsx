import { useEffect, useState } from "react";
import supabase from "../api";

export default function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const session = supabase.auth.getSession();
      setUser(session?.user || null);
    
      const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null)
      });

      return () => {
        authListener.subscription.unsubscribe()
      }
    }, [])
    
  return user;
}

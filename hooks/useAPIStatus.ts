import { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export default function useAPIStatus(): {
  isAPIWorking: boolean;
  loading: boolean;
} {
  const [isAPIWorking, setIsAPIWorking] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAPIStatus = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/configuration?api_key=${API_KEY}`,
        );
        setIsAPIWorking(response.ok);
      } catch (error) {
        console.error("Error checking API status:", error);
        setIsAPIWorking(false);
      } finally {
        setLoading(false);
      }
    };

    checkAPIStatus();
  }, []);

  return { isAPIWorking, loading };
}

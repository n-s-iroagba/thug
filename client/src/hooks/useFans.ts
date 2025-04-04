import { useEffect, useState } from "react";
import { Fan } from "../types/Fan";
import { getAllFans } from "../utils/apiUtils/fanApiUtils";

export const useFans = () => {
  const [fans, setFans] = useState<Fan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFans = async () => {
 
      try {
        const data = await getAllFans();
        setFans(data);
      } catch (err) {
        setError("Failed to load fans.");
      } finally {
        setLoading(false);
      }
    };

    fetchFans();
  }, []);

  return { fans, loading, error };
};

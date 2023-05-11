import { api } from "@/api";
import { useEffect, useState } from "react";

export default function useSpaces() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSpaces() {
      try {
        setLoading(true);
        const response = await api.get("/spaces");
        const spacesData = response.data;
        setSpaces(spacesData.data);
      } catch (err) {
        console.log(err);
        setError("Could not retrieve spaces");
      } finally {
        setLoading(false);
      }
    }

    getSpaces();
  }, []);

  return { spaces, loading, error };
}

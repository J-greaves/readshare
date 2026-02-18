import { useState, useEffect } from "react";
import { Friend } from "../types";
import functions from "../axiosRequests";

interface FriendsData {
  friends: Friend[];
  isLoading: boolean;
  error: string | null;
}

export const useFetchFriends = (
  username: string,
  trigger: number
): FriendsData => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    functions
      .getFriends(username)
      .then((response) => {
        setFriends(response.data);
        setError(null);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Unable to load your friends list. Please try again.");
        setIsLoading(false);
      });
  }, [username, trigger]);

  return { friends, isLoading, error };
};

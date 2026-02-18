import { useState, useEffect } from "react";
import { Friend } from "../types";
import functions from "../axiosRequests";

interface FriendRequestsData {
  friendRequests: Friend[];
  isLoading: boolean;
  error: string | null;
}

export const useFetchFriendRequests = (
  username: string,
  trigger: number
): FriendRequestsData => {
  const [friendRequests, setFriendRequests] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    functions
      .getFriendRequests(username)
      .then((response) => {
        setFriendRequests(response.data);
        setError(null);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Unable to load friend requests. Please try again.");
        setIsLoading(false);
      });
  }, [username, trigger]);

  return { friendRequests, isLoading, error };
};

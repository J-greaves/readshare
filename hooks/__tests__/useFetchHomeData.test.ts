import { renderHook, waitFor } from "@testing-library/react-native";
import { useFetchHomeData } from "../useFetchHomeData";
import functions from "../../axiosRequests";
import { Book } from "../../types";

jest.mock("../../axiosRequests");

const mockBook: Book = {
  bookId: "456",
  title: "Borrowed Book",
  authors: ["Some Author"],
  description: "A borrowed book.",
  publisher: "Publisher",
  publishedDate: "2023",
  language: "en",
  pageCount: 200,
  categories: ["Non-fiction"],
  thumbnail: null,
};

describe("useFetchHomeData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("populates all three lists after a successful fetch", async () => {
    (functions.getBorrowingList as jest.Mock).mockResolvedValue([mockBook]);
    (functions.getLendingList as jest.Mock).mockResolvedValue([]);
    (functions.getAllBorrowRequests as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() =>
      useFetchHomeData("testuser", undefined)
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.booksBorrowing).toHaveLength(1);
    expect(result.current.booksLending).toHaveLength(0);
    expect(result.current.lendingRequests).toHaveLength(0);
    expect(result.current.error).toBeNull();
  });

  it("sets an error message when any request in the Promise.all fails", async () => {
    (functions.getBorrowingList as jest.Mock).mockRejectedValue(
      new Error("Network error")
    );
    (functions.getLendingList as jest.Mock).mockResolvedValue([]);
    (functions.getAllBorrowRequests as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() =>
      useFetchHomeData("testuser", undefined)
    );

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(result.current.error).toBe(
      "Unable to load your home screen data. Please check your connection."
    );
    expect(result.current.isLoading).toBe(false);
  });
});

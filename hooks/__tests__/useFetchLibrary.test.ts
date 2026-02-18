import { renderHook, waitFor } from "@testing-library/react-native";
import { useFetchLibrary } from "../useFetchLibrary";
import functions from "../../axiosRequests";
import { Book } from "../../types";

jest.mock("../../axiosRequests");

const mockBook: Book = {
  bookId: "123",
  title: "Test Book",
  authors: ["Test Author"],
  description: "A test book.",
  publisher: "Test Publisher",
  publishedDate: "2024",
  language: "en",
  pageCount: 100,
  categories: ["Fiction"],
  thumbnail: null,
};

describe("useFetchLibrary", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sets isLoaded to true and populates books after a successful fetch", async () => {
    (functions.getLibrary as jest.Mock).mockResolvedValue({
      data: [mockBook],
    });

    const { result } = renderHook(() => useFetchLibrary("testuser", null));

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].title).toBe("Test Book");
    expect(result.current.error).toBeNull();
  });

  it("returns an empty books array when the API returns no books", async () => {
    (functions.getLibrary as jest.Mock).mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useFetchLibrary("testuser", null));

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    expect(result.current.books).toHaveLength(0);
  });

  it("sets an error message when the fetch fails", async () => {
    (functions.getLibrary as jest.Mock).mockRejectedValue(
      new Error("Network error")
    );

    const { result } = renderHook(() => useFetchLibrary("testuser", null));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(result.current.error).toBe(
      "Failed to load your library. Please check your connection and try again."
    );
    expect(result.current.isLoaded).toBe(true);
    expect(result.current.books).toHaveLength(0);
  });
});

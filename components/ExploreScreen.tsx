import React, { useContext, useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import ExploreSearchBar from "./ExploreSearchBar";
import MainBooksContainer from "./MainBooksContainer";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { CameraView } from "expo-camera"; // Import CameraView for camera functionality
import { API_KEY } from "@env";

const ExploreScreen = () => {
  const [books, setBooks] = useState<any[]>([]);
  const { user } = useContext(UserContext);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scanned, setScanned] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>("back"); // Default camera facing
  const [showCamera, setShowCamera] = useState<boolean>(false); // New state for controlling camera visibility

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoaded(false);
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=AIzaSyCrAKfdwMbSAbNyZ9_TLTlj-H7Q-n9Ixrc&maxResults=40`
        );
        const mappedBooks = response.data.items
          .filter((item: any) => item.volumeInfo)
          .map((item: any) => ({
            bookId:
              item.volumeInfo.industryIdentifiers?.[0]?.identifier || "N/A",
            title: item.volumeInfo.title || "No Title",
            authors: item.volumeInfo.authors || ["Unknown Author"],
            description: item.volumeInfo.description || "No Description",
            publisher: item.volumeInfo.publisher || "Unknown Publisher",
            publishedDate: item.volumeInfo.publishedDate || "N/A",
            language: item.volumeInfo.language || "Unknown Language",
            pageCount: item.volumeInfo.pageCount || 0,
            categories: item.volumeInfo.categories || [],
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
          }));
        setError(null);
        setBooks(mappedBooks);
        setIsLoaded(true);
      } catch {
        setError("failed to fetch books!");
        setIsLoaded(true);
      }
    };

    if (searchQuery) fetchBooks();
  }, [searchQuery, user]);

  const handleBarcodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    console.log(`Scanned type: ${type}, data: ${data}`);
    setScanned(true);
    setShowCamera(false);
    setSearchQuery(data);
  };

  const handleScanButtonPress = () => {
    setScanned(false);
    setShowCamera(true);
  };

  return (
    <View style={styles.container}>
      <ExploreSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Button title="Scan Barcode" onPress={handleScanButtonPress} />

      {showCamera && (
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "upc_a"],
          }}
        />
      )}

      <View style={styles.booksContainer}>
        {isLoaded ? (
          <MainBooksContainer
            page={"explore"}
            books={books}
            isLoaded={isLoaded}
          />
        ) : (
          <Text>{error}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  topSection: {
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
  },
  camera: {
    height: 300,
    width: "100%",
  },
  booksContainer: {
    flex: 1,
    marginTop: 20,
  },
});

export default ExploreScreen;

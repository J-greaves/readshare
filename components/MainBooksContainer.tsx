import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import BookCard from "./BookCard";
import FilterBar from "./FilterBar";

type MainBooksContainerProps = {
  books: any[];
  page: string;
  isLoaded: boolean;
  ownerUsername : string;
};

const MainBooksContainer = ({
  page,
  books,
  isLoaded,
  ownerUsername,
}: MainBooksContainerProps) => {
  //const [books, setBooks] = useState<{ id: number; coverURL: string }[]>([]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        data={isLoaded ? books : Array(24).fill({})}
        keyExtractor={(item, index) => item.bookId?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <BookCard
            isLoaded={isLoaded}
            book={item}
            page={page}
            ownerUsername={ownerUsername}
          />
        )}
        numColumns={page === "explore" ? 3 : 4}
        ListHeaderComponent={null}
        //ListHeaderComponent={page === "explore" ? null : <FilterBar />}
      />
    </View>
  );
};

export default MainBooksContainer;

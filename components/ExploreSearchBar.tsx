import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from "@rneui/themed";
import { formatSearchQuery } from "../utils/formatSearchQuery";


interface ExploreSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ExploreSearchBar = ({ searchQuery, setSearchQuery }: ExploreSearchBarProps) => {
    const [searchBarValue, setSearchBarValue] = useState("");
    
    const handleSubmit = () => {
        setSearchQuery(formatSearchQuery(searchBarValue));
    };

    return (
        <View>
            <SearchBar style={styles.searchBar} placeholder="Search for a book to add to your library" value={searchBarValue} onChangeText={setSearchBarValue} lightTheme={true} onSubmitEditing={handleSubmit}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
      color: "black"
    }
  });

export default ExploreSearchBar
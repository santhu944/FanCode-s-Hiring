import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, StyleSheet, Image } from 'react-native';
import ElevatedCards from "./ElevatedCards";
import Seach from "./Search";


type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const apiKey = '2dca580c2a14b55200e784d157207b4d';
const initialYear = 2012;

const HomePageContent = () => {
  const [moviesByYear, setMoviesByYear] = useState<{ [year: string]: Movie[] }>({});
  const [year, setYear] = useState(initialYear);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<null | number>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async (year: number, genreId: null | number, query:string) => {
    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;
    if (genreId) {
      apiUrl += `&with_genres=${genreId}`;
    }

    if (query) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=1&vote_count.gte=100`;
    }

    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const yearMovies = data.results.slice(0, 8);

      if (query) {
        setMoviesByYear({ [year]: yearMovies });
      } else {
        setMoviesByYear(prevMoviesByYear => {
          return { ...prevMoviesByYear, [year]: yearMovies };
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(year, selectedGenre,searchQuery);
  }, [year, selectedGenre,searchQuery]);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    if (scrollPosition + layoutHeight >= contentHeight - 20 && !loading) {
      setYear(prevYear => prevYear + 1);
    } else if (scrollPosition <= 20 && !loading && year > initialYear) {
      setYear(prevYear => prevYear - 1);
    }
  };

  const handleTabPress = (genreId: null | number) => {
    setSelectedGenre(genreId);
    setYear(initialYear);
    setMoviesByYear({});
  };


  const renderItem = ({ item }: { item: Movie }) => {
    const releaseYear = new Date(item.release_date).getFullYear();
    return (
      <View style={styles.movieContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
          style={styles.backdrop}
          resizeMode="cover"
        />
        <Text style={styles.title}>{item.original_title}</Text>
        <Text style={styles.vote}>{`${item.vote_average.toFixed(1)}`}</Text>
      </View>
    );
  };
  const groupedMovies = Object.keys(moviesByYear).map(year => ({
    year: parseInt(year),
    movies: moviesByYear[year]
  }));

  
  const renderYearItem = ({ item }: { item: { year: number, movies: Movie[] } }) => (
    <View >
      <Text style={styles.yearHeader}>{item.year}</Text>

      <FlatList
        data={item.movies}
        keyExtractor={(movie) => movie.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
  return (
    <SafeAreaView >      
      <ElevatedCards onTabPress={handleTabPress}/>      
      <Seach searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <View style={styles.container}>
      <FlatList
        data={groupedMovies}
        keyExtractor={(item) => item.year.toString()}
        renderItem={renderYearItem}
        onScroll={handleScroll}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    backgroundColor: 'black',
    marginBottom:100,
  },

  movieContainer: {
    marginBottom: 16,
    marginLeft:-5,
  },

  backdrop: {
    width: "100%",
    height: 150,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 4,
    color: 'white',
    width:150,
  },
  year: {
    fontSize: 14,
    paddingHorizontal: 8,
    color: 'white',
  },
  vote: {
    fontSize: 14,
    color: 'white',
  },
  yearSection: {
    marginBottom: 16,
  },
  yearHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'black',
    color: 'white',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
   
    marginVertical: 8,
  },
});

export default HomePageContent;
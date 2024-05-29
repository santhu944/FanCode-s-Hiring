import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


type OnTabPress = (genreId : number | null) => void;
interface ElevatedCardsProps {
  onTabPress: OnTabPress;
}

const ElevatedCards: React.FC<ElevatedCardsProps> = ({ onTabPress }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabPress = (index: React.SetStateAction<number>, genreId: number | null) => {
    setSelectedTab(index);
    onTabPress(genreId); 
  };

  
  return (
    <View style={styles.container}>
    <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.tabContainer}>
    {tabData.map((tab, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.tabItem,
          selectedTab === index && styles.selectedTabItem,
          index > 0 && styles.tabGap,
        ]}
        onPress={() => handleTabPress(index,tab.genreId)}
      >
        <Text
          style={[
            styles.tabText,
            selectedTab === index && styles.selectedTabText,
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
  </View>
  )
}


const tabData = [
  { label: 'All', genreId: null },
  { label: 'Action', genreId: 28 },
  { label: 'Comedy', genreId: 35 },
  { label: 'Horror', genreId: 27 },
  { label: 'Drama', genreId: 18 },
  { label: 'Sci-Fi', genreId: 878 },
  { label: 'Documentaries', genreId: 80 },
  { label :'Childrens & Family', genreId: 16}
];


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
   
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  tabItem: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    backgroundColor: '#686868',
    borderRadius:5,
  },
  selectedTabItem: {
    backgroundColor: 'red', 
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    color:'white',
  },
  tabText: {
    fontSize: 14,
    color: 'white',
  },
  selectedTabText: {
    color: 'white',
  },
  tabGap: {
    marginLeft: 10, 
  },
});
export default ElevatedCards;
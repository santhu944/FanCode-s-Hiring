
import{Text,SafeAreaView, View,StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import HomePageContent from "./src/components/HomePageContent";
import HeaderLogo from "./src/components/HeaderLogo";


function App(){
 
  return(
    <>
   <SafeAreaView  style={styles.container}>   
      <HeaderLogo/>    
      <HomePageContent/>      
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
  },
});
export default App;
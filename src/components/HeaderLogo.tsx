
import{SafeAreaView, View,StyleSheet,FlatList, Image} from "react-native";
import React from "react";


function HeaderLogo(){

 
  return(
    <SafeAreaView >
         <View style={styles.logoContainer}>
      <Image
        source={require("../assets/netflix-logo.png")}
        style={styles.logo}
      />
    </View>
   
  </SafeAreaView>
);
};

const styles = StyleSheet.create({

logoContainer: {
  marginBottom:20,
  marginTop:  10,
  
},
logo: {
  width: 150,
  height: 40,
 
},
});

export default HeaderLogo;
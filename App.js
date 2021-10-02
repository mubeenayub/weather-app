import React from "React";
import { View,Text, Image, ImageBackground, useWindowDimensions, StatusBar, Animated, TouchableOpacity} from "react-native";

import Locations from "./models/Locations";
import CloudIcon from "./assets/cloudy.svg";
import SunIcon from "./assets/sun.svg";
import MoonIcon from "./assets/moon.svg";
import RainIcon from "./assets/rain.svg";
import MenuIcon from "./assets/menu.svg";
import searchIcon from "./assets/search.png";
import {getStatusBarHeight} from "react-native-status-bar-height"

const WeatherIcon =(weatherType)=>{
  if(weatherType=="sunny"){
    <SunIcon width={34} height={34} fill="#fff" />
  }
  if(weatherType=="cloudy"){
    <CloudIcon width={34} height={34} fill="#fff" />
  }
  if(weatherType=="rainy"){
    <RainIcon width={34} height={34} fill="#fff" />
  }
  if(weatherType=="night"){
    <MoonIcon width={34} height={34} fill="#fff" />
  }
}

const App = () =>{
  const {width:windowWidth, height:windowHeight} = useWindowDimensions();
  const scrollX= useRef(new Animated.Value(0) ).current;
  return(
    <>
    <StatusBar  barStyle="light-content" />
    <ScrollView 
        horizontal={true}
        pagingEnabled
        showHorizontalScrollndicator={false}
        onScroll={Animated.event(
          [{nativeEvent:{
            contentOffset:{
              x:scrollX
            },
          }}],
          {useNativeDriver:false},
        )}
        scrollEventThrotyle={1}
        >
      {Locations.map((Locations,index)=>{
        if(Locations.weatherType == "Sunny"){
          bgImg = require('./assets/sunny.jpeg');
        } else if(Locations.WeatherType == "Night"){
          bgImg = require('./assets/night.jpg');
        } else if(Locations.weatherType == "Cloudy"){
          bgImg = require('./assets/cloudy.jpg');
        } else if(Locations.weatherType == "Rainy"){
          bgImg = require('./assets/rainy.jpg');
        }
        return(
          <View style={{width:windowWidth, height:windowHeight}} key={index}>
             <ImageBackground  source ={bgImg} style={{flex:1}}>
               <View style={{flex:1, backgroundColor:"rgba(0,0,0,0,3)",padding:20 }}>
                 <View style={styles.topInfoWrapper}>
                   <View>
                      <Text style={styles.city}>{Locations.city}</Text>
                      <Text style={styles.time}>{Locations.timeDate}</Text>
                    </View>
                    <View>
                      <Text style={styles.temperature}>{Locations.temperature}</Text>
                      <View style={{flexDirection:"row"}}>
                          {WeatherIcon(Locations.weatherType)}
                      </View>
                      <Text style={styles.weatherType}>{Locations.weatherType}</Text>
                    </View>
                 </View>
                 <View style={{borderBottomColor:"rgba(255,255,255,0,7)", marginTop:20, borderBottomWidth:1}}></View>
                 <View style={styles.bottomInfoWrapper}>
                    <View style={{alignItems:"center"}}>
                      <Text style={styles.wind}>wind</Text>
                      <Text style={styles.wind, {fontSize:24}}>{Locations.wind}</Text>
                      <Text style={styles.wind}>Km/h</Text>
                      <View style={styles.infobar}>
                        <View style={{width:Locations.wind/2, height:5, backgroundColor:"#69F0AE"}}></View>
                      </View>
                    </View>
                    <View style={{alignItems:"center"}}>
                      <Text style={styles.wind}>Rain</Text>
                      <Text style={styles.wind, {fontSize:24}}>{Locations.rain}</Text>
                      <Text style={styles.wind}>%</Text>
                      <View style={styles.infobar}>
                        <View style={{width:Locations.rain/2, height:5, backgroundColor:"#F44336"}}></View>
                      </View>
                    </View>
                    <View style={{alignItems:"center"}}>
                      <Text style={styles.wind}>Humidity</Text>
                      <Text style={styles.wind, {fontSize:24}}>{Locations.humidity}</Text>
                      <Text style={styles.wind}>%</Text>
                      <View style={styles.infobar}>
                        <View style={{width:Locations.humidity/2, height:5, backgroundColor:"#F44336"}}></View>
                      </View>
                    </View>
                 </View>
               </View>
             </ImageBackground> 
          </View>
        ) 
      })}
      
    </ScrollView>
    <View style={styles.appHeader}>
      <TouchableOpacity onPress={()=>{}}>
        <searchIcon width={24} height={24} fill="#fff"/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{}}>
        <MenuIcon width={24} height={24} fill="#fff"/>
      </TouchableOpacity>
    </View>
    <View style={styles.indicatorWrapper}>
      {Locations.map((location, index)=>{
        const width = scrollX.interpolate(
          {
            inputRange:[
              windowWidth * (index-1),
              windowWidth * index,
              windowWidth * (index + 1)
            ],
            outputRange:[
              5, 12, 5
            ],
            extrapolate:"clamp"
          }
        )
        return(
          <Animated.View key= {index} style={[styles.normalDot,{width}]}/>
        )
      })}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
container:{
 flex:1
},
appHeader:{
  position:"absolute",
  top:0,
  width:"100%",
  height:getStatusBarHeight() + 40,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"flex-end",
  paddingHorizontal:20
},
topInfoWrapper:{
  flex:1,
  marginTop:160,
  justifyContent:"space-between"
},
city:{
  color:'#fff',
  fontSize:30,
  fontFamily:"lato-regular",
  fontWeight:"bold"
},
time:{
  color:"#fff",
  fontFamily:"lato-regular",
  fontWeight:"bold"
},
temperature:{
  color:"#fff",
  fontFamily:"lato-light",
  fontSize:85
},
weatherType:{
  color:"#fff",
  fontSize:25,
  fontWeight:"lato-regular", 
  lineWeight:34,
  marginLeft:10
},
bottomInfoWrapper:{
  justifyContent:"space-between",
  flexDirection:"row",
  marginVertical:20
},
wind:{
  color:"#fff",
  fontFamily:"lato-regular",
  fontSize:14,
  fontWeight:"bold"
},
infobar:{
  width:45,
  height:5,
  color:"rgba(255,255,255,0.5)"
},
normalDot:{
  height:5,
   width:5, 
   borderRadius:4,
    marginHorizontal:4, 
    backgroundColor:"#fff"
},
indicatorWrapper:{
  position:"absolute",
  top:160,
  left:20,
  flexDirection:"row",
  justifyContent:"center",
  alignItems:"center"
}
});
export default App;
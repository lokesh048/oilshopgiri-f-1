import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const mainscreen1api=('http://192.168.0.174/easyinvoiceapi/api/category/GetItemCategoryList?companyCode=1&financialYear=6');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const emptyItems = [];
const ButtonList = ({ buttonData, onPressButton }) => {
const route = useRoute();
var billitems = [];
billitems = route.params?.billingItems;
var selectedItems = [];

if((billitems == null))
{
  selectedItems.length = 0 ;
}
else
{
  selectedItems = route.params?.billingItems;
}
const renderItem = ({ item }) => (
    
  <View style={styles.container}>
  <View style={styles.box}>
  <View style={styles.inner}>
  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main2', {categoryName : item, billingItems : selectedItems})}>
  <View >
    <Image source={require('../assetimage/oilcan.jpg')} style={{ width: 70, height: 80 }} />
    <Text style={styles.Text}>{item}</Text>
  </View>
  </TouchableOpacity>
  </View>
  </View>
  </View>
);

const keyExtractor = (item) => {
   return item ? item.toString() : '';
  };

  FlatListHeader = () => {
    return (
      <View elevation={1} 
        style={{
          height: 100,
          width: "97%",
          margin: 5,
          backgroundColor: "#fff",
          border: 2.9,
          borderColor: "black",
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 16,
          },
          shadowOpacity: 1,
          shadowRadius: 7.49
        }}
      >
      <Text style={{  textShadowColor: 'green',color:'green', textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40}}>GIRI & CO</Text>
      </View>
    );
  }
  const [numColumns] = useState(2);
const navigation = useNavigation();
  return (
    <FlatList
      data={buttonData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent = { this.FlatListHeader }  
      numColumns={numColumns}
    />
  );
};

export default function App() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.31/easyinvoiceapi/api/category/GetItemCategoryList?companyCode=1&financialYear=6');
        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleButtonPress = (button) => {
    console.log(`Button ${button.id} pressed`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',flexDirection: 'row' }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ButtonList buttonData={apiData} onPressButton={handleButtonPress} />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%', // Use 100% to take the full width
    height: '100%',
  },
  box: {
    width: '50%',
    height: '50%', // Adjust height to desired percentage
    padding: 10,
  },
  inner: {
    flex: 1,
    paddingLeft: windowWidth * 0.3, // Adjust left padding based on screen width
    paddingRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: windowHeight * 0.1, // Adjust padding based on screen height
    paddingTop:30,
    paddingBottom:20,
    borderRadius: 20,
    width: windowWidth * 0.1, // Adjust width based on screen width
    height: windowHeight * 0.21, // Adjust height based on screen height
    marginRight:60,

  },
  Text: {
    fontSize: windowWidth * 0.035, // Adjust font size based on screen width
    textAlign: 'center',
    paddingTop: windowHeight * 0.01, // Adjust padding based on screen height
    fontWeight: 'bold',
    color: '#000000',
  },
});




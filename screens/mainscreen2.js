import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const mainscreen2api=('http://http://192.168.0.174/easyinvoiceapi/api/items/GetItemNameList?companyCode=1&financialYear=6&categoryName=');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const itemData = null;
const ButtonList = ({ buttonData, onPressButton }) => {
const route = useRoute();
const selectedItems = route.params?.billingItems;
const [modifieddata, setitemdata] = useState('');
const [inputValues, setInputValues] = useState('');
const [items, setItems] = useState([]);
const handleInputChange = (item, text,rate) => {
    item.itemQty = text;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [item.itemQty]: text,
    }));
    item.itemAmount=text*rate;
  };

  const qtySetFocused = (item, text) => {
    // if(text="0")
    // {
    //   console.log(text);
    //   item.itemQty = "";
    //   //text = "";
    // }
    // else
    // {
    //   item.itemQty = text;
    // }
    // setInputValues((prevInputValues) => ({
    //   ...prevInputValues,
    //   [item.itemQty]: text,
    // }));
  };

  const qtyFocusOut = (item, text) => {
    // console.log(text);
    // if(text==null)
    // {
    //   item.itemQty = "0";
    //   text = "0";
    // }
    // else
    // {
    //   item.itemQty = text;
    // }
    // setInputValues((prevInputValues) => ({
    //   ...prevInputValues,
    //   [item.itemQty]: text,
    // }));
  };
  
  const inputRef = useRef(null);
  const [isCleared, setIsCleared] = useState(false);
  const setFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();

      if (!isCleared) {
        //setInputValue(''); // Clear the default value only once
        setIsCleared(true);
      }
    }};
    
  const addItem = () => {
    // // Check if an item with the same id already exists in the array
    // const isItemExists = items.some(item => item.id === inputValues.id);
  
    // if (isItemExists) {
    //   Alert.alert('Item already added', 'An item with this ID already exists in the list.');
    // } else {
    //   // Add the new item to the array
    //   setItems([...items, { ...inputValues }]);
    //   setInputValues(''); // Clear the input fields
    // }
    buttonData.map((data,index)=>
    {if(data.itemQty>0)
    {
      const isItemExists = selectedItems.some(item => item.itemCode === data.itemCode);
      if(isItemExists)
      {
        Alert.alert('Item already added', 'An item with this ID already exists in the list.');
        return false;
      }
    }
    })
    return true;
  };
  const handlePress = () => {
    //const isItemExists = addItem();
    setFocus();
    var isItemExists = false;
    var isZero = false;
    buttonData.map((data,index)=>
    {
      if((data.itemQty>0) && (!isItemExists))
      {
        isZero = true;
        isItemExists = selectedItems.some(item => item.itemCode === data.itemCode);
        if(isItemExists)
        {
          Alert.alert('Item already added', (data.itemFullName + ' exists in the list.'));
        }
      }
    });

    if(!isZero)
    {
      Alert.alert('Select Item', ('Please select any one item.'));
    }
    else
    {
      if(!isItemExists)
      {
        BtnCompleteClick();  
      }
    }
  };
const renderItem = ({ item }) => (
    
 <View style={styles.container}>
 <View style={styles.box}>
 <View style={styles.inner}>
            <View style={styles.button}>
            {/* <Image source={require('../assets/images/oilcan.jpg')} style={{ width: 50, height: 62,alignItems:'center' }} /> */}
            <Text style={styles.Text}>{item.itemName} </Text>
            <Text style={styles.Text}>Rs.{item.itemRate}.00 </Text>
            <Text style={styles.Text}>No.QTY </Text>
            <TextInput
                 style={styles.input}
                 // onChangeText        
                 onChangeText={(text) => handleInputChange(item, text,item.itemRate)}
                 onFocus={(text) => qtySetFocused(item, text)}
                 onBlur={(text) => qtyFocusOut(item, text)}
                 ref={inputRef}
                 //value={item.itemQty.toString()}
                 //placeholder="0"
                 keyboardType="numeric"/>
           </View>
  </View>
  </View>
  </View>    
);
  
  FlatListFooter = () => {
    return(
      <View style={styles.container1}>
      <View style={styles.box}>
      <View style={styles.inner}>
      <TouchableOpacity style={styles.button1} onPress={handlePress}>
      <View>
      <Text style={{fontSize:30,color:'#000000',fontWeight:'bold'}}>
          Complete
      </Text></View>
      </TouchableOpacity>
      </View></View>
      </View>
    )
  }
  
BtnCompleteClick = () => {

  buttonData.map((data,index)=>
  {if(data.itemQty>0)
  {
    selectedItems.push(data);
  }
  })
  navigation.navigate('screen3',{ billingItems : selectedItems})
}
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



const keyExtractor = (item) => {
    return item ? item.itemCode.toString() : '';
  };
  const [numColumns] = useState(2);
  const navigation = useNavigation();
  return (
    <FlatList
      data={buttonData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      ListHeaderComponent = { this.FlatListHeader }  
      ListFooterComponent={this.FlatListFooter}
    />
  );
};

export default function App() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  categoryName = route.params?.categoryName;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.31/easyinvoiceapi/api/items/GetItemNameList?companyCode=1&financialYear=6&categoryName='+categoryName);
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
    // Handle button press here
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
      width: '100%',
      height: '100%',
      padding: 10,
      flex:1,
      flexDirection:'row',
      flexWrap: 'wrap',
      alignItems:'center',
      justifyContent:'space-evenly',
      
},
  container1: {
    width: '75%',
    height: '60%',
    paddingBottom: 100,
    flex:1,
    paddingRight:280,
    justifyContent:'space-evenly',
    alignItems:'center',
},
  box: {
      width: '25%',
      height: '50%',
      padding: 10,
},
  inner: {
      flex: 1,
      paddingLeft:185,
      paddingRight:50,
      alignItems: 'center',
      justifyContent: 'center',
},
  button: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
      width: 180,
      height: 180,
      marginRight:windowWidth*0.89,
},
  button1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'aqua',
    borderRadius: 20,
    width: 300,
    height: 80,
    justifyContent:'center'
},
  Text:{
    fontSize:18,
    textAlign:'center',
    paddingTop:10,
    fontWeight:'bold',
    color:'#000000'
},
input: {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  width:100,
  textAlign:'center',
  fontWeight:'bold'
}
});


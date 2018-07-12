import React, {Fragment} from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Thumbnail } from "native-base"; 

const plantsList = [
  {
    id: 1,
    name: "Bob",
    thumbnail: "http://www.avso.org/wp-content/uploads/files/1/8/0/feng-shui-plants-for-harmony-and-positive-energy-in-the-living-room-1-180.jpg"
  },
  {
    id: 2,
    name: "Henry",
    thumbnail: "https://www.petals.com/files/imagesSF/product/750/pla384-gr_zoom.jpg"
  },
  {
    id: 3,
    name: "Ben",
    thumbnail: "https://www.ftdimg.com/pics/products/zoom/P120_600x600.jpg"
  },
  {
    id: 4,
    name: "Charly",
    thumbnail: "https://images-na.ssl-images-amazon.com/images/I/41TMldE5YjL.jpg"
  }
];

const Plant = ({thumbnail, name, navigation, id}) => (
  <TouchableOpacity 
    style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 20}}
    onPress={() => navigation.navigate("Plant", { name, thumbnail, id } )}
  >
    <Thumbnail style={{width: 130, height: 130, borderRadius: 130/2, borderWidth: 3, borderColor: '#d6d7da',}} source={{ uri: thumbnail }} />
    <Text style={{marginTop: 10, fontSize: 20, fontFamily: "Roboto"}}>{name}</Text>
  </TouchableOpacity>
); 

export default class HomeScreen extends React.Component {
  render() {
    return ( 
      <ScrollView contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', paddingTop: 20, paddingBottom: 20}}>
      {
        plantsList.map((item, index) => <Plant key={item.id} thumbnail={item.thumbnail} name={item.name} navigation={this.props.navigation} id={index} /> )
      }
      </ScrollView>
    );
  }
}
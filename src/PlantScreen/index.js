import React from 'react';
import { View, Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { Thumbnail, Button, Container, Spinner } from "native-base"; 
import {websocketClientConnect, sendMessage } from '../../utils/mqtt';

const Profile = ({thumbnail, title}) => (
  <View style={{ alignSelf: 'stretch', backgroundColor: '#ecf4f5', alignItems: 'center', justifyContent: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#d6d7da', paddingBottom: 10, paddingTop: 10}}>
    <Thumbnail style={{width: 100, height: 100, borderRadius: 100/2, borderWidth: 3, borderColor: '#d6d7da', marginTop: 10}} source={{ uri: thumbnail }} />
    <View style={{backgroundColor: "#fff", height: 30, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#d6d7da', borderRadius: 8}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}> { title }, <Text style={{fontWeight: 'normal'}}>CACTUS</Text> </Text>
    </View>
  </View> 
)

export default class PlantScreen extends React.Component {

  state = {
    loading: true,
    name: "",
    thumbnail: "",
    id: ""
  }

 componentDidMount() {
    const id = this.props.navigation.getParam('id');
    const thumbnail = this.props.navigation.getParam('thumbnail');
    const name = this.props.navigation.getParam('name');
    this.setState({ id, name, thumbnail });
    this.connectToWebsocket();
  }

  componentWillReceiveProps(props) {
      const id = props.navigation.getParam('id');
      const thumbnail = props.navigation.getParam('thumbnail');
      const name = props.navigation.getParam('name');
      if (name !== this.state.name) {
          this.setState({ id, name, thumbnail });
      }
  }
 
 connectToWebsocket() {
    websocketClientConnect('test')
        .then((client) => {
            this.setState({client, loading: false});
        }, e => {
            console.log('failed', e);
        });
  }

  wattering = () => {
    sendMessage(this.state.client, this.state.id);
  }

  render() {
    return (
      (!this.state.loading) ? 
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Profile thumbnail={this.state.thumbnail} title={this.state.name}/>
        <Container>
        <ProgressCircle
            percent={80}
            radius={50}
            borderWidth={12}
            color="#25b793"
            shadowColor="#d3d3d3"
            bgColor="#fff"
            radius={100}
        >
            <Text style={{ fontSize: 40, fontFamily: "Fredoka" }}>{'80%'}</Text>
            <Text style={{ fontSize: 20, marginTop: 10 }}>healthy</Text>
        </ProgressCircle>

        <Button 
          block 
          rounded 
          info 
          style={{marginTop: 40, backgroundColor: "#25b793" }} 
          onPress={this.wattering}
        >
          
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Wattering</Text>
          </Button>
          </Container>
      </View> : <Spinner color='green'/>
    );
  }
}
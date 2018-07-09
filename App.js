import React, {Fragment} from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Footer, FooterTab, Button, Icon, Text, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import custom from './native-base-theme/variables/custom';
import HomeScreen from "./src/HomeScreen";
import SettingsScreen from "./src/SettingsScreen";
import SheduleScreen from "./src/SheduleScreen";
import AddScreen from "./src/AddScreen";
import Header from "./src/Header";


const MyObject = {
  name: "hello",
  lastname: "test"
};

class TabBar extends React.Component {

  render() {
    const current = this.props.navigation.state.index;
    const { routes } = this.props;
    return (
      <Footer>
        <FooterTab
          tabBarTextColor={"#000"}
          tabBarTextSize={10}
        >
          {
            Object.keys(routes).map((route, index) => ( 
              <Button 
                key={route}
                onPress={() => this.props.navigation.navigate(route) }
                active={index === current}
              >
                <Icon name={routes[route].icon} />
                <Text>{route}</Text>
              </Button>
            ))
          }
        </FooterTab>
      </Footer>
    )
  }
}

const routes = {
  Home: {
    screen: HomeScreen,
    icon: "flower"
  },
  Add: {
    screen: AddScreen,
    icon: "ios-add-circle-outline"
  },
  Shedule: {
    screen: SheduleScreen,
    icon: "calendar"
  },
  Settings: {
    screen: SettingsScreen,
    icon: "ios-settings"
  }
}

const RootStack = createBottomTabNavigator(routes, {
  tabBarComponent: (props) => (
    <TabBar {...props} routes={routes} />
  )
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      Fredoka: require("./asserts/fonts/Fredoka.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(custom)}>
        <Fragment>
          <Header />
          <RootStack />
        </Fragment>
       </StyleProvider>
    );
  }
}
import React from 'react';
import { Header, Left, Body, Right, Title, Button, Icon  } from 'native-base';

export default class MainHeader extends React.Component {
  render() {
    return (
      <Header noShadow>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
          </Right>
        </Header>
    );
  }
}
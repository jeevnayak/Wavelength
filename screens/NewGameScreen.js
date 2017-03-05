import gql from 'graphql-tag';
import React, {
  Component,
} from 'react';
import {
  compose,
  graphql,
} from 'react-apollo';
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  BackButton,
} from '../ui/Button';
import ChooseWordScreen from './ChooseWordScreen';
import {
  withFbFriends,
} from '../data/FbFriendStore';
import {
  Row,
} from '../ui/Row';
import {
  screen,
  Screen,
} from '../ui/Screen';

class NewGameScreen extends Component {
  constructor(props) {
    super(props);

    this.dataSource_ = new ListView.DataSource({
      rowHasChanged: (friend1, friend2) => friend1.id !== friend2.id
    });
  }

  render() {
    this.dataSource_ = this.dataSource_.cloneWithRows(this.props.fbFriends);
    let listView;
    if (this.dataSource_.getRowCount() > 0) {
      listView = <ListView
        dataSource={this.dataSource_}
        renderRow={(friend) => this.renderFbFriendRow_(friend)} />;
    }

    return (
      <Screen>
        <BackButton navigator={this.props.navigator} />
        {listView}
      </Screen>
    );
  }

  renderFbFriendRow_(friend) {
    return <Row
      title={friend.name}
      pictureUser={friend}
      onPress={() => this.onPressFriendRow_(friend)} />;
  }

  async onPressFriendRow_(friend) {
    this.props.navigator.push({
      component: ChooseWordScreen,
      props: {
        currentUserId: this.props.currentUser.id,
        cluerId: this.props.currentUser.id,
        guesserId: friend.id
      }
    });
  }
}

export default compose(
  withFbFriends,
  screen
)(NewGameScreen);

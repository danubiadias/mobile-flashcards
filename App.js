import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import DeckList from './components/views/DeckList';
import NewDeck from './components/views/NewDeck';
import Deck from './components/views/Deck';
import NewCard from './components/views/NewCard';
import Quiz from './components/views/Quiz'
import { purple, white } from './utils/colors';
import { setLocalNotification } from './utils/notifications'

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Baralhos',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-playing-outline"
            size={30}
            color={tintColor}
          />
        ),
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'Novo Baralho',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-circle" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: purple,
      style: {
        height: 56,
        backgroundColor: white,
      },
    },
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: 'Detalhes do Baralho',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Adicionar Cartão',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
});

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

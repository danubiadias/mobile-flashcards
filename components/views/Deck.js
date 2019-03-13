import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../utils/CustomButton';
import { purple, white, gray, red, blueLight } from '../../utils/colors';

class Deck extends Component {
  render() {
    const deck = this.props.navigation.state.params.entryId;
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.mainText}>
            {Object.keys(decks).length === 0 ? deck : decks[deck].title}
          </Text>
          <Text style={styles.subText}>
            Nº de Cartões: {Object.keys(decks).length === 0 ? 0 : decks[deck].questions.length}
          </Text>

          <CustomButton
            styles={styles}
            text={'Adicionar Cartão'}
            color={purple}
            onPress={() =>
              this.props.navigation.navigate('NewCard', { entryId: deck })
            }
          />
          {decks[deck].questions.length === 0 ? null : (<CustomButton
            styles={styles}
            text={'Jogar'}
            color={red}
            onPress={() =>
              this.props.navigation.navigate('Quiz', { entryId: deck })
            }
          />)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    padding: 10,
  },
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 5,
    width: 200,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: blueLight,
    alignSelf: 'stretch',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.34)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  mainText: {
    fontSize: 40,
    color: gray,
  },
  subText: {
    fontSize: 30,
    color: gray,
    marginBottom: 160,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Deck);

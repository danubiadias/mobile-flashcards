import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../../utils/api';
import { receiveDecks } from '../../actions';
import { gray, blueLight } from '../../utils/colors';

class DeckList extends Component {
  componentDidMount() {
    getDecks().then(decks => this.props.receiveAllDecks(decks));
  }

  render() {
    const { decks } = this.props;

    if (Object.keys(decks).length === 0) {
      return (
        <View style={styles.decksEmpty}>
          <Text style={{ fontSize: 20 }}> Nenhum baralho encontrado. </Text>
          <Text style={{ fontSize: 20 }}>
            Para iniciar, crie um novo baralho.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleView}>
          <Text style={{fontSize: 30}}>Baralhos disponíveis </Text>
        </View>
        {Object.keys(decks).map(deck => {
          const { title, questions } = decks[deck];
          return (
            <View key={deck} style={styles.card}>
              <Text style={styles.cardText}>{title}</Text>
              <Text style={styles.questionText}>
                Nº perguntas: {questions.length}
              </Text>

              <Button
                style={styles.cardBtn}
                onPress={() =>
                  this.props.navigation.navigate('Deck', { entryId: deck })
                }
                title="Ver Detalhes"
              />
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 5,
  },
  decksEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
    padding: 20,
    alignItems: 'center'
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: blueLight,
    minHeight: 150,
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: gray,
    shadowColor: 'rgba(0,0,0,0.34)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  cardText: {
    fontSize: 30,
    color: gray,
  },
  questionText: {
    fontSize: 18,
    color: gray,
  },
  cardBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveAllDecks: decks => dispatch(receiveDecks(decks)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);

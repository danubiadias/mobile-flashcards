import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  white,
  purple,
  red,
  blue,
  blueLight,
  green,
  gray,
} from '../../utils/colors';
import { connect } from 'react-redux';
import CustomButton from '../utils/CustomButton';

class Quiz extends Component {
  state = {
    questionNumber: 0,
    showQuestion: false,
    correct: 0,
    incorrect: 0,
  };

  showAnswer = () =>
    !this.state.showQuestion
      ? this.setState({ showQuestion: true })
      : this.setState({ showQuestion: false });

  submitAnswer = answer => {
    const { questionNumber } = this.state;
    const deck = this.props.navigation.state.params.entryId;
    const decks = this.props.decks;

    if (answer) {
      this.setState({ correct: this.state.correct + 1 });
    } else {
      this.setState({ incorrect: this.state.incorrect + 1 });
    }
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      showQuestion: false,
    });
  };

  startGame = () => {
    this.setState({
      questionNumber: 0,
      showQuestion: false,
      correct: 0,
      incorrect: 0,
    });
  };

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: null }));
  };

  render() {
    const questionNumber = this.state.questionNumber;
    const decks = this.props.decks;
    const deck = this.props.navigation.state.params.entryId;
    const number = this.state.questionNumber + 1;

    if (questionNumber === decks[deck].questions.length) {
      
      //Se completar o quiz então limpa o envio de notificação e reinicia a contagem para notificar no proximo dia
      clearLocalNotification(); 
      setLocalNotification();
      
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.mainText}>
              Você acertou {this.state.correct} de um total de{' '}
              {decks[deck].questions.length} !
            </Text>
            <Text style={{ fontSize: 70 }}>
              {Math.round((this.state.correct * 100) /decks[deck].questions.length)} %
            </Text>

            <View>
              <CustomButton
                styles={styles}
                text={'Jogar novamente'}
                color={red}
                onPress={this.startGame}
              />
              <CustomButton
                styles={styles}
                text={'Voltar ao baralho'}
                color={green}
                onPress={this.goBack}
              />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.questions}>
            {number} / {decks[deck].questions.length}
          </Text>

          {!this.state.showQuestion ? (
            <Text style={styles.mainText}>
              {decks[deck].questions[questionNumber].question}
            </Text>
          ) : (
            <Text style={styles.mainText}>
              {decks[deck].questions[questionNumber].answer}
            </Text>
          )}

          {!this.state.showQuestion ? (
            <TouchableOpacity onPress={this.showAnswer}>
              <Text style={styles.answer}>
                <FontAwesome name="eye" size={30} color={gray} />
                {'  Mostrar resposta'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.showAnswer}>
              <Text style={styles.answer}>
                <MaterialCommunityIcons
                  name="cards-outline"
                  size={30}
                  color={gray}
                />
                {'  Mostrar pergunta'}
              </Text>
            </TouchableOpacity>
          )}

          <View>
            <CustomButton
              color={green}
              styles={styles}
              text={'Correto'}
              onPress={() => this.submitAnswer(true)}
            />
            <CustomButton
              color={red}
              styles={styles}
              text={'Incorreto'}
              onPress={() => this.submitAnswer(false)}
            />
          </View>
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
  },
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 55,
    margin: 5,
    width: 250,
  },
  submitBtnText: {
    color: white,
    fontSize: 26,
    textAlign: 'center',
  },
  questions: {
    top: 0,
    alignSelf: 'flex-start',
    left: 0,
    color: gray,
    fontSize: 20,
    margin: 5,
    position: 'absolute',
  },
  answer: {
    color: blue,
    fontSize: 20,
    margin: 20,
  },
  card: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
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
    marginTop: 40,
    textAlign: 'center',
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Quiz);

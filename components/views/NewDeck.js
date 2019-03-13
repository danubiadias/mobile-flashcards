import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { createDeck } from '../../actions';
import { saveDeckTitle } from '../../utils/api';
import { green, blueLight, white } from '../../utils/colors';
import CustomButton from '../utils/CustomButton';

class NewDeck extends Component {
  state = {
    title: '',
  };

  saveTitle = () => {
    const { title } = this.state;

    if (this.state.title) {
      saveDeckTitle(title);
      this.props.dispatch(createDeck(title));
      this.props.navigation.navigate('Deck', { entryId: title });
      this.setState({ title: '' });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Tema do baralho:</Text>
          <TextInput
            style={styles.input}
            onChangeText={titleDeck => this.setState({ title: titleDeck })}
            value={this.state.title}
          />
          <CustomButton
            styles={styles}
            text={'Criar'}
            color={green}
            onPress={this.saveTitle}
          />
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
  input: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
    borderRadius: 8,
  },
  title: {
    fontSize: 30,
    color: '#333',
    textAlign: 'center',
  },
  iosBtn: {
    borderRadius: 5,
    margin: 10,
    padding: 15,
    width: 250,
  },
  submitBtnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
  },
});

export default connect()(NewDeck);

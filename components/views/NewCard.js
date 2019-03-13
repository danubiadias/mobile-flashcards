import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { orange, white, green } from '../../utils/colors'
import { addCardToDeck } from '../../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../../actions'
import CustomButton from '../utils/CustomButton'

import { StyleSheet, 
		 View,
		 TouchableOpacity,
		 TextInput,
		 KeyboardAvoidingView,
		 Text  } from 'react-native'

class NewCard extends Component {

	state = {
		question: '',
		answer: ''
	}

	submitCard = (deck) => {
		const { question, answer } = this.state

		if(question && answer){
			this.props.dispatch(addCard({ question, answer, deck }))
			addCardToDeck(deck, { question, answer })
			this.setState({ question: '', answer: '' })
			this.props.navigation.dispatch(NavigationActions.back({ key: null }))
		}
	}

	render(){
		const deckName = this.props.navigation.state.params.entryId

		return(
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.title}>Escreva a pergunta</Text>
					<TextInput style={styles.input}
							   onChangeText={(question) => this.setState({question})}
							   value={this.state.question}
					></TextInput>

					<Text style={styles.title}>Informe a resposta</Text>
					<TextInput style={styles.input}
							   onChangeText={(answer) => this.setState({answer})}
							   value={this.state.answer}
					></TextInput>

          <CustomButton
            styles={styles}
            text={'Salvar'}
            color={green}
            onPress={() => this.submitCard(deckName)}
          />
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitBtnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
  },
	title: {
		fontSize: 30,
		color: '#333',
	},
	iosBtn: {
    borderRadius: 5,
    margin: 10,
    padding: 15,
    width: 250,
  },
	input: {
		width: 250,
		height: 40,
		padding: 8,
		borderWidth: 1,
		borderColor: '#757575',
		margin: 20,
		borderRadius: 7
	}
})

export default connect()(NewCard)

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        }
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginFailure = this.onLoginFailure.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }
    onButtonPress(){
        const { email, password } = this.state;
        this.setState({ error: '', loading: true});
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(()=> this.onLoginSuccess())
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => this.onLoginSuccess())
                    .catch(()=> this.onLoginFailure())
            });
    }

    onLoginSuccess(){
        this.setState({
            email: '',
            password: '',
            loading: false
        });
    }

    onLoginFailure(){
        this.setState({ 
            error: 'Authentication failed!', 
            loading: false
        });
    }

    renderButton(){
        const { loading } = this.state;
        return (loading? 
                <Spinner size='small' />
                :  
                <View style={styles.buttonContainer}>
                    <Button onPress={() => this.onButtonPress()}>
                        Log In
                    </Button>
                </View>)
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label={'Email'}
                        placeholder={'abc@xyz.com'}
                        value = {this.state.email}
                        onChangeText={email => this.setState({ email })} 
                    />
                </CardSection>
                <CardSection>
                <Input  
                        secureTextEntry
                        label={'Password'}
                        placeholder={'password'}
                        value = {this.state.password}
                        onChangeText={password => this.setState({ password })} 
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                  {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}
export default LoginForm;
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: null
        }
    this.renderContent = this.renderContent.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    }
    componentWillMount(){
        // Initialize Firebase
    var config = {
        apiKey: 'AIzaSyD8E7H4tIBiyP1GhsTH3bi2OHoX3C7h7_4',
        authDomain: 'authentication-22837.firebaseapp.com',
        databaseURL: 'https://authentication-22837.firebaseio.com',
        projectId: 'authentication-22837',
        storageBucket: 'authentication-22837.appspot.com',
        messagingSenderId: '610203060311'
        };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
        user? this.setState({ loggedIn: true })
            : this.setState({ loggedIn: false });
    });

    }

    async handleLogout(){
        await firebase.auth().signOut();
    }
    renderContent(){
        const { loggedIn } = this.state;
        switch(loggedIn){
            case true:
                return (
                    <Button onPress={()=> this.handleLogout()}>Log Out</Button>
                );
            case false:
                return(
                    <LoginForm />
                );
            default:
                return (
                    <View style={styles.spinnerContainer}>
                        <Spinner size={'large'} />
                    </View>
                );
        }
    }

    render(){
        return(
            <View style={styles.mainContainer}>
               <Header headerText={'Authentication'}/>
               {this.renderContent()}
            </View>
        )
    }
}

const styles = {
    mainContainer: {
        flex: 1
    },
    spinnerContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    }
}

export default App;
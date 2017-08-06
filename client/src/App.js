import React, {Component} from 'react';
import firebase from 'firebase';

import {inject, observer} from 'mobx-react';
var config = {
  apiKey: "AIzaSyAfuf4mOVgXC8Ed-lisZ0u17Y8MutZR7HY",
  authDomain: "prj1-668de.firebaseapp.com",
  databaseURL: "https://prj1-668de.firebaseio.com",
  storageBucket: "prj1-668de.appspot.com",
  messagingSenderId: "911034968968"
};
firebase.initializeApp(config);
export const ref = firebase.database().ref()
export const auth = firebase.auth
export const provider = new firebase.auth.FacebookAuthProvider();

@inject('UserStore')
@observer
class App extends Component {
  // Initialize state
  constructor(props) {
      super(props);
      this.state = {
          user: null
      }
  }
  async login() {
    const result = await auth().signInWithPopup(provider)
    this.props.UserStore.createUser(result);
    this.setState({user: this.props.UserStore.userList.value.user});
  }
  logout() {
     auth().signOut();//await
    this.props.UserStore.deleteUser();
    this.setState({user: null});
  }
  async componentWillMount() {
    if(this.props.UserStore.userList){
      this.setState({user: this.props.UserStore.userList.value.user});  
    }
  // const user = auth().onAuthStateChanged();
  // if(user) this.setState({user})
}

  render() {
    const {user} = this.state;
    return (
      <div className="App">
        <p>{user ? `Hi, ${user.displayName}!` : 'Hi!'}</p>
        {user ? (
          <button onClick={this.logout.bind(this)}>
          Logout
        </button>
        ) : (
          // Render a helpful message otherwise
          <img src="https://plaaant.com/img/facebook-login.png"  onClick={this.login.bind(this)} alt=""/>

        )}
      </div>
    );
  }
}

export default App;
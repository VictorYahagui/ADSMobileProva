import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
import { firebaseApp, accountDB } from './firebase.js';

export default class ADSMobileProva extends Component {
  state = {
    nome_conta: '',
    valor: '',
    next_key: 3,
    account: [],
  };
  componentDidMount(){
    this.accountList();
  }

  accountList = () => {
    var accountSup = [];
    accountDB.on('value', (account) => {
      account.forEach((account) => {
        accountSup.push({
          key: account.key,
          nome_conta: account.val().nome_conta,
          valor: account.val().valor,
        });
      });
      this.setState({account: accountSup});
    });
  }
  createAccount = () => {
    if (this.state.nome_conta.length > 0){
      var account = {
        nome_conta: this.state.nome_conta,
        valor: this.state.valor,
      };

      accountDB.push(account);

      this.accountList();
    }
  }
  accountDestroy = key => {
    try {
      accountDB.child(key).remove();
      this.accountList();
    } catch (err) {
      console.log('Error: createAccount' + err);
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Prova</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Nome da conta"
            value={this.state.nome_conta}
            onChangeText={(nome_conta) => this.setState({ nome_conta })}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor da conta"
            keyboardType={'numeric'}
            value={this.state.valor}
            onChangeText={(valor) => this.setState({ valor })}
          />
          <Button
            style={styles.botao}
            title="Salvar"
            onPress={this.createAccount}
          />
          <FlatList
            style={styles.list}
            data={this.state.account}
            renderItem={({ item, index }) => (
              <View style={styles.content_list}>
                <Text>{item.valor}</Text>
                <Text>{item.nome_conta}</Text>
                <Button style={styles.btn} 
                title="Excluir" 
                onPress={() => this.accountDestroy(item.key)}/>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
  container: {
    padding: 20,
  },
  list: {
    paddingTop: '35%',
  },
  input: {
    marginTop: -10,
  },
  content_list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 2,
  },
});

import React, {useCallback, useRef} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {useAuth} from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  Label,
  ForgotPassword,
  ForgotPasswordText,
  Footer,
  FooterText,
} from './style';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const {signIn} = useAuth();

  const handleRecover = function () {
    navigation.navigate('RecoverSenha');
  };

  const handleLogin = useCallback(
    async (dataForm) => {
      try {
        await signIn({
          email: dataForm.email,
          password: dataForm.password,
        });
      } catch (err) {
        Alert.alert('Verifique', 'Verfique suas credencias!');
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Title>SisVistorias</Title>
      <Label>Faça seu Login</Label>
      <Form ref={formRef} onSubmit={handleLogin}>
        <Input
          name="email"
          icon="mail"
          placeholder="E-mail"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
        />
        <Input
          name="password"
          icon="lock"
          placeholder="Senha"
          secureTextEntry
          returnKeyType="send"
          onSubmitEditing={() => {
            formRef.current?.submitForm();
          }}
        />
      </Form>
      <Button
        onPress={() => {
          formRef.current?.submitForm();
        }}>
        Entrar
      </Button>

      <ForgotPassword
        onPress={() => {
          handleRecover;
        }}>
        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
      </ForgotPassword>
      <Footer>
        <FooterText>Desenvolvido com ♥</FooterText>
      </Footer>
    </Container>
  );
};

export default Login;

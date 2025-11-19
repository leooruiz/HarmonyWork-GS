import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { login, register } from "../../services/authService";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const user = await login(email, password);
        if (user) {
          onLoginSuccess();
        } else {
          Alert.alert(
            "Erro",
            "Usuário não encontrado. Crie uma conta primeiro."
          );
        }
      } else {
        await register(email, name, password);
        Alert.alert("Sucesso", "Conta criada com sucesso!");
        onLoginSuccess();
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.logo}>⚡️</Text>
            <Text style={styles.title}>HarmonyWork</Text>
            <Text style={styles.subtitle}>
              Seu dia organizado. Sua mente leve.
            </Text>
          </View>

          <View style={styles.form}>
          {!isLogin && (
            <Input
              label="Nome"
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}

          <Input
            label="Email"
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <View style={{ marginTop: 8 }}>
            <Button
              title={isLogin ? "Entrar" : "Criar conta"}
              onPress={handleSubmit}
              loading={loading}
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <Button
              title={
                isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Entre"
              }
              onPress={() => setIsLogin(!isLogin)}
              variant="secondary"
            />
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  form: {},
});

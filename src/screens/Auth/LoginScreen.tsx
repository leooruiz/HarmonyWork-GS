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
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { login, register } from "../../services/authService";
import { colors } from "../../theme/colors";

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
    <LinearGradient
      colors={[colors.primary, colors.secondary, colors.background.primary]}
      locations={[0, 0.4, 1]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.flex}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logo}>⚡️</Text>
              </View>
              <Text style={styles.title}>HarmonyWork</Text>
              <Text style={styles.subtitle}>
                Seu dia organizado. Sua mente leve.
              </Text>
            </View>

            <View style={styles.formContainer}>
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
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
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    fontSize: 64,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.text.inverse,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "500",
  },
  formContainer: {
    backgroundColor: colors.background.primary,
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  form: {},
});

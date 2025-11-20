import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Vibration,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "../../components/Button";
import { addFocusSession } from "../../services/taskService";
import { colors } from "../../theme/colors";

interface FocusScreenProps {
  navigation: any;
}

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export const FocusScreen: React.FC<FocusScreenProps> = ({ navigation }) => {
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    navigation.setOptions({
      title: "Modo Foco",
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, seconds]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      // Se o timer não está ativo ou está no estado inicial, permite sair
      if (!isActive && seconds === WORK_TIME && !isBreak) {
        return;
      }

      // Previne a navegação padrão
      e.preventDefault();

      // Mostra dialog de confirmação
      Alert.alert(
        "Sair do Modo Foco?",
        "O timer será resetado e o progresso da sessão atual será perdido.",
        [
          { text: "Cancelar", style: "cancel", onPress: () => {} },
          {
            text: "Sair",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, isActive, seconds, isBreak]);

  const handleTimerComplete = async () => {
    Vibration.vibrate([0, 500, 200, 500]);

    if (!isBreak) {
      // Trabalho completo - iniciar pausa automaticamente
      await addFocusSession(25);
      setSessionsCompleted((prev) => prev + 1);
      setIsBreak(true);
      setSeconds(BREAK_TIME);
      setIsActive(true);
    } else {
      // Pausa completa - iniciar nova sessão automaticamente
      setIsBreak(false);
      setSeconds(WORK_TIME);
      setIsActive(true);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleSkipBreak = () => {
    setIsBreak(false);
    setSeconds(WORK_TIME);
    setIsActive(true);
  };

  const resetTimer = () => {
    Alert.alert("Confirmar", "Deseja realmente reiniciar o timer?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Reiniciar",
        style: "destructive",
        onPress: () => {
          setIsActive(false);
          setIsBreak(false);
          setSeconds(WORK_TIME);
        },
      },
    ]);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = isBreak
    ? ((BREAK_TIME - seconds) / BREAK_TIME) * 100
    : ((WORK_TIME - seconds) / WORK_TIME) * 100;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {isBreak ? "Pausa" : "Trabalho"} • Técnica Pomodoro
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{sessionsCompleted}</Text>
            <Text style={styles.statLabel}>Sessões hoje</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{sessionsCompleted * 25}</Text>
            <Text style={styles.statLabel}>Minutos focados</Text>
          </View>
        </View>

        <View style={styles.timerContainer}>
          <LinearGradient
            colors={
              isBreak ? [colors.success, "#34D399"] : [colors.primary, colors.secondary]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.timerCircle}
          >
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>{isBreak ? "☕️" : "🎯"}</Text>
          <Text style={styles.infoText}>
            {isBreak
              ? "Relaxe e descanse. Evite telas se possível!"
              : "Foque apenas em uma tarefa. Elimine distrações!"}
          </Text>
        </View>

        <View style={styles.controls}>
          <Button
            title={isActive ? "Pausar" : "Iniciar"}
            onPress={toggleTimer}
            variant={isActive ? "secondary" : "primary"}
          />
          <View style={{ marginTop: 12 }}>
            <Button title="Reiniciar" onPress={resetTimer} variant="danger" />
          </View>
          {isBreak && isActive && (
            <View style={{ marginTop: 12 }}>
              <Button
                title="Pular Pausa"
                onPress={handleSkipBreak}
                variant="primary"
              />
            </View>
          )}
        </View>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>💡 Dicas de Produtividade:</Text>
          <Text style={styles.tipsText}>• Silencie notificações</Text>
          <Text style={styles.tipsText}>• Use fones de ouvido</Text>
          <Text style={styles.tipsText}>• Tenha água por perto</Text>
          <Text style={styles.tipsText}>• Respeite as pausas</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  statusContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  statusText: {
    fontSize: 15,
    color: colors.text.secondary,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 32,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.alerts.info,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderTopWidth: 3,
    borderTopColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "600",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  timerText: {
    fontSize: 68,
    fontWeight: "bold",
    color: colors.text.inverse,
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  progressBar: {
    width: 200,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.text.inverse,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: colors.background.elevated,
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
    shadowColor: colors.info,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  infoIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: "500",
    lineHeight: 20,
  },
  controls: {
    marginBottom: 24,
  },
  tips: {
    backgroundColor: colors.alerts.success,
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 6,
    fontWeight: "500",
  },
});

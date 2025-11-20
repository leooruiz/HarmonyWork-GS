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
import { Button } from "../../components/Button";
import { addFocusSession } from "../../services/taskService";

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
          <View
            style={[styles.timerCircle, isBreak && styles.timerCircleBreak]}
          >
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>
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
    backgroundColor: "#F5F5F5",
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
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  timerCircleBreak: {
    backgroundColor: "#34C759",
    shadowColor: "#34C759",
  },
  timerText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  progressBar: {
    width: 200,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  controls: {
    marginBottom: 24,
  },
  tips: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
});

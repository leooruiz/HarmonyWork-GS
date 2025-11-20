import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { TaskCard } from "../../components/TaskCard";
import { Button } from "../../components/Button";
import {
  getSortedTasks,
  deleteTask,
  completeTask,
} from "../../services/taskService";
import { Task } from "../../types";
import { colors } from "../../theme/colors";

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: "Minhas Tarefas",
      headerShown: true,
    });
  }, [navigation]);

  const loadTasks = async () => {
    try {
      const sortedTasks = await getSortedTasks();
      setTasks(sortedTasks);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as tarefas");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const handleComplete = async (taskId: string) => {
    try {
      await completeTask(taskId);
      await loadTasks();
      Alert.alert("Sucesso", "Tarefa concluída!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível concluir a tarefa");
    }
  };

  const handleDelete = async (taskId: string) => {
    Alert.alert("Confirmar", "Deseja realmente excluir esta tarefa?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTask(taskId);
            await loadTasks();
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir a tarefa");
          }
        },
      },
    ]);
  };

  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.statusBar}
      >
        <Text style={styles.statusText}>
          {pendingTasks.length} pendente{pendingTasks.length !== 1 ? "s" : ""} •{" "}
          {completedTasks.length} concluída
          {completedTasks.length !== 1 ? "s" : ""}
        </Text>
      </LinearGradient>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonAdd]}
          onPress={() => navigation.navigate("AddTask")}
        >
          <Text style={[styles.actionIcon, styles.actionIconWhite]}>+</Text>
          <Text style={[styles.actionText, styles.actionTextWhite]}>Nova Tarefa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonFocus]}
          onPress={() => navigation.navigate("Focus")}
        >
          <Text style={styles.actionIcon}>⏱️</Text>
          <Text style={[styles.actionText, styles.actionTextWhite]}>Modo Foco</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonReport]}
          onPress={() => navigation.navigate("Report")}
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={[styles.actionText, styles.actionTextWhite]}>Relatórios</Text>
        </TouchableOpacity>
      </View>

      {tasks.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyText}>Nenhuma tarefa ainda</Text>
          <Text style={styles.emptySubtext}>
            Adicione sua primeira tarefa para começar
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onPress={() => {}}
              onComplete={() => handleComplete(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={styles.list}
          refreshing={loading}
          onRefresh={loadTasks}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  statusBar: {
    padding: 16,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  statusText: {
    fontSize: 15,
    color: colors.text.inverse,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  actionButtonAdd: {
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
  },
  actionButtonFocus: {
    backgroundColor: colors.secondary,
    shadowColor: colors.secondary,
  },
  actionButtonReport: {
    backgroundColor: colors.info,
    shadowColor: colors.info,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  actionIconWhite: {
    color: colors.text.inverse,
    fontWeight: "bold",
  },
  actionText: {
    fontSize: 12,
    fontWeight: "700",
  },
  actionTextWhite: {
    color: colors.text.inverse,
  },
  list: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.alerts.info,
    margin: 16,
    borderRadius: 16,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
  },
});

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
import { useFocusEffect } from "@react-navigation/native";
import { TaskCard } from "../../components/TaskCard";
import { Button } from "../../components/Button";
import {
  getSortedTasks,
  deleteTask,
  completeTask,
} from "../../services/taskService";
import { Task } from "../../types";

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
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          {pendingTasks.length} pendente{pendingTasks.length !== 1 ? "s" : ""} •{" "}
          {completedTasks.length} concluída
          {completedTasks.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("AddTask")}
        >
          <Text style={styles.actionIcon}>➕</Text>
          <Text style={styles.actionText}>Nova Tarefa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Focus")}
        >
          <Text style={styles.actionIcon}>⏱️</Text>
          <Text style={styles.actionText}>Modo Foco</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Report")}
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionText}>Relatórios</Text>
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
    backgroundColor: "#F5F5F5",
  },
  statusBar: {
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  quickActions: {
    flexDirection: "row",
    padding: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  list: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

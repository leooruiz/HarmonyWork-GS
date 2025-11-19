import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onComplete: () => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onComplete,
  onDelete,
}) => {
  const priorityColors = {
    high: "#FF3B30",
    medium: "#FF9500",
    low: "#34C759",
  };

  const priorityLabels = {
    high: "Alta",
    medium: "Média",
    low: "Baixa",
  };

  return (
    <TouchableOpacity
      style={[styles.card, task.status === "completed" && styles.cardCompleted]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              task.status === "completed" && styles.titleCompleted,
            ]}
          >
            {task.title}
          </Text>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: priorityColors[task.priority] },
            ]}
          >
            <Text style={styles.priorityText}>
              {priorityLabels[task.priority]}
            </Text>
          </View>
        </View>
      </View>

      {task.description && (
        <Text
          style={[
            styles.description,
            task.status === "completed" && styles.descriptionCompleted,
          ]}
          numberOfLines={2}
        >
          {task.description}
        </Text>
      )}

      <View style={styles.actions}>
        {task.status === "pending" ? (
          <TouchableOpacity
            style={[styles.button, styles.completeButton]}
            onPress={onComplete}
          >
            <Text style={styles.buttonText}>✓ Concluir</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>✓ Concluída</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardCompleted: {
    opacity: 0.7,
    backgroundColor: "#F5F5F5",
  },
  header: {
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  descriptionCompleted: {
    color: "#999",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  completeButton: {
    backgroundColor: "#34C759",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  completedBadge: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#E0E0E0",
  },
  completedText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
});

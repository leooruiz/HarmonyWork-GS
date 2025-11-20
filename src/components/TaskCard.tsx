import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Task } from "../types";
import { colors } from "../theme/colors";

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
    high: colors.priority.high,
    medium: colors.priority.medium,
    low: colors.priority.low,
  };

  const priorityLabels = {
    high: "Alta",
    medium: "Média",
    low: "Baixa",
  };

  const borderLeftColor = priorityColors[task.priority];
  const shadowColor = priorityColors[task.priority];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderLeftColor, shadowColor },
        task.status === "completed" && styles.cardCompleted,
      ]}
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
    backgroundColor: colors.background.elevated,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cardCompleted: {
    opacity: 0.85,
    backgroundColor: colors.alerts.success,
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
    color: colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: colors.text.tertiary,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  priorityText: {
    color: colors.text.inverse,
    fontSize: 12,
    fontWeight: "700",
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  descriptionCompleted: {
    color: colors.text.tertiary,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  completeButton: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    shadowColor: colors.danger,
  },
  buttonText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: "600",
  },
  completedBadge: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: colors.success,
    opacity: 0.7,
  },
  completedText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: "600",
  },
});

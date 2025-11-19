import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getTasks, getFocusSessions } from "../../services/taskService";
import { Task, FocusSession } from "../../types";

export const ReportScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const tasksData = await getTasks();
    const sessionsData = await getFocusSessions();
    setTasks(tasksData);
    setFocusSessions(sessionsData);
  };

  const completedTasks = tasks.filter((t) => t.status === "completed");
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const totalFocusMinutes = focusSessions.reduce(
    (acc, s) => acc + s.duration,
    0
  );
  const totalFocusHours = (totalFocusMinutes / 60).toFixed(1);

  const tasksByPriority = {
    high: tasks.filter((t) => t.priority === "high"),
    medium: tasks.filter((t) => t.priority === "medium"),
    low: tasks.filter((t) => t.priority === "low"),
  };

  const completionRate =
    tasks.length > 0
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatórios</Text>
        <Text style={styles.subtitle}>Seu desempenho geral</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Visão Geral</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total de Tarefas</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: "#34C759" }]}>
              {completedTasks.length}
            </Text>
            <Text style={styles.statLabel}>Concluídas</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: "#FF9500" }]}>
              {pendingTasks.length}
            </Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: "#007AFF" }]}>
              {completionRate}%
            </Text>
            <Text style={styles.statLabel}>Taxa de Conclusão</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⏱️ Tempo de Foco</Text>

        <View style={styles.focusCard}>
          <Text style={styles.focusValue}>{totalFocusHours}h</Text>
          <Text style={styles.focusLabel}>Horas focadas no total</Text>

          <View style={styles.focusStats}>
            <View style={styles.focusStat}>
              <Text style={styles.focusStatValue}>{focusSessions.length}</Text>
              <Text style={styles.focusStatLabel}>Sessões</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.focusStat}>
              <Text style={styles.focusStatValue}>{totalFocusMinutes}</Text>
              <Text style={styles.focusStatLabel}>Minutos</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Tarefas por Prioridade</Text>

        <View style={styles.priorityCard}>
          <View style={styles.priorityRow}>
            <View
              style={[styles.priorityDot, { backgroundColor: "#FF3B30" }]}
            />
            <Text style={styles.priorityLabel}>Alta</Text>
            <Text style={styles.priorityValue}>
              {tasksByPriority.high.length}
            </Text>
          </View>

          <View style={styles.priorityRow}>
            <View
              style={[styles.priorityDot, { backgroundColor: "#FF9500" }]}
            />
            <Text style={styles.priorityLabel}>Média</Text>
            <Text style={styles.priorityValue}>
              {tasksByPriority.medium.length}
            </Text>
          </View>

          <View style={styles.priorityRow}>
            <View
              style={[styles.priorityDot, { backgroundColor: "#34C759" }]}
            />
            <Text style={styles.priorityLabel}>Baixa</Text>
            <Text style={styles.priorityValue}>
              {tasksByPriority.low.length}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Insights</Text>

        <View style={styles.insightCard}>
          {completionRate >= 70 ? (
            <>
              <Text style={styles.insightIcon}>🎉</Text>
              <Text style={styles.insightText}>
                Excelente! Você está mantendo uma ótima taxa de conclusão de
                tarefas.
              </Text>
            </>
          ) : completionRate >= 40 ? (
            <>
              <Text style={styles.insightIcon}>👍</Text>
              <Text style={styles.insightText}>
                Bom trabalho! Continue focado para melhorar ainda mais sua
                produtividade.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.insightIcon}>💪</Text>
              <Text style={styles.insightText}>
                Vamos lá! Foque nas tarefas de alta prioridade e use o modo
                foco.
              </Text>
            </>
          )}
        </View>

        {totalFocusMinutes >= 120 && (
          <View style={[styles.insightCard, { backgroundColor: "#E8F4FD" }]}>
            <Text style={styles.insightIcon}>⭐️</Text>
            <Text style={styles.insightText}>
              Parabéns! Você já acumulou mais de 2 horas de foco profundo!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 24,
    paddingTop: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  focusCard: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  focusValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  focusLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  focusStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  focusStat: {
    alignItems: "center",
  },
  focusStatValue: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  focusStatLabel: {
    fontSize: 12,
    color: "#666",
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",
  },
  priorityCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  priorityLabel: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  priorityValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
  },
  insightCard: {
    backgroundColor: "#FFF9E6",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  insightIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});

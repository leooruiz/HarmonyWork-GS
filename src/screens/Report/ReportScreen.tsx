import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { getTasks, getFocusSessions } from "../../services/taskService";
import { Task, FocusSession } from "../../types";
import { colors, typography, spacing, shadows } from "../../theme";

interface ReportScreenProps {
  navigation: any;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);

  useEffect(() => {
    navigation.setOptions({
      title: "Relatórios",
      headerShown: true,
    });
  }, [navigation]);

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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Visão Geral</Text>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total de Tarefas</Text>
          </View>

          <View style={[styles.statCard, styles.statCardSuccess]}>
            <Text style={[styles.statValue, { color: colors.success }]}>
              {completedTasks.length}
            </Text>
            <Text style={styles.statLabel}>Concluídas</Text>
          </View>

          <View style={[styles.statCard, styles.statCardWarning]}>
            <Text style={[styles.statValue, { color: colors.warning }]}>
              {pendingTasks.length}
            </Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </View>

          <View style={[styles.statCard, styles.statCardInfo]}>
            <Text style={[styles.statValue, { color: colors.info }]}>
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
              style={[styles.priorityDot, { backgroundColor: colors.priority.high }]}
            />
            <Text style={styles.priorityLabel}>Alta</Text>
            <Text style={[styles.priorityValue, { color: colors.priority.high }]}>
              {tasksByPriority.high.length}
            </Text>
          </View>

          <View style={styles.priorityRow}>
            <View
              style={[styles.priorityDot, { backgroundColor: colors.priority.medium }]}
            />
            <Text style={styles.priorityLabel}>Média</Text>
            <Text style={[styles.priorityValue, { color: colors.priority.medium }]}>
              {tasksByPriority.medium.length}
            </Text>
          </View>

          <View style={styles.priorityRow}>
            <View
              style={[styles.priorityDot, { backgroundColor: colors.priority.low }]}
            />
            <Text style={styles.priorityLabel}>Baixa</Text>
            <Text style={[styles.priorityValue, { color: colors.priority.low }]}>
              {tasksByPriority.low.length}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Insights</Text>

        <View style={[styles.insightCard, completionRate >= 70 ? styles.insightCardSuccess : completionRate >= 40 ? styles.insightCardWarning : styles.insightCardInfo]}>
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
          <View style={[styles.insightCard, styles.insightCardPrimary]}>
            <Text style={styles.insightIcon}>⭐️</Text>
            <Text style={styles.insightText}>
              Parabéns! Você já acumulou mais de 2 horas de foco profundo!
            </Text>
          </View>
        )}
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
    paddingBottom: spacing.lg,
  },
  section: {
    padding: spacing.base,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    padding: 18,
    borderRadius: 16,
    margin: 0,
    alignItems: "center",
    borderTopWidth: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  statCardPrimary: {
    backgroundColor: colors.alerts.info,
    borderTopColor: colors.primary,
    shadowColor: colors.primary,
  },
  statCardSuccess: {
    backgroundColor: colors.alerts.success,
    borderTopColor: colors.success,
    shadowColor: colors.success,
  },
  statCardWarning: {
    backgroundColor: colors.alerts.warning,
    borderTopColor: colors.warning,
    shadowColor: colors.warning,
  },
  statCardInfo: {
    backgroundColor: colors.alerts.info,
    borderTopColor: colors.info,
    shadowColor: colors.info,
  },
  statValue: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    textAlign: "center",
    fontWeight: typography.fontWeight.semibold,
  },
  focusCard: {
    backgroundColor: colors.background.elevated,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  focusValue: {
    fontSize: typography.fontSize.huge,
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary,
    marginBottom: spacing.sm,
  },
  focusLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing.base,
    fontWeight: typography.fontWeight.semibold,
  },
  focusStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  focusStat: {
    alignItems: "center",
    marginHorizontal: 12,
  },
  focusStatValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary,
  },
  focusStatLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border.medium,
  },
  priorityCard: {
    backgroundColor: colors.background.elevated,
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  priorityDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },
  priorityLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  priorityValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  insightCard: {
    padding: 18,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  insightCardSuccess: {
    backgroundColor: colors.alerts.success,
    borderLeftColor: colors.success,
  },
  insightCardWarning: {
    backgroundColor: colors.alerts.warning,
    borderLeftColor: colors.warning,
  },
  insightCardInfo: {
    backgroundColor: colors.alerts.info,
    borderLeftColor: colors.info,
  },
  insightCardPrimary: {
    backgroundColor: colors.alerts.info,
    borderLeftColor: colors.primary,
  },
  insightIcon: {
    fontSize: 32,
    marginRight: 14,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    fontWeight: typography.fontWeight.medium,
  },
});

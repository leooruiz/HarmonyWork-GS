import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { addTask } from "../../services/taskService";
import { TaskPriority } from "../../types";
import { colors } from "../../theme/colors";

interface AddTaskScreenProps {
  navigation: any;
}

export const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: "Nova Tarefa",
      headerShown: true,
    });
  }, [navigation]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Erro", "O título é obrigatório");
      return;
    }

    setLoading(true);

    try {
      await addTask(title.trim(), description.trim(), priority);
      Alert.alert("Sucesso", "Tarefa criada com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a tarefa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
          <Input
            label="Título *"
            placeholder="Ex: Preparar apresentação"
            value={title}
            onChangeText={setTitle}
            autoFocus={true}
          />

          <Input
            label="Descrição"
            placeholder="Detalhes da tarefa (opcional)"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
            style={styles.textArea}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Prioridade</Text>
            <View style={styles.priorityButtons}>
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === "high" && styles.priorityButtonActive,
                  {
                    backgroundColor:
                      priority === "high" ? colors.priority.high : colors.background.elevated,
                    borderColor:
                      priority === "high" ? colors.priority.high : colors.border.light,
                  },
                ]}
                onPress={() => setPriority("high")}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    priority === "high" && styles.priorityButtonTextActive,
                  ]}
                >
                  🔴 Alta
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === "medium" && styles.priorityButtonActive,
                  {
                    backgroundColor:
                      priority === "medium" ? colors.priority.medium : colors.background.elevated,
                    borderColor:
                      priority === "medium" ? colors.priority.medium : colors.border.light,
                  },
                ]}
                onPress={() => setPriority("medium")}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    priority === "medium" && styles.priorityButtonTextActive,
                  ]}
                >
                  🟡 Média
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === "low" && styles.priorityButtonActive,
                  {
                    backgroundColor:
                      priority === "low" ? colors.priority.low : colors.background.elevated,
                    borderColor:
                      priority === "low" ? colors.priority.low : colors.border.light,
                  },
                ]}
                onPress={() => setPriority("low")}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    priority === "low" && styles.priorityButtonTextActive,
                  ]}
                >
                  🟢 Baixa
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              Tarefas de alta prioridade serão organizadas primeiro na sua
              agenda inteligente
            </Text>
          </View>

          <View style={styles.actions}>
            <Button
              title="Criar Tarefa"
              onPress={handleSubmit}
              loading={loading}
            />
            <View style={{ marginTop: 12 }}>
              <Button
                title="Cancelar"
                onPress={() => navigation.goBack()}
                variant="secondary"
              />
            </View>
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
    backgroundColor: colors.background.secondary,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 16,
  },
  form: {},
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: "row",
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  priorityButtonActive: {
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.primary,
  },
  priorityButtonTextActive: {
    color: colors.text.inverse,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: colors.alerts.info,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.text.primary,
    fontWeight: "500",
    lineHeight: 18,
  },
  actions: {
    marginTop: 8,
  },
});

import React, { useState } from "react";
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
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { addTask } from "../../services/taskService";
import { TaskPriority } from "../../types";

interface AddTaskScreenProps {
  navigation: any;
}

export const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [loading, setLoading] = useState(false);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Nova Tarefa</Text>
          <Text style={styles.subtitle}>
            Organize seu dia de trabalho de forma inteligente
          </Text>
        </View>

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
                  { backgroundColor: priority === "high" ? "#FF3B30" : "#FFF" },
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
                    backgroundColor: priority === "medium" ? "#FF9500" : "#FFF",
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
                  { backgroundColor: priority === "low" ? "#34C759" : "#FFF" },
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
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
    color: "#333",
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: "row",
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    marginHorizontal: 4,
    alignItems: "center",
  },
  priorityButtonActive: {
    borderColor: "transparent",
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  priorityButtonTextActive: {
    color: "#fff",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#E8F4FD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#007AFF",
  },
  actions: {
    marginTop: 8,
  },
});

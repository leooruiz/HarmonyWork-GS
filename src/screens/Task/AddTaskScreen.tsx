import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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
            autoFocus
          />

          <Input
            label="Descrição"
            placeholder="Detalhes da tarefa (opcional)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Prioridade</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={priority}
                onValueChange={(value: TaskPriority) => setPriority(value)}
                style={styles.picker}
              >
                <Picker.Item
                  label="🔴 Alta - Urgente e importante"
                  value="high"
                />
                <Picker.Item label="🟡 Média - Importante" value="medium" />
                <Picker.Item label="🟢 Baixa - Pode esperar" value="low" />
              </Picker>
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
            <Button
              title="Cancelar"
              onPress={() => navigation.goBack()}
              variant="secondary"
            />
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
  form: {
    gap: 8,
  },
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
  pickerWrapper: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  picker: {
    height: 50,
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
    gap: 12,
    marginTop: 8,
  },
});

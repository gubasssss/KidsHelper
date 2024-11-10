import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import emailjs from 'emailjs-com';



interface TaskItemProps {
  title: string;
  reward: string;
  actionLabel: string;
  onActionPress: () => void;
  completed: boolean;
  redeemed: boolean; // Adiciona a propriedade `redeemed` ao TaskItemProps

}

interface Task {
  title: string;
  reward: string;
  completed: boolean;
  redeemed: boolean; // New property to prevent duplicate redemptions

}


export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { title: 'Arrumar o quarto', reward: '25 🪙', completed: false, redeemed: false },
    { title: 'Guardar Brinquedo', reward: '50 🪙', completed: false, redeemed: false },
    { title: 'Comer Vegetais', reward: '100 🪙', completed: false, redeemed: false },
    { title: 'Passear com Cachorro', reward: '50 🪙', completed: true, redeemed: false },
    { title: 'Escovar o Dente', reward: '10 🪙', completed: true, redeemed: false },
  ]);



  const resetData = async () => {
    try {
      await AsyncStorage.clear(); // Limpa todos os dados armazenados no AsyncStorage
      console.log('Dados resetados com sucesso');
    } catch (error) {
      console.error('Erro ao limpar o AsyncStorage:', error);
    }
  };

  const [totalCoins, setTotalCoins] = useState<number>(0);


  useEffect(() => {
    loadTasks();
    loadTotalCoins();
    resetData(); // Chama a função que limpa os dados

  }, []);

  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      console.log('Tarefas carregadas:', parsedTasks); // Verifique no console
      setTasks(parsedTasks);
    }
  };
  
  const loadTotalCoins = async () => {
    const savedCoins = await AsyncStorage.getItem('totalCoins');
    if (savedCoins) {
      const parsedCoins = JSON.parse(savedCoins);
      console.log('Moedas carregadas:', parsedCoins); // Verifique no console
      setTotalCoins(parsedCoins);
    }
  };

  const saveTasks = async (updatedTasks: Task[]) => {
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const saveTotalCoins = async (coins: number) => {
    await AsyncStorage.setItem('totalCoins', JSON.stringify(coins));
  };


  const handleCompleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    if (!updatedTasks[index].completed) {  // Verifica se a tarefa não foi concluída ainda
      updatedTasks[index].completed = true; // Marca a tarefa como concluída
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };
  
  const handleRedeemTask = (reward: string, index: number) => {
    const updatedTasks = [...tasks];
    const task = updatedTasks[index];
  
    // Verifica se a tarefa está concluída e ainda não foi resgatada
    if (task.completed && !task.redeemed) {
      const rewardValue = parseInt(reward.split(" ")[0]); // Extrai a recompensa como número
      
      if (isNaN(rewardValue)) {
        console.log('Erro ao extrair valor da recompensa');
        return; // Evita erro se o valor da recompensa não for um número válido
      }
  
      const newTotalCoins = totalCoins + rewardValue; // Atualiza o total de moedas
      setTotalCoins(newTotalCoins); // Atualiza o estado das moedas
      saveTotalCoins(newTotalCoins); // Salva as moedas no AsyncStorage
  
      task.redeemed = true; // Marca a tarefa como resgatada
      updatedTasks[index] = task; // Atualiza o estado da tarefa
      setTasks(updatedTasks); // Atualiza o estado das tarefas
      saveTasks(updatedTasks); // Salva as tarefas no AsyncStorage
    } else {
      console.log(`Tarefa não pode ser resgatada. Concluída: ${task.completed}, Resgatada: ${task.redeemed}`);
    }
  };


  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
      <Link href={'/'}>
        <Image source={require('@/assets/images/kids-helper-logo.png')} style={styles.logo} />
        </Link>
        <Text style={styles.coins}>{totalCoins} 🪙</Text>
      </View>

      {/* Tarefas Pendentes */}
      <Text style={styles.sectionTitle}>Tarefas Pendentes</Text>
      <View style={styles.taskContainer}>
      {tasks
          .filter(task => !task.completed)
          .map((task, index) => (
            <TaskItem
              key={index}
              title={task.title}
              reward={task.reward}
              actionLabel="Concluir"
              onActionPress={() => handleCompleteTask(index)}
              completed={task.completed}            
              redeemed={task.redeemed}
              />
          ))}
      </View>

      {/* Tarefas Concluídas */}
      <Text style={styles.sectionTitle}>Tarefas Concluídas</Text>
      <View style={styles.taskContainer}>
      {tasks
          .filter(task => task.completed)
          .map((task, index) => (
            <TaskItem
              key={index}
              title={task.title}
              reward={task.reward}
              actionLabel="Resgatar"
              onActionPress={() => handleRedeemTask(task.reward, index)}
              completed={task.redeemed}              
               redeemed={task.redeemed}
              />
          ))}
      </View>

      {/* Botão de Voltar */}
      <Link href="/(tabs)/home" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

function TaskItem({ title, reward, actionLabel, onActionPress, completed, redeemed }: TaskItemProps) {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{title}</Text>
      <Text style={styles.reward}>{reward}</Text>
      <TouchableOpacity
        style={[styles.actionButton, (completed || redeemed) && { backgroundColor: '#BBBBBB' }]}
        onPress={onActionPress}
        disabled={completed || redeemed}
      >
        <Text style={styles.actionText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5F3',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  coins: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  taskContainer: {
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  reward: {
    fontSize: 16,
    color: '#FFD700',
    marginRight: 10,
  },
  actionButton: {
    backgroundColor: '#67C77D',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
});

function loadTasks() {
  throw new Error('Function not implemented.');
}


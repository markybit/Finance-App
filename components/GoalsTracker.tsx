import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import {
  PlusCircle,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react-native";
import { Image } from "expo-image";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  icon: string;
}

interface GoalsTrackerProps {
  goals?: Goal[];
  onAddGoal?: () => void;
  onGoalPress?: (goalId: string) => void;
}

const GoalsTracker = ({
  goals = [
    {
      id: "1",
      name: "New Car",
      targetAmount: 25000,
      currentAmount: 12500,
      deadline: "Dec 2024",
      category: "Transportation",
      icon: "🚗",
    },
    {
      id: "2",
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 8000,
      deadline: "Aug 2024",
      category: "Savings",
      icon: "🛡️",
    },
    {
      id: "3",
      name: "Vacation",
      targetAmount: 5000,
      currentAmount: 1500,
      deadline: "Jul 2025",
      category: "Travel",
      icon: "✈️",
    },
  ],
  onAddGoal = () => {},
  onGoalPress = () => {},
}: GoalsTrackerProps) => {
  const [activeTab, setActiveTab] = useState("all");

  const calculateProgress = (current: number, target: number) => {
    return Math.min(current / target, 1);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const filteredGoals =
    activeTab === "all"
      ? goals
      : goals.filter(
          (goal) => goal.category.toLowerCase() === activeTab.toLowerCase(),
        );

  return (
    <View className="bg-white p-4 rounded-xl shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Savings Goals</Text>
        <TouchableOpacity
          onPress={onAddGoal}
          className="flex-row items-center bg-blue-50 px-3 py-1 rounded-full"
        >
          <PlusCircle size={16} color="#3b82f6" />
          <Text className="text-blue-500 ml-1 font-medium">New Goal</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        <TouchableOpacity
          onPress={() => setActiveTab("all")}
          className={`mr-2 px-4 py-1 rounded-full ${activeTab === "all" ? "bg-blue-500" : "bg-gray-100"}`}
        >
          <Text
            className={activeTab === "all" ? "text-white" : "text-gray-700"}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("savings")}
          className={`mr-2 px-4 py-1 rounded-full ${activeTab === "savings" ? "bg-blue-500" : "bg-gray-100"}`}
        >
          <Text
            className={activeTab === "savings" ? "text-white" : "text-gray-700"}
          >
            Savings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("travel")}
          className={`mr-2 px-4 py-1 rounded-full ${activeTab === "travel" ? "bg-blue-500" : "bg-gray-100"}`}
        >
          <Text
            className={activeTab === "travel" ? "text-white" : "text-gray-700"}
          >
            Travel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("transportation")}
          className={`mr-2 px-4 py-1 rounded-full ${activeTab === "transportation" ? "bg-blue-500" : "bg-gray-100"}`}
        >
          <Text
            className={
              activeTab === "transportation" ? "text-white" : "text-gray-700"
            }
          >
            Transportation
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: 180 }}
      >
        {filteredGoals.length > 0 ? (
          filteredGoals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              onPress={() => onGoalPress(goal.id)}
              className="bg-gray-50 p-3 rounded-lg mb-3"
            >
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-2">{goal.icon}</Text>
                  <Text className="font-medium">{goal.name}</Text>
                </View>
                <View className="flex-row items-center">
                  <Calendar size={14} color="#6b7280" />
                  <Text className="text-gray-500 text-xs ml-1">
                    {goal.deadline}
                  </Text>
                </View>
              </View>

              <View className="bg-gray-200 h-2 rounded-full my-2">
                <View
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${calculateProgress(goal.currentAmount, goal.targetAmount) * 100}%`,
                  }}
                />
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 text-xs">
                  {formatCurrency(goal.currentAmount)} of{" "}
                  {formatCurrency(goal.targetAmount)}
                </Text>
                <Text className="text-blue-500 font-medium">
                  {Math.round(
                    calculateProgress(goal.currentAmount, goal.targetAmount) *
                      100,
                  )}
                  %
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="items-center justify-center py-8">
            <Image
              source="https://api.dicebear.com/7.x/avataaars/svg?seed=savings"
              style={{ width: 60, height: 60 }}
              className="mb-3"
            />
            <Text className="text-gray-400 text-center">
              No goals in this category
            </Text>
          </View>
        )}
      </ScrollView>

      <View className="mt-3 bg-blue-50 p-3 rounded-lg flex-row items-center">
        <TrendingUp size={18} color="#3b82f6" />
        <Text className="text-blue-700 ml-2 flex-1 text-sm">
          You're on track to reach your Emergency Fund goal 2 weeks early!
        </Text>
      </View>
    </View>
  );
};

export default GoalsTracker;

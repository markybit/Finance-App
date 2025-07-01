import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Lightbulb,
  PiggyBank,
} from "lucide-react-native";
import { Image } from "expo-image";

interface InsightCardProps {
  title: string;
  description: string;
  type: "saving" | "spending" | "alert" | "tip";
  actionText?: string;
  onAction?: () => void;
}

const InsightCard = ({
  title = "Insight Title",
  description = "This is a placeholder description for the insight card.",
  type = "tip",
  actionText = "Take Action",
  onAction = () => console.log("Action clicked"),
}: InsightCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "saving":
        return <PiggyBank size={24} color="#10b981" />;
      case "spending":
        return <TrendingDown size={24} color="#ef4444" />;
      case "alert":
        return <AlertCircle size={24} color="#f59e0b" />;
      case "tip":
      default:
        return <Lightbulb size={24} color="#3b82f6" />;
    }
  };

  const getCardStyle = () => {
    switch (type) {
      case "saving":
        return "bg-emerald-50 border-emerald-200";
      case "spending":
        return "bg-red-50 border-red-200";
      case "alert":
        return "bg-amber-50 border-amber-200";
      case "tip":
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <View className={`p-4 rounded-xl mb-3 border ${getCardStyle()}`}>
      <View className="flex-row items-center mb-2">
        {getIcon()}
        <Text className="ml-2 font-bold text-gray-800 text-lg">{title}</Text>
      </View>
      <Text className="text-gray-600 mb-3">{description}</Text>
      <TouchableOpacity onPress={onAction} className="flex-row items-center">
        <Text className="font-medium text-blue-600">{actionText}</Text>
        <ArrowRight size={16} color="#2563eb" className="ml-1" />
      </TouchableOpacity>
    </View>
  );
};

interface InsightsPanelProps {
  insights?: InsightCardProps[];
  isLoading?: boolean;
}

const InsightsPanel = ({
  insights = [
    {
      title: "Subscription Savings",
      description:
        "You could save $24.99/month by canceling unused streaming services. We detected 3 services with no activity in 30+ days.",
      type: "saving",
      actionText: "Review Subscriptions",
    },
    {
      title: "Unusual Spending",
      description:
        "Your dining expenses are 45% higher than last month. Consider setting a budget for this category.",
      type: "spending",
      actionText: "Set Budget",
    },
    {
      title: "Investment Opportunity",
      description:
        "Based on your risk profile, consider allocating 5% of savings to index funds for better returns.",
      type: "tip",
      actionText: "Learn More",
    },
    {
      title: "Bill Due Soon",
      description:
        "Your electricity bill ($78.50) is due in 3 days. Ensure sufficient funds in your account.",
      type: "alert",
      actionText: "Schedule Payment",
    },
  ],
  isLoading = false,
}: InsightsPanelProps) => {
  if (isLoading) {
    return (
      <View className="bg-white p-4 rounded-xl shadow-sm">
        <Text className="text-xl font-bold mb-4 text-gray-800">
          AI Insights
        </Text>
        <View className="items-center justify-center py-8">
          <Text className="text-gray-500">Loading insights...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-white p-4 rounded-xl shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-800">AI Insights</Text>
        <View className="flex-row items-center">
          <Image
            source={{
              uri: "https://api.dicebear.com/7.x/bottts/svg?seed=finance",
            }}
            style={{ width: 24, height: 24 }}
            className="rounded-full"
          />
          <Text className="ml-2 text-blue-600 font-medium">Powered by AI</Text>
        </View>
      </View>

      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        className="max-h-[180px]"
      >
        {insights.map((insight, index) => (
          <InsightCard
            key={index}
            title={insight.title}
            description={insight.description}
            type={insight.type}
            actionText={insight.actionText}
            onAction={insight.onAction}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default InsightsPanel;

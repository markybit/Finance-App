import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  PieChart,
} from "lucide-react-native";
import { Image } from "expo-image";

interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface SavingsOpportunity {
  title: string;
  description: string;
  potentialSavings: number;
}

interface BillAlert {
  name: string;
  amount: number;
  dueDate: string;
  isPriority: boolean;
}

interface SmartOverviewProps {
  totalBalance?: number;
  monthlySpending?: number;
  spendingCategories?: SpendingCategory[];
  savingsOpportunities?: SavingsOpportunity[];
  billAlerts?: BillAlert[];
}

const SmartOverview = ({
  totalBalance = 12450.75,
  monthlySpending = 3245.5,
  spendingCategories = [
    { category: "Housing", amount: 1200, percentage: 37, color: "#4C51BF" },
    { category: "Food", amount: 650, percentage: 20, color: "#38B2AC" },
    { category: "Transport", amount: 450, percentage: 14, color: "#ED8936" },
    {
      category: "Entertainment",
      amount: 350,
      percentage: 11,
      color: "#9F7AEA",
    },
    { category: "Other", amount: 595.5, percentage: 18, color: "#F56565" },
  ],
  savingsOpportunities = [
    {
      title: "Subscription Optimization",
      description: "Cancel unused streaming services",
      potentialSavings: 24.99,
    },
    {
      title: "Dining Out Reduction",
      description: "Cook at home 2 more days per week",
      potentialSavings: 120,
    },
  ],
  billAlerts = [
    {
      name: "Rent",
      amount: 1200,
      dueDate: "2023-06-01",
      isPriority: true,
    },
    {
      name: "Electricity",
      amount: 85.75,
      dueDate: "2023-05-28",
      isPriority: false,
    },
  ],
}: SmartOverviewProps) => {
  // Mock chart component - in a real app, you'd use a charting library
  const SpendingChart = () => (
    <View className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
      {spendingCategories.map((category, index) => {
        // This is a simplified representation - a real chart would calculate proper segments
        const rotation = index * (360 / spendingCategories.length);
        return (
          <View
            key={category.category}
            className="absolute w-8 h-8"
            style={{
              backgroundColor: category.color,
              transform: [{ rotate: `${rotation}deg` }],
              top: 0,
              left: 4,
            }}
          />
        );
      })}
    </View>
  );

  return (
    <View className="bg-white p-4 rounded-xl shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-800">
          Financial Overview
        </Text>
        <TouchableOpacity className="bg-blue-50 p-2 rounded-full">
          <TrendingUp size={18} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Balance and Spending */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-gray-500 text-sm">Total Balance</Text>
          <Text className="text-2xl font-bold text-gray-900">
            ${totalBalance.toLocaleString()}
          </Text>
        </View>
        <View>
          <Text className="text-gray-500 text-sm">Monthly Spending</Text>
          <Text className="text-xl font-bold text-gray-700">
            ${monthlySpending.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Spending Breakdown */}
      <View className="mb-6">
        <Text className="text-gray-700 font-semibold mb-2">
          Spending Breakdown
        </Text>
        <View className="flex-row items-center">
          <SpendingChart />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="ml-4"
          >
            {spendingCategories.map((category) => (
              <View
                key={category.category}
                className="mr-3 bg-gray-50 p-2 rounded-lg"
                style={{ borderLeftWidth: 3, borderLeftColor: category.color }}
              >
                <Text className="text-xs text-gray-600">
                  {category.category}
                </Text>
                <Text className="font-semibold">${category.amount}</Text>
                <Text className="text-xs text-gray-500">
                  {category.percentage}%
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* AI Savings Opportunities */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-700 font-semibold">
            AI Savings Opportunities
          </Text>
          <TouchableOpacity>
            <Text className="text-blue-500 text-xs">View All</Text>
          </TouchableOpacity>
        </View>
        {savingsOpportunities.map((opportunity, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between bg-blue-50 p-3 rounded-lg mb-2"
          >
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full mr-3">
                <PieChart size={16} color="#3B82F6" />
              </View>
              <View>
                <Text className="font-medium text-gray-800">
                  {opportunity.title}
                </Text>
                <Text className="text-xs text-gray-600">
                  {opportunity.description}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Text className="text-green-600 font-semibold mr-1">
                ${opportunity.potentialSavings}
              </Text>
              <ArrowUpRight size={14} color="#059669" />
            </View>
          </View>
        ))}
      </View>

      {/* Upcoming Bill Alerts */}
      <View>
        <Text className="text-gray-700 font-semibold mb-2">Upcoming Bills</Text>
        {billAlerts.map((bill, index) => {
          const dueDate = new Date(bill.dueDate);
          const formattedDate = dueDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <View
              key={index}
              className={`flex-row items-center justify-between p-3 rounded-lg mb-2 ${bill.isPriority ? "bg-red-50" : "bg-gray-50"}`}
            >
              <View className="flex-row items-center">
                {bill.isPriority && (
                  <View className="bg-red-100 p-1 rounded-full mr-2">
                    <AlertCircle size={14} color="#EF4444" />
                  </View>
                )}
                <Text className="font-medium text-gray-800">{bill.name}</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-700 mr-3">${bill.amount}</Text>
                <View
                  className={`px-2 py-1 rounded ${bill.isPriority ? "bg-red-100" : "bg-gray-200"}`}
                >
                  <Text
                    className={`text-xs ${bill.isPriority ? "text-red-600" : "text-gray-600"}`}
                  >
                    {formattedDate}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SmartOverview;

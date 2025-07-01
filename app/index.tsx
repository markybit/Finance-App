import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { ArrowRight, Bell, Settings } from "lucide-react-native";
import SmartOverview from "../components/SmartOverview";
import AssetTracker from "../components/AssetTracker";
import InsightsPanel from "../components/InsightsPanel";
import GoalsTracker from "../components/GoalsTracker";

export default function Dashboard() {
  // Mock user data
  const user = {
    name: "Alex",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar style="auto" />

      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-2 pb-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-blue-500 mr-3 overflow-hidden">
            {/* User profile image would go here */}
          </View>
          <View>
            <Text className="text-gray-500 text-sm">Welcome back,</Text>
            <Text className="text-xl font-bold">{user.name}</Text>
          </View>
        </View>
        <View className="flex-row">
          <TouchableOpacity className="p-2 mr-2">
            <Bell size={24} color="#4b5563" />
            <View className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Settings size={24} color="#4b5563" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Smart Overview Section */}
        <View className="px-4 mb-6">
          <SmartOverview />
        </View>

        {/* Asset Tracker Section */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold">Your Assets</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-500 mr-1">View All</Text>
              <ArrowRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          <AssetTracker />
        </View>

        {/* AI Insights Section */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold">AI Insights</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-500 mr-1">More</Text>
              <ArrowRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          <InsightsPanel />
        </View>

        {/* Goals Section */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold">Your Goals</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-500 mr-1">Manage</Text>
              <ArrowRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          <GoalsTracker />
        </View>

        {/* Income Streams Section - Placeholder */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold">Income Streams</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-500 mr-1">View All</Text>
              <ArrowRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-center text-gray-400 py-8">
              Income streams tracking coming soon
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

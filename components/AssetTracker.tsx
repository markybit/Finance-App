import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  Plus,
  ChevronRight,
} from "lucide-react-native";
import { Image } from "expo-image";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change: number;
  icon?: string;
}

interface AssetTrackerProps {
  traditionalAssets?: Asset[];
  cryptoAssets?: Asset[];
  onAddAsset?: (type: "traditional" | "crypto") => void;
  onAssetPress?: (asset: Asset) => void;
}

const AssetTracker = ({
  traditionalAssets = [
    {
      id: "1",
      name: "Checking Account",
      symbol: "USD",
      amount: 5280.42,
      value: 5280.42,
      change: 0,
    },
    {
      id: "2",
      name: "Savings Account",
      symbol: "USD",
      amount: 12750.89,
      value: 12750.89,
      change: 0.02,
    },
    {
      id: "3",
      name: "Investment Portfolio",
      symbol: "USD",
      amount: 28450.65,
      value: 28450.65,
      change: 1.25,
    },
  ],
  cryptoAssets = [
    {
      id: "4",
      name: "Bitcoin",
      symbol: "BTC",
      amount: 0.42,
      value: 16800,
      change: 2.3,
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=BTC",
    },
    {
      id: "5",
      name: "Ethereum",
      symbol: "ETH",
      amount: 3.75,
      value: 6750,
      change: -1.2,
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=ETH",
    },
    {
      id: "6",
      name: "Solana",
      symbol: "SOL",
      amount: 45.2,
      value: 3240,
      change: 5.7,
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=SOL",
    },
  ],
  onAddAsset = () => {},
  onAssetPress = () => {},
}: AssetTrackerProps) => {
  const [activeTab, setActiveTab] = useState<"traditional" | "crypto">(
    "traditional",
  );

  const totalTraditionalValue = traditionalAssets.reduce(
    (sum, asset) => sum + asset.value,
    0,
  );
  const totalCryptoValue = cryptoAssets.reduce(
    (sum, asset) => sum + asset.value,
    0,
  );

  const currentAssets =
    activeTab === "traditional" ? traditionalAssets : cryptoAssets;
  const currentTotal =
    activeTab === "traditional" ? totalTraditionalValue : totalCryptoValue;

  return (
    <View className="bg-white p-4 rounded-xl shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold">Asset Tracker</Text>
        <View className="flex-row items-center">
          <PieChart size={18} color="#6366f1" />
          <Text className="ml-1 text-sm text-gray-600">Portfolio</Text>
        </View>
      </View>

      {/* Tab Selector */}
      <View className="flex-row mb-4 bg-gray-100 rounded-lg p-1">
        <TouchableOpacity
          className={`flex-1 py-2 rounded-md ${activeTab === "traditional" ? "bg-white shadow-sm" : ""}`}
          onPress={() => setActiveTab("traditional")}
        >
          <Text
            className={`text-center ${activeTab === "traditional" ? "text-indigo-600 font-medium" : "text-gray-500"}`}
          >
            Traditional
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 rounded-md ${activeTab === "crypto" ? "bg-white shadow-sm" : ""}`}
          onPress={() => setActiveTab("crypto")}
        >
          <Text
            className={`text-center ${activeTab === "crypto" ? "text-indigo-600 font-medium" : "text-gray-500"}`}
          >
            Crypto
          </Text>
        </TouchableOpacity>
      </View>

      {/* Total Value */}
      <View className="mb-4 p-3 bg-gray-50 rounded-lg">
        <Text className="text-sm text-gray-500">
          Total {activeTab === "traditional" ? "Traditional" : "Crypto"} Value
        </Text>
        <Text className="text-xl font-bold">
          ${currentTotal.toLocaleString()}
        </Text>
      </View>

      {/* Asset List */}
      <ScrollView className="max-h-24">
        {currentAssets.map((asset) => (
          <TouchableOpacity
            key={asset.id}
            className="flex-row justify-between items-center py-3 border-b border-gray-100"
            onPress={() => onAssetPress(asset)}
          >
            <View className="flex-row items-center">
              {asset.icon ? (
                <Image
                  source={{ uri: asset.icon }}
                  className="w-8 h-8 rounded-full bg-gray-200"
                />
              ) : (
                <View className="w-8 h-8 rounded-full bg-indigo-100 items-center justify-center">
                  <Text className="text-xs font-medium text-indigo-600">
                    {asset.symbol.substring(0, 2)}
                  </Text>
                </View>
              )}
              <View className="ml-3">
                <Text className="font-medium">{asset.name}</Text>
                <Text className="text-xs text-gray-500">
                  {asset.amount} {asset.symbol}
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="font-medium">
                ${asset.value.toLocaleString()}
              </Text>
              <View className="flex-row items-center">
                {asset.change > 0 ? (
                  <TrendingUp size={12} color="#10b981" />
                ) : asset.change < 0 ? (
                  <TrendingDown size={12} color="#ef4444" />
                ) : null}
                <Text
                  className={`text-xs ml-1 ${asset.change > 0 ? "text-green-500" : asset.change < 0 ? "text-red-500" : "text-gray-500"}`}
                >
                  {asset.change > 0 ? "+" : ""}
                  {asset.change}%
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Actions */}
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="flex-row items-center bg-indigo-50 px-4 py-2 rounded-lg"
          onPress={() => onAddAsset(activeTab)}
        >
          <Plus size={16} color="#6366f1" />
          <Text className="ml-1 text-indigo-600 font-medium">
            Add {activeTab === "traditional" ? "Account" : "Crypto"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-gray-500 mr-1">View All</Text>
          <ChevronRight size={16} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssetTracker;

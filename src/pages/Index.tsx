"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BookOpen,
  TrendingUp,
  Phone,
  MessageCircle,
  Calendar
} from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import FinancialDashboard from "@/components/FinancialDashboard";
import BudgetManager from "@/components/BudgetManager";
import BillReminder from "@/components/BillReminder";
import LearningHub from "@/components/LearningHub";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [budget, setBudget] = useState({
    income: 5000,
    expenses: 3200,
    savings: 1800
  });
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Hostel Rent", amount: -2500, category: "Housing", date: "2023-06-01" },
    { id: 2, title: "Textbooks", amount: -800, category: "Education", date: "2023-06-05" },
    { id: 3, title: "Part-time Job", amount: 3000, category: "Income", date: "2023-06-10" },
    { id: 4, title: "Groceries", amount: -600, category: "Food", date: "2023-06-12" },
    { id: 5, title: "Coffee", amount: -50, category: "Food", date: "2023-06-15" },
  ]);
  const [upcomingBills, setUpcomingBills] = useState([
    { id: 1, title: "Internet Bill", amount: 300, dueDate: "2023-06-25", daysLeft: 7 },
    { id: 2, title: "Phone Bill", amount: 200, dueDate: "2023-06-28", daysLeft: 10 },
  ]);
  const [savingsGoal, setSavingsGoal] = useState(5000);
  const [currentSavings, setCurrentSavings] = useState(1800);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Student Finance Manager
            </h1>
            <p className="text-gray-600 mt-3 text-lg">
              Take control of your finances with our all-in-one platform
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-3">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-3 text-lg shadow-lg flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white p-3 text-lg shadow-lg flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-indigo-100 to-purple-100 p-1 rounded-xl">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-3 text-lg font-bold"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="budget" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg py-3 text-lg font-bold"
            >
              Budget
            </TabsTrigger>
            <TabsTrigger 
              value="bills" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg py-3 text-lg font-bold"
            >
              Bills & Reminders
            </TabsTrigger>
            <TabsTrigger 
              value="learn" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg py-3 text-lg font-bold"
            >
              Learn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8">
            <FinancialDashboard 
              budget={budget}
              transactions={transactions}
              upcomingBills={upcomingBills}
              savingsGoal={savingsGoal}
              currentSavings={currentSavings}
            />
          </TabsContent>

          <TabsContent value="budget" className="mt-8">
            <BudgetManager 
              transactions={transactions}
              setTransactions={setTransactions}
              budget={budget}
              setBudget={setBudget}
            />
          </TabsContent>

          <TabsContent value="bills" className="mt-8">
            <BillReminder 
              upcomingBills={upcomingBills}
            />
          </TabsContent>

          <TabsContent value="learn" className="mt-8">
            <LearningHub />
          </TabsContent>
        </Tabs>
        
        <div className="mt-12">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Index;
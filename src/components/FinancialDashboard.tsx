"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Users, 
  Bell,
  Plus,
  PiggyBank,
  CreditCard,
  ShoppingCart,
  GraduationCap
} from "lucide-react";

interface FinancialDashboardProps {
  budget: {
    income: number;
    expenses: number;
    savings: number;
  };
  transactions: Array<{
    id: number;
    title: string;
    amount: number;
    category: string;
    date: string;
  }>;
  upcomingBills: Array<{
    id: number;
    title: string;
    amount: number;
    dueDate: string;
    daysLeft: number;
  }>;
  savingsGoal: number;
  currentSavings: number;
}

const FinancialDashboard = ({
  budget,
  transactions,
  upcomingBills,
  savingsGoal,
  currentSavings
}: FinancialDashboardProps) => {
  const categories = [
    { name: "Food", icon: ShoppingCart, color: "bg-pink-500", bgColor: "bg-pink-100" },
    { name: "Housing", icon: GraduationCap, color: "bg-blue-500", bgColor: "bg-blue-100" },
    { name: "Education", icon: BookOpen, color: "bg-purple-500", bgColor: "bg-purple-100" },
    { name: "Entertainment", icon: Users, color: "bg-yellow-500", bgColor: "bg-yellow-100" },
    { name: "Income", icon: CreditCard, color: "bg-green-500", bgColor: "bg-green-100" },
  ];

  const savingsProgress = Math.min(100, (currentSavings / savingsGoal) * 100);

  const handleAddTransaction = () => {
    alert("Add new transaction functionality would go here");
  };

  const handleSetBudgetLimits = () => {
    alert("Set budget limits functionality would go here");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
          <Wallet className="h-6 w-6 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">₹{budget.income.toLocaleString()}</div>
          <p className="text-sm text-green-100">+12% from last month</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-rose-400 to-red-500 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ShoppingCart className="h-6 w-6 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">₹{budget.expenses.toLocaleString()}</div>
          <p className="text-sm text-rose-100">+5% from last month</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
          <PiggyBank className="h-6 w-6 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">₹{budget.savings.toLocaleString()}</div>
          <p className="text-sm text-blue-100">Goal: ₹{savingsGoal.toLocaleString()}</p>
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Recent Transactions</CardTitle>
              <Button onClick={handleAddTransaction} className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full ${categories.find(c => c.name === transaction.category)?.bgColor || 'bg-gray-200'} flex items-center justify-center mr-4`}>
                      {(() => {
                        const IconComponent = categories.find(c => c.name === transaction.category)?.icon || ShoppingCart;
                        return <IconComponent className={`h-6 w-6 ${categories.find(c => c.name === transaction.category)?.color || 'text-gray-500'}`} />;
                      })()}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.title}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Upcoming Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-amber-50 to-orange-50">
                  <div>
                    <p className="font-bold">{bill.title}</p>
                    <p className="text-sm text-gray-600">Due: {bill.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{bill.amount.toLocaleString()}</p>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                      bill.daysLeft <= 3 
                        ? 'bg-red-100 text-red-800' 
                        : bill.daysLeft <= 7
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {bill.daysLeft} days left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Savings Goal</CardTitle>
              <Button onClick={handleSetBudgetLimits} className="text-sm">
                Set Limits
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">₹{currentSavings.toLocaleString()}</span>
                  <span className="font-medium">₹{savingsGoal.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full" 
                    style={{ width: `${savingsProgress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-center font-bold text-lg text-blue-600">
                {savingsProgress.toFixed(1)}% Complete
              </p>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  You're making great progress towards your goal!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialDashboard;
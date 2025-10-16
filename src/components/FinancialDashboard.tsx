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
    { name: "Food", icon: ShoppingCart, color: "bg-blue-500" },
    { name: "Housing", icon: GraduationCap, color: "bg-green-500" },
    { name: "Education", icon: BookOpen, color: "bg-purple-500" },
    { name: "Entertainment", icon: Users, color: "bg-yellow-500" },
    { name: "Income", icon: CreditCard, color: "bg-teal-500" },
  ];

  const savingsProgress = Math.min(100, (currentSavings / savingsGoal) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{budget.income.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{budget.expenses.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{budget.savings.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Goal: ₹{savingsGoal.toLocaleString()}</p>
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${categories.find(c => c.name === transaction.category)?.color || 'bg-gray-200'} flex items-center justify-center mr-3`}>
                      {(() => {
                        const IconComponent = categories.find(c => c.name === transaction.category)?.icon || ShoppingCart;
                        return <IconComponent className="h-5 w-5 text-white" />;
                      })()}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.title}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{bill.title}</p>
                    <p className="text-sm text-gray-500">Due: {bill.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{bill.amount.toLocaleString()}</p>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      bill.daysLeft <= 3 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {bill.daysLeft} days left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Savings Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>₹{currentSavings.toLocaleString()}</span>
                  <span>₹{savingsGoal.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${savingsProgress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                You're {savingsProgress.toFixed(1)}% towards your goal of ₹{savingsGoal.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialDashboard;
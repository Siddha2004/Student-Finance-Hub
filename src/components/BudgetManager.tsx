"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  ShoppingCart, 
  GraduationCap, 
  BookOpen, 
  Users, 
  CreditCard,
  TrendingUp
} from "lucide-react";

interface BudgetManagerProps {
  transactions: Array<{
    id: number;
    title: string;
    amount: number;
    category: string;
    date: string;
  }>;
  setTransactions: (transactions: any[]) => void;
  budget: {
    income: number;
    expenses: number;
    savings: number;
  };
  setBudget: (budget: any) => void;
}

const BudgetManager = ({
  transactions,
  setTransactions,
  budget,
  setBudget
}: BudgetManagerProps) => {
  const [newTransaction, setNewTransaction] = useState({ 
    title: "", 
    amount: "", 
    category: "Food" 
  });

  const categories = [
    { name: "Food", icon: ShoppingCart, color: "bg-pink-500", bgColor: "bg-pink-100" },
    { name: "Housing", icon: GraduationCap, color: "bg-blue-500", bgColor: "bg-blue-100" },
    { name: "Education", icon: BookOpen, color: "bg-purple-500", bgColor: "bg-purple-100" },
    { name: "Entertainment", icon: Users, color: "bg-yellow-500", bgColor: "bg-yellow-100" },
    { name: "Income", icon: CreditCard, color: "bg-green-500", bgColor: "bg-green-100" },
  ];

  const financialTips = [
    "Set aside 20% of your income for savings before spending on anything else",
    "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
    "Track every expense for at least a month to understand your spending habits",
    "Create separate accounts for different financial goals"
  ];

  const handleAddTransaction = () => {
    if (newTransaction.title && newTransaction.amount) {
      const transaction = {
        id: transactions.length + 1,
        title: newTransaction.title,
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        date: new Date().toISOString().split('T')[0]
      };
      
      setTransactions([transaction, ...transactions]);
      setNewTransaction({ title: "", amount: "", category: "Food" });
      
      // Update budget
      if (transaction.amount > 0) {
        setBudget((prev: any) => ({
          ...prev,
          income: prev.income + transaction.amount
        }));
      } else {
        setBudget((prev: any) => ({
          ...prev,
          expenses: prev.expenses - transaction.amount
        }));
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <CardTitle className="text-xl">Add New Transaction</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-lg font-medium">Description</Label>
                <Input
                  id="title"
                  className="p-3 text-lg"
                  value={newTransaction.title}
                  onChange={(e) => setNewTransaction({...newTransaction, title: e.target.value})}
                  placeholder="e.g. Groceries, Rent"
                />
              </div>
              <div>
                <Label htmlFor="amount" className="text-lg font-medium">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  className="p-3 text-lg"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  placeholder="e.g. 500"
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-lg font-medium">Category</Label>
                <select
                  id="category"
                  className="w-full p-3 border rounded-md text-lg"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                >
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddTransaction} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-3 text-lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Transaction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white">
            <CardTitle className="text-xl">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {categories.filter(c => c.name !== "Income").map((category) => {
                const categoryTotal = transactions
                  .filter(t => t.category === category.name && t.amount < 0)
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0);
                
                const percentage = budget.expenses > 0 ? (categoryTotal / budget.expenses) * 100 : 0;
                
                return (
                  <div key={category.name} className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex justify-between text-lg font-bold mb-2">
                      <span className="flex items-center">
                        <div className={`w-10 h-10 rounded-full ${category.bgColor} flex items-center justify-center mr-3`}>
                          <category.icon className={`h-5 w-5 ${category.color}`} />
                        </div>
                        {category.name}
                      </span>
                      <span>₹{categoryTotal.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`${category.color} h-4 rounded-full`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardTitle className="text-xl">Financial Tips</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {financialTips.map((tip, index) => (
                <li key={index} className="flex items-start p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50">
                  <div className="bg-amber-100 rounded-full p-2 mt-0.5 mr-3">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="text-lg">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mt-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
            <CardTitle className="text-xl">Set Budget Limits</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {categories.filter(c => c.name !== "Income").map((category) => (
                <div key={category.name} className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold">{category.name}</span>
                    <span>₹0 / ₹0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-400 h-3 rounded-full w-0"></div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white p-3 text-lg">
              Set Budget Limits
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetManager;
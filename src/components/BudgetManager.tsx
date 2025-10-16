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
    { name: "Food", icon: ShoppingCart, color: "bg-blue-500" },
    { name: "Housing", icon: GraduationCap, color: "bg-green-500" },
    { name: "Education", icon: BookOpen, color: "bg-purple-500" },
    { name: "Entertainment", icon: Users, color: "bg-yellow-500" },
    { name: "Income", icon: CreditCard, color: "bg-teal-500" },
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
        <Card>
          <CardHeader>
            <CardTitle>Add New Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Description</Label>
                <Input
                  id="title"
                  value={newTransaction.title}
                  onChange={(e) => setNewTransaction({...newTransaction, title: e.target.value})}
                  placeholder="e.g. Groceries, Rent"
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  placeholder="e.g. 500"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full p-2 border rounded-md"
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
                <Button onClick={handleAddTransaction} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.filter(c => c.name !== "Income").map((category) => {
                const categoryTotal = transactions
                  .filter(t => t.category === category.name && t.amount < 0)
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0);
                
                const percentage = budget.expenses > 0 ? (categoryTotal / budget.expenses) * 100 : 0;
                
                return (
                  <div key={category.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                        {category.name}
                      </span>
                      <span>₹{categoryTotal.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${category.color} h-2 rounded-full`} 
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
        <Card>
          <CardHeader>
            <CardTitle>Financial Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {financialTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-0.5 mr-2">
                    <TrendingUp className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Set Budget Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.filter(c => c.name !== "Income").map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category.name}</span>
                    <span>₹0 / ₹0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full w-0"></div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">Set Budget Limits</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetManager;
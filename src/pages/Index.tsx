"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { MadeWithDyad } from "@/components/made-with-dyad";

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
  const [newTransaction, setNewTransaction] = useState({ title: "", amount: "", category: "Food" });
  const [savingsGoal, setSavingsGoal] = useState(5000);
  const [currentSavings, setCurrentSavings] = useState(1800);

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
        setBudget(prev => ({
          ...prev,
          income: prev.income + transaction.amount
        }));
      } else {
        setBudget(prev => ({
          ...prev,
          expenses: prev.expenses - transaction.amount
        }));
      }
    }
  };

  const savingsProgress = Math.min(100, (currentSavings / savingsGoal) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Finance Manager</h1>
            <p className="text-gray-600 mt-2">Take control of your finances with our all-in-one platform</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Users className="mr-2 h-4 w-4" />
              Connect with Advisor
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="bills">Bills & Reminders</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
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
                            <Badge variant={bill.daysLeft <= 3 ? "destructive" : "secondary"}>
                              {bill.daysLeft} days left
                            </Badge>
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
          </TabsContent>

          <TabsContent value="budget" className="mt-6">
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
          </TabsContent>

          <TabsContent value="bills" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        Upcoming Bills & Reminders
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingBills.map((bill) => (
                        <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-lg mr-4">
                              <Bell className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{bill.title}</p>
                              <p className="text-sm text-gray-500">Due: {bill.dueDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{bill.amount.toLocaleString()}</p>
                            <Badge variant={bill.daysLeft <= 3 ? "destructive" : "secondary"}>
                              {bill.daysLeft} days left
                            </Badge>
                          </div>
                        </div>
                      ))}
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-2 rounded-lg mr-4">
                            <Plus className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Add New Bill</p>
                            <p className="text-sm text-gray-500">Set up a new recurring payment</p>
                          </div>
                        </div>
                        <Button variant="outline">Add</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Bill Reminders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <Button variant="outline" size="sm">On</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>SMS Alerts</span>
                        <Button variant="outline" size="sm">On</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Push Notifications</span>
                        <Button variant="outline" size="sm">On</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Internet Bill</span>
                        <span className="text-green-600">Paid</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone Bill</span>
                        <span className="text-green-600">Paid</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hostel Rent</span>
                        <span className="text-green-600">Paid</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="learn" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Financial Education Hub
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">Budgeting Basics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Learn how to create and stick to a budget that works for your student life.
                          </p>
                          <Button variant="outline" size="sm">Start Learning</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">Saving Strategies</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Discover practical ways to save money even on a student budget.
                          </p>
                          <Button variant="outline" size="sm">Start Learning</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">Investing 101</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Understand the basics of investing and how to start with small amounts.
                          </p>
                          <Button variant="outline" size="sm">Start Learning</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">Credit Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Learn about credit scores, loans, and responsible borrowing.
                          </p>
                          <Button variant="outline" size="sm">Start Learning</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Advisor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                      <h3 className="font-medium">Connect with an Advisor</h3>
                      <p className="text-sm text-gray-600 mt-1 mb-4">
                        Get personalized financial advice from our certified advisors.
                      </p>
                      <Button className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Schedule Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Quick Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {financialTips.slice(0, 3).map((tip, index) => (
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
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;
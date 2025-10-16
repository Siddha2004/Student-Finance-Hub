"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users,
  TrendingUp
} from "lucide-react";

const LearningHub = () => {
  const financialTips = [
    "Set aside 20% of your income for savings before spending on anything else",
    "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
    "Track every expense for at least a month to understand your spending habits",
    "Create separate accounts for different financial goals"
  ];

  const learningModules = [
    {
      title: "Budgeting Basics",
      description: "Learn how to create and stick to a budget that works for your student life.",
      color: "from-amber-400 to-orange-500",
      icon: "💰"
    },
    {
      title: "Saving Strategies",
      description: "Discover practical ways to save money even on a student budget.",
      color: "from-emerald-400 to-green-500",
      icon: "🐷"
    },
    {
      title: "Investing 101",
      description: "Understand the basics of investing and how to start with small amounts.",
      color: "from-blue-400 to-indigo-500",
      icon: "📈"
    },
    {
      title: "Credit Management",
      description: "Learn about credit scores, loans, and responsible borrowing.",
      color: "from-purple-400 to-pink-500",
      icon: "💳"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <CardTitle className="text-xl flex items-center">
              <BookOpen className="mr-2 h-6 w-6" />
              Financial Education Hub
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {learningModules.map((module, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
                  <div className={`h-2 rounded-t-lg bg-gradient-to-r ${module.color}`}></div>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <span className="text-2xl mr-2">{module.icon}</span>
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {module.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className={`w-full bg-gradient-to-r ${module.color} text-white border-0 hover:opacity-90`}
                    >
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
            <CardTitle className="text-xl">Financial Advisor</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <div className="bg-gradient-to-r from-cyan-100 to-blue-100 border-2 border-dashed border-cyan-300 rounded-full w-24 h-24 mx-auto mb-5 flex items-center justify-center">
                <Users className="h-12 w-12 text-cyan-600" />
              </div>
              <h3 className="font-bold text-xl">Connect with an Advisor</h3>
              <p className="text-gray-600 mt-2 mb-6">
                Get personalized financial advice from our certified advisors.
              </p>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white p-3 text-lg">
                <Users className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardTitle className="text-xl">Quick Tips</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {financialTips.slice(0, 3).map((tip, index) => (
                <li key={index} className="flex items-start p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50">
                  <div className="bg-amber-100 rounded-full p-2 mt-0.5 mr-3">
                    <TrendingUp className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="text-lg">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningHub;
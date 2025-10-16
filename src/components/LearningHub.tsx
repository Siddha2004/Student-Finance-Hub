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

  return (
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
  );
};

export default LearningHub;
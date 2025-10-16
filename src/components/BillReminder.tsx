"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Bell,
  Plus
} from "lucide-react";

interface BillReminderProps {
  upcomingBills: Array<{
    id: number;
    title: string;
    amount: number;
    dueDate: string;
    daysLeft: number;
  }>;
}

const BillReminder = ({ upcomingBills }: BillReminderProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardTitle className="text-xl flex items-center">
              <Calendar className="mr-2 h-6 w-6" />
              Upcoming Bills & Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {upcomingBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-5 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Bell className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{bill.title}</p>
                      <p className="text-gray-600">Due: {bill.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">₹{bill.amount.toLocaleString()}</p>
                    <Badge 
                      className={`text-sm px-3 py-1 ${
                        bill.daysLeft <= 3 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : bill.daysLeft <= 7
                          ? 'bg-amber-500 hover:bg-amber-600'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {bill.daysLeft} days left
                    </Badge>
                  </div>
                </div>
              ))}
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between p-5 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Add New Bill</p>
                    <p className="text-gray-600">Set up a new recurring payment</p>
                  </div>
                </div>
                <Button variant="outline" className="p-3 text-lg">Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="text-xl">Bill Reminders</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                <span className="font-bold">Email Notifications</span>
                <Button variant="outline" size="lg" className="text-lg">On</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                <span className="font-bold">SMS Alerts</span>
                <Button variant="outline" size="lg" className="text-lg">On</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                <span className="font-bold">Push Notifications</span>
                <Button variant="outline" size="lg" className="text-lg">On</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
            <CardTitle className="text-xl">Payment History</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50">
                <span className="font-bold">Internet Bill</span>
                <span className="text-green-600 font-bold">Paid</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50">
                <span className="font-bold">Phone Bill</span>
                <span className="text-green-600 font-bold">Paid</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50">
                <span className="font-bold">Hostel Rent</span>
                <span className="text-green-600 font-bold">Paid</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillReminder;
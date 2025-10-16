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
  );
};

export default BillReminder;
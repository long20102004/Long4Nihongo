"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  FileText,
  Calendar,
  DollarSign,
  User,
  Book,
  Receipt,
} from "lucide-react";
import Header from "@/components/site-header";
import { apiFetch } from "@/lib/api-fetch";
import LoadingOverlay from "@/components/ui/LoadingOverLay";
import Link from "next/link";

export default function MyReceiptsPage() {
  const { user } = useAuth();
  const [receipts, setReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      setIsLoading(true);
      try {
        const response = await apiFetch("api/my-receipts");
        const data = await response.json();
        setReceipts(data);
      } catch (error) {
        console.error("Failed to fetch receipts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <div className="text-center mt-8">
          Please log in to view your receipts.
        </div>
      </>
    );
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">My Receipts</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : receipts.length === 0 ? (
          <Card className="p-6 text-center">
            <CardContent className="space-y-4">
              <Receipt className="mx-auto h-12 w-12 text-muted-foreground" />
              <CardTitle>No Receipts Found</CardTitle>
              <p className="text-muted-foreground">
                You haven't made any purchases yet. Explore our courses to get
                started!
              </p>
              <Link href="/courses">
                <Button className="mt-4">Explore Courses</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {receipts.map((receipt) => (
              <Card
                key={receipt.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <CardHeader className="bg-primary/10 pb-2">
                  <CardTitle className="text-lg font-medium flex items-center justify-between">
                    <span className="truncate">{receipt.courseName}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      #{receipt.id}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="flex items-center text-sm">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Username:</span>
                    <span className="ml-2 text-muted-foreground">
                      {receipt.username}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Book className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Course:</span>
                    <span className="ml-2 text-muted-foreground truncate">
                      {receipt.courseName}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Amount:</span>
                    <span className="ml-2 text-muted-foreground">
                      {receipt.amountPurchased}đ
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Transfer Time:</span>
                    <span className="ml-2 text-muted-foreground">
                      {formatDate(receipt.date)}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <FileText className="mr-2 h-4 w-4" />
                    View Full Receipt
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

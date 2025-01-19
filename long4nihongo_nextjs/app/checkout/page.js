"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import SiteHeader from "@/components/site-header";

export default function CheckoutPage() {
  const price = 100000;
  const paymentUrl = `https://api.vietqr.io/image/970422-0981952931-18LXR4E.jpg?accountName=HOANG%20HAI%20LONG&amount=${price}`;

  return (
    <>
      <SiteHeader />
      <div className="p-6 min-h-screen container bg-background text-foreground">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">QR Code Payment</h2>
              <div className="text-center">
                <p className="mb-4">
                  Scan the QR code below to complete your payment:
                </p>
                <Image
                  src={paymentUrl}
                  alt="QR Code for Payment"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
                <p className="text-muted-foreground text-sm mt-4">
                  Ensure to complete the payment within 10 minutes.
                </p>
                <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  Confirm Payment
                </Button>
              </div>
            </Card>

            {/* Offers Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6 flex justify-between items-center">
                Top Education offers and deals are listed here
                <Button variant="link" className="text-primary">
                  See all
                </Button>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { discount: "50%", title: "Lorem ipsum dolor" },
                  { discount: "10%", title: "Lorem ipsum dolor" },
                  { discount: "50%", title: "Lorem ipsum dolor" },
                ].map((offer, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt={offer.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-4 flex flex-col justify-end">
                      <div className="text-2xl font-bold text-white mb-1">
                        {offer.discount}
                      </div>
                      <p className="text-sm text-gray-200">{offer.title}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Summary</h2>
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="flex gap-4">
                    <Image
                      src="/placeholder.svg?height=80&width=120"
                      alt={`Course ${item}`}
                      width={120}
                      height={80}
                      className="rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">
                        Lorem ipsum dolor sit amet
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Lorem ipsum dolor...
                      </p>
                      <p className="text-primary font-semibold mt-1">$24.99</p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex justify-between text-muted-foreground mb-2">
                    <span>Subtotal</span>
                    <span>$91.96</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground mb-2">
                    <span>Coupon Discount</span>
                    <span>0%</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground mb-4">
                    <span>TAX</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>$91.96</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

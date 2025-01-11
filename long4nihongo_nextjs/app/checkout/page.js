import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import SiteHeader from "@/components/site-header";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen  bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">
                Card Type
              </h2>
              <div className="flex space-x-4 mb-6">
                <img
                  src="/placeholder.svg?height=40&width=60&text=PayPal"
                  alt="PayPal"
                  className="h-10"
                />
                <img
                  src="/placeholder.svg?height=40&width=60&text=AmEx"
                  alt="American Express"
                  className="h-10"
                />
                <img
                  src="/placeholder.svg?height=40&width=60&text=Visa"
                  alt="Visa"
                  className="h-10"
                />
                <img
                  src="/placeholder.svg?height=40&width=60&text=MC"
                  alt="Mastercard"
                  className="h-10"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name on Card
                  </label>
                  <Input
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter name on card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Card Number
                  </label>
                  <Input
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Expiration Date (MM/YY)
                    </label>
                    <Input
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      CVC
                    </label>
                    <Input
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="CVC"
                    />
                  </div>
                </div>
                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300">
                  Confirm Payment
                </Button>
              </div>
            </Card>

            {/* Offers Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-white mb-6 flex justify-between items-center">
                Top Education offers and deals are listed here
                <Button variant="link" className="text-teal-500">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent p-4 flex flex-col justify-end">
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
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Summary</h2>
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
                      <h3 className="text-white font-medium">
                        Lorem ipsum dolor sit amet
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Lorem ipsum dolor...
                      </p>
                      <p className="text-teal-500 font-semibold mt-1">$24.99</p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between text-gray-400 mb-2">
                    <span>Subtotal</span>
                    <span>$91.96</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mb-2">
                    <span>Coupon Discount</span>
                    <span>0%</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mb-4">
                    <span>TAX</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-white">
                    <span>Total</span>
                    <span>$91.96</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

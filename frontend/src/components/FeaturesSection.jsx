import React from "react";
import { Package, Store, Headphones, RefreshCw } from "lucide-react"; // icon library

const FeaturesSection = () => {
  const features = [
    {
      icon: <Store size={36} className="text-blue-800" />,
      title: "Comprehensive selection",
      description: "Shop online from your favourite department store brand",
    },
    {
      icon: <Package size={36} className="text-blue-800" />,
      title: "All-island delivery",
      description: "Delivery within 3–4 working days",
    },
    {
      icon: <Headphones size={36} className="text-blue-800" />,
      title: "Top-notch support",
      description:
        "Get support from our team via phone, social media and email",
    },
    {
      icon: <RefreshCw size={36} className="text-blue-800" />,
      title: "Easy exchange",
      description: "Exchange from any of our stores or complete online",
    },
  ];

  return (
    <div className="bg-gray-100 py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start gap-4"
          >
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-700 leading-snug">
                <span className="font-medium text-blue-900">
                  {feature.description}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;

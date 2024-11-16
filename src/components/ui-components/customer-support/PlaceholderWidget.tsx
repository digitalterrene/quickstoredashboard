import { FaArrowPointer } from "react-icons/fa6";

export default function PlaceholderWidget() {
  return (
    <div className="flex flex-col bg-gray-50 items-center justify-center min-h-screen bg-background">
      <h1 className="text-3xl font-bold -mt-20 text-muted-foreground mb-4">
        Click to Get Started
      </h1>
      <div className="relative">
        <div className="flex items-center justify-center">
          <span className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
          <FaArrowPointer className="mt-6 text-gray-600 ml-4 text-xl" />
        </div>
      </div>
    </div>
  );
}

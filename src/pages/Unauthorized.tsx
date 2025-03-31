
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";

const Unauthorized = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { message, returnTo } = location.state || { 
    message: "You don't have permission to access this page", 
    returnTo: '/' 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <Shield className="h-16 w-16 text-red-500" />
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Access Denied
      </h1>
      
      <p className="text-muted-foreground text-center max-w-md mb-8">
        {message}
      </p>
      
      <Button 
        onClick={() => navigate(returnTo)} 
        variant="default"
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
};

export default Unauthorized;

import { useAuth } from "@/lib/auth";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const AdminLink = () => {
  const { isAdmin, user } = useAuth();

  if (!user || !isAdmin) return null;

  return (
    <Link to="/admin">
      <Button variant="outline" size="sm" className="hidden md:flex gap-2">
        <Shield className="h-4 w-4" />
        Admin
      </Button>
    </Link>
  );
};

export default AdminLink;

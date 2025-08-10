import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const DashboardHeader = ({ searchTerm, onSearchChange }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Quest for Success
        </h1>
        <div className="flex items-center space-x-3">
          <h2 className="text-xl text-muted-foreground">
            SAT Performance Dashboard
          </h2>
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            Live Data
          </Badge>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};
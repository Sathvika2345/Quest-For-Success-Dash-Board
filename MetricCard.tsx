import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'default';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = 'default',
  trend 
}: MetricCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-primary text-primary-foreground shadow-elevated';
      case 'secondary':
        return 'bg-gradient-secondary text-secondary-foreground shadow-elevated';
      case 'accent':
        return 'bg-gradient-accent text-accent-foreground shadow-elevated';
      default:
        return 'bg-card text-card-foreground shadow-card border';
    }
  };

  return (
    <Card className={`p-6 transition-all duration-300 hover:scale-105 ${getVariantStyles()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          variant === 'default' 
            ? 'bg-primary/10' 
            : 'bg-white/20'
        }`}>
          <Icon className={`w-6 h-6 ${
            variant === 'default' 
              ? 'text-primary' 
              : 'text-current'
          }`} />
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${
            trend.isPositive 
              ? variant === 'default' ? 'text-secondary' : 'text-white/90'
              : variant === 'default' ? 'text-destructive' : 'text-white/90'
          }`}>
            <span className="mr-1">{trend.isPositive ? '↗' : '↘'}</span>
            {trend.value}%
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold tracking-tight">
          {value}
        </div>
        <div className="text-sm font-medium opacity-90">
          {title}
        </div>
        {subtitle && (
          <div className={`text-xs opacity-70`}>
            {subtitle}
          </div>
        )}
      </div>
    </Card>
  );
};
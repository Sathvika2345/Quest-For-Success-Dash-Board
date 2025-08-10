import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockTestHistory, Student } from "@/lib/data";

interface ScoreChartProps {
  students: Student[];
}

export const ScoreChart = ({ students }: ScoreChartProps) => {
  // Aggregate data by month for overall trends
  const chartData = mockTestHistory.reduce((acc, test) => {
    const month = new Date(test.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (!acc[month]) {
      acc[month] = {
        month,
        totalTests: 0,
        totalScore: 0,
        mathScore: 0,
        readingScore: 0,
        writingScore: 0,
      };
    }
    
    acc[month].totalTests += 1;
    acc[month].totalScore += test.totalScore;
    acc[month].mathScore += test.mathScore;
    acc[month].readingScore += test.readingScore;
    acc[month].writingScore += test.writingScore;
    
    return acc;
  }, {} as Record<string, any>);

  // Convert to array and calculate averages
  const formattedData = Object.values(chartData).map((data: any) => ({
    month: data.month,
    'Total Score': Math.round(data.totalScore / data.totalTests),
    'Math': Math.round(data.mathScore / data.totalTests),
    'Reading': Math.round(data.readingScore / data.totalTests),
    'Writing': Math.round(data.writingScore / data.totalTests),
  })).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-semibold text-foreground mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Average Score Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[800, 1600]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Total Score"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Math"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="Reading"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="Writing"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--muted-foreground))", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
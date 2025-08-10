import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Student } from "@/lib/data";

interface SubjectBreakdownProps {
  students: Student[];
}

export const SubjectBreakdown = ({ students }: SubjectBreakdownProps) => {
  // Calculate average scores for each subject
  const subjectData = [
    {
      subject: "Math",
      averageScore: Math.round(students.reduce((sum, student) => sum + student.mathScore, 0) / students.length),
      maxScore: 800,
    },
    {
      subject: "Reading", 
      averageScore: Math.round(students.reduce((sum, student) => sum + student.readingScore, 0) / students.length),
      maxScore: 400,
    },
    {
      subject: "Writing",
      averageScore: Math.round(students.reduce((sum, student) => sum + student.writingScore, 0) / students.length),
      maxScore: 400,
    }
  ];

  // Calculate subject percentages
  const chartData = subjectData.map(subject => ({
    subject: subject.subject,
    score: subject.averageScore,
    percentage: Math.round((subject.averageScore / subject.maxScore) * 100),
    target: subject.maxScore * 0.75, // 75% target
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-semibold text-foreground mb-2">{`${label} Section`}</p>
          <p className="text-sm text-primary">
            {`Average Score: ${data.score}/${data.subject === 'Math' ? '800' : '400'}`}
          </p>
          <p className="text-sm text-muted-foreground">
            {`Performance: ${data.percentage}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Subject Performance Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="subject" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="score" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="target" 
                fill="hsl(var(--muted))"
                radius={[4, 4, 0, 0]}
                opacity={0.3}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject performance cards */}
        <div className="grid grid-cols-3 gap-4">
          {subjectData.map((subject, index) => {
            const colors = ['primary', 'secondary', 'accent'];
            const colorClass = colors[index];
            const percentage = Math.round((subject.averageScore / subject.maxScore) * 100);
            
            return (
              <div 
                key={subject.subject} 
                className="p-4 rounded-lg border border-border bg-card"
              >
                <div className="text-center">
                  <div className={`text-2xl font-bold text-${colorClass} mb-1`}>
                    {subject.averageScore}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-2">
                    {subject.subject}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {percentage}% of max score
                  </div>
                  <div className={`mt-2 h-2 bg-muted rounded-full overflow-hidden`}>
                    <div 
                      className={`h-full bg-${colorClass} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
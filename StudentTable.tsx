import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

interface StudentTableProps {
  students: Student[];
}

export const StudentTable = ({ students }: StudentTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-secondary text-secondary-foreground';
      case 'good':
        return 'bg-primary text-primary-foreground';
      case 'needs-attention':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressToTarget = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Student Performance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="font-semibold">Student Name</TableHead>
                <TableHead className="font-semibold">Current Score</TableHead>
                <TableHead className="font-semibold">Target Score</TableHead>
                <TableHead className="font-semibold">Progress</TableHead>
                <TableHead className="font-semibold">Improvement</TableHead>
                <TableHead className="font-semibold">Tests Taken</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="border-border hover:bg-muted/50">
                  <TableCell className="font-medium text-foreground">
                    {student.name}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-lg text-primary">
                      {student.currentScore}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.targetScore}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Progress 
                        value={getProgressToTarget(student.currentScore, student.targetScore)} 
                        className="w-20 h-2"
                      />
                      <span className="text-xs text-muted-foreground">
                        {Math.round(getProgressToTarget(student.currentScore, student.targetScore))}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span className="text-secondary font-semibold">+{student.improvement}</span>
                      <span className="text-xs text-muted-foreground">pts</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.testsTaken}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(student.status)} text-xs`}>
                      {student.status === 'needs-attention' ? 'Needs Focus' : 
                       student.status === 'good' ? 'Good Progress' : 'Excellent'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
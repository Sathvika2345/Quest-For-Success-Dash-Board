import { useState } from "react";
import { BookOpen, TrendingUp, Users, Target } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StudentTable } from "@/components/dashboard/StudentTable";
import { ScoreChart } from "@/components/dashboard/ScoreChart";
import { SubjectBreakdown } from "@/components/dashboard/SubjectBreakdown";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { mockStudents, calculateOverallStats } from "@/lib/data";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const stats = calculateOverallStats();

  // Filter students based on search term
  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Students"
            value={stats.totalStudents}
            subtitle="Active SAT students"
            icon={Users}
            variant="primary"
          />
          <MetricCard
            title="Average Score"
            value={stats.averageCurrentScore}
            subtitle="Current SAT average"
            icon={TrendingUp}
            variant="secondary"
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Average Improvement"
            value={`+${stats.averageImprovement}`}
            subtitle="Points gained on average"
            icon={BookOpen}
            variant="accent"
          />
          <MetricCard
            title="On Track"
            value={`${stats.onTrackPercentage}%`}
            subtitle={`${stats.studentsOnTrack} of ${stats.totalStudents} students`}
            icon={Target}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ScoreChart students={filteredStudents} />
          <SubjectBreakdown students={filteredStudents} />
        </div>

        {/* Student Table */}
        <StudentTable students={filteredStudents} />
      </div>
    </div>
  );
};

export default Index;

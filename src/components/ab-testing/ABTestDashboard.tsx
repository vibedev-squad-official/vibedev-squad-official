"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import ABTestingFramework, { ABTestConfig, ABTestStats } from '@/utils/ab-testing.tsx';
import { BarChart, Download, Target, TrendingUp, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface ABTestDashboardProps {
  className?: string;
}

export const ABTestDashboard: React.FC<ABTestDashboardProps> = ({ className }) => {
  const [framework, setFramework] = useState<ABTestingFramework | null>(null);
  const [activeTests, setActiveTests] = useState<ABTestConfig[]>([]);
  const [testStats, setTestStats] = useState<Map<string, ABTestStats[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const abFramework = ABTestingFramework.getInstance();
    setFramework(abFramework);
    
    const loadData = () => {
      const tests = abFramework.getActiveTests();
      setActiveTests(tests);
      
      const statsMap = new Map<string, ABTestStats[]>();
      tests.forEach(test => {
        const stats = abFramework.calculateStats(test.testId);
        statsMap.set(test.testId, stats);
      });
      setTestStats(statsMap);
      setLoading(false);
    };

    loadData();
  }, [refreshKey]);

  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

  const exportTestData = (testId?: string) => {
    if (!framework) return;
    
    const data = framework.exportData(testId);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ab-test-data-${testId || 'all'}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (test: ABTestConfig) => {
    const now = new Date();
    if (now < test.startDate) {
      return <Badge variant="secondary">Scheduled</Badge>;
    }
    if (test.endDate && now > test.endDate) {
      return <Badge variant="outline">Completed</Badge>;
    }
    return <Badge variant="default">Active</Badge>;
  };

  const getSignificanceBadge = (stats: ABTestStats) => {
    if (stats.isSignificant) {
      return <Badge variant="default" className="bg-green-500">Significant</Badge>;
    }
    if (stats.confidence > 0) {
      return <Badge variant="secondary">Not Significant</Badge>;
    }
    return <Badge variant="outline">Insufficient Data</Badge>;
  };

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">A/B Testing Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor and analyze your conversion optimization tests
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={refreshData} variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => exportTestData()} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTests.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeTests.filter(test => {
                const now = new Date();
                return now >= test.startDate && (!test.endDate || now <= test.endDate);
              }).length} currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Array.from(testStats.values()).flat().reduce((sum, stat) => sum + stat.visitors, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all tests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Array.from(testStats.values()).flat().reduce((sum, stat) => sum + stat.conversions, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {(Array.from(testStats.values()).flat().reduce((sum, stat) => sum + stat.conversions, 0) / 
                Math.max(Array.from(testStats.values()).flat().reduce((sum, stat) => sum + stat.visitors, 0), 1) * 100).toFixed(1)}% overall rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Significant Results</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Array.from(testStats.values()).flat().filter(stat => stat.isSignificant).length}
            </div>
            <p className="text-xs text-muted-foreground">Statistically significant</p>
          </CardContent>
        </Card>
      </div>

      {/* Test Details */}
      <Tabs defaultValue={activeTests[0]?.testId || 'overview'} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {activeTests.map(test => (
            <TabsTrigger key={test.testId} value={test.testId}>
              {test.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {activeTests.map(test => {
              const stats = testStats.get(test.testId) || [];
              const totalVisitors = stats.reduce((sum, stat) => sum + stat.visitors, 0);
              
              return (
                <Card key={test.testId}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{test.name}</CardTitle>
                        <CardDescription>{test.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(test)}
                        <Button 
                          onClick={() => exportTestData(test.testId)} 
                          variant="ghost" 
                          size="sm"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Visitors</div>
                          <div className="text-2xl font-bold">{totalVisitors}</div>
                        </div>
                        <div>
                          <div className="font-medium">Variants</div>
                          <div className="text-2xl font-bold">{test.variants.length}</div>
                        </div>
                        <div>
                          <div className="font-medium">Traffic</div>
                          <div className="text-2xl font-bold">{(test.trafficAllocation * 100).toFixed(0)}%</div>
                        </div>
                        <div>
                          <div className="font-medium">Min Sample</div>
                          <div className="text-2xl font-bold">{test.minimumSampleSize}</div>
                        </div>
                      </div>
                      
                      <Progress 
                        value={Math.min((totalVisitors / test.minimumSampleSize) * 100, 100)} 
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Progress to minimum sample size
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {activeTests.map(test => (
          <TabsContent key={test.testId} value={test.testId} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{test.name}</CardTitle>
                <CardDescription>{test.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Test Configuration */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Start Date</div>
                      <div>{test.startDate.toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">End Date</div>
                      <div>{test.endDate?.toLocaleDateString() || 'Ongoing'}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Traffic Allocation</div>
                      <div>{(test.trafficAllocation * 100).toFixed(0)}%</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Significance Level</div>
                      <div>{(test.significanceLevel * 100).toFixed(0)}%</div>
                    </div>
                  </div>

                  {/* Variant Results */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Variant Performance</h4>
                    <div className="grid gap-4">
                      {(testStats.get(test.testId) || []).map(stat => (
                        <Card key={stat.variant} className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h5 className="font-medium">
                                {test.variants.find(v => v.id === stat.variant)?.name || stat.variant}
                              </h5>
                              <div className="flex items-center gap-2 mt-1">
                                {getSignificanceBadge(stat)}
                                {stat.uplift !== undefined && (
                                  <Badge variant={stat.uplift > 0 ? "default" : "destructive"}>
                                    {stat.uplift > 0 ? '+' : ''}{stat.uplift.toFixed(1)}% uplift
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <div className="text-sm text-muted-foreground">Visitors</div>
                              <div className="text-2xl font-bold">{stat.visitors}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Conversions</div>
                              <div className="text-2xl font-bold">{stat.conversions}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Conversion Rate</div>
                              <div className="text-2xl font-bold">{stat.conversionRate.toFixed(2)}%</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Confidence</div>
                              <div className="text-2xl font-bold">
                                {stat.confidence > 0 ? (100 - stat.confidence * 100).toFixed(1) : 0}%
                              </div>
                            </div>
                          </div>
                          
                          <Progress 
                            value={stat.conversionRate} 
                            className="mt-4"
                          />
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Conversion Goals */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Conversion Goals</h4>
                    <div className="flex flex-wrap gap-2">
                      {test.conversionGoals.map(goal => (
                        <Badge key={goal} variant="outline">{goal}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ABTestDashboard;
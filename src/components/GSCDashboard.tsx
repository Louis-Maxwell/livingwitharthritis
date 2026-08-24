/**
 * Google Search Console Monitoring Dashboard
 * Displays real-time GSC metrics, insights, and recommendations
 */

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { AlertCircle, TrendingUp, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { getCachedGSCMetrics, logGSCMetricsSummary } from '@/lib/gsc-advanced';
import type { GSCInsights } from '@/lib/gsc-advanced';

interface GSCDashboardProps {
  refreshInterval?: number; // ms
  showCharts?: boolean;
  showRecommendations?: boolean;
}

const GSCDashboard: React.FC<GSCDashboardProps> = ({
  refreshInterval = 300000, // 5 minutes
  showCharts = true,
  showRecommendations = true,
}) => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = () => {
      try {
        const data = getCachedGSCMetrics();
        if (data) {
          setMetrics(data);
          setError(null);
        } else {
          setError('No GSC metrics available. Run monitorGSCMetrics() first.');
        }
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading GSC metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </p>
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  const { performance, coverage, webVitals } = metrics;
  const insights = metrics.insights as GSCInsights;

  return (
    <div className="space-y-8">
      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard
          title="Performance Score"
          score={insights.performanceScore}
          description="Search visibility and traffic"
        />
        <ScoreCard
          title="Health Score"
          score={insights.healthScore}
          description="Crawlability and indexation"
        />
        <ScoreCard
          title="Indexation Score"
          score={insights.indexationScore}
          description="Indexed pages vs submitted"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Impressions"
          value={performance?.totalImpressions?.toLocaleString() || '—'}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          label="Total Clicks"
          value={performance?.totalClicks?.toLocaleString() || '—'}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          label="Avg Position"
          value={performance?.averagePosition?.toFixed(1) || '—'}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          label="Avg CTR"
          value={`${(performance?.averageCTR * 100 || 0).toFixed(2)}%` || '—'}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          label="Indexed Pages"
          value={coverage?.indexed?.toLocaleString() || '—'}
          icon={<CheckCircle className="w-4 h-4" />}
        />
        <MetricCard
          label="Error Pages"
          value={coverage?.errors?.toString() || '0'}
          icon={<AlertTriangle className="w-4 h-4" />}
        />
        <MetricCard
          label="Total Submitted"
          value={coverage?.totalSubmitted?.toLocaleString() || '—'}
          icon={<Info className="w-4 h-4" />}
        />
        <MetricCard
          label="Indexation Rate"
          value={`${(coverage?.indexationRate * 100 || 0).toFixed(1)}%` || '—'}
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      {/* Charts */}
      {showCharts && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Breakdown */}
          {performance?.deviceBreakdown && (
            <ChartCard title="Traffic by Device">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Mobile', value: performance.deviceBreakdown.mobile || 0 },
                      { name: 'Desktop', value: performance.deviceBreakdown.desktop || 0 },
                      { name: 'Tablet', value: performance.deviceBreakdown.tablet || 0 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#10b981" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Coverage Status */}
          {coverage?.coverageByStatus && (
            <ChartCard title="Indexation Status">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      name: 'Status',
                      Valid: coverage.coverageByStatus.valid || 0,
                      'Valid (Warnings)': coverage.coverageByStatus.validWithWarnings || 0,
                      Errors: coverage.coverageByStatus.error || 0,
                      Excluded: coverage.coverageByStatus.excluded || 0,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Valid" fill="#10b981" />
                  <Bar dataKey="Valid (Warnings)" fill="#f59e0b" />
                  <Bar dataKey="Errors" fill="#ef4444" />
                  <Bar dataKey="Excluded" fill="#6b7280" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </div>
      )}

      {/* Web Vitals */}
      {webVitals && (
        <ChartCard title="Core Web Vitals Distribution">
          <div className="grid grid-cols-3 gap-4">
            <VitalCard
              label="LCP"
              good={webVitals.lcp.good}
              needsImprovement={webVitals.lcp.needsImprovement}
              poor={webVitals.lcp.poor}
            />
            <VitalCard
              label="FID"
              good={webVitals.fid.good}
              needsImprovement={webVitals.fid.needsImprovement}
              poor={webVitals.fid.poor}
            />
            <VitalCard
              label="CLS"
              good={webVitals.cls.good}
              needsImprovement={webVitals.cls.needsImprovement}
              poor={webVitals.cls.poor}
            />
          </div>
        </ChartCard>
      )}

      {/* Alerts */}
      {insights.alerts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Alerts</h3>
          {insights.alerts.map((alert: GSCInsights['alerts'][number], idx: number) => (
            <AlertCard key={idx} alert={alert} />
          ))}
        </div>
      )}

      {/* Recommendations */}
      {showRecommendations && insights.recommendations.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Recommendations</h3>
          {insights.recommendations.map((rec: GSCInsights['recommendations'][number], idx: number) => (
            <RecommendationCard key={idx} recommendation={rec} />
          ))}
        </div>
      )}

      {/* Debug Info */}
      {import.meta.env.MODE === 'development' && (
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
          <button
            onClick={() => logGSCMetricsSummary()}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Log metrics summary to console
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Score Card Component
 */
const ScoreCard: React.FC<{ title: string; score: number; description: string }> = ({
  title,
  score,
  description,
}) => {
  const getColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-800';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-100 dark:bg-red-950 border-red-200 dark:border-red-800';
  };

  return (
    <div className={`border rounded-lg p-4 ${getColor(score)}`}>
      <p className="text-sm text-muted-foreground mb-2">{title}</p>
      <div className="text-3xl font-bold">{score}</div>
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    </div>
  );
};

/**
 * Metric Card Component
 */
const MetricCard: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({
  label,
  value,
  icon,
}) => (
  <div className="border rounded-lg p-3 bg-card hover:bg-muted/50 transition-colors">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

/**
 * Chart Card Component
 */
const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="border rounded-lg p-4 bg-card">
    <h3 className="text-sm font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

/**
 * Vital Card Component
 */
const VitalCard: React.FC<{ label: string; good: number; needsImprovement: number; poor: number }> = ({
  label,
  good,
  needsImprovement,
  poor,
}) => (
  <div className="border rounded-lg p-3 text-center">
    <p className="text-sm font-semibold mb-3">{label}</p>
    <div className="space-y-1 text-xs">
      <p className="text-green-600 dark:text-green-400">Good: {good}</p>
      <p className="text-yellow-600 dark:text-yellow-400">Needs Improvement: {needsImprovement}</p>
      <p className="text-red-600 dark:text-red-400">Poor: {poor}</p>
    </div>
  </div>
);

/**
 * Alert Card Component
 */
const AlertCard: React.FC<{
  alert: { type: string; message: string; affectedItems: number; lastSeen: string };
}> = ({ alert }) => {
  const colors = {
    error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
    warning:
      'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
    info: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
  };

  return (
    <div className={`border rounded-lg p-3 ${colors[alert.type as keyof typeof colors]}`}>
      <div className="flex items-start gap-2">
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm">{alert.message}</p>
          <p className="text-xs mt-1">Affected: {alert.affectedItems} items</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Recommendation Card Component
 */
const RecommendationCard: React.FC<{
  recommendation: {
    priority: string;
    title: string;
    description: string;
    impact: string;
    estimatedImpact: string;
    actionItems: string[];
  };
}> = ({ recommendation }) => {
  const priorityColors = {
    critical: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300',
    high: 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300',
    medium: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300',
    low: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300',
  };

  return (
    <div className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3 mb-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors[recommendation.priority as keyof typeof priorityColors]}`}>
          {recommendation.priority.toUpperCase()}
        </span>
        <div>
          <p className="font-semibold">{recommendation.title}</p>
          <p className="text-sm text-muted-foreground">{recommendation.description}</p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase">Impact: {recommendation.impact}</p>
          <p className="text-sm">{recommendation.estimatedImpact}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Action Items:</p>
          <ul className="text-sm space-y-1">
            {recommendation.actionItems.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GSCDashboard;

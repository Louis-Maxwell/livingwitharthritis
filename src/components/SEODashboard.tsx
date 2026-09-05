import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Eye, Award, MapPin } from 'lucide-react';

interface KeywordData {
  keyword: string;
  position: number;
  impressions: number;
  clicks: number;
  ctr: number;
}

interface PageTraffic {
  page: string;
  views: number;
  clicks: number;
  avgPosition: number;
}

interface SnippetData {
  keyword: string;
  type: 'featured' | 'faq' | 'knowledge';
  page: string;
}

interface DashboardData {
  keywords: KeywordData[];
  pageTraffic: PageTraffic[];
  snippets: SnippetData[];
  cityTraffic: Array<{ city: string; clicks: number; views: number }>;
  trendData: Array<{ date: string; traffic: number; keywords: number }>;
  lastUpdated: string;
}

export default function SEODashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'keywords' | 'pages' | 'snippets' | 'cities'>('keywords');

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 24 * 60 * 60 * 1000); // Daily sync
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/seo/dashboard', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      const dashboardData: DashboardData = await response.json();
      setData(dashboardData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error loading dashboard: {error}</p>
        <button onClick={fetchDashboardData} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Retry
        </button>
      </div>
    );
  }

  if (!data) return <div className="p-6">No data available</div>;

  const topKeywords = data.keywords.slice(0, 10);
  const topPages = data.pageTraffic.slice(0, 8);
  const snippetCount = data.snippets.length;
  const topCities = data.cityTraffic.slice(0, 8);

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SEO Dashboard</h1>
          <p className="text-slate-400">Real-time metrics synced from Google Search Console</p>
          <p className="text-sm text-slate-500 mt-2">Last updated: {new Date(data.lastUpdated).toLocaleString()}</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Keywords Ranking</p>
                <p className="text-3xl font-bold">{data.keywords.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 opacity-50" />
            </div>
          </div>

          <div className="bg-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Featured Snippets</p>
                <p className="text-3xl font-bold">{snippetCount}</p>
              </div>
              <Award className="h-8 w-8 opacity-50" />
            </div>
          </div>

          <div className="bg-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg Position</p>
                <p className="text-3xl font-bold">
                  {(data.keywords.reduce((sum, k) => sum + k.position, 0) / data.keywords.length).toFixed(1)}
                </p>
              </div>
              <Eye className="h-8 w-8 opacity-50" />
            </div>
          </div>

          <div className="bg-orange-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">City Pages Traffic</p>
                <p className="text-3xl font-bold">{data.cityTraffic.reduce((sum, c) => sum + c.clicks, 0)}</p>
              </div>
              <MapPin className="h-8 w-8 opacity-50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700">
          {(['keywords', 'pages', 'snippets', 'cities'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Charts */}
          <div className="lg:col-span-2">
            {activeTab === 'keywords' && (
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">Top 10 Keywords</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-slate-300">
                    <thead className="text-slate-400 border-b border-slate-600">
                      <tr>
                        <th className="text-left py-2">Keyword</th>
                        <th className="text-right py-2">Position</th>
                        <th className="text-right py-2">Impressions</th>
                        <th className="text-right py-2">Clicks</th>
                        <th className="text-right py-2">CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topKeywords.map((kw, i) => (
                        <tr key={i} className="border-b border-slate-700 hover:bg-slate-700/50">
                          <td className="py-3">{kw.keyword}</td>
                          <td className="text-right">#{kw.position}</td>
                          <td className="text-right">{kw.impressions.toLocaleString()}</td>
                          <td className="text-right text-green-400">{kw.clicks.toLocaleString()}</td>
                          <td className="text-right">{(kw.ctr * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">Traffic by Page</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topPages}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="page" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Bar dataKey="views" fill="#3b82f6" name="Views" />
                    <Bar dataKey="clicks" fill="#10b981" name="Clicks" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === 'snippets' && (
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">Featured Snippets ({snippetCount})</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[
                    { type: 'featured', count: data.snippets.filter((s) => s.type === 'featured').length },
                    { type: 'faq', count: data.snippets.filter((s) => s.type === 'faq').length },
                    { type: 'knowledge', count: data.snippets.filter((s) => s.type === 'knowledge').length },
                  ].map((item) => (
                    <div key={item.type} className="bg-slate-700 rounded p-4 text-center">
                      <p className="text-slate-400 text-sm capitalize">{item.type} Box</p>
                      <p className="text-2xl font-bold text-amber-400">{item.count}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {data.snippets.slice(0, 15).map((snippet, i) => (
                    <div key={i} className="bg-slate-700 rounded p-3 text-sm">
                      <p className="text-white font-medium">{snippet.keyword}</p>
                      <p className="text-slate-400">{snippet.page}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-slate-600 rounded text-xs text-amber-300">
                        {snippet.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cities' && (
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">City Pages Performance</h2>
                {topCities.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topCities}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="city" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Bar dataKey="views" fill="#3b82f6" name="Views" />
                      <Bar dataKey="clicks" fill="#10b981" name="Clicks" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-slate-400">No city data available yet</p>
                )}
              </div>
            )}
          </div>

          {/* Trend Chart */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-4">30-Day Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="traffic" stroke="#3b82f6" name="Traffic" dot={false} />
                <Line type="monotone" dataKey="keywords" stroke="#10b981" name="Keywords" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sync Status */}
        <div className="mt-8 bg-slate-800 rounded-lg p-4 border border-slate-700 text-slate-400 text-sm">
          <p>Dashboard syncs daily at 2 AM UTC. Connect Google Search Console in settings to enable real-time data.</p>
        </div>
      </div>
    </div>
  );
}

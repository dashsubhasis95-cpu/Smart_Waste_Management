import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity, Calendar } from "lucide-react";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export function Analytics() {
  const monthlyData = [
    { month: "Jan", recycled: 245, general: 450, organic: 180, co2: 120 },
    { month: "Feb", recycled: 280, general: 420, organic: 195, co2: 135 },
    { month: "Mar", recycled: 320, general: 390, organic: 210, co2: 155 },
    { month: "Apr", recycled: 385, general: 350, organic: 240, co2: 180 },
    { month: "May", recycled: 420, general: 320, organic: 265, co2: 200 },
    { month: "Jun", recycled: 480, general: 280, organic: 290, co2: 230 },
  ];

  const wasteTypeData = [
    { name: "Plastic", value: 1245, color: "#3b82f6" },
    { name: "Paper", value: 980, color: "#10b981" },
    { name: "Organic", value: 1350, color: "#f59e0b" },
    { name: "Metal", value: 450, color: "#8b5cf6" },
    { name: "Glass", value: 320, color: "#06b6d4" },
    { name: "E-Waste", value: 180, color: "#ef4444" },
  ];

  const areaWiseData = [
    { area: "Downtown", plastic: 85, paper: 70, organic: 90, metal: 45, glass: 35 },
    { area: "Residential", plastic: 65, paper: 80, organic: 95, metal: 30, glass: 40 },
    { area: "Commercial", plastic: 95, paper: 60, organic: 50, metal: 55, glass: 30 },
    { area: "Industrial", plastic: 70, paper: 45, organic: 30, metal: 85, glass: 25 },
    { area: "Parks", plastic: 40, paper: 35, organic: 80, metal: 20, glass: 45 },
  ];

  const dailyTrends = [
    { day: "Mon", morning: 45, afternoon: 78, evening: 92, night: 34 },
    { day: "Tue", morning: 52, afternoon: 85, evening: 88, night: 38 },
    { day: "Wed", morning: 48, afternoon: 82, evening: 95, night: 36 },
    { day: "Thu", morning: 58, afternoon: 90, evening: 98, night: 42 },
    { day: "Fri", morning: 65, afternoon: 95, evening: 105, night: 48 },
    { day: "Sat", morning: 38, afternoon: 72, evening: 85, night: 55 },
    { day: "Sun", morning: 35, afternoon: 68, evening: 80, night: 50 },
  ];

  const predictions = [
    { month: "Jul", actual: 520, predicted: 535 },
    { month: "Aug", actual: null, predicted: 580 },
    { month: "Sep", actual: null, predicted: 625 },
    { month: "Oct", actual: null, predicted: 670 },
  ];

  const stats = [
    { label: "Total Waste", value: "4,525 tons", change: "+12.5%", trend: "up", icon: BarChart3 },
    { label: "Recycling Rate", value: "68.4%", change: "+5.2%", trend: "up", icon: TrendingUp },
    { label: "CO₂ Saved", value: "920 tons", change: "+18.3%", trend: "up", icon: Activity },
    { label: "Efficiency", value: "94.2%", change: "+3.1%", trend: "up", icon: PieChartIcon },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Advanced Analytics
          </h1>
          <p className="text-gray-400">Comprehensive waste management insights and predictions</p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
                <div className="relative p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mb-3" />
                  <div className="font-bold text-white text-lg md:text-2xl mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-400 mb-2">{stat.label}</div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400">{stat.change}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-6 md:mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white">Monthly Waste Trends</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="recycledGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="generalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="organicGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #ffffff20", borderRadius: "12px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Area type="monotone" dataKey="recycled" stroke="#10b981" fillOpacity={1} fill="url(#recycledGradient)" />
              <Area type="monotone" dataKey="general" stroke="#ef4444" fillOpacity={1} fill="url(#generalGradient)" />
              <Area type="monotone" dataKey="organic" stroke="#f59e0b" fillOpacity={1} fill="url(#organicGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Waste Type Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <h3 className="mb-4 text-white">Waste Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #ffffff20", borderRadius: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Area-wise Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <h3 className="mb-4 text-white">Area-wise Waste Generation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={areaWiseData}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="area" stroke="#9ca3af" fontSize={12} />
                <PolarRadiusAxis stroke="#9ca3af" />
                <Radar name="Plastic" dataKey="plastic" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Organic" dataKey="organic" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #ffffff20", borderRadius: "12px" }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Daily Trends & Predictions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Daily Collection Patterns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <h3 className="mb-4 text-white">Daily Collection Patterns</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dailyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #ffffff20", borderRadius: "12px" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="morning" fill="#10b981" />
                <Bar dataKey="afternoon" fill="#06b6d4" />
                <Bar dataKey="evening" fill="#3b82f6" />
                <Bar dataKey="night" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* AI Predictions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-white">AI Waste Predictions</h3>
              <div className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-xs">AI</div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={[...monthlyData.slice(-2), ...predictions]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #ffffff20", borderRadius: "12px" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Line type="monotone" dataKey="recycled" stroke="#10b981" strokeWidth={2} name="Actual" dot={{ r: 4 }} />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicted"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* AI Insights */}
            <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-start gap-2">
                <Activity className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-white mb-1">AI Insight</div>
                  <p className="text-xs text-gray-400">
                    Recycling volumes are projected to increase by 23% over the next quarter due to improved citizen engagement and new smart bin deployments.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

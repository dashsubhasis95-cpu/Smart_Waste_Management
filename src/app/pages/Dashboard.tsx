import { Leaf, Zap, TrendingUp, Award, MapPin, Calendar, Flame } from "lucide-react";
import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function Dashboard() {
  const userStats = {
    name: "Alex Green",
    ecoScore: 2847,
    streak: 23,
    totalRecycled: 156,
    co2Saved: 89,
    rank: 142,
  };

  const weeklyData = [
    { day: "Mon", waste: 2.4 },
    { day: "Tue", waste: 3.1 },
    { day: "Wed", waste: 2.8 },
    { day: "Thu", waste: 4.2 },
    { day: "Fri", waste: 3.5 },
    { day: "Sat", waste: 1.9 },
    { day: "Sun", waste: 2.2 },
  ];

  const wasteBreakdown = [
    { name: "Plastic", value: 35, color: "#3b82f6" },
    { name: "Paper", value: 28, color: "#10b981" },
    { name: "Organic", value: 22, color: "#f59e0b" },
    { name: "Metal", value: 10, color: "#8b5cf6" },
    { name: "Glass", value: 5, color: "#06b6d4" },
  ];

  const recentActivity = [
    { type: "Plastic Bottle", weight: "0.5 kg", points: "+15", time: "2h ago", status: "success" },
    { type: "Paper Waste", weight: "1.2 kg", points: "+25", time: "5h ago", status: "success" },
    { type: "Organic Waste", weight: "2.3 kg", points: "+30", time: "1d ago", status: "success" },
  ];

  const nearbyBins = [
    { name: "Park Avenue", distance: "0.3 km", fill: 45, status: "safe" },
    { name: "Main Street", distance: "0.8 km", fill: 78, status: "moderate" },
    { name: "Green Plaza", distance: "1.2 km", fill: 92, status: "critical" },
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
          <h1 className="mb-2 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            Welcome back, {userStats.name}
          </h1>
          <p className="text-gray-400">Track your environmental impact and eco contributions</p>
        </motion.div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
            <div className="relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                <span className="text-xs text-emerald-400">+12%</span>
              </div>
              <div className="font-bold text-white text-lg md:text-2xl">{userStats.ecoScore}</div>
              <div className="text-xs md:text-sm text-gray-400">Eco Score</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
            <div className="relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
                <span className="text-xs text-orange-400">🔥</span>
              </div>
              <div className="font-bold text-white text-lg md:text-2xl">{userStats.streak}</div>
              <div className="text-xs md:text-sm text-gray-400">Day Streak</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
            <div className="relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <Leaf className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              </div>
              <div className="font-bold text-white text-lg md:text-2xl">{userStats.totalRecycled} kg</div>
              <div className="text-xs md:text-sm text-gray-400">Recycled</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
            <div className="relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              </div>
              <div className="font-bold text-white text-lg md:text-2xl">#{userStats.rank}</div>
              <div className="text-xs md:text-sm text-gray-400">Global Rank</div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <h3 className="mb-4 text-white">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #ffffff20", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="waste" stroke="#10b981" fillOpacity={1} fill="url(#wasteGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Waste Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <h3 className="mb-4 text-white">Waste Type Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={wasteBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {wasteBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #ffffff20", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {wasteBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-400">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity & Nearby Bins */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Recent Activity</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white">{activity.type}</div>
                      <div className="text-xs text-gray-400">{activity.weight} • {activity.time}</div>
                    </div>
                  </div>
                  <div className="text-emerald-400 font-bold">{activity.points}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Nearby Smart Bins */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Nearby Smart Bins</h3>
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {nearbyBins.map((bin, index) => (
                <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm text-white">{bin.name}</div>
                      <div className="text-xs text-gray-400">{bin.distance} away</div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      bin.status === "safe" ? "bg-emerald-500/20 text-emerald-400" :
                      bin.status === "moderate" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {bin.fill}%
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        bin.status === "safe" ? "bg-emerald-500" :
                        bin.status === "moderate" ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}
                      style={{ width: `${bin.fill}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { Users, Truck, AlertTriangle, MapPin, Settings, Bell, TrendingUp, Activity } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export function Admin() {
  const cityStats = {
    totalBins: 156,
    activeTrucks: 24,
    activeAlerts: 8,
    collectionRate: 94.2,
    citizenReports: 45,
    systemHealth: 98.5,
  };

  const alerts = [
    { id: 1, type: "critical", bin: "Green Plaza", issue: "Overflow detected", time: "5 min ago", priority: "high" },
    { id: 2, type: "warning", bin: "University Square", issue: "High temperature", time: "12 min ago", priority: "medium" },
    { id: 3, type: "info", bin: "Main Street Hub", issue: "Scheduled maintenance", time: "1 hour ago", priority: "low" },
    { id: 4, type: "critical", bin: "Tech Campus", issue: "Sensor malfunction", time: "2 hours ago", priority: "high" },
  ];

  const trucks = [
    { id: "T-101", status: "active", location: "Downtown", progress: 65, bins: 8, driver: "John Smith" },
    { id: "T-102", status: "active", location: "Waterfront", progress: 42, bins: 5, driver: "Sarah Lee" },
    { id: "T-103", status: "idle", location: "Depot", progress: 100, bins: 12, driver: "Mike Chen" },
    { id: "T-104", status: "active", location: "Business Park", progress: 28, bins: 3, driver: "Emma Davis" },
  ];

  const collectionData = [
    { hour: "00:00", collections: 12 },
    { hour: "04:00", collections: 8 },
    { hour: "08:00", collections: 45 },
    { hour: "12:00", collections: 68 },
    { hour: "16:00", collections: 82 },
    { hour: "20:00", collections: 56 },
  ];

  const efficiencyData = [
    { day: "Mon", efficiency: 92 },
    { day: "Tue", efficiency: 94 },
    { day: "Wed", efficiency: 88 },
    { day: "Thu", efficiency: 96 },
    { day: "Fri", efficiency: 93 },
    { day: "Sat", efficiency: 89 },
    { day: "Sun", efficiency: 87 },
  ];

  const citizenReports = [
    { id: 1, reporter: "Alex Johnson", issue: "Illegal dumping", location: "Park Avenue", status: "pending", time: "10 min ago" },
    { id: 2, reporter: "Maria Garcia", issue: "Overflowing bin", location: "Main Street", status: "resolved", time: "1 hour ago" },
    { id: 3, reporter: "David Kim", issue: "Broken bin", location: "Green Plaza", status: "in-progress", time: "2 hours ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" };
      case "idle":
        return { bg: "bg-gray-500/20", text: "text-gray-400", border: "border-gray-500/30" };
      case "maintenance":
        return { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" };
      default:
        return { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" };
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30", icon: "🚨" };
      case "warning":
        return { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30", icon: "⚠️" };
      default:
        return { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30", icon: "ℹ️" };
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="mb-2 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
              Municipal Admin Dashboard
            </h1>
            <p className="text-gray-400">City-wide monitoring and control center</p>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all relative">
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* City Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <MapPin className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="font-bold text-white text-lg md:text-2xl">{cityStats.totalBins}</div>
            <div className="text-xs md:text-sm text-gray-400">Smart Bins</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-4 md:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <Truck className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="font-bold text-white text-lg md:text-2xl">{cityStats.activeTrucks}</div>
            <div className="text-xs md:text-sm text-gray-400">Active Trucks</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 md:p-6 rounded-2xl bg-red-500/10 border border-red-500/20"
          >
            <AlertTriangle className="w-5 h-5 text-red-400 mb-2" />
            <div className="font-bold text-white text-lg md:text-2xl">{cityStats.activeAlerts}</div>
            <div className="text-xs md:text-sm text-gray-400">Active Alerts</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <TrendingUp className="w-5 h-5 text-purple-400 mb-2" />
            <div className="font-bold text-white text-lg md:text-2xl">{cityStats.collectionRate}%</div>
            <div className="text-xs md:text-sm text-gray-400">Collection Rate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <Users className="w-5 h-5 text-yellow-400 mb-2" />
            <div className="font-bold text-white text-lg md:text-2xl">{cityStats.citizenReports}</div>
            <div className="text-xs md:text-sm text-gray-400">Citizen Reports</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="p-4 md:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <Activity className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="font-bold text-white text-lg md:text-2xl">{cityStats.systemHealth}%</div>
            <div className="text-xs md:text-sm text-gray-400">System Health</div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Active Alerts */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-white">Active Alerts</h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => {
                const colors = getAlertColor(alert.type);
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className={`p-5 rounded-2xl border ${colors.border} ${colors.bg}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{colors.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white">{alert.bin}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
                            {alert.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{alert.issue}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{alert.time}</span>
                          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all">
                            Resolve
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Live Trucks */}
          <div>
            <h3 className="mb-4 text-white">Live Trucks</h3>
            <div className="space-y-3">
              {trucks.map((truck, index) => {
                const colors = getStatusColor(truck.status);
                return (
                  <motion.div
                    key={truck.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className={`p-4 rounded-2xl border ${colors.border} ${colors.bg}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Truck className={`w-5 h-5 ${colors.text}`} />
                        <span className="font-bold text-white">{truck.id}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
                        {truck.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">{truck.driver}</div>
                    <div className="text-xs text-gray-400 mb-2">{truck.location}</div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs text-white">{truck.bins} bins</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                        style={{ width: `${truck.progress}%` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Collection Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <h3 className="mb-4 text-white">Today's Collection Activity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={collectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #ffffff20", borderRadius: "12px" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="collections" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* System Efficiency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <h3 className="mb-4 text-white">Weekly System Efficiency</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} domain={[80, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #ffffff20", borderRadius: "12px" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="efficiency" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Citizen Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h3 className="mb-4 text-white">Recent Citizen Reports</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {citizenReports.map((report, index) => (
              <div
                key={report.id}
                className={`p-5 rounded-2xl border ${
                  report.status === "resolved"
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : report.status === "in-progress"
                    ? "bg-yellow-500/10 border-yellow-500/20"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-bold">{report.reporter}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      report.status === "resolved"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : report.status === "in-progress"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{report.issue}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{report.location}</span>
                </div>
                <div className="text-xs text-gray-400">{report.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

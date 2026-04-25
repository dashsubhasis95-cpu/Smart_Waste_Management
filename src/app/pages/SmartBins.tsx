import { useState } from "react";
import { Trash2, MapPin, AlertTriangle, ThermometerSun, Wind, TrendingUp, Navigation } from "lucide-react";
import { motion } from "motion/react";

export function SmartBins() {
  const [selectedBin, setSelectedBin] = useState<number | null>(null);

  const bins = [
    {
      id: 1,
      name: "Park Avenue Station",
      location: "Downtown District",
      fillLevel: 45,
      wasteType: "Mixed Recyclables",
      temperature: 22,
      odorLevel: "Low",
      lastCollection: "2 hours ago",
      overflowPrediction: "Safe for 18 hours",
      status: "safe",
      lat: 40.7589,
      lng: -73.9851,
    },
    {
      id: 2,
      name: "Main Street Hub",
      location: "Commercial Zone",
      fillLevel: 78,
      wasteType: "General Waste",
      temperature: 28,
      odorLevel: "Moderate",
      lastCollection: "6 hours ago",
      overflowPrediction: "Overflow in 5 hours",
      status: "moderate",
      lat: 40.7580,
      lng: -73.9855,
    },
    {
      id: 3,
      name: "Green Plaza",
      location: "Park District",
      fillLevel: 92,
      wasteType: "Organic Waste",
      temperature: 32,
      odorLevel: "High",
      lastCollection: "12 hours ago",
      overflowPrediction: "CRITICAL - Overflow in 2 hours",
      status: "critical",
      lat: 40.7595,
      lng: -73.9845,
    },
    {
      id: 4,
      name: "Tech Campus",
      location: "Business Park",
      fillLevel: 34,
      wasteType: "Paper & Cardboard",
      temperature: 20,
      odorLevel: "Low",
      lastCollection: "1 hour ago",
      overflowPrediction: "Safe for 24 hours",
      status: "safe",
      lat: 40.7575,
      lng: -73.9860,
    },
    {
      id: 5,
      name: "Riverside Walk",
      location: "Waterfront",
      fillLevel: 67,
      wasteType: "Plastic Bottles",
      temperature: 24,
      odorLevel: "Low",
      lastCollection: "4 hours ago",
      overflowPrediction: "Safe for 10 hours",
      status: "moderate",
      lat: 40.7600,
      lng: -73.9840,
    },
    {
      id: 6,
      name: "University Square",
      location: "Education District",
      fillLevel: 89,
      wasteType: "Mixed Waste",
      temperature: 30,
      odorLevel: "Moderate",
      lastCollection: "8 hours ago",
      overflowPrediction: "Overflow in 3 hours",
      status: "critical",
      lat: 40.7585,
      lng: -73.9865,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30", fill: "bg-emerald-500" };
      case "moderate":
        return { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30", fill: "bg-yellow-500" };
      case "critical":
        return { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30", fill: "bg-red-500" };
      default:
        return { bg: "bg-gray-500/20", text: "text-gray-400", border: "border-gray-500/30", fill: "bg-gray-500" };
    }
  };

  const stats = {
    total: bins.length,
    safe: bins.filter(b => b.status === "safe").length,
    moderate: bins.filter(b => b.status === "moderate").length,
    critical: bins.filter(b => b.status === "critical").length,
    avgFill: Math.round(bins.reduce((acc, b) => acc + b.fillLevel, 0) / bins.length),
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
            Smart Bin Monitoring
          </h1>
          <p className="text-gray-400">Real-time IoT sensor data from smart waste bins</p>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-xs md:text-sm text-gray-400">Total Bins</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <div className="text-2xl font-bold text-emerald-400 mb-1">{stats.safe}</div>
            <div className="text-xs md:text-sm text-gray-400">Safe</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-yellow-500/10 border border-yellow-500/20"
          >
            <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.moderate}</div>
            <div className="text-xs md:text-sm text-gray-400">Moderate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-red-500/10 border border-red-500/20"
          >
            <div className="text-2xl font-bold text-red-400 mb-1">{stats.critical}</div>
            <div className="text-xs md:text-sm text-gray-400">Critical</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-cyan-500/10 border border-cyan-500/20"
          >
            <div className="text-2xl font-bold text-cyan-400 mb-1">{stats.avgFill}%</div>
            <div className="text-xs md:text-sm text-gray-400">Avg Fill</div>
          </motion.div>
        </div>

        {/* Bins Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {bins.map((bin, index) => {
            const colors = getStatusColor(bin.status);
            const isSelected = selectedBin === bin.id;

            return (
              <motion.div
                key={bin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => setSelectedBin(isSelected ? null : bin.id)}
                className={`relative cursor-pointer transition-all ${
                  isSelected ? "ring-2 ring-cyan-500" : ""
                }`}
              >
                <div className={`absolute inset-0 ${colors.bg} rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-all`} />
                <div className={`relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border ${colors.border} hover:border-opacity-50 transition-all`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white mb-1">{bin.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span>{bin.location}</span>
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg ${colors.bg}`}>
                      <Trash2 className={`w-5 h-5 ${colors.text}`} />
                    </div>
                  </div>

                  {/* Fill Level */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Fill Level</span>
                      <span className={`font-bold ${colors.text}`}>{bin.fillLevel}%</span>
                    </div>
                    <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${bin.fillLevel}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className={`h-full ${colors.fill}`}
                      />
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <ThermometerSun className="w-4 h-4 text-orange-400" />
                        <span className="text-xs text-gray-400">Temp</span>
                      </div>
                      <div className="text-white">{bin.temperature}°C</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-gray-400">Odor</span>
                      </div>
                      <div className="text-white text-sm">{bin.odorLevel}</div>
                    </div>
                  </div>

                  {/* Waste Type */}
                  <div className="mb-3 p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-gray-400 mb-1">Waste Type</div>
                    <div className="text-sm text-white">{bin.wasteType}</div>
                  </div>

                  {/* Prediction */}
                  <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className={`w-4 h-4 ${colors.text}`} />
                      <span className="text-xs text-gray-400">AI Prediction</span>
                    </div>
                    <div className={`text-sm ${colors.text}`}>{bin.overflowPrediction}</div>
                  </div>

                  {/* Alert Badge */}
                  {bin.status === "critical" && (
                    <div className="absolute top-4 right-4">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-3 h-3 bg-red-500 rounded-full"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/50 transition-all">
            <Navigation className="w-5 h-5" />
            <span>Optimize Routes</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
            <AlertTriangle className="w-5 h-5" />
            <span>View Alerts</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

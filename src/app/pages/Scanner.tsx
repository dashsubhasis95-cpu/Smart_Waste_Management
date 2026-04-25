import { useState } from "react";
import { Camera, Upload, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const wasteCategories = [
    { name: "Plastic", color: "#3b82f6", icon: "♻️" },
    { name: "Metal", color: "#8b5cf6", icon: "🔩" },
    { name: "Glass", color: "#06b6d4", icon: "🍾" },
    { name: "Organic", color: "#10b981", icon: "🌱" },
    { name: "Paper", color: "#f59e0b", icon: "📄" },
    { name: "E-Waste", color: "#ef4444", icon: "💻" },
    { name: "Hazardous", color: "#dc2626", icon: "⚠️" },
  ];

  const handleScan = () => {
    setScanning(true);
    setResult(null);

    setTimeout(() => {
      setScanning(false);
      setResult({
        category: "Plastic",
        subtype: "PET Bottle",
        confidence: 98.4,
        recyclable: true,
        disposal: "Blue recycling bin",
        points: 15,
        tips: [
          "Remove cap before recycling",
          "Rinse the bottle",
          "Crush to save space",
        ],
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">AI-Powered Classification</span>
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            AI Waste Scanner
          </h1>
          <p className="text-gray-400">Instant waste identification with 98% accuracy</p>
        </motion.div>

        {/* Scanner Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
          <div className="relative p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
            {/* Scan Area */}
            <div className="relative aspect-square max-w-md mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-2 border-dashed border-emerald-500/30 overflow-hidden">
              <AnimatePresence mode="wait">
                {scanning ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Scanning Animation */}
                    <div className="relative w-full h-full">
                      <motion.div
                        animate={{
                          y: [0, 400, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"
                          />
                          <p className="text-emerald-400">Analyzing waste...</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center p-8"
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">♻️</div>
                      <div className="text-2xl font-bold text-white mb-2">{result.subtype}</div>
                      <div className="text-emerald-400 mb-4">Confidence: {result.confidence}%</div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-400">Recyclable</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Ready to scan</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleScan}
                disabled={scanning}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Camera className="w-5 h-5" />
                <span>{scanning ? "Scanning..." : "Scan Now"}</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                <Upload className="w-5 h-5" />
                <span>Upload Image</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Result Details */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6 mb-8"
            >
              {/* Disposal Instructions */}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <h3 className="mb-4 text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-cyan-400" />
                  Disposal Instructions
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-sm text-gray-400 mb-1">Recommended Bin</div>
                    <div className="text-white">{result.disposal}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <div className="text-sm text-gray-400 mb-1">Eco Points Earned</div>
                    <div className="text-white font-bold">+{result.points} points</div>
                  </div>
                </div>
              </div>

              {/* Recycling Tips */}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <h3 className="mb-4 text-white">Recycling Tips</h3>
                <div className="space-y-2">
                  {result.tips.map((tip: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Waste Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="mb-4 text-white text-center">Supported Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {wasteCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all text-center"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-xs text-gray-400">{category.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

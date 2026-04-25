import { Link } from "react-router";
import { Sparkles, TrendingUp, Leaf, Globe, Zap, Shield } from "lucide-react";
import { motion } from "motion/react";

export function Home() {
  const stats = [
    { value: "2.4M", label: "Tons Recycled", icon: Leaf },
    { value: "156", label: "Smart Cities", icon: Globe },
    { value: "98.2%", label: "Accuracy", icon: Zap },
    { value: "45K", label: "Active Users", icon: TrendingUp },
  ];

  const features = [
    {
      title: "AI Waste Classification",
      description: "Advanced computer vision instantly identifies waste types with 98% accuracy",
      icon: Sparkles,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Smart Bin Monitoring",
      description: "Real-time IoT sensors track fill levels, odor, and predict overflow",
      icon: Shield,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Predictive Analytics",
      description: "AI forecasts waste generation patterns and optimizes collection routes",
      icon: TrendingUp,
      gradient: "from-blue-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400">AI-Powered Platform</span>
            </div>

            <h1 className="mb-6 bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent">
              Revolutionizing Waste Management with AI & Smart IoT Intelligence
            </h1>

            <p className="mb-10 text-gray-400 max-w-2xl mx-auto">
              Track, predict, classify, and optimize waste collection in real time for cleaner, smarter, sustainable cities.
              Join the future of environmental management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
              >
                Explore Dashboard
              </Link>
              <Link
                to="/scanner"
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-xl"
              >
                Scan Waste
              </Link>
              <Link
                to="/rewards"
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-xl"
              >
                Join Green Rewards
              </Link>
            </div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 transition-all">
                    <Icon className="w-8 h-8 text-emerald-400 mb-3" />
                    <div className="font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Cutting-Edge Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powered by advanced AI, IoT sensors, and predictive analytics for unmatched efficiency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all`} />
                  <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
            <div className="relative p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="mb-4 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                Ready to Transform Your City?
              </h2>
              <p className="text-gray-400 mb-8">
                Join thousands of smart cities using AI-powered waste management
              </p>
              <Link
                to="/dashboard"
                className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
              >
                Get Started Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

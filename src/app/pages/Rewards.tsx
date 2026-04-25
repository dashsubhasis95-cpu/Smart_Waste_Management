import { Trophy, Star, Gift, TrendingUp, Award, Zap, Crown, Target } from "lucide-react";
import { motion } from "motion/react";

export function Rewards() {
  const userRewards = {
    totalPoints: 2847,
    weeklyPoints: 245,
    streak: 23,
    rank: 142,
    totalUsers: 45000,
    level: 7,
    nextLevelPoints: 3000,
  };

  const achievements = [
    { id: 1, name: "Eco Warrior", icon: "🌍", description: "Recycle 100kg of waste", progress: 156, target: 100, unlocked: true, points: 500 },
    { id: 2, name: "Streak Master", icon: "🔥", description: "30-day recycling streak", progress: 23, target: 30, unlocked: false, points: 300 },
    { id: 3, name: "Plastic Crusher", icon: "♻️", description: "Recycle 50kg of plastic", progress: 45, target: 50, unlocked: false, points: 250 },
    { id: 4, name: "AI Expert", icon: "🤖", description: "Use AI scanner 100 times", progress: 100, target: 100, unlocked: true, points: 400 },
    { id: 5, name: "Community Hero", icon: "👥", description: "Refer 10 friends", progress: 7, target: 10, unlocked: false, points: 600 },
    { id: 6, name: "Green Champion", icon: "🏆", description: "Save 100kg CO₂", progress: 89, target: 100, unlocked: false, points: 800 },
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah Green", points: 5234, avatar: "👩", badge: "🥇" },
    { rank: 2, name: "Mike Eco", points: 4891, avatar: "👨", badge: "🥈" },
    { rank: 3, name: "Emma Earth", points: 4567, avatar: "👩", badge: "🥉" },
    { rank: 4, name: "John Leaf", points: 3845, avatar: "👨", badge: "" },
    { rank: 5, name: "Lisa Pure", points: 3234, avatar: "👩", badge: "" },
  ];

  const challenges = [
    { id: 1, title: "Weekend Warrior", description: "Recycle 5kg this weekend", reward: 150, deadline: "2 days left", difficulty: "Easy" },
    { id: 2, title: "Plastic-Free Week", description: "No plastic waste for 7 days", reward: 500, deadline: "5 days left", difficulty: "Hard" },
    { id: 3, title: "Community Clean", description: "Report 3 illegal dumps", reward: 200, deadline: "4 days left", difficulty: "Medium" },
  ];

  const rewardItems = [
    { id: 1, name: "Coffee Voucher", points: 500, icon: "☕", stock: 45 },
    { id: 2, name: "Eco Tote Bag", points: 800, icon: "👜", stock: 23 },
    { id: 3, name: "Plant Seedling", points: 300, icon: "🌱", stock: 67 },
    { id: 4, name: "Reusable Bottle", points: 1000, icon: "🍶", stock: 12 },
    { id: 5, name: "Gift Card $10", points: 1500, icon: "🎁", stock: 8 },
    { id: 6, name: "Solar Charger", points: 2500, icon: "🔋", stock: 5 },
  ];

  const progressPercentage = (userRewards.totalPoints / userRewards.nextLevelPoints) * 100;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            Rewards & Achievements
          </h1>
          <p className="text-gray-400">Earn points, unlock badges, and redeem amazing rewards</p>
        </motion.div>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
          <div className="relative p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Points & Level */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Total Points</div>
                    <div className="font-bold text-white">{userRewards.totalPoints.toLocaleString()}</div>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Level {userRewards.level}</span>
                    <span className="text-sm text-purple-400">Level {userRewards.level + 1}</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {userRewards.totalPoints} / {userRewards.nextLevelPoints} points
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/5">
                  <Zap className="w-5 h-5 text-yellow-400 mb-2" />
                  <div className="font-bold text-white">{userRewards.weeklyPoints}</div>
                  <div className="text-xs text-gray-400">This Week</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <Trophy className="w-5 h-5 text-purple-400 mb-2" />
                  <div className="font-bold text-white">#{userRewards.rank}</div>
                  <div className="text-xs text-gray-400">Rank</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <Target className="w-5 h-5 text-orange-400 mb-2" />
                  <div className="font-bold text-white">{userRewards.streak}</div>
                  <div className="text-xs text-gray-400">Day Streak</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Achievements */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-white">Achievements</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={`relative p-5 rounded-2xl border transition-all ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h4 className="text-white mb-1">{achievement.name}</h4>
                  <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs text-purple-400">
                        {achievement.progress} / {achievement.target}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${achievement.unlocked ? "bg-yellow-500" : "bg-purple-500"}`}
                        style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-400">+{achievement.points} points</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h3 className="mb-4 text-white">Top Contributors</h3>
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      user.rank <= 3 ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10" : "bg-white/5"
                    }`}
                  >
                    <div className="text-2xl">{user.badge || user.avatar}</div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.points.toLocaleString()} pts</div>
                    </div>
                    <div className="text-sm text-gray-400">#{user.rank}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Challenges */}
        <div className="mb-8">
          <h3 className="mb-4 text-white">Weekly Challenges</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    challenge.difficulty === "Easy" ? "bg-emerald-500/20 text-emerald-400" :
                    challenge.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-xs text-gray-400">{challenge.deadline}</span>
                </div>
                <h4 className="text-white mb-2">{challenge.title}</h4>
                <p className="text-sm text-gray-400 mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Gift className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-400">+{challenge.reward} pts</span>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                    Start
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reward Marketplace */}
        <div>
          <h3 className="mb-4 text-white">Reward Marketplace</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {rewardItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
                <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="text-white text-sm mb-2">{item.name}</h4>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-purple-400" />
                    <span className="text-sm text-purple-400">{item.points}</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-3">{item.stock} left</div>
                  <button
                    disabled={userRewards.totalPoints < item.points}
                    className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Redeem
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

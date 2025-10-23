import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaUserAlt,
  FaUsersCog,
  FaCity,
  FaMapMarkedAlt,
  FaComments,
  FaChartLine,
  FaBolt,
  FaShieldAlt,
  FaBell,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

export default function App() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    viewport: { once: true },
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <FaBolt className="text-yellow-300" size={16} />
              <span className="text-sm font-medium">Trusted by 50+ Cities</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                CivicEye
              </span>
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Connecting citizens, departments, and administrators to build smarter, cleaner, and more responsive cities through real-time collaboration.
            </p>

            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-300" />
                <span className="text-sm">Instant Reporting</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-300" />
                <span className="text-sm">Real-Time Tracking</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portal Access Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-24">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            ACCESS PORTALS
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Choose Your Portal
          </h2>
          <p className="text-lg text-gray-600">
            Select the portal that matches your role to access CivicEye's powerful civic engagement platform.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <PortalCard
            icon={<FaUserAlt size={48} />}
            title="Citizen Portal"
            desc="Report civic issues instantly — potholes, streetlights, water problems, waste management, and more. Track your reports in real-time."
            link="https://civic-issues-delta.vercel.app"
            color="blue"
            features={[
              "Quick Issue Reporting",
              "GPS Auto-Location",
              "Real-Time Chat",
              "Progress Tracking",
            ]}
            onHover={() => setHoveredCard("citizen")}
            onLeave={() => setHoveredCard(null)}
            isHovered={hoveredCard === "citizen"}
          />
          <PortalCard
            icon={<FaCity size={48} />}
            title="Department Dashboard"
            desc="Manage and resolve reported issues efficiently. Communicate with citizens, update status, and track performance metrics."
            link="https://civic-department.vercel.app"
            color="green"
            features={[
              "Issue Management",
              "Citizen Communication",
              "Status Updates",
              "Performance Analytics",
            ]}
            onHover={() => setHoveredCard("department")}
            onLeave={() => setHoveredCard(null)}
            isHovered={hoveredCard === "department"}
          />
          <PortalCard
            icon={<FaUsersCog size={48} />}
            title="Admin Dashboard"
            desc="Monitor all departments, view citywide analytics, manage users, and oversee the entire civic ecosystem from one place."
            link="https://civic-issue-admin-ruddy.vercel.app"
            color="purple"
            features={[
              "Multi-Department View",
              "Advanced Analytics",
              "User Management",
              "System Monitoring",
            ]}
            onHover={() => setHoveredCard("admin")}
            onLeave={() => setHoveredCard(null)}
            isHovered={hoveredCard === "admin"}
          />
        </motion.div>
      </section>

      {/* Features Overview Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              PLATFORM FEATURES
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-gray-600">
              Powerful tools designed for seamless collaboration between citizens, departments, and administrators.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<FaMapMarkedAlt className="text-blue-600" size={32} />}
              title="Interactive Map View"
              desc="Visualize all reported issues on an interactive city map with real-time updates."
              color="blue"
            />
            <FeatureCard
              icon={<FaBolt className="text-yellow-600" size={32} />}
              title="Instant Reporting"
              desc="Upload photos and submit civic issues in seconds with GPS auto-location."
              color="yellow"
            />
            <FeatureCard
              icon={<FaComments className="text-purple-600" size={32} />}
              title="Real-Time Chat"
              desc="Direct messaging between citizens and departments for seamless communication."
              color="purple"
            />
            <FeatureCard
              icon={<FaChartLine className="text-green-600" size={32} />}
              title="Progress Tracking"
              desc="Monitor issue status from submission to resolution with detailed timelines."
              color="green"
            />
            <FeatureCard
              icon={<FaBell className="text-red-600" size={32} />}
              title="Smart Notifications"
              desc="Get instant alerts on issue updates and resolution confirmations."
              color="red"
            />
            <FeatureCard
              icon={<FaShieldAlt className="text-indigo-600" size={32} />}
              title="Secure & Transparent"
              desc="End-to-end encrypted communication with complete audit trails."
              color="indigo"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-24">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            From Report to Resolution in 3 Steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200"></div>

          <StepCard
            number="01"
            icon={<FaMapMarkedAlt className="text-blue-600" size={36} />}
            title="Citizens Report"
            desc="Spot a problem? Capture it, add location, and submit instantly through the Citizen Portal."
            color="blue"
          />
          <StepCard
            number="02"
            icon={<FaCity className="text-green-600" size={36} />}
            title="Departments Act"
            desc="Reports auto-assigned to departments who communicate and schedule resolutions."
            color="green"
          />
          <StepCard
            number="03"
            icon={<FaCheckCircle className="text-purple-600" size={36} />}
            title="Track & Verify"
            desc="Real-time updates on progress. Citizens verify completion and rate service quality."
            color="purple"
          />
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Making Real Impact Across Cities
            </h2>
            <p className="text-xl text-blue-100">
              Trusted by communities and governments nationwide
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <ImpactCard number="50+" label="Active Citizens" />
            <ImpactCard number="50+" label="Issues Resolved" />
            <ImpactCard number="100+" label="Connected Cities" />
            <ImpactCard number="50%" label="Satisfaction Rate" />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 text-center border border-blue-100 shadow-xl"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your City?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of cities using CivicEye to create more responsive, transparent, and efficient civic systems.
          </p>
          <div className="text-sm text-gray-500 mb-6">
            Select your portal above to get started
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <FaCity size={32} className="text-blue-400" />
              <h3 className="text-3xl font-bold">CivicEye</h3>
            </div>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Building Better Cities, One Report at a Time
            </p>

            {/* Contact Information */}
            <div className="pt-6 space-y-4">
              <h4 className="text-xl font-semibold text-white">Contact Us</h4>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
                <a
                  href="tel:7091667895"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <FaPhone className="text-blue-400" />
                  <span>7091667895</span>
                </a>
                <a
                  href="mailto:alammdhazrat743@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <FaEnvelope className="text-blue-400" />
                  <span>alammdhazrat743@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 mt-8">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} CivicEye. All rights reserved. Empowering Communities Together.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component: PortalCard
function PortalCard({ icon, title, desc, link, color, features, onHover, onLeave, isHovered }) {
  const colorClasses = {
    blue: {
      bg: "from-blue-50 to-blue-100/50",
      border: "border-blue-200 hover:border-blue-400",
      icon: "bg-blue-500",
      button: "bg-blue-600 hover:bg-blue-700",
      badge: "bg-blue-100 text-blue-700",
    },
    green: {
      bg: "from-green-50 to-green-100/50",
      border: "border-green-200 hover:border-green-400",
      icon: "bg-green-500",
      button: "bg-green-600 hover:bg-green-700",
      badge: "bg-green-100 text-green-700",
    },
    purple: {
      bg: "from-purple-50 to-purple-100/50",
      border: "border-purple-200 hover:border-purple-400",
      icon: "bg-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
      badge: "bg-purple-100 text-purple-700",
    },
  };

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`bg-gradient-to-br ${colorClasses[color].bg} ${colorClasses[color].border} border-2 rounded-2xl p-8 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col`}
    >
      <div className={`${colorClasses[color].icon} text-white p-4 rounded-full mb-6 w-fit mx-auto`}>
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6 text-center flex-grow">{desc}</p>

      <div className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
            <FaCheckCircle className="text-green-500 flex-shrink-0" size={14} />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${colorClasses[color].button} text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 text-center flex items-center justify-center gap-2 group`}
      >
        Access Portal
        <motion.span
          animate={isHovered ? { x: [0, 5, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <FaArrowRight size={14} />
        </motion.span>
      </a>
    </motion.div>
  );
}

// Component: FeatureCard
function FeatureCard({ icon, title, desc, color }) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100/50 border-blue-200 hover:border-blue-400",
    yellow: "from-yellow-50 to-yellow-100/50 border-yellow-200 hover:border-yellow-400",
    purple: "from-purple-50 to-purple-100/50 border-purple-200 hover:border-purple-400",
    green: "from-green-50 to-green-100/50 border-green-200 hover:border-green-400",
    red: "from-red-50 to-red-100/50 border-red-200 hover:border-red-400",
    indigo: "from-indigo-50 to-indigo-100/50 border-indigo-200 hover:border-indigo-400",
  };

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`bg-gradient-to-br ${colorClasses[color]} border-2 rounded-2xl p-8 transition-all duration-300 shadow-lg hover:shadow-2xl`}
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// Component: StepCard
function StepCard({ number, icon, title, desc, color }) {
  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
  };

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
      }}
      className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 z-10"
    >
      <div
        className={`absolute -top-6 left-8 ${colorClasses[color]} text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg`}
      >
        {number}
      </div>
      <div className="mt-4 mb-6 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// Component: ImpactCard
function ImpactCard({ number, label }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, scale: 0.8 },
        whileInView: { opacity: 1, scale: 1 },
      }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
    >
      <h3 className="text-5xl font-bold mb-3">{number}</h3>
      <p className="text-blue-100 text-lg">{label}</p>
    </motion.div>
  );
}

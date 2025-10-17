
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaComments,
  FaChartLine,
  FaBolt,
  FaShieldAlt,
  FaBell,
  FaCheckCircle,
  FaUsersCog,
  FaCity,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Landing() {
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
        staggerChildren: 0.2,
      },
    },
    viewport: { once: true },
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <FaBolt className="text-yellow-300" size={16} />
                <span className="text-sm font-medium">Trusted by 500+ Cities</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                Transform Your City with{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                  CivicEye
                </span>
              </h1>

              <p className="text-xl text-blue-100 leading-relaxed">
                Empower citizens to report civic issues instantly. Track, resolve, and build smarter cities with real-time collaboration between communities and departments.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="group bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  Start Free Trial
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-300" />
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-300" />
                  <span className="text-sm">Free 30-day trial</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3176/3176292.png"
                  alt="CivicEye Platform"
                  className="w-full drop-shadow-2xl"
                />
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-8 -right-8 bg-white rounded-xl shadow-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <FaCheckCircle className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Issue Resolved</p>
                      <p className="text-sm text-gray-500">Pothole fixed in 2 days</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        {...fadeInUp}
        className="relative -mt-16 z-10 max-w-6xl mx-auto px-6"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 grid sm:grid-cols-3 gap-8 border border-gray-100">
          <StatCard number="50K+" label="Issues Resolved" />
          <StatCard number="500+" label="Cities Connected" />
          <StatCard number="98%" label="Resolution Rate" />
        </div>
      </motion.section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-24">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            ABOUT CIVICEYE
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Bridging Citizens and Civic Departments
          </h2>
          <p className="text-lg text-gray-600">
            CivicEye is a next-generation civic engagement platform that transforms how cities handle public issues. From reporting to resolution, we make civic participation seamless, transparent, and effective.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            {...fadeInUp}
            src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
            alt="City Management"
            className="w-full max-w-md mx-auto"
          />
          <motion.div {...staggerContainer} className="space-y-6">
            <InfoPoint
              icon={<FaShieldAlt className="text-blue-600" size={24} />}
              title="Secure & Transparent"
              desc="End-to-end encrypted communication with complete audit trails for accountability."
            />
            <InfoPoint
              icon={<FaBolt className="text-yellow-600" size={24} />}
              title="Lightning Fast"
              desc="Report issues in under 30 seconds with GPS auto-detection and smart categorization."
            />
            <InfoPoint
              icon={<FaUsersCog className="text-purple-600" size={24} />}
              title="Smart Routing"
              desc="AI-powered issue assignment ensures reports reach the right department instantly."
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              PLATFORM FEATURES
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Build Better Cities
            </h2>
            <p className="text-lg text-gray-600">
              Powerful tools designed for citizens, departments, and administrators to collaborate effectively.
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
              desc="Visualize all reported issues on an interactive city map with real-time updates and filtering options."
              color="blue"
            />
            <FeatureCard
              icon={<FaBolt className="text-yellow-600" size={32} />}
              title="Instant Reporting"
              desc="Upload photos, add descriptions, and submit civic issues in seconds with GPS auto-location."
              color="yellow"
            />
            <FeatureCard
              icon={<FaComments className="text-purple-600" size={32} />}
              title="Real-Time Chat"
              desc="Direct messaging between citizens and departments for updates, clarifications, and feedback."
              color="purple"
            />
            <FeatureCard
              icon={<FaChartLine className="text-green-600" size={32} />}
              title="Progress Tracking"
              desc="Monitor issue status from submission to resolution with detailed timeline and notifications."
              color="green"
            />
            <FeatureCard
              icon={<FaBell className="text-red-600" size={32} />}
              title="Smart Notifications"
              desc="Get instant alerts on issue updates, department responses, and resolution confirmations."
              color="red"
            />
            <FeatureCard
              icon={<FaCity className="text-indigo-600" size={32} />}
              title="Multi-Department Dashboard"
              desc="Centralized control panel for admins to oversee all departments, analytics, and performance metrics."
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
            From Report to Resolution in 3 Simple Steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200"></div>
          
          <StepCard
            number="01"
            icon={<FaMapMarkedAlt className="text-blue-600" size={36} />}
            title="Citizens Report Issues"
            desc="Spot a problem? Capture it with your phone camera, add location, and submit instantly. Our smart categorization handles the rest."
            color="blue"
          />
          <StepCard
            number="02"
            icon={<FaUsersCog className="text-purple-600" size={36} />}
            title="Departments Take Action"
            desc="Reports are auto-assigned to relevant departments who can communicate directly with citizens and schedule resolutions."
            color="purple"
          />
          <StepCard
            number="03"
            icon={<FaCheckCircle className="text-green-600" size={36} />}
            title="Track & Close"
            desc="Citizens receive real-time updates on progress. Once resolved, they can verify and rate the service quality."
            color="green"
          />
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Making Real Impact Across Cities</h2>
            <p className="text-xl text-blue-100">Trusted by communities and governments nationwide</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <ImpactCard number="152K+" label="Active Citizens" />
            <ImpactCard number="50K+" label="Issues Resolved" />
            <ImpactCard number="500+" label="Connected Cities" />
            <ImpactCard number="95%" label="Satisfaction Rate" />
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
            Join thousands of cities already using CivicEye to create more responsive, transparent, and efficient civic systems.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free
            </Link>
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
                © {new Date().getFullYear()} CivicEye. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component: StatCard
function StatCard({ number, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h3 className="text-4xl font-bold text-blue-700 mb-2">{number}</h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
}

// Component: InfoPoint
function InfoPoint({ icon, title, desc }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, x: -30 },
        whileInView: { opacity: 1, x: 0 },
      }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0 bg-blue-50 p-3 rounded-xl h-fit">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
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
    purple: "bg-purple-600",
    green: "bg-green-600",
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

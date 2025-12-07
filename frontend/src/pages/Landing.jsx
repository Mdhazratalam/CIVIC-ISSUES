import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Chatbot from "../components/Chatbot";

import {
  FaMapMarkedAlt,
  FaComments,
  FaChartLine,
  FaCheckCircle,
  FaCity,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Landing() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Smart Civic Issue Reporting System{" "}
              <span className="text-yellow-300">CivicEye</span>
            </h1>

            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Report civic issues instantly. Connect citizens and departments. Build smarter, cleaner cities together.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link
                to="/register"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold text-blue-700 mb-2">50+</h3>
              <p className="text-gray-600">Issues Resolved</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-blue-700 mb-2">100+</h3>
              <p className="text-gray-600">Cities Connected</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-blue-700 mb-2">50%</h3>
              <p className="text-gray-600">Resolution Rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Bridging Citizens and Civic Departments
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              CivicEye transforms how cities handle public issues. From reporting to resolution, we make civic participation seamless, transparent, and effective through real-time collaboration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <motion.img
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              alt="City Management"
              className="w-full max-w-md mx-auto"
            />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <InfoItem
                title="Secure & Transparent"
                desc="End-to-end encrypted communication with complete audit trails."
              />
              <InfoItem
                title="Lightning Fast"
                desc="Report issues in under 30 seconds with GPS auto-detection."
              />
              <InfoItem
                title="Smart Routing"
                desc="AI-powered assignment ensures reports reach the right department."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600">
              Powerful tools for citizens, departments, and administrators.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaMapMarkedAlt className="text-blue-600" size={40} />}
              title="Interactive Map View"
              desc="Visualize all reported issues on an interactive city map with real-time updates."
            />
            <FeatureCard
              icon={<FaComments className="text-purple-600" size={40} />}
              title="Real-Time Chat"
              desc="Direct messaging between citizens and departments for seamless communication."
            />
            <FeatureCard
              icon={<FaChartLine className="text-green-600" size={40} />}
              title="Progress Tracking"
              desc="Monitor issue status from submission to resolution with detailed timelines."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              From report to resolution in 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Citizens Report"
              desc="Capture the problem with a photo and location, then submit instantly."
            />
            <StepCard
              number="2"
              title="Departments Act"
              desc="Reports are assigned to departments who communicate and schedule resolutions."
            />
            <StepCard
              number="3"
              title="Track & Verify"
              desc="Citizens receive updates and verify completion when resolved."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">
              Ready to Transform Your City?
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of cities using CivicEye to create more responsive and efficient civic systems.
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-blue-700 px-10 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <FaCity size={32} className="text-blue-400" />
              <h3 className="text-2xl font-bold">CivicEye</h3>
            </div>
            <p className="text-gray-400">
              Building Better Cities, One Report at a Time
            </p>

            <div className="pt-6 space-y-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
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
      // Inside return:
      <Chatbot />
    </div>  
  );
}

// Component: InfoItem
function InfoItem({ title, desc }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <FaCheckCircle className="text-green-500" size={20} />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 pl-8">{desc}</p>
    </div>
  );
}

// Component: FeatureCard
function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all"
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </motion.div>
  );
}

// Component: StepCard
function StepCard({ number, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-white rounded-xl p-8 shadow-md text-center"
    >
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center">
        {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </motion.div>
  );
}

import React, { useState, useEffect } from "react";
import { Users, Shield, Database, ArrowRight, CheckCircle, Star, Github, Linkedin, Mail } from "lucide-react";
import Navbar from "./Navbar";

function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Database,
      title: "Digitize & Simplify",
      description: "Transform your employee management with our intuitive digital platform",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Secure Access Control",
      description: "Role-based permissions ensure data security and controlled access",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Users,
      title: "Streamlined Operations",
      description: "Perform CRUD operations with ease and access data instantly",
      color: "from-pink-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>
      <Navbar/>

      {/* Hero Section */}
      <main className="relative z-10 px-6 lg:px-12 py-12">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Hero Content */}
          <div className="text-center mb-16">
            
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Revolutionize Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Staff Management
              </span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              A modern, intuitive platform designed to streamline employee management, 
              enhance productivity, and provide secure access to critical workforce data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <span className="mr-2">Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Interactive Features Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isActive = currentFeature === index;
              
              return (
                <div
                  key={index}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-105' : 'hover:scale-105'
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className={`relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl border transition-all duration-300 ${
                    isActive ? 'border-white/40 bg-white/15' : 'border-white/20 hover:border-white/30'
                  }`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 ${
                      isActive ? 'rotate-6' : 'group-hover:rotate-3'
                    }`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-white/70 leading-relaxed">{feature.description}</p>
                    <div className={`mt-6 flex items-center text-sm transition-all duration-300 ${
                      isActive ? 'text-purple-300' : 'text-white/50'
                    }`}>
                     
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { number: "100%", label: "Secure" },
              { number: "24/7", label: "Available" },
              { number: "∞", label: "Scalable" },
              { number: "💜", label: "Personal" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-white/60 uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join the future of staff management with our comprehensive, user-friendly platform.
            </p>
            <button className="group px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-lg font-semibold">
              Start Your Journey
              <ArrowRight className="w-6 h-6 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-white/10 text-center">
            <div className="flex justify-center space-x-6 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                <Github className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                <Mail className="w-5 h-5" />
              </div>
            </div>
            <p className="text-white/50 text-sm">
              Built for learning • Staff Hub © 2025 • A Personal Project
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Home;
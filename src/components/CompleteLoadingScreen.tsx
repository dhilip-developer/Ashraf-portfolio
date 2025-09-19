import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Torus, Box } from "@react-three/drei";
import * as THREE from "three";

interface CompleteLoadingScreenProps {
  onComplete: () => void;
}

// 3D Scene Component
function Scene3D() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.3;
      sphereRef.current.rotation.y = time * 0.2;
      sphereRef.current.position.y = Math.sin(time * 1.5) * 0.3;
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.4;
      torusRef.current.rotation.z = time * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} color="#00ffff" intensity={0.6} />
      <pointLight position={[5, -5, 5]} color="#ff00ff" intensity={0.6} />
      
      {/* Central Sphere */}
      <Sphere ref={sphereRef} args={[0.8, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00ffff"
          emissive="#001122"
          wireframe
          transparent
          opacity={0.7}
        />
      </Sphere>
      
      {/* Orbiting Torus */}
      <Torus ref={torusRef} args={[1.5, 0.2, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#220011"
          wireframe
          transparent
          opacity={0.5}
        />
      </Torus>
      
      {/* Floating Cubes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Box
          key={i}
          args={[0.1, 0.1, 0.1]}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 2.5,
            Math.sin((i / 6) * Math.PI * 2) * 1.5,
            Math.sin((i / 6) * Math.PI * 4) * 1.5,
          ]}
        >
          <meshStandardMaterial
            color={i % 2 === 0 ? "#00ff00" : "#ffff00"}
            emissive={i % 2 === 0 ? "#001100" : "#111100"}
            transparent
            opacity={0.8}
          />
        </Box>
      ))}
    </group>
  );
}

// Floating Particles Component
function FloatingParticles() {
  const characters = "ASHRAF0123456789";
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    char: characters[Math.floor(Math.random() * characters.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-accent text-xs font-mono font-bold"
          style={{ 
            left: `${particle.x}%`, 
            top: `${particle.y}%` 
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {particle.char}
        </motion.div>
      ))}
    </div>
  );
}

// Personal Welcome Component
interface PersonalWelcomeProps {
  currentText: string;
  progress: number;
}

function PersonalWelcome({ currentText, progress }: PersonalWelcomeProps) {
  const getWelcomeMessage = () => {
    if (progress < 20) return "HELLO ASHRAF";
    if (progress < 40) return "INITIALIZING YOUR WORKSPACE";
    if (progress < 60) return "LOADING ASHRAF'S ENVIRONMENT";
    if (progress < 80) return "PREPARING YOUR DIGITAL REALM";
    if (progress < 95) return "WELCOME TO YOUR MATRIX, ASHRAF";
    return "SYSTEM READY FOR ASHRAF";
  };

  return (
    <div className="text-center space-y-8">
      {/* Main Welcome Text */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-wider"
          key={getWelcomeMessage()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {getWelcomeMessage()}
          </span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground font-mono tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {currentText}
        </motion.p>
      </motion.div>

      {/* Personalized Details */}
      <motion.div
        className="flex justify-center space-x-8 text-sm font-mono text-muted-foreground/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-col items-center space-y-1">
          <span className="text-primary">USER</span>
          <span>ASHRAF</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="text-secondary">STATUS</span>
          <span>AUTHENTICATED</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="text-accent">ACCESS</span>
          <span>GRANTED</span>
        </div>
      </motion.div>
    </div>
  );
}

// Loading Progress Component
interface LoadingProgressProps {
  progress: number;
}

function LoadingProgress({ progress }: LoadingProgressProps) {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      {/* Progress Bar Container */}
      <div className="relative">
        <div className="w-full h-4 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full overflow-hidden shadow-lg">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Animated Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
        
        {/* Progress Indicator */}
        <motion.div
          className="absolute -top-8 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm font-mono border border-primary/30"
          style={{ left: `${Math.max(0, Math.min(95, progress))}%` }}
          animate={{ x: '-50%' }}
          transition={{ duration: 0.3 }}
        >
          {progress.toFixed(1)}%
        </motion.div>
      </div>

      {/* Loading Stats */}
      <motion.div
        className="grid grid-cols-3 gap-4 text-center font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="space-y-1">
          <div className="text-primary font-semibold">MODULES</div>
          <div className="text-muted-foreground">{Math.floor(progress / 10)}/10</div>
        </div>
        <div className="space-y-1">
          <div className="text-secondary font-semibold">ASSETS</div>
          <div className="text-muted-foreground">{Math.floor(progress / 5)}/20</div>
        </div>
        <div className="space-y-1">
          <div className="text-accent font-semibold">SYSTEMS</div>
          <div className="text-muted-foreground">{Math.floor(progress / 3.33)}/30</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CompleteLoadingScreen({ onComplete }: CompleteLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("DETECTING ASHRAF");

  const loadingTexts = [
    "DETECTING ASHRAF",
    "INITIALIZING NEURAL NETWORKS", 
    "LOADING ASHRAF'S PREFERENCES",
    "CALIBRATING DISPLAY MATRICES",
    "ESTABLISHING SECURE CONNECTION",
    "WELCOME ABOARD, ASHRAF",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1.5;
        const textIndex = Math.floor((newProgress / 100) * loadingTexts.length);
        setCurrentText(loadingTexts[Math.min(textIndex, loadingTexts.length - 1)]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 1500);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(180, 100%, 50%, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(180, 100%, 50%, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-gradient-to-l from-accent/20 to-transparent rounded-full blur-2xl animate-pulse-glow" />

        {/* 3D Animated Background */}
        <div className="absolute inset-0">
          {/* 3D Scene */}
          <div className="absolute inset-0 opacity-60">
            <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
              <Scene3D />
            </Canvas>
          </div>
          
          {/* Floating Particles */}
          <FloatingParticles />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 space-y-12">
          <PersonalWelcome currentText={currentText} progress={progress} />
          <LoadingProgress progress={progress} />
          
          {/* System Info */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs font-mono text-muted-foreground/60">
            <span>NEURAL_NET_v3.0.1</span>
            <span>USER: ASHRAF</span>
            <span>STATUS: LOADING</span>
            <span>SECURITY: ENABLED</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
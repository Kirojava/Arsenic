import { motion } from "framer-motion";
import { Gavel } from "lucide-react";

export function GavelLoading() {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
        className="text-blue-500"
      >
        <Gavel className="w-8 h-8" />
      </motion.div>
    </div>
  );
}

export function GavelLoadingScreen() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <GavelLoading />
    </div>
  );
}

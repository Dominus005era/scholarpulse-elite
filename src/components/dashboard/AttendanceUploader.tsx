import React, { useState, useCallback } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { Upload, FileText, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeAttendanceImage } from '../../services/geminiService.ts';

interface AttendanceUploaderProps {
  onAnalyzing: (loading: boolean) => void;
  onResult: (data: { present: number; absent: number; reportDate?: string }) => void;
}

export default function AttendanceUploader({ onAnalyzing, onResult }: AttendanceUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    onAnalyzing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const result = await analyzeAttendanceImage(base64);
        
        if (result) {
          onResult(result);
        } else {
          setError("Couldn't detect attendance info. Try a clearer photo.");
        }
        setLoading(false);
        onAnalyzing(false);
      };
    } catch (err) {
      setError("Failed to process image. Try again.");
      setLoading(false);
      onAnalyzing(false);
    }
  }, [onAnalyzing, onResult]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1
  } as any);

  return (
    <div className="space-y-6">
      <div 
        {...getRootProps()} 
        className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all cursor-pointer ${
          isDragActive 
            ? 'border-blue-500 bg-blue-500/5' 
            : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/5 dark:hover:bg-white/5'
        }`}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                <Loader2 size={48} className="text-blue-600 dark:text-blue-500 animate-spin" />
                <Sparkles size={24} className="absolute -top-2 -right-2 text-yellow-500 dark:text-yellow-400 animate-bounce" />
              </div>
              <div>
                <p className="text-xl font-bold text-black dark:text-white">Magic in progress...</p>
                <p className="text-gray-500 dark:text-gray-400">Gemini AI is analyzing your ERP statement</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="p-6 bg-blue-600/10 rounded-3xl text-blue-600 dark:text-blue-400 transition-colors">
                <Upload size={40} />
              </div>
              <div>
                <p className="text-xl font-bold mb-2 text-black dark:text-white">Drop your ERP photo here</p>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto italic font-medium">Upload a screenshot of your attendance table for instant analysis.</p>
              </div>
              <div className="flex items-center gap-4 px-5 py-2.5 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 text-sm font-medium text-gray-700 dark:text-white transition-colors">
                <FileText size={16} />
                <span>Supports JPG, PNG</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm"
        >
          <AlertCircle size={18} />
          {error}
        </motion.div>
      )}
    </div>
  );
}

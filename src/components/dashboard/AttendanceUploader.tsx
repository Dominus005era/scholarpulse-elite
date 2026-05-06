import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, Sparkles, AlertCircle, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeAttendanceImage } from '../../services/geminiService.ts';

interface AttendanceUploaderProps {
  onAnalyzing: (loading: boolean) => void;
  onResult: (data: { present: number; absent: number; reportDate?: string }) => void;
}

export default function AttendanceUploader({ onAnalyzing, onResult }: AttendanceUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
    setError(null);
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const clearAll = () => {
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
    setError(null);
  };

  const startAnalysis = async () => {
    if (files.length === 0) return;

    setLoading(true);
    onAnalyzing(true);
    setError(null);

    try {
      const base64Promises = files.map(fileObj => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(fileObj.file);
          reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
          };
        });
      });

      const base64Images = await Promise.all(base64Promises);
      const result = await analyzeAttendanceImage(base64Images);
      
      if (result) {
        onResult(result);
        clearAll(); // Clear files after successful analysis
      } else {
        setError("AI couldn't detect clear attendance info. Make sure the images show the color-coded table clearly.");
      }
    } catch (err) {
      setError("Failed to process images. Try again.");
    } finally {
      setLoading(false);
      onAnalyzing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] }
  });

  return (
    <div className="space-y-6">
      <div 
        {...getRootProps()} 
        className={`relative border-2 border-dashed rounded-[2rem] p-10 text-center transition-all cursor-pointer ${
          isDragActive 
            ? 'border-blue-500 bg-blue-500/5' 
            : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/5 dark:hover:bg-white/5'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-blue-600/10 rounded-2xl text-blue-600 dark:text-blue-400">
            <Upload size={32} />
          </div>
          <div>
            <p className="text-lg font-bold text-black dark:text-white">
              {files.length > 0 ? "Add more ERP screenshots" : "Drop your ERP screenshots here"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              You can upload multiple images to analyze your full history.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Queue ({files.length})</h3>
              <button 
                onClick={clearAll}
                className="text-xs font-medium text-red-500 hover:text-red-400 flex items-center gap-1"
              >
                <Trash2 size={12} />
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((file, idx) => (
                <motion.div 
                  key={idx}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative aspect-video rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                >
                  <img src={file.preview} alt="preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                    className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </div>

            <button
              disabled={loading}
              onClick={startAnalysis}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                loading 
                ? 'bg-blue-600/50 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 active:scale-[0.98]'
              } text-white`}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Gemini is thinking...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Analyze {files.length} {files.length === 1 ? 'Screenshot' : 'Screenshots'}</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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

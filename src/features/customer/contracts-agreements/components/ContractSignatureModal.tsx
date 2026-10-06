import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Upload, Calendar, RotateCcw} from "lucide-react";
import { ContractSignatureData } from "../types/contractsAgreementsTypes";
import FileIcon from "@/components/icons/customer/FileIcon";

interface ContractSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (signatureData: ContractSignatureData) => void;
  initialOrgName?: string;
  initialPersonName?: string;
}

export const ContractSignatureModal: React.FC<ContractSignatureModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialOrgName = "Coastline Group",
  initialPersonName = "Sarah William",
}) => {
  const [method, setMethod] = useState<"file" | "draw">("draw");
  const [orgName, setOrgName] = useState(initialOrgName);
  const [personName, setPersonName] = useState(initialPersonName);
  const [authority, setAuthority] = useState("Property Owner");
  const [dateOfSignature, setDateOfSignature] = useState("2026-08-16");

  // File upload state
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Setup / resize canvas
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use parent container width
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1D1F20";
    ctx.lineWidth = 2.5;
  }, []);

  useEffect(() => {
    if (isOpen && method === "draw") {
      // Delay slightly for modal layout render
      const timer = setTimeout(() => {
        setupCanvas();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, method, setupCanvas]);

  // Canvas Coordinates Helper
  const getCoordinates = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in event) {
      const touch = event.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  // Drawing Handlers
  const startDrawing = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Prevent scrolling when drawing on touchscreen
    if ("touches" in event && event.cancelable) {
      event.preventDefault();
    }

    const { x, y } = getCoordinates(event);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // File Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File exceeds maximum allowed size of 5MB.");
        setAttachedFile(null);
        return;
      }
      setFileError(null);
      setAttachedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File exceeds maximum allowed size of 5MB.");
        setAttachedFile(null);
        return;
      }
      setFileError(null);
      setAttachedFile(file);
    }
  };

  // Submit Handler
  const handleAcknowledge = () => {
    let signatureUrl = "";
    if (method === "draw" && canvasRef.current && hasDrawn) {
      signatureUrl = canvasRef.current.toDataURL("image/png");
    }

    onConfirm({
      organizationName: orgName,
      authorizedPersonName: personName,
      authority,
      dateOfSignature,
      method,
      signatureDataUrl: signatureUrl || undefined,
      fileName: attachedFile ? attachedFile.name : undefined,
      signedAt: new Date().toLocaleString(),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-card-bg w-full max-w-[560px] rounded-xl shadow-2xl border border-border p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-1 ">
          <h2 className="text-xl md:text-2xl font-medium text-primary-heading">
            Signature
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-secondary-subheading hover:text-txt-primary hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-3">
          {/* Row 1: Org Name + Person Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
                Organization Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Organization Name"
                className="w-full px-3 py-2 border border-border rounded-md text-xs sm:text-sm text-txt-primary bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
                Authorized Person Name
              </label>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Authorized Person Name"
                className="w-full px-3 py-2 border border-border rounded-md text-xs sm:text-sm text-txt-primary bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Row 2: Authority + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
                Authority
              </label>
              <input
                type="text"
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                placeholder="Authority"
                className="w-full px-3 py-2 border border-border rounded-md text-xs sm:text-sm text-txt-primary bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-base md:text-lg font-medium text-primary-heading mb-1.5">
                Date of Signature
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dateOfSignature}
                  onChange={(e) => setDateOfSignature(e.target.value)}
                  className="w-full px-3 py-2 pr-9 border border-border rounded-md text-xs sm:text-sm text-txt-primary bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Calendar className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Method Toggle Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
          <span className="text-base md:text-lg font-medium text-primary-heading">
            Choose Electric Signature Method:
          </span>
          <div className="flex items-center gap-1.5 bg-page-bg p-1 rounded-md border border-border w-fit">
            <button
              type="button"
              onClick={() => setMethod("file")}
              className={`px-3 py-1 rounded text-xs md:text-sm font-medium transition-colors cursor-pointer ${
                method === "file"
                  ? "bg-primary text-white shadow-2xs"
                  : "text-secondary-subheading hover:text-txt-primary"
              }`}
            >
              Attach file
            </button>
            <button
              type="button"
              onClick={() => setMethod("draw")}
              className={`px-3 py-1 rounded text-xs md:text-sm font-medium transition-colors cursor-pointer ${
                method === "draw"
                  ? "bg-primary text-white shadow-2xs"
                  : "text-secondary-subheading hover:text-txt-primary"
              }`}
            >
              Draw signature
            </button>
          </div>
        </div>

        {/* Mode A: Attach file */}
        {method === "file" && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center bg-page-bg/40 space-y-2 hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-primary mb-1">
              <FileIcon/>
            </div>

            <p className="text-sm sm:text-base text-txt-primary font-medium">
              Drag & Drop image or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:underline cursor-pointer font-semibold"
              >
                Browse file
              </button>
            </p>
            <p className="text-xs text-secondary-subheading">
              JPG, PNG or PDF (Max 5MB)
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {attachedFile && (
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-xs text-primary font-medium">
                <span>{attachedFile.name}</span>
                <button
                  type="button"
                  onClick={() => setAttachedFile(null)}
                  className="hover:text-decline ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {fileError && (
              <p className="text-xs text-trend-down mt-1">{fileError}</p>
            )}
          </div>
        )}

        {/* Mode B: Draw signature */}
        {method === "draw" && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              {/* <span className="text-xs font-semibold text-primary-heading">
                Draw your Signature
              </span> */}
              <button
                type="button"
                onClick={clearCanvas}
                className="inline-flex items-center gap-1 text-xs text-secondary-subheading hover:text-txt-primary cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>

            {/* Canvas Box */}
            <div className="border-2 border-dashed border-border rounded-lg relative overflow-hidden bg-white touch-none">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-44 sm:h-52 cursor-crosshair block"
              />

              {/* Watermark / Sign Here Placeholder when empty */}
              {!hasDrawn && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center space-y-4">
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">
                    Sign here
                  </span>
                  <div className="w-48 sm:w-64 h-[1px] bg-slate-200" />
                </div>
              )}
            </div>

            <p className="text-xs md:text-sm text-secondary-subheading text-center pt-0.5">
              Use your mouse or finger to draw your signature above
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-10 border border-border text-secondary-subheading hover:bg-slate-50 rounded-md text-xs md:text-sm sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAcknowledge}
            className="flex-1 h-10 bg-primary hover:bg-primary-hover text-white rounded-md text-xs md:text-sm font-medium transition-colors cursor-pointer shadow-2xs flex items-center justify-center"
          >
            Acknowledged
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractSignatureModal;

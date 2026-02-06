"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Eye,
  Save,
  ZoomIn,
  ZoomOut,
  Undo2,
  Redo2,
  LayoutGrid,
  Layers,
  ImageIcon,
  ShieldCheck,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  CaseUpper,
  Trash2,
  ChevronUp,
  ChevronDown,
  QrCode,
  MoreVertical,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";

const DYNAMIC_FIELDS = [
  "{student_name}",
  "{course_title}",
  "{completion_date}",
  "{certificate_id}",
];

const CANVAS_WIDTH = 842;
const CANVAS_HEIGHT = 595;
const PRIMARY_COLOR = "#0F49BD";

export default function CertificateDesignPage() {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    "landscape"
  );
  const [zoom, setZoom] = useState(85);
  const [templateName, setTemplateName] = useState(
    "IMETS Certificate Builder Professional Template v2.1"
  );
  const [selectedElement, setSelectedElement] = useState<string | null>(
    "{student_name}"
  );
  const [fontSize, setFontSize] = useState(36);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">(
    "center"
  );
  const [underline, setUnderline] = useState(true);
  const [bold, setBold] = useState(true);
  const elementCount = 12;

  const canvasScale = zoom / 100;
  const isLandscape = orientation === "landscape";
  const w = isLandscape ? CANVAS_WIDTH : CANVAS_HEIGHT;
  const h = isLandscape ? CANVAS_HEIGHT : CANVAS_WIDTH;

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Header */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/admin/certificates"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Back to certificates"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            </Link>
            <div className="w-8 h-8 rounded-lg bg-admin-primary flex items-center justify-center text-white font-bold text-sm">
              +
            </div>
            <span className="font-semibold text-gray-900 truncate">
              {templateName}
            </span>
            <button
              type="button"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Edit template name"
            >
              <Pencil className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOrientation("landscape")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                orientation === "landscape"
                  ? "bg-admin-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Landscape
            </button>
            <button
              type="button"
              onClick={() => setOrientation("portrait")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                orientation === "portrait"
                  ? "bg-admin-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Portrait
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" strokeWidth={2} />
              Preview
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-admin-primary text-white font-semibold hover:bg-admin-primary-hover transition-colors"
            >
              <Save className="h-4 w-4" strokeWidth={2} />
              Save Template
            </button>
          </div>
        </div>
        {/* Toolbar: zoom, undo/redo, grid, layers */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(25, z - 10))}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" strokeWidth={2} />
            </button>
            <span className="min-w-[3rem] text-center text-sm font-medium text-gray-700">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(150, z + 10))}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
          <button
            type="button"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Undo"
          >
            <Undo2 className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Redo"
          >
            <Redo2 className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Grid"
          >
            <LayoutGrid className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Layers"
          >
            <Layers className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Main: sidebars + canvas */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Elements Library */}
        <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Elements Library
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Media & Branding
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-admin-primary hover:text-admin-primary transition-colors"
                >
                  <ImageIcon className="h-6 w-6" strokeWidth={2} />
                  <span className="text-xs font-medium">Add Logo</span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-admin-primary hover:text-admin-primary transition-colors"
                >
                  <ShieldCheck className="h-6 w-6" strokeWidth={2} />
                  <span className="text-xs font-medium">Seal</span>
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Typography
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-200 rounded-lg text-gray-600 hover:border-admin-primary hover:bg-admin-primary/5 transition-colors"
                >
                  <Type className="h-6 w-6" strokeWidth={2} />
                  <span className="text-xs font-medium">Heading Text</span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-200 rounded-lg text-gray-600 hover:border-admin-primary hover:bg-admin-primary/5 transition-colors"
                >
                  <span className="text-lg font-serif leading-tight">¶</span>
                  <span className="text-xs font-medium">Paragraph</span>
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Dynamic Fields
              </p>
              <div className="flex flex-wrap gap-2">
                {DYNAMIC_FIELDS.map((field) => (
                  <button
                    key={field}
                    type="button"
                    onClick={() => setSelectedElement(field)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedElement === field
                        ? "bg-admin-primary text-white border-admin-primary"
                        : "bg-white border-admin-primary text-admin-primary hover:bg-admin-primary/5"
                    }`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Verification
              </p>
              <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <QrCode className="h-5 w-5 text-gray-500" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">
                    Verification QR
                  </p>
                </div>
                <button
                  type="button"
                  className="p-1.5 rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Options"
                >
                  <MoreVertical className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Canvas */}
        <main className="flex-1 min-w-0 flex items-center justify-center p-6 overflow-auto bg-gray-200/80">
          <div
            className="bg-white shadow-lg rounded-sm relative overflow-hidden"
            style={{
              width: w * canvasScale,
              height: h * canvasScale,
              border: "1px solid #e5e7eb",
              boxShadow: "0 0 0 2px rgba(15, 73, 189, 0.15)",
            }}
          >
            <div
              className="bg-white text-center absolute top-0 left-0"
              style={{
                width: w,
                height: h,
                transform: `scale(${canvasScale})`,
                transformOrigin: "top left",
                border: "2px solid #0F49BD",
              }}
            >
              {/* Certificate content */}
              <div className="absolute inset-0 p-12 flex flex-col items-center">
                <div className="w-14 h-14 rounded border-2 border-admin-primary bg-emerald-800/90 mb-6" />
                <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-2">
                  CERTIFICATE OF COMPLETION
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  THIS IS TO CERTIFY THAT
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedElement("{student_name}")}
                  className={`font-bold text-admin-primary border-b-2 border-admin-primary mb-4 transition-colors ${
                    selectedElement === "{student_name}"
                      ? "ring-2 ring-admin-primary ring-offset-2 rounded"
                      : ""
                  }`}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {"{student_name}"}
                </button>
                <p className="text-sm text-gray-600 mb-2 max-w-md">
                  has successfully completed all requirements for the
                  professional course
                </p>
                <p className="text-lg font-bold text-gray-800 mb-6">
                  {"{course_title}"}
                </p>
                <div className="w-24 h-24 rounded border-2 border-admin-primary bg-gray-700 flex items-center justify-center mb-2">
                  <QrCode className="h-12 w-12 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-10">
                  Verify authenticity
                </p>
                <div className="absolute bottom-12 left-12 right-12 flex justify-between text-gray-600">
                  <div>
                    <p className="font-medium">Academy Director</p>
                    <div className="w-32 border-t border-gray-400 mt-1 pt-1" />
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Authorized Signature
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Oct 24, 2023</p>
                    <div className="w-24 border-t border-gray-400 mt-1 pt-1 ml-auto" />
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Issue Date
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right: Properties */}
        <aside className="w-72 flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Properties
          </h2>
          <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-admin-primary/10 text-admin-primary mb-4">
            Element Selected
          </span>
          <div className="mb-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">Dynamic Name Field</p>
            <p className="font-medium text-gray-900">
              {selectedElement ?? "—"}
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Typography
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Font Family
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary bg-white">
                    <option>Lexend (Display)</option>
                    <option>Inter</option>
                    <option>Geist Sans</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Alignment
                  </label>
                  <div className="flex gap-1">
                    {(["left", "center", "right"] as const).map((align) => (
                      <button
                        key={align}
                        type="button"
                        onClick={() => setAlignment(align)}
                        className={`p-2 rounded-lg border transition-colors ${
                          alignment === align
                            ? "bg-admin-primary text-white border-admin-primary"
                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {align === "left" && (
                          <AlignLeft className="h-4 w-4" strokeWidth={2} />
                        )}
                        {align === "center" && (
                          <AlignCenter className="h-4 w-4" strokeWidth={2} />
                        )}
                        {align === "right" && (
                          <AlignRight className="h-4 w-4" strokeWidth={2} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Font Size
                  </label>
                  <input
                    type="text"
                    value={`${fontSize}px`}
                    onChange={(e) => {
                      const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
                      if (!Number.isNaN(n))
                        setFontSize(Math.max(8, Math.min(120, n)));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                  />
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className={`p-2 rounded-lg border transition-colors ${
                      bold
                        ? "bg-gray-200 border-gray-300"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setBold(!bold)}
                  >
                    <Bold className="h-4 w-4" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    <Italic className="h-4 w-4" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    className={`p-2 rounded-lg border transition-colors ${
                      underline
                        ? "bg-admin-primary/10 border-admin-primary text-admin-primary"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setUnderline(!underline)}
                  >
                    <Underline className="h-4 w-4" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    <CaseUpper className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Color
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg border-2 border-gray-300 shrink-0"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                />
                <span className="text-sm text-gray-600">Primary</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Arrangement
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <ChevronUp className="h-4 w-4" strokeWidth={2} />
                  Bring Front
                </button>
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <ChevronDown className="h-4 w-4" strokeWidth={2} />
                  Send Back
                </button>
              </div>
            </div>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" strokeWidth={2} />
              Delete Element
            </button>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Autosaved 2 min ago
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-admin-primary transition-colors"
          >
            <HelpCircle className="h-4 w-4" strokeWidth={2} />
            Help Center
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span>
            {w} × {h} px ({isLandscape ? "A4 Landscape" : "A4 Portrait"})
          </span>
          <span>Elements: {elementCount}</span>
        </div>
      </footer>
    </div>
  );
}

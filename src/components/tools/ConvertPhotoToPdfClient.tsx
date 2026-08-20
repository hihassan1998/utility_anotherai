"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/components/Icon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import confetti from "canvas-confetti";

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: string;
  src: string;
}

const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const loadImageAndConvertToCanvas = (file: File): Promise<{ dataUrl: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          try {
            const dataUrl = canvas.toDataURL("image/png");
            resolve({ dataUrl, width: img.naturalWidth, height: img.naturalHeight });
          } catch (err) {
            resolve({ dataUrl: e.target?.result as string, width: img.naturalWidth || 800, height: img.naturalHeight || 600 });
          }
        } else {
          resolve({ dataUrl: e.target?.result as string, width: img.naturalWidth || 800, height: img.naturalHeight || 600 });
        }
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
};

export function ConvertPhotoToPdfClient() {
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [pageSize, setPageSize] = React.useState<"a4" | "letter" | "fit">("a4");
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape" | "auto">("auto");
  const [margin, setMargin] = React.useState<"none" | "small" | "medium">("none");
  const [imageFit, setImageFit] = React.useState<"contain" | "stretch">("contain");
  const [fileName, setFileName] = React.useState("anotool-img-2-pdf.pdf");
  
  const [isConverting, setIsConverting] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  
  const [pdfBlobUrl, setPdfBlobUrl] = React.useState<string | null>(null);
  const [convertedSize, setConvertedSize] = React.useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const dragCounter = React.useRef(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFiles = React.useCallback((newFiles: FileList | File[]) => {
    setErrorMsg(null);
    const validFormats = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "image/bmp",
      "image/x-icon",
      "image/tiff",
      "image/avif"
    ];
    
    const acceptedItems: FileItem[] = [];
    const errors: string[] = [];

    Array.from(newFiles).forEach((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      const isImage = file.type.startsWith("image/") || 
        ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico", "tiff", "tif", "avif"].includes(extension || "");

      if (!isImage) {
        errors.push(`"${file.name}" is not a supported image file.`);
        return;
      }

      const id = Math.random().toString(36).substring(2, 9);
      const newItem: FileItem = {
        id,
        file,
        name: file.name,
        size: formatSize(file.size),
        src: ""
      };
      
      acceptedItems.push(newItem);

      const reader = new FileReader();
      reader.onload = (e) => {
        setFiles((prev) => 
          prev.map((item) => 
            item.id === id ? { ...item, src: e.target?.result as string } : item
          )
        );
      };
      reader.readAsDataURL(file);
    });

    if (errors.length > 0) {
      setErrorMsg(errors.join(" "));
    }

    if (acceptedItems.length > 0) {
      setFiles((prev) => [...prev, ...acceptedItems]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  // List actions
  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
    setPdfBlobUrl(null);
    setConvertedSize("");
    setProgress(0);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Convert to PDF compilation
  const convertToPdf = async () => {
    if (files.length === 0) return;
    setIsConverting(true);
    setProgress(5);

    try {
      // Dynamically load jsPDF to avoid compilation warnings on SSR
      const { jsPDF } = await import("jspdf");

      const doc = new jsPDF({
        orientation: orientation === "auto" ? "portrait" : orientation,
        unit: "pt",
        format: pageSize === "fit" ? "a4" : pageSize
      });

      for (let i = 0; i < files.length; i++) {
        const fileItem = files[i];
        // Calculate progress increments
        setProgress(Math.round(((i + 1) / files.length) * 90));

        // Load image details
        const { dataUrl, width, height } = await loadImageAndConvertToCanvas(fileItem.file);

        let pW = 595.28; // standard A4
        let pH = 841.89;

        if (pageSize === "letter") {
          pW = 612;
          pH = 792;
        } else if (pageSize === "fit") {
          pW = width * 0.75;
          pH = height * 0.75;
        }

        let pageOrientation: "portrait" | "landscape" = "portrait";
        if (pageSize !== "fit") {
          if (orientation === "auto") {
            pageOrientation = width > height ? "landscape" : "portrait";
          } else {
            pageOrientation = orientation as "portrait" | "landscape";
          }

          if (pageOrientation === "landscape") {
            const temp = pW;
            pW = pH;
            pH = temp;
          }
        }

        doc.addPage([pW, pH], pageOrientation);

        let marginPt = 0;
        if (pageSize !== "fit") {
          if (margin === "small") marginPt = 36;
          else if (margin === "medium") marginPt = 72;
        }

        const aW = pW - 2 * marginPt;
        const aH = pH - 2 * marginPt;
        const aRatio = aW / aH;
        const imgRatio = width / height;

        let tW = aW;
        let tH = aH;
        let tX = marginPt;
        let tY = marginPt;

        if (pageSize !== "fit" && imageFit === "contain") {
          if (imgRatio > aRatio) {
            tW = aW;
            tH = aW / imgRatio;
            tX = marginPt;
            tY = marginPt + (aH - tH) / 2;
          } else {
            tW = aH * imgRatio;
            tH = aH;
            tX = marginPt + (aW - tW) / 2;
            tY = marginPt;
          }
        }

        doc.addImage(dataUrl, "PNG", tX, tY, tW, tH, undefined, "FAST");
      }

      // Delete the first empty page created by default
      doc.deletePage(1);

      setProgress(100);

      // Generate Blob URL for preview/download
      const pdfBlob = doc.output("blob");
      const sizeStr = formatSize(pdfBlob.size);
      const url = URL.createObjectURL(pdfBlob);

      setPdfBlobUrl(url);
      setConvertedSize(sizeStr);
      setIsConverting(false);

      // Celebrate!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to compile PDF. Please check your image files.");
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlobUrl) return;
    const cleanName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    const link = document.createElement("a");
    link.href = pdfBlobUrl;
    link.download = cleanName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {errorMsg && (
        <Alert variant="destructive" className="border-destructive/30 bg-destructive/5 rounded-xl">
          <Icon name="AlertTriangle" size={16} className="text-destructive" />
          <AlertTitle className="text-sm font-bold uppercase tracking-wide">Validation Error</AlertTitle>
          <AlertDescription className="text-xs font-semibold leading-relaxed">
            {errorMsg}
          </AlertDescription>
        </Alert>
      )}

      {/* Success View */}
      {pdfBlobUrl ? (
        <Card className="border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-2xl shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center animate-bounce">
              <Icon name="Check" size={32} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                PDF Converted Successfully!
              </h2>
              <p className="text-xs font-medium text-muted-foreground">
                Your images were merged into a single PDF document locally.
              </p>
            </div>

            <div className="inline-flex flex-col items-center p-4 bg-background border border-border/80 rounded-xl space-y-1">
              <span className="text-sm font-bold text-foreground truncate max-w-xs sm:max-w-sm">
                {fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`}
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                {files.length} {files.length === 1 ? "Page" : "Pages"} • {convertedSize}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                onClick={handleDownload}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <Icon name="Download" size={16} />
                Download PDF File
              </Button>
              <Button
                variant="outline"
                onClick={clearAll}
                className="w-full sm:w-auto text-xs font-semibold border-border hover:bg-accent px-6 py-2.5 rounded-xl flex items-center justify-center gap-2"
              >
                <Icon name="RefreshCw" size={14} />
                Convert More Images
              </Button>
            </div>

            {/* SEO External Helper Recommendation */}
            <div className="border-t border-border/40 pt-6 mt-6 text-left max-w-md mx-auto space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                Looking for more PDF features?
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If you need to compress PDF sizes, split pages, protect documents, or run OCR text recognition, check out the powerful online tools at{" "}
                <a
                  href="https://www.ilovepdf.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 font-bold hover:underline inline-flex items-center gap-0.5"
                >
                  iLovePDF
                  <Icon name="ExternalLink" size={10} />
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Work View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Upload Zone */}
            {files.length === 0 ? (
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 select-none flex flex-col items-center justify-center space-y-4 ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-500/5 scale-[0.99]"
                    : "border-border/80 hover:border-emerald-500/40 hover:bg-muted/10"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                  <Icon name="FileImage" size={28} />
                </div>
                
                <div className="space-y-1.5">
                  <span className="text-sm font-bold text-foreground block">
                    Drag & Drop Images Here
                  </span>
                  <span className="text-xs text-muted-foreground block font-medium">
                    or click to browse from your device
                  </span>
                </div>

                <div className="text-[10px] text-muted-foreground font-semibold bg-muted/40 border border-border/60 px-3 py-1 rounded-full uppercase tracking-wider">
                  JPG, PNG, WebP, GIF, SVG, BMP, AVIF, TIFF, ICO
                </div>
              </div>
            ) : (
              /* Uploaded Files List */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Icon name="FileImage" size={14} className="text-emerald-500" />
                    Uploaded Photos ({files.length})
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="h-8 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Icon name="Trash2" size={14} className="mr-1.5" />
                    Clear All
                  </Button>
                </div>

                {/* Vertical list of image cards */}
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                  {files.map((fileItem, index) => (
                    <Card key={fileItem.id} className="border-border/60 hover:border-border transition-colors rounded-xl shadow-sm overflow-hidden">
                      <CardContent className="p-3 sm:p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 truncate">
                          {/* Thumbnail preview */}
                          <div className="w-14 h-14 bg-muted/30 border border-border/40 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                            {fileItem.src ? (
                              <img
                                src={fileItem.src}
                                alt={fileItem.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="animate-pulse w-full h-full bg-muted/60" />
                            )}
                          </div>
                          <div className="truncate">
                            <span className="text-xs font-bold text-foreground block truncate">
                              {fileItem.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-semibold">
                              {fileItem.size}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          {/* Move up */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                            className="w-7 h-7 hover:bg-accent rounded-md"
                            aria-label="Move image up in sequence"
                          >
                            <Icon name="ChevronUp" size={16} />
                          </Button>
                          {/* Move down */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveDown(index)}
                            disabled={index === files.length - 1}
                            className="w-7 h-7 hover:bg-accent rounded-md"
                            aria-label="Move image down in sequence"
                          >
                            <Icon name="ChevronDown" size={16} />
                          </Button>
                          {/* Delete */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(fileItem.id)}
                            className="w-7 h-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md"
                            aria-label="Remove image from list"
                          >
                            <Icon name="X" size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add more button */}
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-11 border-dashed border-2 hover:border-emerald-500/40 hover:bg-muted/10 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Icon name="Plus" size={14} />
                  Add More Images
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                </Button>
              </div>
            )}
          </div>

          {/* Settings Sidebar */}
          <div className="lg:col-span-4">
            <Card className="border-border/60 rounded-2xl shadow-sm sticky top-24 bg-card">
              <CardContent className="p-5 sm:p-6 space-y-5">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/40 pb-3">
                  <Icon name="Settings" size={14} className="text-emerald-500" />
                  PDF Export Settings
                </h3>

                <div className="space-y-4">
                  {/* File Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="pdf-filename" className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                      PDF File Name
                    </Label>
                    <Input
                      id="pdf-filename"
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      placeholder="anotool-img-2-pdf.pdf"
                      className="bg-muted/20 border-border/80 rounded-xl focus-visible:ring-emerald-500 text-xs h-9 font-medium"
                    />
                  </div>

                  {/* Page Size */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                      Page Size
                    </Label>
                    <Select
                      value={pageSize}
                      onValueChange={(val) => setPageSize(val as "a4" | "letter" | "fit")}
                    >
                      <SelectTrigger className="w-full bg-muted/20 border-border/80 rounded-xl focus:ring-emerald-500 text-xs h-9 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="a4" className="text-xs">A4 (Standard)</SelectItem>
                        <SelectItem value="letter" className="text-xs">US Letter</SelectItem>
                        <SelectItem value="fit" className="text-xs">Fit Image (No Resizing)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Orientation */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                      Page Orientation
                    </Label>
                    <Select
                      value={orientation}
                      onValueChange={(val) => setOrientation(val as "portrait" | "landscape" | "auto")}
                      disabled={pageSize === "fit"}
                    >
                      <SelectTrigger className="w-full bg-muted/20 border-border/80 rounded-xl focus:ring-emerald-500 text-xs h-9 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="auto" className="text-xs">Auto (Detect)</SelectItem>
                        <SelectItem value="portrait" className="text-xs">Vertical (Portrait)</SelectItem>
                        <SelectItem value="landscape" className="text-xs">Horizontal (Landscape)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Margins */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                      Margins
                    </Label>
                    <Select
                      value={margin}
                      onValueChange={(val) => setMargin(val as "none" | "small" | "medium")}
                      disabled={pageSize === "fit"}
                    >
                      <SelectTrigger className="w-full bg-muted/20 border-border/80 rounded-xl focus:ring-emerald-500 text-xs h-9 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="none" className="text-xs">None (0pt)</SelectItem>
                        <SelectItem value="small" className="text-xs">Small (36pt / 0.5")</SelectItem>
                        <SelectItem value="medium" className="text-xs">Medium (72pt / 1.0")</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Image Fit */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                      Image Layout Fit
                    </Label>
                    <Select
                      value={imageFit}
                      onValueChange={(val) => setImageFit(val as "contain" | "stretch")}
                      disabled={pageSize === "fit"}
                    >
                      <SelectTrigger className="w-full bg-muted/20 border-border/80 rounded-xl focus:ring-emerald-500 text-xs h-9 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="contain" className="text-xs">Fit to Page (Keep Aspect Ratio)</SelectItem>
                        <SelectItem value="stretch" className="text-xs">Stretch to Page (No Aspect Ratio)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isConverting && (
                  <div className="space-y-1.5 pt-2 animate-pulse">
                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                      <span>Compiling Pages...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted border border-border/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button
                  onClick={convertToPdf}
                  disabled={files.length === 0 || isConverting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 rounded-xl flex items-center justify-center gap-2 shadow-md pt-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name={isConverting ? "RefreshCw" : "FileText"} size={16} className={isConverting ? "animate-spin" : ""} />
                  {isConverting ? "Generating PDF..." : "Convert to PDF"}
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      )}
    </div>
  );
}

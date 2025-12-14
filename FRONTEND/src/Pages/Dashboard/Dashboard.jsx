import style from "./Dashboard.module.scss";
import logoImg from "../../assets/logo.png";
import overlay_Img from "../../assets/overlapping_Img.png";
import { Volume2, Copy, ImageUp, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

const Dashboard = () => {
  const [file, setfile] = useState(null);
  const [previewUrl, setpreviewUrl] = useState(null);
  const [caption, setcaption] = useState("");
  const [loading, setloading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setfile(selectedFile);
      setpreviewUrl(URL.createObjectURL(selectedFile));
      setcaption("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setfile(droppedFile);
      setpreviewUrl(URL.createObjectURL(droppedFile));
      setcaption("");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleGenerateCaption = async () => {
    if (!file) return;

    setloading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setcaption(data.post.caption);
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Error generating caption:", err);
      alert("Failed to connect to backend!");
    } finally {
      setloading(false);
    }
  };

  const copyToClipboard = () => {
    if (caption) {
      navigator.clipboard.writeText(caption);
      alert("Caption copied!");
    }
  };
  return (
    <div className={style.dashboardContainer}>
      <div className={style.navbar}>
        <div className={style.logo}>
          <img src={logoImg} alt="logo Img" />
          <p>
            Caption<span>AI</span>
          </p>
        </div>
      </div>

      <div className={style.uploadContainer}>
        <div
          className={style.uploadArea}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
          />
          <p className={style.headerMobileText}>Upload an Image</p>
          <div className={style.demoImage}>
            <img
              src={previewUrl || overlay_Img}
              alt="Preview"
              style={
                previewUrl
                  ? { rotate: "0deg", objectFit: "contain", maxHeight: "100%" }
                  : {}
              }
            />
          </div>
          <div className={style.right}>
            <p className={style.headerDesktop}>Upload an Image</p>
            <ImageUp className={style.uploadIconDesktop} />
            <p className={style.label}>Drag & Drop or Click to Browser</p>
          </div>
        </div>
        <button
          className={style.generateBtn}
          onClick={handleGenerateCaption}
          disabled={!file || loading}
          style={{
            opacity: file ? 1 : 0.5,
            cursor: file ? "pointer" : "not-allowed",
            border: "none", // Reset default button border
            fontFamily: "inherit", // Keep font consistent
          }}
        >
          {loading ? "Generating..." : "Generate Caption"}
        </button>
      </div>

      <div className={style.captionContainer}>
        <div className={style.header}>
          <p className={style.left}>Generated Caption</p>
          <Volume2 className={style.icon} />
        </div>
        <div className={style.captionArea}>
          <p className={style.captionText}>
            {caption || 'Upload an image to see the magic here...'}
          </p>
        </div>
        <div className={style.actionsBtn}>
          <div className={style.copyBtn} onClick={copyToClipboard}>
            <Copy className={style.icon} />
            <p>Copy Caption</p>
          </div>
          <div className="shareBtn"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

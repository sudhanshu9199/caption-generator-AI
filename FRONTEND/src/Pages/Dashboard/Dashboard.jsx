import style from "./Dashboard.module.scss";
import logoImg from "../../assets/logo.png";
import overlay_Img from "../../assets/overlapping_Img.png";
import { Volume2, Copy, ImageUp } from "lucide-react";

const Dashboard = () => {
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
        <div className={style.uploadArea}>
          <p className={style.headerMobileText}>Upload an Image</p>
          <div className={style.demoImage}>
            <img src={overlay_Img} alt="" />
          </div>
          <div className={style.right}>
            <p className={style.headerDesktop}>Upload an Image</p>
            <ImageUp className={style.uploadIconDesktop}/>
            <p className={style.label}>Drag & Drop or Click to Browser</p>
          </div>
        </div>
        <p className={style.generateBtn}>Generate Caption</p>
      </div>

      <div className={style.captionContainer}>
        <div className={style.header}>
          <p className={style.left}>Generated Caption</p>
          <Volume2 className={style.icon} />
        </div>
        <div className={style.captionArea}>
          <p className={style.captionText}>
            A breathtaking view of the sun setting behind a rugged mountain
            range, casting warm golden and orange hues across the sky.
          </p>
        </div>
        <div className={style.actionsBtn}>
          <div className={style.copyBtn}>
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

import { useEffect, useState } from 'react';
import './App.css';

// منطق Pi SDK غير ضروري لـ Vercel، لكن نحتاجه لبقية المنطق
declare const Pi: any; 

const words = ["Elite", "Titan", "Luxury", "Innovation", "Pi Ecosystem", "Future"];

function App() {
  const [dynamicText, setDynamicText] = useState(words[0]);

  useEffect(() => {
    // 1. منطق النص المتحرك (Dynamic Text)
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % words.length;
      setDynamicText(words[i]);
    }, 1800);

    // 2. منطق تبديل الثيم (Theme Toggle)
    const themeToggle = document.getElementById("themeToggle");
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme === "light") {
      document.body.classList.add("light-mode");
      if (themeToggle) themeToggle.textContent = "Dark Mode";
    }

    const handleThemeToggle = () => {
      document.body.classList.toggle("light-mode");
      const isLightMode = document.body.classList.contains("light-mode");
      
      if (themeToggle) themeToggle.textContent = isLightMode ? "Dark Mode" : "Light Mode";
      localStorage.setItem("theme", isLightMode ? "light" : "dark");
    };
    
    if (themeToggle) {
        themeToggle.addEventListener("click", handleThemeToggle);
    }


    // 3. منطق طي وفتح الأقسام (Categories Collapse)
    const categoryHeaders = document.querySelectorAll('.cat h3');
    const handleCategoryToggle = (event: Event) => {
        const h3 = event.currentTarget as HTMLElement;
        h3.classList.toggle('open');
        h3.nextElementSibling?.classList.toggle('open');
    };

    categoryHeaders.forEach(h => {
        h.addEventListener('click', handleCategoryToggle);
    });

    // 4. منطق الخلفية (Canvas Particles)
    const canvas = document.getElementById('bg') as HTMLCanvasElement, 
          ctx = canvas?.getContext('2d');
    
    if (canvas && ctx) {
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const particles = Array.from({length:150},()=>({
        x:Math.random()*canvas.width, y:Math.random()*canvas.height,
        r:Math.random()*2.5+1, dx:(Math.random()-0.5)*1, dy:(Math.random()-0.5)*1
      }));
      
      const anim = () => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p=>{
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fillStyle="rgba(0,198,255,0.7)"; ctx.fill();
          p.x += p.dx; p.y += p.dy;
          if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
          if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(anim);
      };
      
      anim();
      
      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', resizeCanvas);
        if (themeToggle) themeToggle.removeEventListener("click", handleThemeToggle);
        categoryHeaders.forEach(h => h.removeEventListener('click', handleCategoryToggle));
      };
    }
    
    return () => clearInterval(interval);
  }, []); 

  // --- Pi Network SDK (Stubbed to prevent errors) ---
  const handlePiAuth = () => {
    if (typeof Pi !== 'undefined') {
      Pi.authenticate(['username'], ()=>{}).then((a: any) => alert("Welcome " + a.user.username)).catch(() => alert("Failed"));
    } else {
      alert("Pi SDK not loaded.");
    }
  };
  
  const handlePiPayment = () => {
    if (typeof Pi !== 'undefined') {
      Pi.createPayment({amount:0.01,memo:"TEC Test"},{
        onReadyForServerApproval:()=>alert("Approve in wallet"),
        onReadyForServerCompletion:(p: any,t: any)=>alert("Paid! TXID: "+t),
        onCancel:()=>alert("Cancelled")
      });
    } else {
      alert("Pi SDK not loaded.");
    }
  };

  return (
    <>
      <title>TEC | Titan Elite Commerce</title> {/* Title for browser tab */}
      <button id="themeToggle">Light Mode</button>
      <canvas id="bg"></canvas>

      <header>
        <div className="logo-tec">TEC</div>
        <h1>Titan Elite Commerce</h1>
        <div className="dynamic-text" id="dynamicText">{dynamicText}</div>
        <p>Official Luxury Commerce & Finance Ecosystem on Pi Network</p>
        
        <a href="https://tec.pi/" className="btn">Back to Home</a>
        
        <a href="#" onClick={handlePiAuth} className="btn pi-btn">Login with Pi</a>
        <a href="#" onClick={handlePiPayment} className="btn pi-btn">Test Payment</a>
      </header>

      <section className="categories">
        {/* Commerce & Finance */}
        <div className="cat"><h3>Commerce & Finance</h3><div className="subdomains"><div className="grid">
          <a href="commerce/" className="item">Commerce</a>
          <a href="ecommerce/" className="item">Ecommerce</a>
          <a href="assets/" className="item">Assets</a>
          <a href="fundx/" className="item">Fundx</a>
          <a href="dx/" className="item">Dx</a>
          <a href="analytics/" className="item">Analytics</a>
          <a href="nbf/" className="item">Nbf</a>
        </div></div></div>

        {/* Lifestyle & Elite */}
        <div className="cat"><h3>Lifestyle & Elite</h3><div className="subdomains"><div className="grid">
          <a href="life/" className="item">Life</a>
          <a href="estate/" className="item">Estate</a>
          <a href="vip/" className="item">VIP</a>
          <a href="elite/" class="item">Elite</a>
          <a href="titan/" className="item">Titan</a>
          <a href="legend/" className="item">Legend</a>
          <a href="epic/" className="item">Epic</a>
        </div></div></div>

        {/* Technology & Tools */}
        <div className="cat"><h3>Technology & Tools</h3><div className="subdomains"><div className="grid">
          <a href="nx/" className="item">Nx</a>
          <a href="tec/" className="item">TEC</a>
          <a href="explorer/" class="item">Explorer</a>
          <a href="system/" className="item">System</a>
          <a href="alert/" className="item">Alert</a>
          <a href="connection/" className="item">Connection</a>
        </div></div></div>

        {/* Network & Partners */}
        <div className="cat"><h3>Network & Partners</h3><div className="subdomains"><div className="grid">
          <a href="nexus/" className="item">Nexus</a>
          <a href="brookfield/" className="item">Brookfield</a>
          <a href="sab/" className="item">SAB</a>
          <a href="zone/" className="item">Zone</a>
          <a href="insure/" className="item">Insure</a>
        </div></div></div>
      </section>

      {/* Footer Contact */}
      <footer>
        <div style={{maxWidth:'1400px', margin:'0 auto', textAlign:'center'}}>
          <h3 style={{fontSize:'2.4rem', marginBottom:'50px', 
            background:'linear-gradient(90deg,#00ff9d,#00c6ff)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Contact / Get in Touch
          </h3>
          <div className="contact-grid">
            <a href="mailto:info@tec.pi" className="contact-item">✉️ Email: info@tec.pi</a>
            <a href="https://t.me/tec_support" target="_blank" className="contact-item">✈️ Telegram Support</a>
            <a href="https://discord.gg/tec" target="_blank" className="contact-item">💬 Discord Community</a>
          </div>
          <p style={{opacity:0.7, marginTop:'50px'}}>© 2025 Titan Elite Commerce — All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;

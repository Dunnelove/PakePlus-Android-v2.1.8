window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>星际浪人 v1.4.7 - 神明再临</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;700;900&family=Noto+Sans+SC:wght@400;700;900&display=swap');

        :root {
            --c-primary: #00e5ff;
            --c-accent: #ff0055;
            --c-warn: #ffea00;
            --c-success: #00ffaa;
            --c-bg: #030308;
            --c-panel: rgba(10, 12, 20, 0.95);
        }

        /* 基础配置：配合 JS 动态调整 html 的 font-size，实现全局 UI 完美等比缩放 */
        html { font-size: 16px; }

        body {
            margin: 0; overflow: hidden; background-color: var(--c-bg); color: #fff;
            font-family: 'Rajdhani', 'Noto Sans SC', sans-serif; touch-action: none; user-select: none;
        }

        body::before {
            content: " "; display: block; position: absolute; top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 255, 0, 0.04));
            z-index: 999; background-size: 100% 3px, 3px 100%; pointer-events: none;
            box-shadow: inset 0 0 100px rgba(0,0,0,0.9);
        }

        canvas {
            display: block; margin: 0 auto;
            box-shadow: 0 0 120px rgba(0, 229, 255, 0.15);
            border-left: 1px solid rgba(0, 229, 255, 0.2); 
            border-right: 1px solid rgba(0, 229, 255, 0.2);
            background: #020205; 
        }

        h1, h2, h3, .btn, .orbitron { font-family: 'Orbitron', 'Noto Sans SC', sans-serif; }

        .neon-text-primary { color: #fff; text-shadow: 0 0 5px var(--c-primary), 0 0 10px var(--c-primary), 0 0 20px var(--c-primary), 0 0 40px var(--c-primary); }
        .neon-text-warn { color: #fff; text-shadow: 0 0 5px var(--c-warn), 0 0 10px var(--c-warn), 0 0 20px var(--c-warn); }
        .neon-text-accent { color: #fff; text-shadow: 0 0 5px var(--c-accent), 0 0 10px var(--c-accent), 0 0 20px var(--c-accent), 0 0 40px var(--c-accent); }

        @keyframes neon-flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { text-shadow: -2px -2px 0 #fff, 2px 2px 0 #fff, 0 0 10px var(--c-primary), 0 0 20px var(--c-primary), 0 0 40px var(--c-primary), 0 0 80px var(--c-primary); opacity: 1; }
            20%, 24%, 55% { text-shadow: none; opacity: 0.5; }
        }

        .screen {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            display: none; flex-direction: column; align-items: center; justify-content: center;
            pointer-events: auto; z-index: 10;
            background: rgba(3, 4, 8, 0.95); backdrop-filter: blur(8px);
            transition: opacity 0.3s; overflow: hidden; 
        }
        .screen.active { display: flex; }

        /* 全面将核心组件的 px 替换为 rem 以适配缩放引擎 */
        .btn {
            position: relative; background: rgba(0, 229, 255, 0.05); border: 0.0625rem solid rgba(0, 229, 255, 0.4);
            border-left: 0.25rem solid var(--c-primary); color: var(--c-primary);
            padding: 0.75rem 2.5rem; margin: 0.5rem; font-size: 1rem; font-weight: 900; letter-spacing: 0.125rem;
            cursor: pointer; text-transform: uppercase;
            clip-path: polygon(0.9375rem 0, 100% 0, 100% calc(100% - 0.9375rem), calc(100% - 0.9375rem) 100%, 0 100%, 0 0.9375rem);
            transition: all 0.2s ease;
            box-shadow: 0 0 15px rgba(0, 229, 255, 0.15), inset 0 0 10px rgba(0, 229, 255, 0.1);
            text-shadow: 0 0 5px var(--c-primary);
        }
        .btn:hover:not(:disabled) {
            background: var(--c-primary); color: #000;
            box-shadow: 0 0 30px rgba(0, 229, 255, 0.8), inset 0 0 20px rgba(255,255,255,0.5);
            text-shadow: none; transform: translateX(5px);
        }
        .btn:active:not(:disabled) { transform: scale(0.95); }
        .btn:disabled, .btn.locked {
            filter: grayscale(1); opacity: 0.4; cursor: not-allowed; border-color: #444; color: #666;
            box-shadow: none; text-shadow: none;
        }
        .gfx-high .screen.active::after {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
                radial-gradient(circle at 18% 20%, rgba(0,229,255,0.10), transparent 45%),
                radial-gradient(circle at 80% 78%, rgba(255,0,85,0.08), transparent 48%),
                repeating-linear-gradient(90deg, rgba(0,229,255,0.03) 0, rgba(0,229,255,0.03) 1px, transparent 1px, transparent 16px);
            mix-blend-mode: screen;
        }
        .gfx-high canvas {
            box-shadow: 0 0 160px rgba(0,229,255,0.22), 0 0 55px rgba(255,0,85,0.14);
            border-left-color: rgba(0,229,255,0.4);
            border-right-color: rgba(255,0,85,0.25);
        }
        .gfx-high .btn:not(.locked):not(:disabled) {
            box-shadow: 0 0 18px rgba(0,229,255,0.28), inset 0 0 16px rgba(0,229,255,0.14);
            border-color: rgba(0,229,255,0.65);
        }
        .gfx-high .card:not(.locked) {
            border-color: rgba(0,229,255,0.45);
            box-shadow: 0 0 20px rgba(0,229,255,0.14), inset 0 0 16px rgba(0,229,255,0.06);
        }
        .gfx-high .hud-val {
            text-shadow: 0 0 8px rgba(255,255,255,0.5), 0 0 16px rgba(0,229,255,0.55);
        }

        .grid-box { 
            display: grid; grid-template-columns: repeat(auto-fit, minmax(10.625rem, 1fr)); gap: 0.9375rem; 
            width: 90%; max-width: 62.5rem; padding: 1.25rem; overflow-y: auto; flex: 1; min-height: 0; margin-bottom: 0.625rem;
        }
        
        .card {
            background: linear-gradient(145deg, rgba(20,20,30,0.8), rgba(10,10,15,0.9)); border: 0.0625rem solid #333;
            padding: 0.9375rem; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden;
            display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .card.locked { opacity: 0.6; filter: grayscale(0.8); cursor: default; }
        .card.locked::after { display: none; }
        .card:not(.locked)::after {
            content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 0.125rem;
            background: var(--c-primary); transform: scaleX(0); transition: transform 0.3s;
            box-shadow: 0 0 10px var(--c-primary);
        }
        .card:not(.locked):hover { transform: translateY(-0.3125rem); border-color: #666; box-shadow: 0 10px 40px rgba(0,229,255,0.2); }
        .card:not(.locked):hover::after { transform: scaleX(1); }
        .card.selected { border: 0.0625rem solid var(--c-primary); box-shadow: 0 0 30px rgba(0, 229, 255, 0.3) inset; }
        .card.limit-break { border: 0.0625rem solid #ffcc00; box-shadow: 0 0 15px rgba(255, 204, 0, 0.3); }
        .card h3 { color: #fff; margin-bottom: 0.3125rem; font-size: 1.1rem; text-shadow: 0 0 5px rgba(255,255,255,0.5); }
        .card p { color: #aaa; font-size: 0.8rem; line-height: 1.4; }
        .card-icon { font-size: 2.5rem; margin-bottom: 0.625rem; filter: drop-shadow(0 0 10px currentColor); }

        @media (max-width: 640px) {
            #shop-screen, #guide-screen, #ach-screen, #ship-select, #leaderboard-screen { justify-content: flex-start; padding-top: 2.5rem; padding-bottom: 0.625rem; }
            .grid-box { width: 96%; padding: 0.625rem; gap: 0.5rem; grid-template-columns: repeat(auto-fit, minmax(8.4375rem, 1fr)); }
            .card { padding: 0.625rem 0.3125rem; }
            #shop-container .card div:first-child { font-size: 0.9rem; }
            #shop-container .card .text-xl { font-size: 1.1rem; }
            #shop-container .card div:nth-child(2) { font-size: 0.7rem; line-height: 1.2; margin: 0.25rem 0; min-height: 2.4em; }
            .btn { padding: 0.625rem 1.5625rem; font-size: 0.875rem; }
            #warning-overlay { top: 2.6rem; width: 96vw; }
        }

        .ach-item { display: flex; align-items: center; gap: 0.9375rem; padding: 0.9375rem; background: rgba(255,255,255,0.02); border: 0.0625rem solid #222; margin-bottom: 0.625rem; transition: all 0.3s; }
        .ach-item.unlocked { border-color: var(--c-success); background: linear-gradient(90deg, rgba(0,255,170,0.1), transparent); box-shadow: 0 0 15px rgba(0,255,170,0.1); }
        .ach-icon { font-size: 1.5rem; width: 2.5rem; text-align: center; filter: drop-shadow(0 0 5px currentColor); }
        .ach-desc { font-size: 0.75rem; color: #aaa; }
        .ach-reward { font-size: 0.75rem; color: var(--c-warn); font-family: 'Orbitron'; margin-left: auto; text-shadow: 0 0 5px var(--c-warn); }

        #hud-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: none; }
        .hud-top { display: flex; justify-content: space-between; align-items: flex-start; padding: 1.25rem; width: 100%; background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%); }
        .hud-group { display: flex; flex-direction: column; }
        .hud-label { font-size: 0.75rem; letter-spacing: 0.125rem; color: #888; font-family: 'Orbitron', 'Noto Sans SC'; font-weight: 700; }
        .hud-val { font-size: 1.75rem; font-weight: 900; font-family: 'Orbitron'; line-height: 1; }
        
        #time-bar-c { width: 9.375rem; height: 0.25rem; background: #222; margin-top: 0.3125rem; box-shadow: inset 0 0 5px #000; }
        #time-bar-f { height: 100%; background: var(--c-primary); width: 0%; box-shadow: 0 0 10px var(--c-primary); }

        #boss-hud { position: absolute; top: 4.375rem; left: 50%; transform: translateX(-50%); display: none; flex-direction: column; align-items: center; width: 85%; max-width: 31.25rem; z-index: 35; pointer-events: none; }
        #boss-name { font-family: 'Orbitron'; color: #fff; font-size: 1.125rem; letter-spacing: 0.1875rem; font-weight: 900; text-shadow: 0 0 5px #ff0055, 0 0 10px #ff0055, 0 0 20px #ff0055; margin-bottom: 0.5rem; background: rgba(0,0,0,0.7); padding: 0.25rem 0.9375rem; border-radius: 0.25rem; border: 0.0625rem solid rgba(255,0,85,0.3); }
        .boss-hp-container { width: 100%; height: 1.125rem; background: rgba(20, 0, 0, 0.9); border: 0.125rem solid #ff0055; transform: skewX(-15deg); position: relative; box-shadow: 0 0 25px rgba(255, 0, 85, 0.4); overflow: hidden; }
        .boss-hp-fill { height: 100%; background: linear-gradient(90deg, #ff0055, #ffaa00); width: 100%; transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 20px #ff0055; position: relative; }
        .boss-hp-fill::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 50%; background: rgba(255,255,255,0.25); }
        #boss-hp-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) skewX(15deg); font-size: 0.6875rem; color: #fff; font-weight: bold; font-family: monospace; text-shadow: 1px 1px 0 #000, 0 0 5px #fff; z-index: 10; }

        #player-hud { position: absolute; bottom: 1.25rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; z-index: 40; }
        .hp-row { display: flex; align-items: center; gap: 0.5rem; }
        .hp-row .hp-container { margin-top: 0; }
        #hud-level-text {
            min-width: 3.25rem;
            text-align: center;
            font-size: 0.75rem;
            font-weight: 900;
            font-family: 'Orbitron', 'Noto Sans SC', sans-serif;
            color: #ffd84d;
            text-shadow: 0 0 6px rgba(255, 216, 77, 0.75);
            border: 0.0625rem solid rgba(255, 216, 77, 0.65);
            background: rgba(45, 30, 0, 0.7);
            padding: 0.1rem 0.35rem;
            border-radius: 0.25rem;
            letter-spacing: 0.02em;
        }
        .hp-container { width: 15rem; height: 0.875rem; background: #220000; transform: skewX(-20deg); border: 0.0625rem solid #ff0055; margin-top: 0.25rem; position: relative; box-shadow: 0 0 15px rgba(255,0,85,0.2); }
        .hp-fill { height: 100%; background: linear-gradient(90deg, #ff0000, #ff5555); width: 100%; transition: width 0.2s; box-shadow: 0 0 15px #ff0000; }
        .shield-container { width: 15rem; height: 0.5rem; background: rgba(0, 50, 50, 0.5); transform: skewX(-20deg); border: 0.0625rem solid #00e5ff; margin-bottom: 0.125rem; position: relative; display: none; box-shadow: 0 0 10px rgba(0,229,255,0.2); }
        .shield-fill { height: 100%; background: linear-gradient(90deg, #00aaaa, #00e5ff); width: 100%; transition: width 0.2s; box-shadow: 0 0 15px #00e5ff; }
        .shield-fill.charging { background: #555; box-shadow: none; }
        .gfx-high .hp-container { box-shadow: 0 0 24px rgba(255,0,85,0.45), inset 0 0 12px rgba(255,0,85,0.12); }
        .gfx-high .shield-container { box-shadow: 0 0 24px rgba(0,229,255,0.45), inset 0 0 12px rgba(0,229,255,0.12); }
        .bar-particle-layer {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            mix-blend-mode: screen;
        }
        .bar-particle {
            position: absolute;
            bottom: -0.1rem;
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 50%;
            background: var(--p-color, #fff);
            box-shadow: 0 0 10px var(--p-color, #fff), 0 0 4px #fff;
            animation: barParticleRise var(--p-life, 0.9s) ease-out forwards;
        }
        @keyframes barParticleRise {
            0% { transform: translateY(0) scale(0.5); opacity: 0; }
            20% { opacity: 0.95; }
            100% { transform: translateY(-1.2rem) scale(1.2); opacity: 0; }
        }
        
        #xp-bar-c { position: absolute; bottom: 0; left: 0; width: 100%; height: 0.375rem; background: #111; z-index: 50; }
        #xp-bar-f { height: 100%; background: var(--c-primary); width: 0%; box-shadow: 0 0 20px var(--c-primary); transition: width 0.2s; }

        .bomb-container { position: absolute; bottom: 1.875rem; right: 1.875rem; width: 5rem; height: 5rem; pointer-events: auto; }
        #bomb-btn { width: 100%; height: 100%; background: radial-gradient(circle, rgba(50,0,0,0.8), #000); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Orbitron', sans-serif; color: #555; font-weight: bold; font-size: 1rem; box-shadow: 0 0 10px rgba(0,0,0,0.5); transition: all 0.3s; border: 0.125rem solid #333; }
        #bomb-btn.ready { color: #fff; background: radial-gradient(circle, #ff0055, #550000); box-shadow: 0 0 30px #ff0055; border-color: #ff0055; cursor: pointer; animation: pulse-bomb 1s infinite; text-shadow: 0 0 5px #fff; }
        #bomb-btn.ready:active { transform: scale(0.9); }
        .bomb-ring { position: absolute; top: -0.3125rem; left: -0.3125rem; width: 5.625rem; height: 5.625rem; transform: rotate(-90deg); pointer-events: none; }
        .bomb-ring circle { fill: none; stroke-width: 4px; stroke: #222; }
        .bomb-ring circle.progress { stroke: var(--c-primary); stroke-dasharray: 251; stroke-dashoffset: 251; transition: stroke-dashoffset 0.3s; filter: drop-shadow(0 0 5px var(--c-primary)); }
        @keyframes pulse-bomb { 0% { box-shadow: 0 0 20px #ff0055; } 50% { box-shadow: 0 0 50px #ff0055; } 100% { box-shadow: 0 0 20px #ff0055; } }

        .dmg-text { position: absolute; pointer-events: none; font-weight: 900; font-size: 1.25rem; font-family: 'Orbitron'; animation: floatUp 0.8s forwards; white-space: nowrap; z-index: 100; }
        @keyframes floatUp { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-3.75rem) scale(1.3); opacity: 0; } }
        
        #warning-overlay { position: absolute; top: 4.2rem; left: 50%; transform: translateX(-50%); width: min(94vw, 58rem); text-align: center; pointer-events: none; display: none; z-index: 60; }
        .warning-text { color: #fff; font-size: clamp(1.4rem, 3.8vw, 2.9rem); font-weight: 900; letter-spacing: 0.14em; animation: blink 0.5s infinite; text-shadow: 0 0 10px #ff0055, 0 0 20px #ff0055, 0 0 40px #ff0055; font-family: 'Noto Sans SC', sans-serif; display: inline-flex; align-items: center; justify-content: center; min-height: 3.3rem; padding: 0.5rem 1.35rem; border: 1px solid rgba(255,0,85,0.45); border-radius: 0.4rem; background: rgba(10,0,6,0.72); backdrop-filter: blur(3px); box-shadow: 0 0 18px rgba(255,0,85,0.25);}
        @keyframes blink { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }

        .tab-nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 1rem; }
        .tab-btn { padding: 0.5rem 1rem; border-bottom: 0.125rem solid transparent; color: #666; cursor: pointer; font-weight: 700; transition: 0.2s;}
        .tab-btn.active { color: var(--c-primary); border-color: var(--c-primary); text-shadow: 0 0 10px var(--c-primary); }

        #unlock-notify { position: absolute; bottom: 6.25rem; left: 50%; transform: translateX(-50%); background: rgba(0, 255, 170, 0.9); color: #000; border: 0.125rem solid #fff; padding: 0.75rem 2.5rem; font-weight: 900; border-radius: 0.25rem; box-shadow: 0 0 30px rgba(0,255,170,0.8); display: none; animation: slideUp 0.5s; z-index: 100; }
        @keyframes slideUp { from { transform: translate(-50%, 3.125rem); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }

        #game-settings-btn { position: absolute; bottom: 1.875rem; left: 1.875rem; width: 2.5rem; height: 2.5rem; background: rgba(0,0,0,0.5); border: 0.0625rem solid rgba(0,229,255,0.4); border-radius: 50%; font-size: 1.25rem; color: var(--c-primary); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 20; pointer-events: auto; transition: all 0.2s; box-shadow: 0 0 10px rgba(0,229,255,0.2); }
        #game-settings-btn:hover { background: var(--c-primary); color: #000; box-shadow: 0 0 20px var(--c-primary); }
        .setting-row { display: flex; justify-content: space-between; width: 100%; max-width: 18.75rem; margin-bottom: 0.9375rem; color: #aaa; border-bottom: 0.0625rem solid #333; padding-bottom: 0.3125rem; font-weight: bold;}
    </style>
</head>
<body>
    
    <!-- 引入 Firebase 云端模块 -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        window.FirebaseAPI = { ready: false };
        
        try {
            if (typeof __firebase_config !== 'undefined') {
                const firebaseConfig = JSON.parse(__firebase_config);
                const app = initializeApp(firebaseConfig);
                const auth = getAuth(app);
                const db = getFirestore(app);
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'ronin-app';

                const initAuth = async () => {
                    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                        await signInWithCustomToken(auth, __initial_auth_token);
                    } else {
                        await signInAnonymously(auth);
                    }
                };
                initAuth();

                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        window.FirebaseAPI.ready = true;
                        window.FirebaseAPI.user = user;
                        window.FirebaseAPI.db = db;
                        window.FirebaseAPI.appId = appId;
                    }
                });

                window.FirebaseAPI.uploadScore = async (nickname, wave) => {
                    if (!window.FirebaseAPI.ready) return false;
                    try {
                        const docRef = doc(window.FirebaseAPI.db, 'artifacts', window.FirebaseAPI.appId, 'public', 'data', 'leaderboard', window.FirebaseAPI.user.uid);
                        await setDoc(docRef, { nickname, wave, uid: window.FirebaseAPI.user.uid, timestamp: Date.now() }, { merge: true });
                        return true;
                    } catch (e) { console.error("Firebase API Error:", e); return false; }
                };

                window.FirebaseAPI.getLeaderboard = async () => {
                    if (!window.FirebaseAPI.ready) return [];
                    try {
                        const colRef = collection(window.FirebaseAPI.db, 'artifacts', window.FirebaseAPI.appId, 'public', 'data', 'leaderboard');
                        const snap = await getDocs(colRef);
                        let data = [];
                        snap.forEach(d => data.push(d.data()));
                        data.sort((a,b) => b.wave - a.wave); // Descending sort by wave
                        return data.slice(0, 50); // Top 50 
                    } catch (e) { console.error("Firebase API Error:", e); return []; }
                };
            }
        } catch(e) {
            console.error("Firebase Initialization Failed:", e);
        }
    </script>

    <div id="unlock-notify">解锁新内容！</div>

    <!-- 1. Main Menu -->
    <div id="main-menu" class="screen active">
        <div class="mb-8 text-center relative cursor-pointer select-none" onclick="triggerCheatCode()">
            <div class="absolute inset-0 bg-cyan-500 blur-[120px] opacity-20"></div>
            <h1 class="text-7xl font-black italic tracking-tighter orbitron neon-text-primary" style="animation: neon-flicker 3s infinite;" id="title-logo">RONIN</h1>
            <div class="text-xl tracking-[0.8em] text-cyan-300 font-bold mt-[-5px] pl-4 text-shadow-sm">星际战机</div>
        </div>
        
        <p class="text-xs text-gray-400 mb-10 font-mono tracking-widest border-t border-b border-cyan-900/50 py-2 w-64 text-center bg-black/30">系统 V1.4.7 // 神明再临</p>

        <div class="flex flex-col items-center w-full max-w-sm gap-4 relative z-10">
            <button id="btn-start-mission" class="btn w-full flex justify-between items-center group" onclick="checkRunAndLaunch()" data-text="btn_launch" onmouseenter="AudioSys && AudioSys.play('ui_hover')">
                <span>开始任务</span> <span class="text-xs opacity-50 group-hover:translate-x-1 transition">>>></span>
            </button>
            <button id="btn-abandon-mission" class="btn w-full flex justify-between items-center group !border-red-900 !text-red-500 hover:!text-white hover:!bg-red-900/50" onclick="abandonAndStartNew()" style="display:none" onmouseenter="AudioSys && AudioSys.play('ui_hover')">
                <span class="text-sm">放弃并开始新任务</span> <span class="text-xs opacity-50">X</span>
            </button>
            
            <div class="grid grid-cols-2 gap-4 w-full">
                <button class="btn m-0 text-sm !border-yellow-600 !text-yellow-400 hover:!text-black hover:!bg-yellow-400" onclick="showAchievements()" onmouseenter="AudioSys && AudioSys.play('ui_hover')">
                    <span class="mr-2">🏆</span> 成就
                </button>
                <button class="btn m-0 text-sm !border-gray-500 !text-gray-300 hover:!bg-gray-200 hover:!text-black" onclick="showSettings()" data-text="btn_settings" onmouseenter="AudioSys && AudioSys.play('ui_hover')">系统</button>
            </div>
            
            <div class="grid grid-cols-1 gap-4 w-full" id="btn-leaderboard-container" style="display: none;">
                <button class="btn m-0 w-full text-sm !border-cyan-600 !text-cyan-400 hover:!text-black hover:!bg-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]" onclick="showLeaderboard()" onmouseenter="AudioSys && AudioSys.play('ui_hover')">
                    <span class="mr-2">🌐</span> 星际排行榜
                </button>
            </div>

            <div class="grid grid-cols-1 gap-4 w-full">
                <button id="btn-hangar" class="btn m-0 w-full text-sm !border-gray-500 !text-gray-300 hover:!bg-gray-200 hover:!text-black" onclick="showShop()" data-text="btn_hangar" onmouseenter="AudioSys && AudioSys.play('ui_hover')">机库升级</button>
            </div>
        </div>
        
        <div class="mt-12 flex items-center gap-3 bg-black/60 px-6 py-3 rounded-full border border-yellow-900/50 shadow-[0_0_15px_rgba(255,234,0,0.1)]">
            <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_5px_#ffea00]"></div>
            <span class="text-yellow-500 text-xs font-bold tracking-widest">金币</span>
            <span id="menu-gold" class="text-white font-bold text-xl font-mono neon-text-warn">0</span>
        </div>
    </div>

    <!-- 新增：无尽排行榜 Screen -->
    <div id="leaderboard-screen" class="screen">
        <h2 class="text-3xl neon-text-primary mb-4 orbitron tracking-widest">无尽名人堂</h2>
        <div class="mb-4 text-center w-full max-w-lg px-4">
            <div class="text-xs text-gray-400 mb-2">你的最高存活记录: <span id="lb-personal-best" class="text-yellow-400 font-bold text-lg drop-shadow-md">0</span> 波</div>
            <div class="flex gap-2 justify-center items-center">
                <input type="text" id="lb-nickname" placeholder="输入指挥官代号" class="bg-black/80 border border-cyan-900 px-3 py-2 text-sm text-cyan-300 outline-none w-40 rounded" maxlength="10">
                <button class="btn py-2 px-6 text-xs m-0 shrink-0" onclick="submitScore()">上传战绩</button>
            </div>
            <div id="lb-status" class="text-xs text-green-400 mt-2 h-4 font-bold tracking-widest"></div>
        </div>
        <div class="w-full max-w-lg px-4 h-64 overflow-y-auto bg-black/60 border border-cyan-900/30 p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] rounded" id="lb-list">
            <div class="text-center text-gray-500 text-sm mt-10">数据同步中...</div>
        </div>
        <button class="btn mt-6" onclick="backToMenu()" onmouseenter="AudioSys && AudioSys.play('ui_hover')">返回主屏幕</button>
    </div>

    <!-- 2. Ship Select -->
    <div id="ship-select" class="screen">
        <h2 class="text-3xl neon-text-primary mb-4 mt-6 orbitron tracking-widest shrink-0" data-text="title_deploy">部署准备</h2>
        
        <!-- 独立的机型详情展示区，支持过长滚动 -->
        <div class="w-[90%] max-w-3xl shrink-0 mb-2 p-3 bg-black/60 border border-cyan-900/50 rounded-lg shadow-[0_0_15px_rgba(0,229,255,0.1)] flex flex-col items-center justify-center min-h-[5.625rem] max-h-[8.75rem] overflow-y-auto">
            <div id="selected-ship-info" class="text-center w-full"></div>
        </div>

        <div class="grid-box flex-1 mb-2" id="ship-container" style="padding: 0.625rem 1.25rem;"></div>
        
        <div class="w-full shrink-0 bg-black/90 p-4 sm:p-6 border-t border-cyan-900/50 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,229,255,0.1)]">
            <div class="flex flex-col items-center gap-2 mb-4">
                <div class="text-xs text-gray-400 tracking-widest mb-1">选择危险评级</div>
                <div class="flex justify-center gap-2" id="mode-buttons"></div>
                <div id="mode-desc" class="text-xs text-cyan-400 mt-1 h-4 font-bold"></div>
            </div>
            <div class="flex justify-center gap-6">
                <button class="text-red-500 text-sm hover:underline tracking-widest font-bold" onclick="backToMenu()" data-text="btn_abort" onmouseenter="AudioSys && AudioSys.play('ui_hover')">放弃</button>
                <button class="btn bg-cyan-500 text-black border-none hover:bg-cyan-400 m-0 w-48 shadow-[0_0_20px_var(--c-primary)]" onclick="launchGame(true)" data-text="btn_engage" onmouseenter="AudioSys && AudioSys.play('ui_hover')">启动引擎</button>
            </div>
        </div>
    </div>

    <!-- 3. HUD -->
    <div id="hud-layer">
        <div id="xp-bar-c"><div id="xp-bar-f"></div></div>
        <div id="warning-overlay"><div class="warning-text">警告：高能反应</div></div>
        
        <div id="game-settings-btn" onclick="pauseAndShowSettings()" onmouseenter="AudioSys && AudioSys.play('ui_hover')">⚙️</div>

        <div id="boss-hud">
            <div id="boss-name">警告：高能反应</div>
            <div class="boss-hp-container">
                <div class="boss-hp-fill" id="boss-hp-bar"></div>
                <div id="boss-hp-text">10000 / 10000</div>
            </div>
        </div>

        <div class="hud-top">
            <div class="hud-group">
                <span class="hud-label" data-text="lbl_wave_reached">波次</span>
                <span class="hud-val neon-text-primary"><span id="hud-wave">1</span><span id="hud-max-wave" class="text-sm text-gray-500" style="text-shadow:none">/10</span></span>
                <div id="time-bar-c"><div id="time-bar-f"></div></div>
            </div>
            
            <div class="hud-group items-end">
                <span class="hud-label text-yellow-500">金币</span>
                <span id="hud-gold" class="hud-val neon-text-warn">0</span>
            </div>
        </div>

        <div id="player-hud">
            <div id="hud-shield-c" class="shield-container"><div class="shield-fill" id="hud-shield-bar"></div><div class="bar-particle-layer" id="hud-shield-particles"></div></div>
            <div class="hp-row">
                <span id="hud-level-text">Lv.1</span>
                <div class="hp-container"><div class="hp-fill" id="hud-hp-bar"></div><div class="bar-particle-layer" id="hud-hp-particles"></div></div>
            </div>
            <span id="hud-hp-text" class="text-xs text-white font-mono mt-1 font-bold shadow-black drop-shadow-md">100 / 100</span>
            <span id="hud-revive-text" class="text-xs text-yellow-400 font-mono mt-1 font-bold shadow-black drop-shadow-md hidden">复活: 0</span>
        </div>
        
        <div class="bomb-container" onclick="triggerBombUI()">
            <svg class="bomb-ring" viewBox="0 0 90 90"><circle class="progress" r="40" cx="45" cy="45" id="bomb-progress"></circle></svg>
            <div id="bomb-btn">清屏</div>
        </div>
    </div>

    <!-- 4. Achievements Screen -->
    <div id="ach-screen" class="screen">
        <h2 class="text-3xl neon-text-warn mb-4 orbitron">成就记录</h2>
        <div class="text-white mb-4 font-mono text-xs text-gray-400 bg-black/50 px-4 py-1 rounded">达成成就可获得研发资金与新型机体</div>
        <div class="w-full max-w-2xl px-4 h-96 overflow-y-auto bg-black/60 border border-yellow-900/30 p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" id="ach-list"></div>
        <button class="btn mt-6" onclick="backToMenu()" onmouseenter="AudioSys && AudioSys.play('ui_hover')">返回主屏幕</button>
    </div>

    <!-- 5. Settings/Shop/Guide/LevelUp/Result -->
    <div id="settings-screen" class="screen">
        <h2 class="text-3xl neon-text-primary mb-8 orbitron" data-text="title_settings">系统终端</h2>
        <div class="bg-black/60 p-6 border border-cyan-900/50 rounded-lg w-full max-w-sm flex flex-col items-center">
            <div class="setting-row"><span data-text="lbl_volume">主音量</span><input type="range" id="input-volume" min="0" max="100" value="50" oninput="setVolume(this.value)" class="accent-cyan-400"></div>
            <div class="setting-row"><span data-text="lbl_speed">引擎倍速</span><div class="flex items-center gap-2"><input type="range" id="input-speed" min="50" max="200" value="100" oninput="setSpeed(this.value)" class="accent-cyan-400"><span id="speed-display" class="text-cyan-400 font-mono w-10 text-right">1.0x</span></div></div>
            <div class="setting-row"><span data-text="lbl_graphics">画质设置</span><div class="flex items-center gap-2"><input type="range" id="input-graphics" min="0" max="2" value="1" oninput="setGraphics(this.value)" class="accent-cyan-400"><span id="graphics-display" class="text-cyan-400 font-mono w-16 text-right">中等</span></div></div>
            <!-- 界面大小控制滑块 -->
            <div class="setting-row"><span data-text="lbl_uiscale">界面缩放</span><div class="flex items-center gap-2"><input type="range" id="input-uiscale" min="50" max="130" value="85" oninput="setUIScale(this.value)" class="accent-cyan-400"><span id="uiscale-display" class="text-cyan-400 font-mono w-10 text-right">0.85x</span></div></div>
            <div class="setting-row"><span>玩家弹幕透明度</span><div class="flex items-center gap-2"><input type="range" id="input-playeralpha" min="20" max="100" value="100" oninput="setPlayerBulletAlpha(this.value)" class="accent-cyan-400"><span id="playeralpha-display" class="text-cyan-400 font-mono w-14 text-right">100%</span></div></div>
            <div class="setting-row"><span>伤害飘字</span><div class="flex items-center gap-2"><input type="checkbox" id="input-damagefloat" checked onchange="setDamageFloatEnabled(this.checked)" class="accent-cyan-400"><span id="damagefloat-display" class="text-cyan-400 font-mono w-8 text-right">开</span></div></div>

            <div class="setting-row justify-center mt-6 border-none w-full"><button class="btn w-full !border-purple-600 !text-purple-400 hover:!bg-purple-600 hover:!text-white" onclick="showGuide()" data-text="btn_guide" onmouseenter="AudioSys && AudioSys.play('ui_hover')">战术数据库</button></div>
            <div class="setting-row justify-center mt-2 border-none w-full">
                <button id="btn-save-quit" class="btn w-full !border-red-600 !text-red-500 hover:!bg-red-600 hover:!text-white" onclick="saveAndExit()" onmouseenter="AudioSys && AudioSys.play('ui_hover')">休眠并返回</button>
            </div>
            <div class="setting-row justify-center mt-2 border-none w-full">
                <button class="btn w-full !border-red-900 !text-red-700 hover:!bg-red-900 hover:!text-white" onclick="triggerResetSave()" onmouseenter="AudioSys && AudioSys.play('ui_hover')">擦除所有记忆体</button>
            </div>
        </div>
        <button id="settings-back-btn" class="btn mt-8" onclick="backToMenu()" data-text="btn_back" onmouseenter="AudioSys && AudioSys.play('ui_hover')">返回</button>
    </div>

    <div id="shop-screen" class="screen">
        <h2 class="text-3xl neon-text-warn mb-2 orbitron" data-text="title_hangar">机库改造</h2>
        <div class="text-white mb-6 font-mono bg-black/50 px-6 py-2 rounded-full border border-yellow-900/50 shadow-[0_0_10px_rgba(255,234,0,0.1)]"><span data-text="lbl_balance" class="text-gray-400">可用资金</span>: <span id="shop-gold" class="neon-text-warn text-xl font-bold">0</span></div>
        <div class="grid-box" id="shop-container"></div>
        <button class="btn mt-4" onclick="backToMenu()" data-text="btn_back" onmouseenter="AudioSys && AudioSys.play('ui_hover')">返回</button>
    </div>

    <div id="guide-screen" class="screen">
        <div class="tab-nav">
            <button class="tab-btn active" onclick="switchTab('ships')" onmouseenter="AudioSys && AudioSys.play('ui_hover')">机体</button>
            <button class="tab-btn" onclick="switchTab('weapons')" onmouseenter="AudioSys && AudioSys.play('ui_hover')">武器</button>
            <button class="tab-btn" onclick="switchTab('passives')" onmouseenter="AudioSys && AudioSys.play('ui_hover')">芯片</button>
            <button class="tab-btn" onclick="switchTab('evolution')" onmouseenter="AudioSys && AudioSys.play('ui_hover')">突破</button>
            <button class="tab-btn" onclick="switchTab('enemies')" onmouseenter="AudioSys && AudioSys.play('ui_hover')">敌军</button>
        </div>
        <div id="guide-content" class="w-full max-w-lg overflow-y-auto px-4 h-96 bg-black/60 border border-cyan-900/30 p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"></div>
        <button class="btn mt-6" onclick="showSettings()" onmouseenter="AudioSys && AudioSys.play('ui_hover')">返回终端</button>
    </div>

    <div id="levelup-screen" class="screen" style="background:rgba(2,2,5,0.95); backdrop-filter: blur(10px);">
        <h2 class="text-5xl neon-text-primary mb-4 font-black orbitron tracking-widest" data-text="title_upgrade">模块植入</h2>
        
        <div class="w-full max-w-4xl mb-8 p-4 bg-cyan-950/20 border border-cyan-900/50 rounded flex flex-col gap-2 shadow-[0_0_30px_rgba(0,229,255,0.05)]">
            <div class="text-xs text-cyan-500 tracking-widest mb-1 font-bold">已搭载模块 // CURRENT LOADOUT</div>
            <div class="flex flex-wrap justify-center gap-3" id="current-skills-container"></div>
        </div>

        <div class="flex flex-wrap gap-6 justify-center w-full max-w-5xl" id="upgrade-container"></div>
        <button id="reroll-btn" class="btn text-sm mt-12 !border-gray-400 !text-gray-300 hover:!bg-gray-200 hover:!text-black" onclick="rerollUpgrades()" onmouseenter="AudioSys && AudioSys.play('ui_hover')">重构选项</button>
    </div>

    <div id="result-screen" class="screen">
        <h1 id="result-title" class="text-7xl font-black mb-6 tracking-tighter italic orbitron" style="text-shadow: 0 0 20px currentColor;">任务结束</h1>
        <div class="bg-black/60 p-8 border border-gray-800 rounded-xl mb-8 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div class="grid grid-cols-2 gap-16 text-center">
                <div><p class="text-gray-500 text-sm tracking-widest mb-2" data-text="lbl_wave_reached">肃清波次</p><p id="result-wave" class="text-5xl font-black text-white drop-shadow-md">0</p></div>
                <div><p class="text-gray-500 text-sm tracking-widest mb-2" data-text="lbl_credits">回收资金</p><p id="result-gold" class="text-5xl font-black text-yellow-400 neon-text-warn">0</p></div>
            </div>
        </div>
        
        <div id="result-unlocks" class="text-center mb-8 min-h-[40px] font-bold text-lg leading-loose"></div>
        <button class="btn w-64 text-lg" onclick="backToMenu()" data-text="btn_return" onmouseenter="AudioSys && AudioSys.play('ui_hover')">返回母舰</button>
    </div>

    <canvas id="gameCanvas"></canvas>
    <div id="text-layer" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; overflow:hidden;"></div>

<script>

const AudioSys = {
    ctx: null, masterGain: null,
    isPlayingMusic: false, musicTimeoutId: null, currentTrackName: '',
    visibilityBound: false, bgmSuspendedByVisibility: false,
    
    init: function() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain(); 
            this.masterGain.connect(this.ctx.destination);
            this.setVolume(settings.volume);
            this.playMusic('menu');
        }
        if (!this.visibilityBound) this.bindVisibilityHandlers();
        if (this.ctx.state === 'suspended') this.ctx.resume();
    },
    setVolume: function(v) { if (this.masterGain) this.masterGain.gain.value = v; },
    bindVisibilityHandlers: function() {
        this.visibilityBound = true;
        const onHidden = () => this.handleVisibility(true);
        const onShown = () => this.handleVisibility(false);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) onHidden();
            else onShown();
        });
        window.addEventListener('blur', onHidden);
        window.addEventListener('focus', onShown);
        window.addEventListener('pagehide', onHidden);
        window.addEventListener('pageshow', onShown);
    },
    handleVisibility: function(hidden) {
        if (!this.ctx) return;
        if (hidden) {
            this.bgmSuspendedByVisibility = true;
            this.stopMusic();
            if (this.ctx.state !== 'suspended') this.ctx.suspend();
            return;
        }
        if (!this.bgmSuspendedByVisibility) return;
        this.bgmSuspendedByVisibility = false;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        if (gameState === 'menu' || gameState === 'gameover') this.playMusic('menu');
    },
    
    stopMusic: function() {
        this.isPlayingMusic = false;
        if (this.musicTimeoutId) clearTimeout(this.musicTimeoutId);
    },
    
    playMusic: function(trackName) {
        if (!this.ctx) return;
        if (this.bgmSuspendedByVisibility || document.hidden) return;
        if (this.currentTrackName === trackName && this.isPlayingMusic) return;
        this.stopMusic();
        this.currentTrackName = trackName;
        this.isPlayingMusic = true;
        
        const tracks = {
            'menu': { 
                tempo: 100,
                seq: [ [60, 0.5], [63, 0.5], [67, 0.5], [72, 0.5], [67, 0.5], [63, 0.5], [58, 0.5], [62, 0.5] ]
            }
        };
        
        let track = tracks[trackName] || tracks['menu'];
        let step = 0;
        let nextNoteTime = this.ctx.currentTime + 0.1;
        const beatDur = 60 / track.tempo;
        
        const schedule = () => {
            if (!this.isPlayingMusic) return;
            while (nextNoteTime < this.ctx.currentTime + 0.5) {
                let note = track.seq[step % track.seq.length];
                if (note[0] !== null) {
                    let freq = 440 * Math.pow(2, (note[0] - 69) / 12);
                    let osc = this.ctx.createOscillator();
                    let gain = this.ctx.createGain();
                    
                    osc.type = trackName === 'menu' ? 'square' : 'sawtooth';
                    osc.frequency.setValueAtTime(freq, nextNoteTime);
                    osc.connect(gain);
                    gain.connect(this.masterGain);
                    
                    let noteDur = note[1] * beatDur;
                    gain.gain.setValueAtTime(0.04, nextNoteTime); 
                    gain.gain.exponentialRampToValueAtTime(0.001, nextNoteTime + noteDur * 0.9);
                    
                    osc.start(nextNoteTime);
                    osc.stop(nextNoteTime + noteDur);
                }
                nextNoteTime += note[1] * beatDur;
                step++;
            }
            this.musicTimeoutId = setTimeout(schedule, 100);
        };
        schedule();
    },

    play: function(type) {
        if (!this.ctx) return; const t = this.ctx.currentTime; const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
        osc.connect(gain); gain.connect(this.masterGain);
        if (type === 'ui_hover') { osc.type = 'sine'; osc.frequency.setValueAtTime(2000, t); gain.gain.setValueAtTime(0.05, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05); osc.start(t); osc.stop(t + 0.05); }
        else if (type === 'ui_click') { osc.type = 'square'; osc.frequency.setValueAtTime(800, t); osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1); gain.gain.setValueAtTime(0.1, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1); osc.start(t); osc.stop(t + 0.1); }
        else if (type === 'shoot_light') { osc.type = 'triangle'; osc.frequency.setValueAtTime(800 + Math.random()*200, t); osc.frequency.exponentialRampToValueAtTime(200, t + 0.15); gain.gain.setValueAtTime(0.1, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15); osc.start(t); osc.stop(t + 0.15); }
        else if (type === 'shoot_heavy') { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(300, t); osc.frequency.linearRampToValueAtTime(100, t + 0.3); gain.gain.setValueAtTime(0.1, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3); osc.start(t); osc.stop(t + 0.3); this.playNoise(0.3, 0.1); }
        else if (type === 'hit') { this.playNoise(0.05, 0.1); }
        else if (type === 'explode') { this.playNoise(0.5, 0.3, true); }
        else if (type === 'shield_break') { osc.type = 'sine'; osc.frequency.setValueAtTime(2000, t); osc.frequency.exponentialRampToValueAtTime(100, t + 0.5); gain.gain.setValueAtTime(0.2, t); gain.gain.linearRampToValueAtTime(0, t + 0.5); osc.start(t); osc.stop(t + 0.5); }
        else if (type === 'level_up') { [440, 554, 659, 880].forEach((f, i) => { let o = this.ctx.createOscillator(); let g = this.ctx.createGain(); o.connect(g); g.connect(this.masterGain); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.1, t + i*0.1); g.gain.exponentialRampToValueAtTime(0.001, t + i*0.1 + 0.4); o.start(t + i*0.1); o.stop(t + i*0.1 + 0.4); }); }
        else if (type === 'alarm') { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, t); osc.frequency.linearRampToValueAtTime(100, t + 0.4); gain.gain.setValueAtTime(0.2, t); gain.gain.linearRampToValueAtTime(0, t + 0.4); osc.start(t); osc.stop(t + 0.4); }
    },
    playNoise: function(dur, vol, lowpass=false) {
        if (!this.ctx) return; const bufferSize = this.ctx.sampleRate * dur; const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate); const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource(); noise.buffer = buffer; const gain = this.ctx.createGain();
        if (lowpass) { const filter = this.ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1000; noise.connect(filter); filter.connect(gain); } else { noise.connect(gain); }
        gain.connect(this.masterGain); gain.gain.setValueAtTime(vol, this.ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur); noise.start();
    }
};

const TEXTS = {
    btn_launch: "开始任务", btn_hangar: "机库升级", btn_settings: "系统设置", btn_guide: "数据图鉴",
    btn_back: "返回", btn_abort: "放弃", btn_engage: "出击", btn_return: "返回基地",
    title_settings: "系统设置", title_guide: "数据库", title_deploy: "部署准备", title_hangar: "机库", title_upgrade: "系统升级",
    lbl_language: "语言 / Language", lbl_volume: "主音量", lbl_speed: "游戏倍速", lbl_graphics: "画质设置", lbl_uiscale: "界面缩放", lbl_balance: "金币",
    lbl_wave_reached: "抵达波次", lbl_credits: "获得金币",
    tab_ships: "机体", tab_enemies: "敌人", tab_weapons: "武器",
    
    ship_ranger: "【均衡型】标准属性，初始1级多重弹幕。<br><span class='text-cyan-400 font-bold'>【专属】多重弹幕满级：进化为极其密集的360°莲花弹幕网</span>", 
    ship_bulwark: "【重装甲】极其迟钝，血量奇高，初始1层护盾。<br><span class='text-green-400 font-bold'>【专属】偏导护盾满级：每6秒释放清弹冲击波</span>", 
    ship_lightning: "【玻璃大炮】快速，血量极低，无初始加成。初始1级僚机。<br><span class='text-yellow-400 font-bold'>【专属】战术僚机满级：召唤强力王牌伴飞战机</span>", 
    ship_shadow: "【暗杀者】极速，体质脆弱，高闪避，2%秒杀小怪。<br><span class='text-purple-400 font-bold'>【专属】跟踪导弹满级：每6秒发射毁灭核弹</span>",
    ship_piercer: "【狙击型】中等机动，护甲偏弱。微弱增伤。初始1级聚焦棱镜。<br><span class='text-cyan-200 font-bold'>【专属】聚焦棱镜满级：向前方呈扇形发射3道极光</span>",
    ship_deity: "【神明级】完美属性，初始自带全武器。<br><span class='text-white font-bold text-shadow-[0_0_10px_#fff]'>【专属】包含所有机型的觉醒特技。电弧满级时，每6秒爆发毁灭雷暴！</span>",
    
    enemy_drone: "杂兵无人机 (Drone)", enemy_shooter: "射手 (Shooter)", enemy_tank: "重型坦克 (Tank)", enemy_wanderer: "游荡者 (Wanderer)", enemy_prism: "棱镜核心 (Prism Core)", enemy_carrier: "母巢航母 (Hive Carrier)", enemy_boss: "霓虹审判者 (The Neon Judge)",
    enemy_boss_eclipse: "绯红日蚀 (Crimson Eclipse)", enemy_boss_omega: "欧米茄构造体 (Omega Construct)",
    enemy_pulsar: "脉冲核心 (Pulsar)", enemy_weaver: "虚空编织者 (Weaver)",
    mode_easy: "新兵", mode_normal: "老兵", mode_hard: "精英", mode_endless: "无尽",
    wpn_laser: "聚焦棱镜", desc_laser: "瞬发直线穿透伤害。", 
    wpn_lightning: "电弧发生器", desc_lightning: "自动连锁闪电。", 
    wpn_boomerang: "等离子回旋镖", desc_boomerang: "掷出并飞回。", 
    wpn_wingman: "战术僚机", desc_wingman: "召唤僚机跟随作战，每级增加1架僚机（上限5架）。",
    wpn_timebomb: "跟踪导弹", desc_timebomb: "发射2枚自动追踪敌人的导弹，升级增加发射数量。",
    wpn_spectral: "光谱轰击 (EVO)", desc_spectral: "【超武】永久毁灭光柱。", 
    wpn_thunder: "雷神之网 (EVO)", desc_thunder: "【超武】全屏电网。", 
    wpn_spiral: "死亡螺旋 (EVO)", desc_spiral: "【超武】无限扩散光环。",
    wpn_fleet: "量子舰队 (EVO)", desc_fleet: "【超武】僚机升级为量子截击机，组成攻击阵列，射速极快并能发射穿透激光。",
    wpn_doom: "末日风暴 (EVO)", desc_doom: "【超武】导弹数量翻倍，射速大幅提升，爆炸范围扩大。",
    pas_rapid: "极速充能", desc_rapid: "武器冷却时间减少10%。", 
    pas_magnet: "能量磁铁", desc_magnet: "拾取范围增加20%。",
    pas_speed: "引擎过载", desc_speed: "移速+10%，全场敌人减速5%/级。",
    pas_shield: "偏导护盾", desc_shield: "能量护盾 (30点/级)，破碎后30秒充能 (满级缩短至20秒)。",
    pas_multishot: "多重弹幕", desc_multishot: "主炮发射数量+1。",
    pas_dmg: "贫铀弹头", desc_dmg: "造成伤害增加10%。",
    shop_dmg: "基础伤害", desc_shop_dmg: "提升战机基础火力",
    shop_rate: "射击射速", desc_shop_rate: "提升主炮射速",
    shop_hull: "装甲强化", desc_shop_hull: "增加最大生命值",
    shop_magnet: "磁场发生", desc_shop_magnet: "增加拾取范围",
    shop_greed: "财富协议", desc_shop_greed: "获得金币增加",
    shop_reroll: "重置模块", desc_shop_reroll: "增加升级时的重置次数",
    shop_oc_dmg: "超频火力", desc_oc_dmg: "无上限叠加基础伤害",
    shop_oc_hull: "超频装甲", desc_oc_hull: "无上限叠加最大生命",
    shop_revive: "复活重组", desc_revive: "战毁时满血复活、大爆屏，附带两秒无敌",
    shop_clone: "无敌分身", desc_clone: "召唤1个无敌分身，继承技能并造成20%伤害",
    shop_clone2: "无敌分身2", desc_clone2: "解锁第二个无敌分身，继承技能并造成20%伤害"
};

const ICONS = { laser: '🔴', lightning: '⚡', boomerang: '🪃', wingman: '🛩️', timebomb: '🚀', rapid: '🔋', magnet: '🧲', speed: '💨', shield: '🛡️', multishot: '🔱', dmg: '💪', spectral: '🌈', thunder: '🌩️', spiral: '🌀', fleet: '🛸', doom: '☢️', lb_dmg: '⚔️', lb_heal: '🩹', lb_gold: '💰' };

const MODES = { easy: { name: "新兵", maxWave: 10, mult: 1.0, desc: "通关第10波解锁老兵难度" }, normal: { name: "老兵", maxWave: 20, mult: 3.0, desc: "通关第20波解锁精英难度" }, hard: { name: "精英", maxWave: 30, mult: 6.0, desc: "通关第30波解锁无尽模式" }, endless: { name: "无尽", maxWave: 999, mult: 10.0, desc: "生存挑战，发生随机突发事件" } };
const ENEMY_HP_MODE_MULT = { easy: 0.85, normal: 1.0, hard: 1.25, endless: 1.45 };

const SHIPS = { 
    ranger: { name: "游侠 (RANGER)", hpMult: 1.0, spdMult: 1.0, dmgMult: 1.0, descKey: "ship_ranger", color: '#00e5ff', unlock:'default' }, 
    bulwark: { name: "堡垒 (BULWARK)", hpMult: 2.5, spdMult: 0.4, dmgMult: 0.8, descKey: "ship_bulwark", color: '#00ffaa', unlock:'win_easy' }, 
    lightning: { name: "闪电 (LIGHTNING)", hpMult: 0.4, spdMult: 1.6, dmgMult: 1.0, descKey: "ship_lightning", color: '#ffea00', unlock:'win_normal' }, 
    shadow: { name: "幽影 (SHADOW)", hpMult: 0.7, spdMult: 2.0, dmgMult: 1.0, descKey: "ship_shadow", color: '#d500f9', unlock:'win_hard' },
    piercer: { name: "激光者 (PIERCER)", hpMult: 0.8, spdMult: 1.1, dmgMult: 1.1, descKey: "ship_piercer", color: '#00ffff', unlock:'ach_endless_20' },
    deity: { name: "神明 (DEITY)", hpMult: 3.0, spdMult: 1.5, dmgMult: 2.0, descKey: "ship_deity", color: '#ffffff', unlock:'ach_endless_30' }
};

const ACHIEVEMENTS = [
    { id: 'win_easy', title: '初战告捷', desc: '通关新兵模式', reward: 500, check: (s) => s.win && s.mode === 'easy' },
    { id: 'win_normal', title: '战场老兵', desc: '通关老兵模式', reward: 1000, check: (s) => s.win && s.mode === 'normal' },
    { id: 'win_hard', title: '精英指挥官', desc: '通关精英模式 (解锁幽影机体)', reward: 2000, check: (s) => s.win && s.mode === 'hard' },
    { id: 'endless_10', title: '初入深空', desc: '无尽模式生存10波', reward: 1000, check: (s) => s.mode === 'endless' && s.wave >= 10 },
    { id: 'endless_20', title: '无尽梦魇', desc: '无尽模式生存20波 (解锁激光者机体)', reward: 2000, check: (s) => s.mode === 'endless' && s.wave >= 20 },
    { id: 'endless_30', title: '虚空行者', desc: '无尽模式生存30波 (解锁神明机体)', reward: 5000, check: (s) => s.mode === 'endless' && s.wave >= 30 },
    { id: 'endless_50', title: '星际传奇', desc: '无尽模式生存50波 (解锁分身)', reward: 10000, check: (s) => s.mode === 'endless' && s.wave >= 50 },
    { id: 'endless_60', title: '重组协议', desc: '无尽模式生存60波 (解锁复活重组)', reward: 15000, check: (s) => s.mode === 'endless' && s.wave >= 60 },
    { id: 'endless_100', title: '星际神明', desc: '无尽模式生存100波 (解锁分身2)', reward: 50000, check: (s) => s.mode === 'endless' && s.wave >= 100 },
    { id: 'kill_100', title: '清道夫', desc: '单局击杀100敌', reward: 200, check: (s) => s.kills >= 100 },
    { id: 'kill_500', title: '收割者', desc: '单局击杀500敌', reward: 500, check: (s) => s.kills >= 500 },
    { id: 'kill_1000', title: '千人斩', desc: '单局击杀1000敌', reward: 1500, check: (s) => s.kills >= 1000 },
    { id: 'gold_1000', title: '第一桶金', desc: '单局赚取1000金币', reward: 500, check: (s) => s.goldEarned >= 1000 },
    { id: 'gold_5000', title: '赏金猎人', desc: '单局赚取5000金币', reward: 2000, check: (s) => s.goldEarned >= 5000 },
    { id: 'no_hit_5', title: '毫发无伤', desc: '坚持5波未受到伤害', reward: 1000, check: (s) => s.wave >= 5 && !s.hit },
    { id: 'full_hp', title: '完美状态', desc: '满血通关/结束 (且至少第10波)', reward: 2000, check: (s) => s.wave >= 10 && s.hpPct >= 1 }
];

const WEAPONS = { laser: { nameKey: "wpn_laser", descKey: "desc_laser", color: '#00ffff', passive: 'rapid', evo: 'spectral' }, lightning: { nameKey: "wpn_lightning", descKey: "desc_lightning", color: '#d500f9', passive: 'magnet', evo: 'thunder' }, boomerang: { nameKey: "wpn_boomerang", descKey: "desc_boomerang", color: '#ffea00', passive: 'speed', evo: 'spiral' }, wingman: { nameKey: "wpn_wingman", descKey: "desc_wingman", color: '#00e5ff', passive: 'shield', evo: 'fleet' }, timebomb: { nameKey: "wpn_timebomb", descKey: "desc_timebomb", color: '#ff3d00', passive: 'dmg', evo: 'doom' } };
const UPGRADE_POOL = [ { id: 'laser', type: 'weapon', max: 5 }, { id: 'lightning', type: 'weapon', max: 5 }, { id: 'boomerang', type: 'weapon', max: 5 }, { id: 'wingman', type: 'weapon', max: 5 }, { id: 'timebomb', type: 'weapon', max: 5 }, { id: 'rapid', nameKey: 'pas_rapid', descKey: 'desc_rapid', type: 'passive', max: 5 }, { id: 'magnet', nameKey: 'pas_magnet', descKey: 'desc_magnet', type: 'passive', max: 5 }, { id: 'speed', nameKey: 'pas_speed', descKey: 'desc_speed', type: 'passive', max: 5 }, { id: 'shield', nameKey: 'pas_shield', descKey: 'desc_shield', type: 'passive', max: 5 }, { id: 'multishot', nameKey: 'pas_multishot', descKey: 'desc_multishot', type: 'passive', max: 9 }, { id: 'dmg', nameKey: 'pas_dmg', descKey: 'desc_dmg', type: 'passive', max: 5 } ];
const EVOLUTIONS = { spectral: { nameKey: "wpn_spectral", descKey: "desc_spectral", type: 'evo' }, thunder: { nameKey: "wpn_thunder", descKey: "desc_thunder", type: 'evo' }, spiral: { nameKey: "wpn_spiral", descKey: "desc_spiral", type: 'evo' }, fleet: { nameKey: "wpn_fleet", descKey: "desc_fleet", type: 'evo' }, doom: { nameKey: "wpn_doom", descKey: "desc_doom", type: 'evo' } };

const SHOP_CONFIG = { 
    dmg: {nameKey:'shop_dmg', descKey:'desc_shop_dmg', max:10, cost:4000}, 
    rate: {nameKey:'shop_rate', descKey:'desc_shop_rate', max:10, cost:4000}, 
    hull: {nameKey:'shop_hull', descKey:'desc_shop_hull', max:10, cost:4500}, 
    magnet: {nameKey:'shop_magnet', descKey:'desc_shop_magnet', max:10, cost:3000}, 
    greed: {nameKey:'shop_greed', descKey:'desc_shop_greed', max:10, cost:5000}, 
    reroll: {nameKey:'shop_reroll', descKey:'desc_shop_reroll', max:5, cost:6000} 
};

const SafeStorage = { data: {}, getItem(key) { return this.data[key] || null; }, setItem(key, value) { this.data[key] = value; }, removeItem(key) { delete this.data[key]; } };
let storage = SafeStorage; try { if (typeof localStorage !== 'undefined') { localStorage.setItem('__test', '1'); localStorage.removeItem('__test'); storage = localStorage; } } catch(e) {}
const SAVE_KEY_V30 = 'ronin_v30_save';
const SAVE_KEY_V25 = 'ronin_v25_save';
const rawSave = storage.getItem(SAVE_KEY_V30) || storage.getItem(SAVE_KEY_V25);
let saveData = JSON.parse(rawSave) || { 
    gold: 0, upgrades: {}, unlocks: { easy:true, normal:false, hard:false, endless:false, win_easy: false, win_normal: false, win_hard: false }, achievements: [], currentRun: null, bestEndlessWave: 0, nickname: ''
};
if (!saveData.settings) { saveData.settings = { volume: 0.5, speed: 1.0, graphics: 1, uiScale: 0.85, playerBulletAlpha: 1.0, showDamageFloat: true }; }
if (saveData.settings.uiScale === undefined) { saveData.settings.uiScale = 0.85; }
if (saveData.settings.playerBulletAlpha === undefined) { saveData.settings.playerBulletAlpha = 1.0; }
if (saveData.settings.showDamageFloat === undefined) { saveData.settings.showDamageFloat = saveData.settings.graphics === 0 ? false : true; }
let settings = saveData.settings;
if (!saveData.unlocks) saveData.unlocks = {};
if (!saveData.achievements) saveData.achievements = [];
if (!saveData.upgrades) saveData.upgrades = {};
if (saveData.unlocks.win_easy === undefined) saveData.unlocks.win_easy = !!saveData.unlocks.normal;
if (saveData.unlocks.win_normal === undefined) saveData.unlocks.win_normal = !!saveData.unlocks.hard;
if (saveData.unlocks.win_hard === undefined) saveData.unlocks.win_hard = !!saveData.unlocks.endless;
if (saveData.upgrades.clone === undefined) saveData.upgrades.clone = 0;
saveData.upgrades.clone = Math.max(0, Math.min(2, saveData.upgrades.clone));
if (saveData.bestEndlessWave === undefined) saveData.bestEndlessWave = 0;
if (saveData.nickname === undefined) saveData.nickname = '';
if (saveData.bestEndlessWave >= 20 && !saveData.achievements.includes('endless_20')) saveData.achievements.push('endless_20');
if (saveData.bestEndlessWave >= 30 && !saveData.achievements.includes('endless_30')) saveData.achievements.push('endless_30');
if (saveData.bestEndlessWave >= 50 && !saveData.achievements.includes('endless_50')) saveData.achievements.push('endless_50');
if (saveData.bestEndlessWave >= 60 && !saveData.achievements.includes('endless_60')) saveData.achievements.push('endless_60');
if (saveData.bestEndlessWave >= 100 && !saveData.achievements.includes('endless_100')) saveData.achievements.push('endless_100');
if (saveData.achievements.includes('win_hard')) saveData.unlocks.win_hard = true;

if (saveData.upgrades) {
    for (let key in SHOP_CONFIG) {
        if (saveData.upgrades[key] > SHOP_CONFIG[key].max) {
            saveData.upgrades[key] = SHOP_CONFIG[key].max;
        }
    }
}

document.documentElement.style.fontSize = (settings.uiScale * 16) + 'px';
function applyGraphicsFX() {
    const isHigh = settings.graphics === 2;
    document.body.classList.toggle('gfx-high', isHigh);
    if (!isHigh) clearHudBarParticles();
}
applyGraphicsFX();

function saveGame() { 
    saveData.settings = settings;
    storage.setItem(SAVE_KEY_V30, JSON.stringify(saveData)); 
    updateUI(); 
}
function resetSave() { storage.removeItem(SAVE_KEY_V30); storage.removeItem(SAVE_KEY_V25); location.reload(); }
function showModal(msg, onConfirm) { 
    let m = document.getElementById('modal-overlay');
    if (!m) {
        const div = document.createElement('div');
        div.innerHTML = `<div id="modal-overlay" class="screen" style="background: rgba(0,0,0,0.85); z-index: 9999;"><div class="bg-gray-900 border border-red-500 p-6 max-w-sm text-center shadow-[0_0_50px_rgba(255,0,0,0.5)] relative"><h3 class="text-red-500 text-xl font-black mb-4 orbitron tracking-widest neon-text-accent">警告 // WARNING</h3><p id="modal-msg" class="text-gray-300 text-sm mb-8 leading-relaxed font-mono"></p><div class="flex justify-center gap-4"><button class="btn !border-gray-600 !text-gray-400 py-2 px-6 text-xs m-0" id="modal-cancel-btn">取消</button><button id="modal-confirm-btn" class="btn !border-red-600 !text-red-500 hover:!bg-red-900 hover:!text-white py-2 px-6 text-xs m-0">确认执行</button></div></div></div>`;
        document.body.appendChild(div.firstElementChild); m = document.getElementById('modal-overlay'); document.getElementById('modal-cancel-btn').onclick = closeModal;
    }
    document.getElementById('modal-msg').innerText = msg; const btn = document.getElementById('modal-confirm-btn'); const newBtn = btn.cloneNode(true); btn.parentNode.replaceChild(newBtn, btn); newBtn.onclick = () => { onConfirm(); closeModal(); }; m.classList.add('active');
}
function closeModal() { const m = document.getElementById('modal-overlay'); if (m) m.classList.remove('active'); }
function abandonAndStartNew() { showModal("确定要放弃当前任务进度吗？\n\n放弃后当前波次进度将丢失，直接开始新的一局。", () => { saveData.currentRun = null; saveGame(); openShipSelect(); }); }
function triggerResetSave() { showModal("确定要彻底重置所有存档吗？\n\n所有金币、解锁和成就将丢失，此操作不可逆！", () => { resetSave(); }); }

function t(key) { return TEXTS[key] || key; }
let gameState='menu', currentShip='ranger', currentMode='easy', gameLoopId, frameCount=0, shakeAmount=0;
let enemies=[], particles=[], pickups=[], activeProjectiles=[]; let previousScreen = 'main-menu'; let bombEffectTimer = 0; let activeBoss = null; 
let attackBoostTimer = 0;
const ATTACK_BOOST_MULT = 1.5;
const ATTACK_BOOST_DURATION = 300; // 5s @ 60fps
let perfLoadLevel = 0; // 0=normal, 1=busy, 2=critical
let avgFrameMs = 16.7;
let lastFrameTs = performance.now();
let cachedCanvasRect = null;
let cachedCanvasRectFrame = -1;

function getPlayerDamageBuffMult() {
    return attackBoostTimer > 0 ? ATTACK_BOOST_MULT : 1;
}

function getCanvasRectCached() {
    if (cachedCanvasRectFrame !== frameCount || !cachedCanvasRect) {
        cachedCanvasRect = canvas.getBoundingClientRect();
        cachedCanvasRectFrame = frameCount;
    }
    return cachedCanvasRect;
}

function calcPerfLoadLevel() {
    if (settings.graphics !== 2) return 0;
    const stress = activeProjectiles.length + enemies.length * 2 + pickups.length + particles.length * 0.5;
    if (avgFrameMs > 24 || stress > 700) return 2;
    if (avgFrameMs > 18 || stress > 430) return 1;
    return 0;
}

function steerVelocityToward(vx, vy, targetAngle, maxTurnPerFrame, spd, desiredSpeed) {
    let currentSpeed = Math.hypot(vx, vy);
    if (currentSpeed < 0.0001) currentSpeed = desiredSpeed;
    let currentAngle = Math.atan2(vy, vx);
    let diff = targetAngle - currentAngle;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    const maxTurn = maxTurnPerFrame * spd;
    if (diff > maxTurn) diff = maxTurn;
    if (diff < -maxTurn) diff = -maxTurn;
    const nextAngle = currentAngle + diff;
    const nextSpeed = currentSpeed + (desiredSpeed - currentSpeed) * Math.min(1, 0.1 * spd);
    return { vx: Math.cos(nextAngle) * nextSpeed, vy: Math.sin(nextAngle) * nextSpeed };
}

// Endless Mode Event Variables
let endlessEventTimer = 0;
let endlessNextEventTime = 30;

let cheatClicks = 0; let cheatTimer = null;
function triggerCheatCode() {
    cheatClicks++;
    const title = document.getElementById('title-logo');
    if(title) {
        title.style.filter = `drop-shadow(0 0 ${20 + cheatClicks * 10}px rgba(255,0,85,${cheatClicks/10}))`;
        setTimeout(() => { title.style.filter = ""; }, 100);
    }
    if (cheatTimer) clearTimeout(cheatTimer);
    cheatTimer = setTimeout(() => { cheatClicks = 0; }, 1000);
    if (cheatClicks >= 10) {
        saveData.unlocks.win_easy = true;
        saveData.unlocks.win_normal = true;
        saveData.unlocks.win_hard = true;
        saveData.unlocks.normal = true;
        saveData.unlocks.hard = true;
        saveData.unlocks.endless = true;
        ['endless_20', 'endless_30', 'endless_50', 'endless_60', 'endless_100'].forEach(id => {
            if (!saveData.achievements.includes(id)) saveData.achievements.push(id);
        });
        saveData.gold += 5000000;
        saveGame();
        notifyUnlock("👨‍💻 开发者指令：全机体/模式/成就已解锁！(金币+5000000)");
        cheatClicks = 0;
        updateUI();
        AudioSys.init();
    }
}

let gameWave = 1; let waveTimer = 0; let freezeTimer = 0; let isWaveBossActive = false; let runStats = { kills: 0, goldEarned: 0, hit: false }; 

// --- 星空背景系统 ---
let bgStars = [];
function initStars() {
    bgStars = [];
    if (settings.graphics === 0) return; // 低画质关闭星空
    let starCount = settings.graphics === 1 ? 30 : 80;
    for(let i=0; i<starCount; i++) {
        bgStars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            s: Math.random() * (settings.graphics === 1 ? 1.5 : 2) + 0.5, 
            v: Math.random() * 1.5 + 0.2, 
            a: Math.random() * 0.6 + 0.2 
        });
    }
}
function updateAndDrawStars(ctx, spd) {
    if (settings.graphics === 0) return;
    ctx.save();
    bgStars.forEach(star => {
        star.y += star.v * spd;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${star.a})`;
        ctx.fillRect(star.x, star.y, star.s, star.s);
    });
    ctx.restore();
}

const canvas = document.getElementById('gameCanvas'); const ctx = canvas.getContext('2d');
function resize() { canvas.width = Math.min(window.innerWidth, 600); canvas.height = window.innerHeight; initStars(); } window.addEventListener('resize', resize); resize();
const mouse = { x: canvas.width/2, y: canvas.height - 150 };
canvas.addEventListener('mousemove', e => { const r=canvas.getBoundingClientRect(); if(gameState==='playing'){ mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; }});
canvas.addEventListener('touchmove', e => { e.preventDefault(); const r=canvas.getBoundingClientRect(); if(gameState==='playing'){ mouse.x=e.touches[0].clientX-r.left; mouse.y=e.touches[0].clientY-r.top; }}, {passive:false});
canvas.addEventListener('dblclick', () => { if(gameState==='playing') triggerBombUI(); });
let lastTap = 0; canvas.addEventListener('touchend', (e) => { const now = Date.now(); if (now - lastTap < 300) { if(gameState==='playing') triggerBombUI(); } lastTap = now; });
let hudFxTicker = 0;
function clearHudBarParticles() {
    const hpLayer = document.getElementById('hud-hp-particles');
    const shLayer = document.getElementById('hud-shield-particles');
    if (hpLayer) hpLayer.innerHTML = '';
    if (shLayer) shLayer.innerHTML = '';
}
function spawnHudBarParticle(layerId, ratio, color) {
    const layer = document.getElementById(layerId);
    if (!layer || ratio <= 0) return;
    const p = document.createElement('span');
    p.className = 'bar-particle';
    const clamped = Math.max(0.04, Math.min(1, ratio));
    p.style.left = `${Math.random() * clamped * 100}%`;
    p.style.setProperty('--p-color', color);
    p.style.setProperty('--p-life', `${0.55 + Math.random() * 0.55}s`);
    layer.appendChild(p);
    if (layer.childElementCount > 42) layer.removeChild(layer.firstChild);
    setTimeout(() => p.remove(), 1300);
}
function updateHudBarFX(hpRatio, shieldRatio, shieldCharging) {
    if (settings.graphics !== 2 || gameState !== 'playing') return;
    if (perfLoadLevel >= 2) return;
    hudFxTicker++;
    const hpStep = perfLoadLevel >= 1 ? 4 : 2;
    const shStep = perfLoadLevel >= 1 ? 5 : 3;
    const chargingStep = perfLoadLevel >= 1 ? 7 : 4;
    if (hudFxTicker % hpStep === 0) spawnHudBarParticle('hud-hp-particles', hpRatio, '#ff4b8f');
    if (shieldRatio > 0 && hudFxTicker % shStep === 0) spawnHudBarParticle('hud-shield-particles', shieldRatio, '#00e5ff');
    if (shieldCharging && hudFxTicker % chargingStep === 0) spawnHudBarParticle('hud-shield-particles', Math.max(0.1, shieldRatio), '#88b8ff');
}

function drawShipModel(ctx, type, color) {
    const glow = (blur, c, isLighter = false) => {
        if (settings.graphics === 0) { ctx.shadowBlur = 0; ctx.globalCompositeOperation = 'source-over'; return; }
        ctx.shadowBlur = settings.graphics === 1 ? blur * 0.5 : (settings.graphics === 2 ? blur * 1.25 : blur); 
        ctx.shadowColor = c;
        ctx.globalCompositeOperation = isLighter ? 'lighter' : 'source-over';
        ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    };
    ctx.save();
    if (settings.graphics === 2) {
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.24;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(0, 2, 20 + Math.sin(frameCount * 0.08) * 2.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    
    let flameLen = 15 + Math.random() * 15;
    glow(20, '#00e5ff', true);
    ctx.fillStyle = '#fff'; 
    ctx.beginPath(); ctx.moveTo(-4, 10); ctx.lineTo(0, 10 + flameLen); ctx.lineTo(4, 10); ctx.fill();
    ctx.strokeStyle = '#00e5ff'; ctx.lineWidth = 2; ctx.stroke(); 

    glow(15, color, false);
    ctx.lineWidth = 3; 

    if (type === 'ranger') {
        ctx.fillStyle = '#0a0a14'; ctx.strokeStyle = color;
        ctx.beginPath(); ctx.moveTo(0, -25); ctx.lineTo(10, 0); ctx.lineTo(18, 20); ctx.lineTo(0, 15); ctx.lineTo(-18, 20); ctx.lineTo(-10, 0); ctx.closePath();
        ctx.fill(); ctx.stroke();
        glow(10, '#fff', true); ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(0, 5); ctx.stroke();
        glow(10, color, false); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(4, 5); ctx.lineTo(0, 8); ctx.lineTo(-4, 5); ctx.fill();
        ctx.fillStyle = color; ctx.globalAlpha = 0.6;
        ctx.beginPath(); ctx.moveTo(10, 5); ctx.lineTo(30, 15); ctx.lineTo(18, 20); ctx.moveTo(-10, 5); ctx.lineTo(-30, 15); ctx.lineTo(-18, 20); ctx.fill();
    } 
    else if (type === 'bulwark') {
        ctx.fillStyle = '#0a140a'; ctx.strokeStyle = color;
        ctx.beginPath(); ctx.moveTo(-18, -20); ctx.lineTo(18, -20); ctx.lineTo(28, 10); ctx.lineTo(12, 25); ctx.lineTo(-12, 25); ctx.lineTo(-28, 10); ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#1a331a'; ctx.beginPath(); ctx.rect(-12, -12, 24, 24); ctx.fill(); ctx.stroke();
        glow(15, '#fff', true); ctx.fillStyle = '#fff'; ctx.fillRect(-3, -25, 6, 15);
    }
    else if (type === 'lightning') {
        ctx.fillStyle = '#14140a'; ctx.strokeStyle = color;
        ctx.beginPath(); ctx.moveTo(0, -38); ctx.lineTo(12, 10); ctx.lineTo(0, 5); ctx.lineTo(-12, 10); ctx.closePath();
        ctx.fill(); ctx.stroke();
        glow(20, '#fff', true); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI*2); ctx.fill();
    }
    else if (type === 'shadow') {
        ctx.fillStyle = '#050010'; ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, -35); ctx.lineTo(12, -5); ctx.lineTo(25, 15); ctx.lineTo(0, 10); ctx.lineTo(-25, 15); ctx.lineTo(-12, -5); ctx.closePath();
        ctx.fill(); ctx.stroke();
        glow(15, '#fff', true); ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.moveTo(0, -25); ctx.lineTo(0, 5); ctx.stroke();
    }
    else if (type === 'piercer') {
        ctx.fillStyle = '#001a1a'; ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(8, -10); ctx.lineTo(15, 10); ctx.lineTo(5, 15); ctx.lineTo(0, 10); ctx.lineTo(-5, 15); ctx.lineTo(-15, 10); ctx.lineTo(-8, -10); ctx.closePath();
        ctx.fill(); ctx.stroke();
        glow(15, '#fff', true); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(3, -5); ctx.lineTo(-3, -5); ctx.fill();
    }
    else if (type === 'deity') {
        ctx.fillStyle = '#111'; ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        for(let i=0; i<4; i++) {
            ctx.save(); ctx.rotate(frameCount*0.05 + i*(Math.PI/2));
            ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(10, -25); ctx.lineTo(0, -35); ctx.lineTo(-10, -25); ctx.closePath();
            ctx.fill(); ctx.stroke(); ctx.restore();
        }
        glow(25, '#fff', true); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
}

function drawEnemyModel(ctx, type, color, hpRatio) {
    const glow = (blur, c, isLighter = false) => {
        if (settings.graphics === 0) { ctx.shadowBlur = 0; ctx.globalCompositeOperation = 'source-over'; return; }
        ctx.shadowBlur = settings.graphics === 1 ? blur * 0.5 : (settings.graphics === 2 ? blur * 1.2 : blur); 
        ctx.shadowColor = c;
        ctx.globalCompositeOperation = isLighter ? 'lighter' : 'source-over';
        ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    };
    ctx.save();
    if (settings.graphics === 2) {
        const auraR = (['boss', 'boss_omega', 'boss_eclipse'].includes(type) ? 58 : 26) + Math.sin(frameCount * 0.06) * 2;
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, auraR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    
    if (!['boss', 'boss_omega', 'boss_eclipse'].includes(type)) {
        glow(15, color, true);
        ctx.beginPath(); ctx.fillStyle = color; ctx.globalAlpha = 0.4; ctx.arc(0, -5, 8, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1.0;
    }

    ctx.lineWidth = 3; 

    if (type === 'drone') {
        glow(20, color, false);
        ctx.fillStyle = '#111'; ctx.strokeStyle = color;
        ctx.beginPath(); ctx.moveTo(0, 15); ctx.lineTo(12, -5); ctx.lineTo(0, -15); ctx.lineTo(-12, -5); ctx.closePath();
        ctx.fill(); ctx.stroke();
        glow(15, '#fff', true); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI*2); ctx.fill();
    }
    else if (type === 'shooter') {
        glow(20, color, false);
        ctx.fillStyle = '#111'; ctx.strokeStyle = color;
        ctx.beginPath(); ctx.moveTo(0, 20); ctx.lineTo(18, -10); ctx.lineTo(0, -5); ctx.lineTo(-18, -10); ctx.closePath();
        ctx.fill(); ctx.stroke();
        glow(10, '#fff', true); ctx.fillStyle = '#fff'; ctx.fillRect(-14, -10, 3, 6); ctx.fillRect(11, -10, 3, 6);
    }
    else if (type === 'tank') {
        glow(20, color, false);
        ctx.fillStyle = '#051005'; ctx.strokeStyle = color;
        ctx.fillRect(-18, -18, 10, 36); ctx.fillRect(8, -18, 10, 36);
        ctx.strokeRect(-18, -18, 10, 36); ctx.strokeRect(8, -18, 10, 36);
        ctx.fillRect(-10, -12, 20, 24); ctx.strokeRect(-10, -12, 20, 24);
        glow(20, '#fff', true); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI*2); ctx.fill();
    }
    else if (type === 'wanderer') {
        glow(20, color, false);
        ctx.strokeStyle = color; ctx.fillStyle = '#100a00';
        ctx.beginPath(); ctx.moveTo(0, 18); ctx.bezierCurveTo(25, 5, 25, -25, 0, -18); ctx.bezierCurveTo(-25, -25, -25, 5, 0, 18);
        ctx.fill(); ctx.stroke();
        glow(20, '#fff', true); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, -5, 4 + Math.sin(frameCount*0.2)*2, 0, Math.PI*2); ctx.fill();
    }
    else if (type === 'prism') {
        glow(25, color, true); 
        ctx.strokeStyle = '#fff'; ctx.fillStyle = 'rgba(0, 229, 255, 0.3)';
        ctx.beginPath(); ctx.moveTo(0, -28); ctx.lineTo(24, 0); ctx.lineTo(0, 28); ctx.lineTo(-24, 0); ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, -28); ctx.lineTo(0, 28); ctx.moveTo(-24, 0); ctx.lineTo(24, 0);
        ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.stroke();
    }
    else if (type === 'carrier') {
        glow(20, color, false);
        ctx.fillStyle = '#0a0a0a'; ctx.strokeStyle = color; ctx.lineWidth = 4;
        ctx.fillRect(-45, -35, 90, 70); ctx.strokeRect(-45, -35, 90, 70);
        ctx.fillStyle = '#1a1a1a'; ctx.fillRect(-55, -25, 10, 50); ctx.fillRect(45, -25, 10, 50);
        ctx.strokeRect(-55, -25, 10, 50); ctx.strokeRect(45, -25, 10, 50);
        glow(15, '#fff', true); ctx.fillStyle = '#fff';
        for(let i=0; i<3; i++) { ctx.fillRect(-12, -20 + i*15, 4, 8); ctx.fillRect(8, -20 + i*15, 4, 8); }
    }
    else if (type === 'pulsar') { 
        glow(20, color, false);
        ctx.strokeStyle = color; ctx.fillStyle = '#051010';
        ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(18, 0); ctx.lineTo(0, 18); ctx.lineTo(-18, 0); ctx.closePath();
        ctx.fill(); ctx.stroke();
        glow(25, '#fff', true); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 5 + Math.sin(frameCount*0.3)*3, 0, Math.PI*2); ctx.fill();
    }
    else if (type === 'weaver') { 
        glow(20, color, false);
        ctx.strokeStyle = color; ctx.fillStyle = '#100510';
        ctx.beginPath(); ctx.moveTo(0, 15); ctx.quadraticCurveTo(25, 15, 25, -18); ctx.quadraticCurveTo(0, 5, -25, -18); ctx.quadraticCurveTo(-25, 15, 0, 15);
        ctx.fill(); ctx.stroke();
        glow(15, '#fff', true); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 5, 4, 0, Math.PI*2); ctx.fill();
    }
    else if (type === 'boss') {
        glow(40, color, false);
        ctx.strokeStyle = color; ctx.lineWidth = 5; ctx.fillStyle = '#050505';
        ctx.beginPath(); ctx.moveTo(0, -65); ctx.lineTo(45, -30); ctx.lineTo(35, 55); ctx.lineTo(0, 75); ctx.lineTo(-35, 55); ctx.lineTo(-45, -30); ctx.closePath();
        ctx.fill(); ctx.stroke();
        glow(30, '#fff', true); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(0, -50, 22, 0, Math.PI*2); ctx.stroke();
    }
    else if (type === 'boss_eclipse') {
        glow(50, color, false);
        ctx.fillStyle = '#050000'; ctx.strokeStyle = color; ctx.lineWidth = 4;
        ctx.beginPath();
        for(let i=0; i<8; i++) {
            let angle = (Math.PI*2/8)*i; let r1 = 65; let r2 = 35;
            ctx.lineTo(Math.cos(angle)*r1, Math.sin(angle)*r1);
            let nextAngle = angle + (Math.PI*2/16);
            ctx.lineTo(Math.cos(nextAngle)*r2, Math.sin(nextAngle)*r2);
        }
        ctx.closePath(); ctx.fill(); ctx.stroke();
        glow(30, '#fff', true); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 22, 0, Math.PI*2); ctx.fill();
    }
    else if (type === 'boss_omega') {
        glow(60, color, true); 
        ctx.strokeStyle = color; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(0, 0, 65, 0, Math.PI*2); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, 48, 0, Math.PI*2); ctx.stroke();
        ctx.fillStyle = 'rgba(255,215,0,0.2)'; ctx.fill();
        glow(40, '#fff', true); ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.moveTo(0, -35); ctx.lineTo(28, 18); ctx.lineTo(-28, 18); ctx.fill();
        for(let i=0; i<4; i++) {
            ctx.save(); ctx.rotate(frameCount*0.05 + i*(Math.PI/2)); ctx.translate(65, 0);
            ctx.beginPath(); ctx.arc(0,0,10,0,Math.PI*2); ctx.fill(); ctx.restore();
        }
    }
    else if (type === 'kamikaze') {
        glow(15, color, true);
        ctx.strokeStyle = color; ctx.lineWidth = 3;
        ctx.beginPath();
        for(let i=0; i<8; i++) {
            let angle = (Math.PI*2/8) * i;
            ctx.moveTo(Math.cos(angle)*5, Math.sin(angle)*5); ctx.lineTo(Math.cos(angle)*12, Math.sin(angle)*12);
        }
        ctx.stroke();
        ctx.beginPath(); ctx.arc(0,0,5,0,Math.PI*2); ctx.fillStyle='#fff'; ctx.fill();
    }
    else if (type === 'micro_drone') {
        glow(10, color, true);
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(5, 5); ctx.lineTo(-5, 5); ctx.fill();
    }
    ctx.restore();
}

function updateWingmenPositions(obj, count, isEvo, spd) {
    let targetCount = isEvo ? 5 : count; 
    while(obj.wingmen.length < targetCount) obj.wingmen.push({ x: obj.x, y: obj.y, angle: 0 });
    if (isEvo) {
        let radius = 60; let speed = 0.05 * spd;
        for(let i=0; i<obj.wingmen.length; i++) {
            let w = obj.wingmen[i]; w.angle += speed;
            let offsetAngle = w.angle + (i * (Math.PI * 2 / 5));
            let tx = obj.x + Math.cos(offsetAngle) * radius; let ty = obj.y + Math.sin(offsetAngle) * radius;
            w.x += (tx - w.x) * 0.2 * spd; w.y += (ty - w.y) * 0.2 * spd;
        }
    } else {
        let offsets = [ {x:0, y:30}, {x:-30, y:20}, {x:30, y:20}, {x:-50, y:40}, {x:50, y:40} ];
        let activeOffsets = [];
        if (count === 1) activeOffsets = [offsets[0]]; else if (count === 2) activeOffsets = [offsets[1], offsets[2]]; else if (count === 3) activeOffsets = [offsets[1], offsets[2], offsets[0]]; else if (count === 4) activeOffsets = [offsets[1], offsets[2], offsets[3], offsets[4]]; else activeOffsets = offsets;
        for(let i=0; i<obj.wingmen.length; i++) {
            if (i >= activeOffsets.length) break;
            let w = obj.wingmen[i]; let off = activeOffsets[i];
            let tx = obj.x + off.x; let ty = obj.y + off.y;
            w.x += (tx - w.x) * 0.1 * spd; w.y += (ty - w.y) * 0.1 * spd;
        }
    }
}

class Player {
    constructor(shipType) {
        const conf = SHIPS[shipType]; const u = saveData.upgrades;
        this.x=canvas.width/2; this.y=canvas.height-100; this.shipType=shipType; this.color=conf.color;
        
        this.maxHp = (100 + (u.hull||0)*20 + (u.overclock_hull||0)*20) * conf.hpMult;
        this.hp=this.maxHp;
        this.speed = 0.08 * conf.spdMult; 
        this.magnet = 100 + (u.magnet||0)*10; 
        
        let savedDmg = Math.min(u.dmg || 0, SHOP_CONFIG.dmg.max);
        this.baseDmg = 12 * conf.dmgMult * (1 + savedDmg*0.15 + (u.overclock_dmg||0)*0.05);
        
        this.weapons={}; this.passives={}; this.xp=0; this.level=1; this.nextLvl=50; this.gold=0; 
        this.wingmen = [];
        this.bombCharge = 0; this.bombMax = 300; 
        this.baseCD=0; this.invincible=0; this.rerolls=(Math.min(u.reroll||0, SHOP_CONFIG.reroll.max));
        this.rerollCost=100; 
        this.tilt = 0;
        
        let initialShields = 0;
        if (shipType === 'bulwark') initialShields += 1;
        if (initialShields > 0) this.passives.shield = initialShields;

        if (shipType === 'lightning') this.weapons['wingman'] = { level: 1, cd: 0, evo: false };
        if (shipType === 'shadow') this.weapons['timebomb'] = { level: 1, cd: 0, evo: false };
        if (shipType === 'ranger') this.passives.multishot = (this.passives.multishot || 0) + 1;
        if (shipType === 'piercer') this.weapons['laser'] = { level: 1, cd: 0, evo: false };
        
        if (shipType === 'deity') {
            this.weapons['laser'] = { level: 1, cd: 0, evo: false };
            this.weapons['lightning'] = { level: 1, cd: 0, evo: false };
            this.weapons['boomerang'] = { level: 1, cd: 0, evo: false };
            this.weapons['wingman'] = { level: 1, cd: 0, evo: false };
            this.weapons['timebomb'] = { level: 1, cd: 0, evo: false };
            this.passives.multishot = (this.passives.multishot || 0) + 1;
        }

        this.shieldMax = (this.passives.shield || 0) * 30;
        this.shieldHp = this.shieldMax;
        this.shieldTimer = 0; 
        this.lbDmgBonus = 0;
        
        this.specialTimer = 0; 
        this.buddy = null; 
        
        this.revivesMax = u.revive || 0;
        this.revivesLeft = this.revivesMax;
        this.cloneLevel = Math.max(0, Math.min(2, u.clone || 0));
        this.cloneCount = this.cloneLevel >= 2 ? 2 : this.cloneLevel;
        this.cloneDamageMult = 0.2;
        this.hasClone = this.cloneCount > 0;
        this.cloneOffsets = [{ x: -40, y: 30 }, { x: 40, y: 30 }];
        this.cloneDataList = [];
        for (let i = 0; i < this.cloneCount; i++) {
            this.cloneDataList.push({ x: this.x, y: this.y, wingmen: [], idx: i });
        }
    }
    
    getMagnetRange() { return this.magnet + (this.passives.magnet || 0) * 75; }

    firePrimary(source, dmgMult) {
        let lvl = this.passives.multishot || 0;
        let n = lvl + 1;
        let finalDmg = (this.baseDmg * dmgMult) * (1 + this.lbDmgBonus) * getPlayerDamageBuffMult(); 
        
        if ((this.shipType === 'ranger' || this.shipType === 'deity') && lvl >= 9) {
            n = 36; 
            let spread = Math.PI * 2;
            let offset = frameCount * 0.02; 
            for(let i=0; i<n; i++) {
                let angle = (i / n) * spread + offset;
                activeProjectiles.push({ type:'basic', team:'player', x:source.x, y:source.y-15, vx:Math.cos(angle)*15, vy:Math.sin(angle)*15, dmg:finalDmg, color:this.color });
            }
        } 
        else if (lvl >= 9) {
            let spread = Math.PI / 4;
            for(let i=0; i<n; i++) {
                let angle = -Math.PI/2 + (i / (n - 1) - 0.5) * spread;
                activeProjectiles.push({ type:'basic', team:'player', x:source.x, y:source.y-15, vx:Math.cos(angle)*15, vy:Math.sin(angle)*15, dmg:finalDmg, color:this.color });
            }
        } else {
            for(let i=0;i<n;i++) {
                activeProjectiles.push({ type:'basic', team:'player', x:source.x+(i-(n-1)/2)*10, y:source.y-15, vx:0, vy:-15, dmg:finalDmg, color:this.color });
            }
        }
    }

    triggerExclusives(source, dmgMult) {
        const buffMult = getPlayerDamageBuffMult();
        if ((this.shipType === 'bulwark' || this.shipType === 'deity') && (this.passives.shield || 0) >= 5) {
            AudioSys.play('shoot_heavy');
            activeProjectiles.push({ type:'shockwave', team:'player', x:source.x, y:source.y, radius:0, maxRadius:250, dmg: (this.baseDmg * dmgMult) * 5 * buffMult, life: 60, color:'#00ffaa', hitList:[] });
        }
        if ((this.shipType === 'shadow' || this.shipType === 'deity') && this.weapons['timebomb'] && (this.weapons['timebomb'].level >= 5 || this.weapons['timebomb'].evo)) {
            setTimeout(()=>{
                AudioSys.play('shoot_heavy');
                let angle = -Math.PI / 2;
                activeProjectiles.push({ type:'giant_missile', team:'player', x:source.x, y:source.y, vx:Math.cos(angle)*4, vy:Math.sin(angle)*4, dmg: (this.baseDmg * dmgMult) * 50 * buffMult, life:300, color:'#d500f9' });
            }, 100);
        }
        if (this.shipType === 'deity' && this.weapons['lightning'] && (this.weapons['lightning'].level >= 5 || this.weapons['lightning'].evo)) {
            setTimeout(()=>{
                AudioSys.play('explode');
                let targets = enemies.filter(e => e.y > -50 && e.y < canvas.height + 50);
                targets.slice(0, 20).forEach(e => {
                    e.takeDamage((this.baseDmg * dmgMult) * 10 * buffMult);
                    activeProjectiles.push({type:'bolt', team:'player', x1:source.x, y1:source.y, x2:e.x, y2:e.y, life:15, color:'#ffffff'});
                });
                createExplosion(source.x, source.y, '#ffffff', 40);
            }, 200);
        }
    }

    update(spd) {
        const dx=mouse.x-this.x, dy=mouse.y-this.y;
        this.tilt = Math.max(-0.5, Math.min(0.5, dx * 0.005));
        let moveSpdMultiplier = 1 + (this.passives.speed || 0) * 0.1;
        if(dx*dx + dy*dy > 1) { 
            this.x += dx * this.speed * moveSpdMultiplier * spd; 
            this.y += dy * this.speed * moveSpdMultiplier * spd; 
        }
        
        this.x = Math.max(20, Math.min(canvas.width - 20, this.x));
        this.y = Math.max(20, Math.min(canvas.height - 20, this.y));
        
        if (this.hasClone) {
            this.cloneDataList.forEach((clone, i) => {
                const off = this.cloneOffsets[i] || this.cloneOffsets[0];
                const cx = this.x + off.x;
                const cy = this.y + off.y;
                clone.x += (cx - clone.x) * 0.1 * spd;
                clone.y += (cy - clone.y) * 0.1 * spd;
            });
        }

        if(this.invincible>0) this.invincible-=spd;
        let currentShieldLvl = this.passives.shield || 0;
        let targetMax = currentShieldLvl * 30;
        if (targetMax > this.shieldMax) {
            let diff = targetMax - this.shieldMax;
            let isNewShield = (this.shieldMax === 0);
            this.shieldMax = targetMax;
            if (isNewShield) { this.shieldHp = targetMax; showFloatText(this.x, this.y, "SHIELD READY", "#00e5ff"); } 
            else if (this.shieldHp > 0) { this.shieldHp += diff; }
        }
        if (this.shieldHp <= 0 && this.shieldMax > 0) {
            this.shieldTimer += spd;
            let baseTime = (currentShieldLvl >= 5) ? 20 : 30;
            let chargeTime = baseTime * 60; 
            if (this.shieldTimer >= chargeTime) {
                this.shieldHp = this.shieldMax; this.shieldTimer = 0;
                showFloatText(this.x, this.y, "SHIELD ONLINE", "#00e5ff");
            }
        }
        
        this.specialTimer += spd;
        if (this.specialTimer >= 360) {
            this.specialTimer = 0;
            this.triggerExclusives(this, 1.0);
            if (this.hasClone) this.cloneDataList.forEach(clone => this.triggerExclusives(clone, this.cloneDamageMult));
        }

        if ((this.shipType === 'lightning' || this.shipType === 'deity') && this.weapons['wingman'] && (this.weapons['wingman'].level >= 5 || this.weapons['wingman'].evo)) {
            if (!this.buddy) this.buddy = { x: this.x, y: this.y, angle: 0, cd: 0 };
            this.buddy.angle += 0.05 * spd;
            let tx = this.x + Math.cos(this.buddy.angle) * 70;
            let ty = this.y + Math.sin(this.buddy.angle) * 70;
            this.buddy.x += (tx - this.buddy.x) * 0.1 * spd;
            this.buddy.y += (ty - this.buddy.y) * 0.1 * spd;

            this.buddy.cd -= spd;
            if (this.buddy.cd <= 0) {
                this.buddy.cd = 15; 
                AudioSys.play('shoot_light');
                let target = null; let minDistSq = 160000; // 400*400
                for(let i=0; i<enemies.length; i++) {
                    let e = enemies[i];
                    if (e.y < -50 || e.y > canvas.height + 50) continue;
                    let dx = e.x - this.buddy.x; let dy = e.y - this.buddy.y;
                    let dSq = dx*dx + dy*dy;
                    if (dSq < minDistSq) { minDistSq = dSq; target = e; }
                }
                let shootAngle = -Math.PI/2;
                if (target) shootAngle = Math.atan2(target.y - this.buddy.y, target.x - this.buddy.x);
                activeProjectiles.push({ type: 'basic', team: 'player', x: this.buddy.x, y: this.buddy.y, vx: Math.cos(shootAngle)*15, vy: Math.sin(shootAngle)*15, dmg: this.baseDmg * 0.8, color: '#ffea00' });
            }
        } else {
            this.buddy = null; 
        }

        this.baseCD -= spd;
        if(this.baseCD<=0) {
            AudioSys.play('shoot_light');
            let savedRate = Math.min(saveData.upgrades.rate || 0, SHOP_CONFIG.rate.max);
            let rateMod = 1 - savedRate * 0.06; 
            
            this.firePrimary(this, 1.0);
            if (this.hasClone) this.cloneDataList.forEach(clone => this.firePrimary(clone, this.cloneDamageMult));

            this.baseCD = 40 * rateMod * Math.pow(0.9, (this.passives.rapid||0));
        }
        
        for(let k in this.weapons) {
            let w=this.weapons[k]; w.cd-=spd;
            if(w.cd<=0) { 
                fireWeapon(k, w.level, this); 
                if (this.hasClone) {
                    this.cloneDataList.forEach(clone => {
                        let cloneMock = {
                            x: clone.x, y: clone.y,
                            baseDmg: this.baseDmg * this.cloneDamageMult, lbDmgBonus: this.lbDmgBonus,
                            passives: this.passives, weapons: this.weapons,
                            wingmen: clone.wingmen, shipType: this.shipType 
                        };
                        fireWeapon(k, w.level, cloneMock);
                    });
                }
                w.cd = (w.evo?30:60) * Math.pow(0.9, (this.passives.rapid||0)); 
            }
        }
        
        if (this.weapons['wingman']) {
            updateWingmenPositions(this, this.weapons['wingman'].level, this.weapons['wingman'].evo, spd);
            if (this.hasClone) this.cloneDataList.forEach(clone => updateWingmenPositions(clone, this.weapons['wingman'].level, this.weapons['wingman'].evo, spd));
        }
    }
    
    takeDamage(d) {
        if(this.invincible>0) return;
        if ((this.shipType === 'shadow' || this.shipType === 'deity') && Math.random() < 0.2) { showFloatText(this.x, this.y, "MISS", "#888"); return; }
        let damageToHull = d;
        if (this.shieldHp > 0) {
            if (this.shieldHp >= d) {
                this.shieldHp -= d; damageToHull = 0; showFloatText(this.x, this.y, "吸收", "#00e5ff"); this.invincible = 10; AudioSys.play('hit');
            } else {
                damageToHull = d - this.shieldHp; this.shieldHp = 0; this.shieldTimer = 0;
                showFloatText(this.x, this.y, "护盾破碎!", "#ff0055"); createExplosion(this.x, this.y, '#00e5ff', 10); shakeAmount = 10; AudioSys.play('shield_break');
            }
        }
        if (damageToHull > 0) {
            this.hp -= damageToHull; this.invincible = 30; shakeAmount = 5; runStats.hit = true; AudioSys.play('hit');
            if (this.hp <= 0) {
                if (this.revivesLeft > 0) {
                    this.revivesLeft--; this.hp = this.maxHp; this.invincible = 120;
                    createExplosion(this.x, this.y, '#00ffaa', 50); showFloatText(this.x, this.y, "系统重组!", "#00ffaa"); AudioSys.play('level_up'); updateHUD();
                    enemies.forEach(e => { if (e.role === 'minion') e.takeDamage(99999); else e.takeDamage(1000); });
                    activeProjectiles.forEach(p => { if (p.team === 'enemy' || p.type === 'enemy_bullet' || p.type === 'enemy_missile' || p.type === 'enemy_laser') { p.marked = true; } });
                    return;
                }
                endGame(false);
            }
        }
        updateHUD();
    }
    chargeBomb(amt) { this.bombCharge = Math.min(this.bombMax, this.bombCharge + amt); updateHUD(); }
    draw(ctx) {
        if (this.invincible > 0 && Math.floor(frameCount/4)%2 === 0) return;
        
        if (this.hasClone) {
            this.cloneDataList.forEach(clone => {
                if (this.weapons['wingman'] && clone.wingmen.length > 0) {
                    let isEvo = this.weapons['wingman'].evo;
                    clone.wingmen.forEach(w => {
                        ctx.save(); ctx.translate(w.x, w.y); if (isEvo) ctx.rotate(w.angle * 2); 
                        ctx.shadowBlur = 10; ctx.shadowColor = isEvo ? '#d500f9' : '#00e5ff'; ctx.globalCompositeOperation = 'lighter';
                        ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.4;
                        ctx.beginPath();
                        if (isEvo) { ctx.moveTo(0, -10); ctx.lineTo(-8, 5); ctx.lineTo(8, 5); } else { ctx.moveTo(0, -8); ctx.lineTo(-5, 5); ctx.lineTo(5, 5); }
                        ctx.fill(); ctx.restore();
                    });
                }
                ctx.save(); ctx.translate(clone.x, clone.y); ctx.rotate(this.tilt); ctx.globalAlpha = 0.4;
                drawShipModel(ctx, this.shipType, '#00ffaa'); ctx.restore();
            });
        }

        if (this.weapons['wingman'] && this.wingmen.length > 0) {
            let isEvo = this.weapons['wingman'].evo;
            this.wingmen.forEach(w => {
                ctx.save(); ctx.translate(w.x, w.y); if (isEvo) ctx.rotate(w.angle * 2); 
                ctx.shadowBlur = 10; ctx.shadowColor = isEvo ? '#d500f9' : '#00e5ff'; ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                if (isEvo) { ctx.moveTo(0, -10); ctx.lineTo(-8, 5); ctx.lineTo(8, 5); } else { ctx.moveTo(0, -8); ctx.lineTo(-5, 5); ctx.lineTo(5, 5); }
                ctx.fill(); ctx.restore();
            });
        }
        
        if (this.buddy) {
            ctx.save(); ctx.translate(this.buddy.x, this.buddy.y); ctx.rotate(this.buddy.angle);
            ctx.shadowBlur = 15; ctx.shadowColor = '#ffea00'; ctx.globalCompositeOperation = 'lighter';
            ctx.scale(0.5, 0.5); drawShipModel(ctx, 'lightning', '#ffea00'); ctx.restore();
        }

        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.tilt);
        drawShipModel(ctx, this.shipType, this.color);
        if (this.shieldHp > 0) {
            ctx.beginPath(); ctx.arc(0, 0, 30 + Math.sin(frameCount*0.1)*2, 0, Math.PI*2);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.3 + (this.shieldHp/this.shieldMax)*0.5})`; ctx.lineWidth = 2;
            ctx.shadowBlur = 15; ctx.shadowColor = '#00e5ff'; ctx.globalCompositeOperation = 'lighter'; ctx.stroke();
        }
        ctx.restore();
    }
    gainXp(amt) { this.xp += amt; this.checkLevelUp(); updateHUD(); }
    checkLevelUp() { if(this.xp >= this.nextLvl) { this.level++; this.xp -= this.nextLvl; this.nextLvl = Math.floor(this.nextLvl * 1.2); triggerLevelUp(); return true; } return false; }
}

class Enemy {
    constructor(type, wave, role='minion') {
        this.type=type; this.role = role; this.x=Math.random()*canvas.width; this.y=-50;
        let hpMulti = 1; if (role === 'elite') hpMulti = 8; if (role === 'boss') hpMulti = 100; 
        
        const waveScale = 1 + wave * 0.25;
        const difficultyBumper = Math.pow(1.05, Math.max(0, wave - 5));
        let enemyHpModeMult = ENEMY_HP_MODE_MULT[currentMode] || 1.0;
        
        this.hp = 22 * waveScale * difficultyBumper * hpMulti * enemyHpModeMult;
        if (role === 'elite_minion') { this.hp = 22 * waveScale * difficultyBumper * 5 * enemyHpModeMult; }
        
        this.vy = 2 + wave * 0.1; this.color = '#ff0055';
        if(type==='tank') { this.hp *= 5.5; this.vy = 0.8 + wave * 0.05; this.color = '#00ffaa'; }
        if(type==='wanderer') {
            this.hp *= 1.3; this.vy = 3.5 + wave * 0.15; this.color = '#ffea00';
            if (role === 'minion') {
                const side = Math.floor(Math.random() * 4);
                const margin = 70;
                if (side === 0) { this.x = Math.random() * canvas.width; this.y = -margin; this.wanderDirX = 0; this.wanderDirY = 1; }
                else if (side === 1) { this.x = Math.random() * canvas.width; this.y = canvas.height + margin; this.wanderDirX = 0; this.wanderDirY = -1; }
                else if (side === 2) { this.x = -margin; this.y = Math.random() * canvas.height; this.wanderDirX = 1; this.wanderDirY = 0; }
                else { this.x = canvas.width + margin; this.y = Math.random() * canvas.height; this.wanderDirX = -1; this.wanderDirY = 0; }
                this.wanderSwaySeed = Math.random() * Math.PI * 2;
            }
        }
        if(type==='prism') { this.hp *= 2.5; this.vy = 1.5 + wave * 0.1; this.color = '#00e5ff'; }
        if(type==='pulsar') { this.hp *= 2.0; this.vy = 1.0 + wave * 0.05; this.color = '#00ffaa'; }
        if(type==='weaver') { this.hp *= 1.8; this.vy = 1.2 + wave * 0.05; this.color = '#d500f9'; }
        if(type==='carrier') { this.hp *= 7; this.vy = 0.5 + wave * 0.03; this.color = '#ff3d00'; } 
        if(type==='boss') { this.vy=1.5; this.color='#fff'; this.isBoss=true; }
        if(type==='boss_eclipse') { this.hp*=3; this.vy=1.2; this.color='#ff0000'; this.isBoss=true; }
        if(type==='boss_omega') { this.hp*=7; this.vy=1.0; this.color='#ffea00'; this.isBoss=true; }
        if(type==='micro_drone') { this.hp*=0.15; this.vy=3 + wave*0.1; this.color='#ffea00'; }
        if(type==='kamikaze') { this.hp*=0.6; this.vy=4 + wave*0.2; this.color='#ff0055'; }
        this.maxHp = this.hp;
        
        this.state = 'entering'; this.tick = 0; this.attackState = 0; this.angle = 0; this.attackAngle = 0;
        this.combatActive = false;
        
        if (role !== 'minion' && role !== 'elite_minion') {
            this.x = canvas.width / 2;
            if (this.isBoss) { activeBoss = this; } else if (role === 'elite') { if (!activeBoss || !activeBoss.isBoss) { activeBoss = this; } }
            if(role === 'elite') {
                if (type === 'prism') this.color = '#00e5ff'; else if (type === 'carrier') this.color = '#ff3d00';
                else if (type === 'pulsar') this.color = '#00ffaa'; else if (type === 'weaver') this.color = '#d500f9'; else this.color = '#ff00ff';
            }
        }
    }
    
    update(spd) { 
        const canMove = freezeTimer <= 0 || this.isBoss || this.role === 'elite'; 
        let slowFactor = 1.0; if (player && player.passives.speed) { slowFactor = Math.max(0.1, 1.0 - (player.passives.speed * 0.05)); }
        
        let modeDmgMult = 1.0; 
        if (currentMode === 'easy') modeDmgMult = 0.8; 
        if (currentMode === 'normal') modeDmgMult = 1.2; 
        if (currentMode === 'hard') modeDmgMult = 1.8; 
        if (currentMode === 'endless') modeDmgMult = 2.5;
        const dmgScale = (1 + gameWave * 0.25) * modeDmgMult;
        
        const angleToPlayer = Math.atan2(player.y - this.y, player.x - this.x);
        if (!this.combatActive && this.x >= 0 && this.x <= canvas.width && this.y >= 0 && this.y <= canvas.height) this.combatActive = true;

        if (this.isBoss || this.role === 'elite') { this.x = Math.max(50, Math.min(canvas.width - 50, this.x)); }

        if (canMove) this.tick += spd;

        if (this.type === 'boss') {
            const hpPct = this.hp / this.maxHp;
            if (this.state === 'entering') { if(canMove) this.y += this.vy * spd * slowFactor; if (this.y >= 150) { this.state = 'fight'; this.tick = 0; } } 
            else if(canMove) {
                if (hpPct <= 0.5) {
                    if (this.phase !== 2) {
                        this.phase = 2;
                        this.color = '#ff002e';
                        this.tick = 0;
                        this.attackState = 0;
                        showWarning("审判者狂暴过载");
                        createExplosion(this.x, this.y, '#ff002e', 35);
                        AudioSys.play('alarm');
                    }
                    this.angle += 0.16 * spd;
                    this.x += (canvas.width/2 - this.x) * 0.012 * spd;
                    this.x += Math.cos(this.angle * 0.6) * 4 * spd * slowFactor;

                    if (this.tick % 5 < 1) {
                        this.attackAngle += 0.26;
                        for(let i=0; i<6; i++) {
                            let a = this.attackAngle + (i * Math.PI*2/6);
                            activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(a)*6.8, vy:Math.sin(a)*6.8, dmg:18 * dmgScale, color:'#ff003d', life:260});
                        }
                    }
                    if (this.tick % 120 < 1) {
                        AudioSys.play('alarm');
                        activeProjectiles.push({type: 'enemy_laser', team: 'enemy', parent: this, x: this.x, y: this.y, angle: angleToPlayer, w: 32, dmg: 26 * dmgScale, warnTime: 45, activeTime: 28, color: '#ff0033', tracking: true});
                    }
                } else {
                    this.color = '#ffffff';
                    this.x += (canvas.width/2 - this.x) * 0.01 * spd; this.x += Math.sin(frameCount * 0.02) * 2 * spd * slowFactor;
                    
                    if (this.tick > 360) { this.tick = 0; this.attackState = (this.attackState + 1) % 2; }
                    
                    if (this.attackState === 0) {
                        if (this.tick % 6 < 1) {
                            this.attackAngle += 0.22;
                            for(let i=0; i<3; i++) {
                                let a = this.attackAngle + (i * Math.PI*2/3);
                                activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(a)*4.6, vy:Math.sin(a)*4.6, dmg:16 * dmgScale, color:'#d500f9', life:250});
                            }
                        }
                    } else if (this.attackState === 1) {
                        if (Math.abs(this.tick - 10) < 1 || Math.abs(this.tick - 130) < 1) {
                            AudioSys.play('alarm');
                            activeProjectiles.push({type: 'enemy_laser', team: 'enemy', parent: this, x: this.x, y: this.y, angle: angleToPlayer, w: 25, dmg: 20 * dmgScale, warnTime: 60, activeTime: 20, color: '#ff0055', tracking: true});
                        }
                    }
                }
            }
            return;
        }

        if (this.type === 'boss_eclipse') {
            const isPhase2 = (this.hp / this.maxHp) <= 0.5;
            if (this.state === 'entering') { if(canMove) this.y += this.vy * spd * slowFactor; if (this.y >= 120) { this.state = 'fight'; this.tick = 0; } } 
            else if(canMove) {
                if (isPhase2) {
                    if (this.phase === 1) { this.phase = 2; showWarning("过载模式启动"); createExplosion(this.x, this.y, '#ff0000', 30); this.tick = 0; this.attackState = 0;}
                    this.x += Math.cos(frameCount * 0.04) * 4 * spd * slowFactor; let targetY = Math.min(canvas.height - 250, player.y - 180); this.y += (targetY - this.y) * 0.015 * spd * slowFactor;
                    this.angle += 0.05 * spd;
                } else {
                    this.x += (canvas.width/2 - this.x) * 0.02 * spd; this.x += Math.cos(frameCount * 0.03) * 4 * spd * slowFactor;
                    this.angle += 0.02 * spd; 
                }
                
                if (this.tick > 420) { this.tick = 0; this.attackState = (this.attackState + 1) % 2; }

                if (this.attackState === 0) {
                    if (this.tick === 10) {
                        AudioSys.play('alarm');
                        for(let i=1; i<=4; i++) {
                            let yPos = this.y + i * 150;
                            activeProjectiles.push({type: 'enemy_laser', team: 'enemy', x: 0, y: yPos, angle: 0, w: 30, dmg: 25 * dmgScale, warnTime: 90, activeTime: 25, color: '#ff0000', tracking: false});
                        }
                        activeProjectiles.push({type: 'enemy_laser', team: 'enemy', x: player.x, y: 0, angle: Math.PI/2, w: 30, dmg: 25 * dmgScale, warnTime: 90, activeTime: 25, color: '#ff0000', tracking: false});
                        activeProjectiles.push({type: 'enemy_laser', team: 'enemy', x: Math.max(20, Math.min(canvas.width - 20, player.x + (Math.random() > 0.5 ? 80 : -80))), y: 0, angle: Math.PI/2, w: 24, dmg: 22 * dmgScale, warnTime: 90, activeTime: 25, color: '#ff3355', tracking: false});
                    }
                    if (isPhase2 && this.tick % 45 < 1) { 
                        let a = angleToPlayer + (Math.random()-0.5) * 1.5;
                        activeProjectiles.push({type:'enemy_missile', team:'enemy', x:this.x, y:this.y, vx:Math.cos(a)*3, vy:Math.sin(a)*3, dmg:20 * dmgScale, color:'#ff0055', life:300});
                    }
                } else if (this.attackState === 1) {
                    if (this.tick === 10) {
                        AudioSys.play('alarm');
                        activeProjectiles.push({type: 'enemy_laser', team: 'enemy', parent: this, x: this.x, y: this.y, angle: this.angle, w: 40, dmg: 30 * dmgScale, warnTime: 60, activeTime: 120, color: '#ff0000', tracking: false, isSweeper: true});
                    }
                    if (isPhase2 && this.tick % 12 < 1) { 
                        activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(this.angle)*7, vy:Math.sin(this.angle)*7, dmg:20 * dmgScale, color:'#ff0055', life:200});
                        activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(this.angle + Math.PI)*7, vy:Math.sin(this.angle + Math.PI)*7, dmg:20 * dmgScale, color:'#ff0055', life:200});
                    }
                }
            }
            return;
        }

        if (this.type === 'boss_omega') {
            let hpPct = this.hp / this.maxHp;
            if (this.state === 'entering') { if(canMove) this.y += this.vy * spd * slowFactor; if (this.y >= 120) { this.state = 'fight'; this.tick = 0; } } 
            else if(canMove) {
                if (hpPct > 0.5 && this.phase === 1) {
                    this.angle += 0.03 * spd;
                    if (this.tick > 340) { this.tick = 0; this.attackState = (this.attackState + 1) % 2; }
                    
                    if (this.attackState === 0) {
                        if (this.tick % 4 < 1) {
                            this.attackAngle += 0.15;
                            activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(this.attackAngle)*6, vy:Math.sin(this.attackAngle)*6, dmg:25 * dmgScale, color:'#ffea00', life:250, curve: 0.02});
                            activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(this.attackAngle + Math.PI)*6, vy:Math.sin(this.attackAngle + Math.PI)*6, dmg:25 * dmgScale, color:'#ffea00', life:250, curve: 0.02});
                        }
                    } else if (this.attackState === 1) {
                        if (this.tick === 10) {
                            let p1 = new Enemy('prism', gameWave, 'elite_minion'); p1.x = this.x - 100; p1.y = this.y + 50; 
                            let p2 = new Enemy('prism', gameWave, 'elite_minion'); p2.x = this.x + 100; p2.y = this.y + 50; 
                            enemies.push(p1); enemies.push(p2);
                        }
                        if (this.tick % 45 < 1) {
                            AudioSys.play('shoot_heavy');
                            for(let i=-5; i<=5; i++) { let a = angleToPlayer + i * 0.14; activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(a)*8, vy:Math.sin(a)*8, dmg:20 * dmgScale, color:'#ffea00', life:200}); }
                        }
                    }
                } else {
                    if (this.phase === 1) { this.phase = 2; showWarning("神之制裁准备"); createExplosion(this.x, this.y, '#fff', 50); this.tick = 0; this.attackState = 0; }
                    this.angle += 0.015 * spd; 
                    if (this.tick > 500) { this.tick = 0; this.attackState = (this.attackState + 1) % 2; }
                    
                    if (this.attackState === 0) {
                        if (this.tick === 10) {
                            AudioSys.play('alarm');
                            for(let i=0; i<4; i++) {
                                let offset = i * (Math.PI/2);
                                activeProjectiles.push({type: 'enemy_laser', team: 'enemy', parent: this, angleOffset: offset, x: this.x, y: this.y, angle: this.angle + offset, w: 60, dmg: 40 * dmgScale, warnTime: 90, activeTime: 300, color: '#ffea00', tracking: false, isSweeper: true});
                            }
                        }
                        if (this.tick > 90 && this.tick % 30 < 1) {
                            for(let i=0; i<16; i++) { let a = (i * Math.PI*2/16) + (this.tick*0.01); activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(a)*3, vy:Math.sin(a)*3, dmg:30 * dmgScale, color:'#00e5ff', life:300}); }
                        }
                    } else if (this.attackState === 1) {
                        if (this.tick % 24 < 1) {
                            for(let i=0; i<22; i++) { let a = (i * Math.PI*2/22); activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(a)*2, vy:Math.sin(a)*2, dmg:30 * dmgScale, color:'#00e5ff', life:250, accel: 1.03}); }
                        }
                        if (this.tick % 70 === 0) {
                            for(let i=-1; i<=1; i+=2) { let a = angleToPlayer + i*0.5; activeProjectiles.push({type:'enemy_missile', team:'enemy', x:this.x, y:this.y, vx:Math.cos(a)*4, vy:Math.sin(a)*4, dmg:25 * dmgScale, color:'#ff0055', life:300}); }
                        }
                    }
                }
            }
            return;
        }

        if (this.type === 'carrier') {
            if (this.state === 'entering') { if(canMove) this.y += this.vy * spd * slowFactor; if (this.y >= 140) this.state = 'fight'; } 
            else if(canMove) {
                this.x += (canvas.width/2 - this.x) * 0.01 * spd; this.x += Math.cos(frameCount * 0.01) * 1.5 * spd * slowFactor;
                
                // 强化机制1：单层弹幕墙（保留缺口）
                const wallCycle = 120;
                const wallTick = this.tick % wallCycle;
                if (this.combatActive && wallTick < 1) this.wallAngle = angleToPlayer;
                if (this.combatActive && wallTick < 1) {
                    AudioSys.play('shoot_heavy');
                    let baseA = this.wallAngle || angleToPlayer;
                    let gapPos = (Math.floor(this.tick / wallCycle) % 2 === 0) ? -3 : 3;
                    let angleShift = 0;
                    
                    for(let i=-9; i<=9; i++) {
                        if (Math.abs(i - gapPos) <= 2.5) continue; 
                        let a = baseA + (i * 0.12) + angleShift; 
                        activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y+20, vx:Math.cos(a)*3.8, vy:Math.sin(a)*3.8, dmg:15 * dmgScale, color:'#ff3d00', life:290}); 
                    }
                }
                if (this.combatActive && this.tick % 90 < 1) {
                    const altGap = (Math.floor(this.tick / 90) % 2 === 0) ? -3 : 3;
                    for(let i=-5; i<=5; i++) {
                        if (Math.abs(i) <= 1) continue; // 中央安全通道
                        if (Math.abs(i - altGap) <= 1) continue; // 侧向交错缺口
                        let a = angleToPlayer + i * 0.12;
                        activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y+10, vx:Math.cos(a)*4.4, vy:Math.sin(a)*4.4, dmg:14 * dmgScale, color:'#ff6644', life:210});
                    }
                }
                
                // 强化机制2：重型追踪自爆群（分左中右三方向，高血量）
                if (this.combatActive && this.tick % 220 < 1) { 
                    AudioSys.play('alarm');
                    let angles = [angleToPlayer - 1.2, angleToPlayer, angleToPlayer + 1.2];
                    for(let k=0; k<3; k++) { 
                        let km = new Enemy('kamikaze', gameWave, 'minion'); 
                        km.x = this.x; km.y = this.y; 
                        km.hp *= 5; // 血量变5倍
                        km.maxHp = km.hp;
                        km.approachAngle = angles[k]; // 左右包抄
                        km.scaleMult = 1.5; // 体型变大
                        km.color = '#ff0000'; // 变色以示警告
                        enemies.push(km); 
                    } 
                }
            }
            return;
        }
        if (this.type === 'prism') {
            if (this.state === 'entering') { if(canMove) this.y += this.vy * spd * slowFactor; if (this.y >= 140) this.state = 'fight'; } 
            else if(canMove) {
                this.x += (canvas.width/2 - this.x) * 0.01 * spd; this.x += Math.sin(frameCount * 0.02) * 2 * spd * slowFactor;
                this.attackAngle += 0.08 * spd;
                if (this.combatActive && this.tick % 8 < 1) {
                    for(let i=0; i<3; i++) { let a = this.attackAngle + (i * (Math.PI*2/3)); activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(a)*5, vy:Math.sin(a)*5, dmg:10 * dmgScale, color:'#00e5ff', life:250}); }
                }
            }
            return; 
        }
        if (this.type === 'pulsar') {
            if (canMove) { this.y += this.vy * spd * slowFactor; this.x += (player.x - this.x) * 0.005 * spd * slowFactor; }
            const pulsarCyclePassed = Math.floor((this.tick - spd) / 150) !== Math.floor(this.tick / 150);
            if (this.combatActive && canMove && pulsarCyclePassed) {
                AudioSys.play('alarm');
                activeProjectiles.push({
                    type: 'enemy_laser',
                    team: 'enemy',
                    x: this.x,
                    y: this.y,
                    angle: angleToPlayer,
                    w: 14,
                    dmg: 16 * dmgScale,
                    warnTime: 45,
                    activeTime: 20,
                    color: '#00ffaa',
                    tracking: false
                });
            }
            if (this.y > canvas.height + 50) this.marked = true;
            return;
        }
        if (this.type === 'weaver') {
            if (canMove) { this.y += this.vy * spd * slowFactor; this.x += Math.cos(this.y * 0.03) * 3 * spd * slowFactor; }
            if (this.combatActive && this.tick % 100 === 0) { 
                AudioSys.play('shoot_heavy');
                activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x - 6, y:this.y, vx:-1.5, vy:5.2, dmg:15 * dmgScale, color:'#d500f9', life:220, curve: 0.012});
                activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x + 6, y:this.y, vx:1.5, vy:5.2, dmg:15 * dmgScale, color:'#d500f9', life:220, curve: -0.012});
            }
            if (this.y > canvas.height + 50) this.marked = true;
            return;
        }

        if (this.type === 'kamikaze') {
            if(canMove) { 
                let currentAngle = angleToPlayer;
                if (this.approachAngle !== undefined) {
                    let diff = angleToPlayer - this.approachAngle;
                    while(diff > Math.PI) diff -= Math.PI*2;
                    while(diff < -Math.PI) diff += Math.PI*2;
                    this.approachAngle += diff * 0.03 * spd; // 转弯修正
                    currentAngle = this.approachAngle;
                }
                let speed = (3 + gameWave * 0.1) * spd * slowFactor;
                this.x += Math.cos(currentAngle) * speed; 
                this.y += Math.sin(currentAngle) * speed; 
            }
            let pdx = player.x - this.x; let pdy = player.y - this.y;
            let range = 20 * (this.scaleMult || 1);
            if (this.combatActive && pdx*pdx + pdy*pdy < range*range) { 
                player.takeDamage(20 * dmgScale); this.marked = true; createExplosion(this.x, this.y, '#ff0055', 10); AudioSys.play('explode'); 
            }
            return;
        }
        if (this.type === 'wanderer') {
            if (canMove) {
                if (typeof this.wanderDirX !== 'number' || typeof this.wanderDirY !== 'number') {
                    this.wanderDirX = 0; this.wanderDirY = 1; this.wanderSwaySeed = Math.random() * Math.PI * 2;
                }
                const forwardSpeed = this.vy * spd * slowFactor;
                const sway = Math.sin(frameCount * 0.06 + this.tick * 0.05 + (this.wanderSwaySeed || 0)) * 3.8 * spd * slowFactor;
                const perpX = -this.wanderDirY;
                const perpY = this.wanderDirX;
                this.x += this.wanderDirX * forwardSpeed + perpX * sway;
                this.y += this.wanderDirY * forwardSpeed + perpY * sway;
            }
            if (this.x < -120 || this.x > canvas.width + 120 || this.y < -120 || this.y > canvas.height + 120) this.marked = true;
            return;
        }
        if (this.type === 'shooter') {
            if(canMove) { this.y += this.vy * spd * slowFactor; if (this.combatActive && this.tick % 120 === 0) { AudioSys.play('shoot_light'); activeProjectiles.push({type:'enemy_bullet', team:'enemy', x:this.x, y:this.y, vx:Math.cos(angleToPlayer)*4, vy:Math.sin(angleToPlayer)*4, dmg:10 * dmgScale, color:'#ff0055', life:250}); } }
            if (this.y > canvas.height + 50) this.marked = true; return;
        }
        if (this.role === 'minion') {
            if(canMove) { this.y += this.vy*spd * slowFactor; if (this.type === 'micro_drone') { this.x += Math.cos(angleToPlayer) * 2.5 * spd * slowFactor; this.y += Math.sin(angleToPlayer) * 2.5 * spd * slowFactor; this.y -= this.vy*spd * slowFactor;  } }
            if (this.y > canvas.height + 50) this.marked = true;
        } else {
            if (this.state === 'entering') { if(canMove) this.y += this.vy * spd * slowFactor; if (this.y >= 140) this.state = 'fight'; }
        }
    }
    
    takeDamage(d) {
        if (this.marked) return; 
        if (!this.combatActive) {
            const entered = this.x >= 0 && this.x <= canvas.width && this.y >= 0 && this.y <= canvas.height;
            if (!entered) return;
            this.combatActive = true;
        }
        this.hp-=d; showFloatText(this.x, this.y, Math.floor(d), '#fff');
        this.flashTimer = 3; AudioSys.play('hit');
        if (this.hp <= 0 && activeBoss === this) { 
            activeBoss = null; document.getElementById('boss-hud').style.display = 'none'; 
        }
        if(this.hp<=0) {
            this.marked=true; createExplosion(this.x,this.y,this.color,10); player.chargeBomb(1); runStats.kills++; AudioSys.play('explode');
            if (this.type === 'tank') { for(let i=0; i<3; i++) { let m = new Enemy('micro_drone', gameWave); m.x = this.x + (Math.random() - 0.5) * 20;; m.y = this.y; enemies.push(m); } }
            if (this.isBoss) {
                const bossXpValue = gameWave > 20 ? Math.round(2000 * (1 + Math.min(2.2, (gameWave - 20) * 0.06))) : 2000;
                for(let i=0; i<15; i++) pickups.push({x:this.x + (Math.random()-0.5)*150, y:this.y + (Math.random()-0.5)*150, type:'xp', value:bossXpValue});
                pickups.push({x:this.x-20, y:this.y, type:'heal'});
                pickups.push({x:this.x+20, y:this.y, type:'gold', value:1000});
                createExplosion(this.x, this.y, '#fff', 50); setTimeout(() => completeWave(), 1000); return;
            }
            let specialChance = 0.12; let goldChance = 0.2; let goldValue = 12;
            if (this.role === 'elite' || this.type === 'tank') { specialChance = 0.38; goldChance = 1.0; goldValue = 120; }
            else if (this.role === 'elite_minion') { specialChance = 0.22; goldChance = 0.45; goldValue = 40; }
            else if (this.type === 'kamikaze') { specialChance = 0.16; }
            if (Math.random() < specialChance) {
                let r = Math.random();
                let type = 'heal';
                if (r < 0.34) type = 'heal';
                else if (r < 0.67) type = 'magnet';
                else type = 'freeze';
                pickups.push({x:this.x, y:this.y, type:type});
            }
            if (Math.random() < 0.005) pickups.push({x:this.x + (Math.random()-0.5)*18, y:this.y + (Math.random()-0.5)*18, type:'star'});
            if (Math.random() < 0.005) pickups.push({x:this.x + (Math.random()-0.5)*18, y:this.y + (Math.random()-0.5)*18, type:'attack_up'});
            if (Math.random() < goldChance) { pickups.push({x:this.x + (Math.random()-0.5)*20, y:this.y + (Math.random()-0.5)*20, type:'gold', value:goldValue}); }
            else if(Math.random()<0.8) {
                let val = 10; let xpScale = 1 + gameWave * 0.25; if (gameWave > 20) xpScale *= Math.pow(1.1, gameWave - 20);
                let lateXpMult = 1;
                if (gameWave > 20) lateXpMult += Math.min(2.0, (gameWave - 20) * 0.04);
                if (currentMode === 'endless') lateXpMult *= 1.15;
                if(this.role === 'elite' || this.role === 'elite_minion') val = 300 * (1 + gameWave * 0.1) * lateXpMult; 
                else if(this.type === 'tank') val = 50 * xpScale * lateXpMult; else if(this.type === 'wanderer') val = 25 * xpScale * lateXpMult; else if(this.type === 'shooter') val = 20 * xpScale * lateXpMult; else val = 10 * xpScale * lateXpMult; 
                pickups.push({x:this.x, y:this.y, type:'xp', value:val});
            }
            if (this.role === 'elite') completeWave();
        }
    }
    
    draw(ctx) {
        if (this.flashTimer > 0) {
            this.flashTimer--; ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(Math.PI); 
            ctx.shadowBlur = 30; ctx.shadowColor = '#fff'; ctx.fillStyle = '#fff'; ctx.globalCompositeOperation='lighter';
            drawEnemyModel(ctx, this.type, '#fff', 1); ctx.restore(); return;
        }
        ctx.save(); ctx.translate(this.x, this.y); 
        let scale = 1; 
        if (this.role === 'elite') scale = 1.5; 
        if (this.role === 'boss') scale = 2.5; 
        if (this.scaleMult) scale *= this.scaleMult; // Apply individual scale
        ctx.scale(scale, scale);

        if (this.isBoss || this.role === 'elite') {
            if (this.type === 'boss') { if (this.phase === 2) ctx.rotate(this.angle); else ctx.rotate(Math.sin(frameCount*0.05)*0.1); } 
            else if (this.type === 'boss_eclipse') { ctx.rotate(this.angle); } else if (this.type === 'boss_omega') { ctx.rotate(Math.sin(frameCount*0.02)*0.05); } 
            else { ctx.rotate(Math.sin(frameCount*0.05)*0.1); }
        } 
        else if (this.type === 'wanderer') ctx.rotate(Math.PI + Math.sin(this.y * 0.02 + frameCount * 0.05)*0.5); 
        else if (this.type === 'kamikaze') { ctx.rotate(frameCount * 0.2); } else ctx.rotate(Math.PI);
        
        drawEnemyModel(ctx, this.type, this.color, this.hp/this.maxHp); ctx.restore();
        
        if ((this.type === 'tank' || this.role !== 'minion') && this.hp < this.maxHp) {
            const w = (this.isBoss) ? 100 : 40; ctx.fillStyle = '#500'; ctx.fillRect(this.x - w/2, this.y - 40, w, 6); ctx.fillStyle = '#ff0055'; ctx.fillRect(this.x - w/2, this.y - 40, w * (this.hp/this.maxHp), 6);
        }
    }
}

function fireWeapon(k, lvl, p) {
    let dmg = p.baseDmg * (1 + p.lbDmgBonus) * (1+lvl*0.2) * (1+(p.passives.dmg||0)*0.1) * getPlayerDamageBuffMult(); let isEvo = p.weapons[k].evo;
    if(k==='laser') {
        AudioSys.play('shoot_light');
        let laserAngles = [-Math.PI/2];
        if ((p.shipType === 'piercer' || p.shipType === 'deity') && (lvl >= 5 || isEvo)) {
            laserAngles = [-Math.PI/2 - 0.25, -Math.PI/2, -Math.PI/2 + 0.25];
        }
        laserAngles.forEach(angle => {
            activeProjectiles.push({
                type:'laser', team:'player', x:p.x, y:p.y, angle: angle,
                w:isEvo ? 40 : 15, life:10, color:'#00ffff',
                isSpectral: !!isEvo
            });
            for(let i=0; i<enemies.length; i++) {
                let e = enemies[i];
                if (e.y < -50 || e.y > canvas.height + 50) continue;
                let dx = e.x - p.x; let dy = e.y - p.y; let dirX = Math.cos(angle); let dirY = Math.sin(angle);
                let proj = dx * dirX + dy * dirY;
                if (proj > 0) {
                    let dist = Math.abs(dx * (-dirY) + dy * dirX);
                    if (dist < (isEvo?30:15)) { 
                        if ((p.shipType === 'shadow' || p.shipType === 'deity') && e.role === 'minion' && Math.random() < 0.02) { e.takeDamage(99999); showFloatText(e.x, e.y, "斩杀!", "#d500f9"); } else { e.takeDamage(dmg); }
                    }
                }
            }
        });
    }
    if(k==='lightning') {
        AudioSys.play('shoot_light'); let targets=[], cx=p.x, cy=p.y; let chainCount = isEvo ? 8 : lvl + 1;
        for(let i=0; i<chainCount; i++) {
            let best = null; let bestDistSq = 62500; // 250*250
            for(let j=0; j<enemies.length; j++) {
                let e = enemies[j];
                if (e.y < -50 || e.y > canvas.height + 50) continue;
                if (targets.includes(e)) continue;
                let dx = e.x - cx; let dy = e.y - cy;
                let dSq = dx*dx + dy*dy;
                if (dSq < bestDistSq) { bestDistSq = dSq; best = e; }
            }
            if(best) {
                targets.push(best); 
                if ((p.shipType === 'shadow' || p.shipType === 'deity') && best.role === 'minion' && Math.random() < 0.02) { best.takeDamage(99999); showFloatText(best.x, best.y, "斩杀!", "#d500f9"); } else { best.takeDamage(dmg); }
                activeProjectiles.push({type:'bolt', team:'player', x1:cx, y1:cy, x2:best.x, y2:best.y, life:10, color:'#d500f9'}); cx=best.x; cy=best.y;
            }
        }
    }
    if(k==='boomerang') {
        AudioSys.play('shoot_light'); let n=isEvo?4:1+Math.floor(lvl/2);
        for(let i=0; i<n; i++) { let angle = -Math.PI/2; if (n > 1) { let spread = Math.PI / 3; angle += (i / (n - 1) - 0.5) * spread; } activeProjectiles.push({type:'rang', team:'player', x:p.x, y:p.y, vx:Math.cos(angle)*7, vy:Math.sin(angle)*7, dmg:dmg, life:80, state:0, color:'#ffea00'}); }
    }
    if(k==='wingman') {
        if(Math.random()<0.3) AudioSys.play('shoot_light'); 
        if (p.wingmen) {
            p.wingmen.forEach(w => {
                let target = null; let minDistSq = 90000; // 300*300
                for(let i=0; i<enemies.length; i++) { 
                    let e = enemies[i];
                    if (e.y < -50 || e.y > canvas.height + 50) continue;
                    let dx = e.x - w.x; let dy = e.y - w.y;
                    let dSq = dx*dx + dy*dy;
                    if (dSq < minDistSq) { minDistSq = dSq; target = e; } 
                }
                let angle = -Math.PI/2; if (target) angle = Math.atan2(target.y - w.y, target.x - w.x); else if(isEvo) angle = Math.atan2(w.y - p.y, w.x - p.x);
                if (isEvo) { activeProjectiles.push({ type: 'fleet_laser', team: 'player', x: w.x, y: w.y, vx: Math.cos(angle)*15, vy: Math.sin(angle)*15, dmg: dmg * 0.8, life: 60, color: '#d500f9' }); } 
                else { activeProjectiles.push({ type: 'wingman_bullet', team: 'player', x: w.x, y: w.y, vx: Math.cos(angle)*8, vy: Math.sin(angle)*8, dmg: dmg * 0.5, life: 80, color: '#00e5ff' }); }
            });
        }
    }
    if(k==='timebomb') {
        AudioSys.play('shoot_heavy'); let count = isEvo ? 12 : 2 + lvl; 
        for(let i=0; i<count; i++) {
            let angle = -Math.PI/2 + (Math.random()-0.5) * 1.5; let speed = isEvo ? 8 : 5;
            activeProjectiles.push({ type: isEvo ? 'doom_missile' : 'missile', team: 'player', x:p.x, y:p.y, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed, dmg:dmg * (isEvo ? 1.5 : 1), life:180, color: isEvo ? '#ff0055' : '#ff3d00' });
        }
    }
}

function spawnWaveBoss() {
    isWaveBossActive = true; 
    AudioSys.play('alarm');
    if (gameWave % 10 === 0 && gameWave >= 10) { 
        let bossType = 'boss';
        if (gameWave % 30 === 0) bossType = 'boss_omega';
        else if (gameWave % 20 === 0) bossType = 'boss_eclipse';
        let boss = new Enemy(bossType, gameWave, 'boss'); 
        enemies.push(boss); 
        showWarning(gameWave >= 30 ? "极高能反应" : "高能反应"); 
    } 
    else if (gameWave % 5 === 0) { let elite = new Enemy('carrier', gameWave, 'elite'); enemies.push(elite); showWarning("重型单位"); } 
    else { let elite = new Enemy('prism', gameWave, 'elite'); enemies.push(elite); showWarning("强敌出现"); }
}

function completeWave() {
    gameWave++; waveTimer = 0; isWaveBossActive = false; const modeConfig = MODES[currentMode];
    if (currentMode !== 'endless' && gameWave > modeConfig.maxWave) { endGame(true); return; }
    
    saveRunState(); updateHUD(); enemies.forEach(e => { if(e.role === 'minion') { e.marked = true; createExplosion(e.x, e.y, e.color, 5); } });
}

let warningTimer = null;
function showWarning(text) {
    const el = document.getElementById('warning-overlay');
    el.innerHTML = `<div class="warning-text">${text}</div>`;
    el.style.display = 'block';
    if (warningTimer) clearTimeout(warningTimer);
    warningTimer = setTimeout(() => {
        el.style.display = 'none';
        warningTimer = null;
    }, 3000);
}
function notifyUnlock(text) { const el = document.getElementById('unlock-notify'); el.innerText = text; el.style.display = 'block'; setTimeout(() => { el.style.display = 'none'; }, 4000); }
function pauseAndShowSettings() { if (gameState === 'playing') { gameState = 'paused'; previousScreen = 'game'; document.getElementById('btn-save-quit').style.display = 'block'; } else { previousScreen = 'main-menu'; document.getElementById('btn-save-quit').style.display = 'none'; } showSettings(); }
function showSettings() { 
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); 
    document.getElementById('settings-screen').classList.add('active'); 
    
    document.getElementById('input-volume').value = settings.volume * 100;
    document.getElementById('input-speed').value = settings.speed * 100;
    document.getElementById('speed-display').innerText = settings.speed.toFixed(1) + 'x';
    document.getElementById('input-graphics').value = settings.graphics;
    const graphicsLabels = ["低(流畅)", "中等", "高(绚丽)"];
    document.getElementById('graphics-display').innerText = graphicsLabels[settings.graphics];
    document.getElementById('input-uiscale').value = Math.round(settings.uiScale * 100);
    document.getElementById('uiscale-display').innerText = settings.uiScale.toFixed(2) + 'x';
    const playerAlphaPct = Math.round((settings.playerBulletAlpha || 1) * 100);
    document.getElementById('input-playeralpha').value = playerAlphaPct;
    document.getElementById('playeralpha-display').innerText = playerAlphaPct + '%';
    const showDamageFloat = settings.showDamageFloat !== false;
    document.getElementById('input-damagefloat').checked = showDamageFloat;
    document.getElementById('damagefloat-display').innerText = showDamageFloat ? '开' : '关';

    const saveBtn = document.getElementById('btn-save-quit'); 
    const backBtn = document.getElementById('settings-back-btn'); 
    if (gameState === 'paused') { 
        backBtn.innerText = "继续游戏"; backBtn.onclick = resumeGame; 
        if (saveBtn) saveBtn.style.display = 'block'; 
    } else { 
        backBtn.innerText = "返回"; backBtn.onclick = backToMenu; 
        if (saveBtn) saveBtn.style.display = 'none'; 
    } 
}
function resumeGame() { document.getElementById('settings-screen').classList.remove('active'); gameState = 'playing'; gameLoop(); }
function saveRunState() { if (gameState === 'gameover') return; saveData.currentRun = { wave: gameWave, mode: currentMode, stats: runStats, player: { type: player.shipType, hp: player.hp, maxHp: player.maxHp, shieldHp: player.shieldHp !== undefined ? player.shieldHp : 0, shieldTimer: player.shieldTimer !== undefined ? player.shieldTimer : 0, xp: player.xp, level: player.level, nextLvl: player.nextLvl, gold: player.gold, bomb: player.bombCharge, weapons: player.weapons, passives: player.passives, rerolls: player.rerolls, rerollCost: player.rerollCost, lbDmgBonus: player.lbDmgBonus } }; saveGame(); }
function saveAndExit() { if (gameState === 'paused') { saveRunState(); enemies = []; activeProjectiles = []; pickups = []; backToMenu(); } }
function checkRunAndLaunch() { AudioSys.init(); AudioSys.play('ui_click'); if (saveData.currentRun) { loadRunState(); } else { openShipSelect(); } }
function backToMenu() { gameState = 'menu'; document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById('main-menu').classList.add('active'); document.getElementById('hud-layer').style.display = 'none'; updateUI(); AudioSys.playMusic('menu'); }

// --- 无尽排行榜系统逻辑 ---
async function showLeaderboard() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('leaderboard-screen').classList.add('active');
    document.getElementById('lb-personal-best').innerText = saveData.bestEndlessWave || 0;
    document.getElementById('lb-nickname').value = saveData.nickname || "";
    document.getElementById('lb-status').innerText = "";
    
    const list = document.getElementById('lb-list');
    list.innerHTML = '<div class="text-center text-gray-500 text-sm mt-10 animate-pulse">连接星际网络...</div>';

    if (window.FirebaseAPI && window.FirebaseAPI.ready) {
        const data = await window.FirebaseAPI.getLeaderboard();
        list.innerHTML = '';
        if (data.length === 0) {
            list.innerHTML = '<div class="text-center text-gray-500 text-sm mt-10">暂无记录，去创造历史吧！</div>';
        } else {
            data.forEach((entry, idx) => {
                let rankColor = 'text-gray-400';
                if(idx === 0) rankColor = 'text-yellow-400 text-lg neon-text-warn';
                else if(idx === 1) rankColor = 'text-gray-300 text-base';
                else if(idx === 2) rankColor = 'text-orange-400 text-base';
                
                let safeName = entry.nickname.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                list.innerHTML += `<div class="flex justify-between items-center py-2 border-b border-gray-800">
                    <div class="flex items-center gap-3">
                        <span class="font-black orbitron w-6 text-center ${rankColor}">#${idx+1}</span>
                        <span class="font-bold text-cyan-100">${safeName}</span>
                    </div>
                    <span class="font-mono text-cyan-400 font-bold">${entry.wave} 波</span>
                </div>`;
            });
        }
    } else {
        list.innerHTML = '<div class="text-center text-red-500 text-sm mt-10 font-bold">无法连接到星际排行榜服务器<br>请检查网络连接</div>';
    }
}

async function submitScore() {
    const nick = document.getElementById('lb-nickname').value.trim();
    const bestWave = saveData.bestEndlessWave || 0;
    
    if (!nick) return showLbStatus('请输入代号', 'red');
    if (bestWave <= 0) return showLbStatus('尚无无尽模式成绩', 'red');
    
    saveData.nickname = nick;
    saveGame();
    
    showLbStatus('正在上传数据...', 'cyan');
    if (window.FirebaseAPI && window.FirebaseAPI.ready) {
        let success = await window.FirebaseAPI.uploadScore(nick, bestWave);
        if(success) {
            showLbStatus('记录已同步至云端！', 'green');
            setTimeout(() => { showLeaderboard(); }, 1000); // 刷新列表
        } else {
            showLbStatus('数据传输异常，请重试', 'red');
        }
    } else {
        showLbStatus('网络未就绪', 'red');
    }
}

function showLbStatus(msg, color) {
    const el = document.getElementById('lb-status');
    el.innerText = msg;
    if (color === 'red') el.style.color = '#ff0055';
    else if (color === 'green') el.style.color = '#00ffaa';
    else el.style.color = '#00e5ff';
}
// ---

function loadRunState() { const run = saveData.currentRun; if (!run) return; currentMode = run.mode; gameWave = run.wave; runStats = run.stats; currentShip = run.player.type; activeBoss = null; player = new Player(currentShip); player.hp = run.player.hp; player.maxHp = run.player.maxHp; player.shieldHp = run.player.shieldHp !== undefined ? run.player.shieldHp : 0; player.shieldTimer = run.player.shieldTimer !== undefined ? run.player.shieldTimer : 0; player.xp = run.player.xp; player.level = run.player.level; player.nextLvl = run.player.nextLvl; player.gold = run.player.gold; player.bombCharge = run.player.bomb; player.weapons = run.player.weapons; player.passives = run.player.passives; player.rerolls = run.player.rerolls; player.rerollCost = run.player.rerollCost || 100; player.lbDmgBonus = run.player.lbDmgBonus || 0; waveTimer = 0; freezeTimer = 0; isWaveBossActive = false; endlessEventTimer = 0; endlessNextEventTime = 30 + Math.random() * 30; enemies = []; activeProjectiles = []; pickups = []; document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById('hud-layer').style.display='block'; gameState = 'playing'; gameLoop(); }

function triggerRandomEvent() {
    const hasActiveBlackhole = activeProjectiles.some(p => p.type === 'blackhole' && !p.marked);
    const hasActiveSupportLaser = activeProjectiles.some(p => p.type === 'ally_support_laser' && !p.marked);
    let events = hasActiveBlackhole ? ['meteor', 'swarm', 'prism', 'airdrop', 'support_fire'] : ['meteor', 'blackhole', 'swarm', 'prism', 'airdrop', 'support_fire'];
    if (hasActiveSupportLaser) events = events.filter(e => e !== 'support_fire');
    const ev = events[Math.floor(Math.random() * events.length)];
    
    if (ev === 'meteor') {
        showWarning("事件：陨石雨警告！");
        AudioSys.play('alarm');
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                if (gameState !== 'playing') return;
                let tx = Math.random() * canvas.width;
                activeProjectiles.push({
                    type: 'meteor_warning', team: 'neutral',
                    x: tx, y: Math.random() * canvas.height,
                    life: 60, tx: tx 
                });
            }, i * 200);
        }
    } else if (ev === 'blackhole') {
        showWarning("事件：空间异常，黑洞接近！");
        AudioSys.play('alarm');
        
        const side = Math.random() > 0.5 ? 'left' : 'right';
        const radius = Math.max(canvas.width, canvas.height) * 0.8;
        const startX = side === 'left' ? -radius * 1.35 : canvas.width + radius * 1.35;
        const targetX = side === 'left' ? 0 : canvas.width;
        const y = canvas.height * (0.45 + Math.random() * 0.1);
        const targetY = Math.max(60, Math.min(canvas.height - 60, y + (Math.random() - 0.5) * (canvas.height * 0.12)));

        let blackhole = {
            type: 'blackhole',
            team: 'neutral',
            x: startX,
            y: y,
            side: side,
            targetX: targetX,
            targetY: targetY,
            radius: radius,
            pullRadius: radius * 1.18,
            damageRadius: radius * 0.58,
            pullStrength: 2.4,
            life: 900, 
            maxLife: 900,
            angle: 0
        };
        activeProjectiles.push(blackhole);
    } else if (ev === 'swarm') {
        showWarning("事件：侦测到敌军大部队！");
        AudioSys.play('alarm');
        for(let i=0; i<30; i++) {
            setTimeout(() => {
                if(gameState !== 'playing') return;
                let types = ['shooter', 'kamikaze', 'wanderer'];
                let e = new Enemy(types[Math.floor(Math.random()*types.length)], gameWave);
                e.y = -50 - Math.random() * 200;
                enemies.push(e);
            }, i * 150);
        }
    } else if (ev === 'prism') {
        showWarning("事件：精英棱镜核心跃迁！");
        AudioSys.play('alarm');
        let elite = new Enemy('prism', gameWave, 'elite');
        elite.y = -50;
        enemies.push(elite);
    } else if (ev === 'airdrop') {
        showWarning("提示：星际联盟空投支援！");
        AudioSys.play('level_up');
        for(let i=0; i<30; i++) pickups.push({x: Math.random()*canvas.width, y: -Math.random()*400 - 50, type: 'xp', value: 50 * gameWave});
        for(let i=0; i<15; i++) pickups.push({x: Math.random()*canvas.width, y: -Math.random()*400 - 50, type: 'gold', value: 50 + gameWave * 5});
        pickups.push({x: Math.random()*canvas.width, y: -100, type: 'heal'});
        pickups.push({x: Math.random()*canvas.width, y: -200, type: 'heal'});
        pickups.push({x: Math.random()*canvas.width, y: -300, type: 'magnet'});
        pickups.push({x: Math.random()*canvas.width, y: -400, type: 'freeze'});
    } else if (ev === 'support_fire') {
        showWarning("事件：友军炮火支援！");
        AudioSys.play('alarm');
        const beamW = canvas.width * (2 / 3);
        activeProjectiles.push({
            type: 'ally_support_laser',
            team: 'neutral',
            x: canvas.width * 0.5,
            y: canvas.height * 0.5,
            w: beamW,
            baseW: beamW,
            warnTime: 75,
            activeTime: 90,
            endFadeTime: 24,
            renderW: beamW,
            renderAlpha: 1,
            dmg: 140 + gameWave * 8,
            color: '#66ffea'
        });
    }
}

function gameLoop() {
    if (gameState !== 'playing') return;
    const nowTs = performance.now();
    const frameMs = Math.min(66, Math.max(1, nowTs - lastFrameTs));
    lastFrameTs = nowTs;
    avgFrameMs = avgFrameMs * 0.9 + frameMs * 0.1;
    perfLoadLevel = calcPerfLoadLevel();
    frameCount++; const spd = settings.speed; if (freezeTimer > 0) freezeTimer -= spd; if (attackBoostTimer > 0) attackBoostTimer = Math.max(0, attackBoostTimer - spd);
    let shakeX = 0, shakeY = 0; if (shakeAmount > 0) { shakeX = (Math.random() - 0.5) * shakeAmount; shakeY = (Math.random() - 0.5) * shakeAmount; shakeAmount *= 0.9; if (shakeAmount < 0.5) shakeAmount = 0; }
    
    // ==========================================
    // Aggressive GC - 极致内存垃圾回收策略 (每3秒一次强制清场)
    // 强制清除所有飘出屏幕极远的对象，并控制粒子上限
    // ==========================================
    if (frameCount % 180 === 0) {
        let maxParticles = settings.graphics === 2 ? (perfLoadLevel >= 2 ? 110 : (perfLoadLevel >= 1 ? 150 : 200)) : (settings.graphics === 1 ? 80 : 30);
        if (particles.length > maxParticles) particles = particles.slice(particles.length - maxParticles);
        
        let outBoundDist = Math.max(canvas.width, canvas.height); // 屏幕外围安全距离
        activeProjectiles = activeProjectiles.filter(p => p.x > -outBoundDist && p.x < canvas.width + outBoundDist && p.y > -outBoundDist && p.y < canvas.height + outBoundDist);
        enemies = enemies.filter(e => e.x > -outBoundDist && e.x < canvas.width + outBoundDist && e.y < canvas.height + outBoundDist);
        pickups = pickups.filter(p => p.x > -outBoundDist && p.x < canvas.width + outBoundDist && p.y < canvas.height + outBoundDist);
    }
    if (settings.graphics === 2 && particles.length > 260) {
        particles = particles.slice(particles.length - 180);
    }

    let modeDmgMult = 1.0; 
    if (currentMode === 'easy') modeDmgMult = 0.8; 
    if (currentMode === 'normal') modeDmgMult = 1.2; 
    if (currentMode === 'hard') modeDmgMult = 1.8; 
    if (currentMode === 'endless') modeDmgMult = 2.5;
    const globalDmgScale = (1 + gameWave * 0.25) * modeDmgMult;

    if (currentMode === 'endless') {
        endlessEventTimer += (1/60) * spd;
        if (endlessEventTimer >= endlessNextEventTime) {
            endlessEventTimer = 0;
            endlessNextEventTime = 30 + Math.random() * 30; // 下次事件 30~60秒后
            triggerRandomEvent();
        }
    }

    waveTimer += (1/60) * spd; let spawnFrequency = Math.max(8, 30 - gameWave * 1.5);
    if (isWaveBossActive) spawnFrequency *= 3; 

    if(frameCount%(Math.floor(spawnFrequency)/spd)<1) {
        let type = 'drone'; const r = Math.random();
        if (gameWave >= 20) { if (r < 0.1) type = 'weaver'; else if (r < 0.25) type = 'pulsar'; else if (r < 0.4) type = 'wanderer'; else if (r < 0.6) type = 'tank'; else if (r < 0.8) type = 'shooter'; else if (r < 0.95) type = 'kamikaze'; } 
        else if (gameWave >= 10) { if (r < 0.15) type = 'pulsar'; else if (r < 0.3) type = 'wanderer'; else if (r < 0.5) type = 'tank'; else if (r < 0.7) type = 'shooter'; else if (r < 0.9) type = 'kamikaze'; } 
        else if (gameWave >= 6) { if (r < 0.15) type = 'wanderer'; else if (r < 0.3) type = 'tank'; else if (r < 0.6) type = 'shooter'; } 
        else if (gameWave >= 2) { if (r < 0.4) type = 'shooter'; }
        enemies.push(new Enemy(type, gameWave));
    }
    if (!isWaveBossActive && waveTimer >= 45) { spawnWaveBoss(); }

    player.update(spd);
    const instantCullProjectileTypes = new Set(['basic', 'wingman_bullet', 'fleet_laser', 'missile', 'doom_missile', 'giant_missile', 'rang', 'enemy_bullet', 'enemy_missile']);
    const isOutOfScreen = (p) => p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height;
    const shouldInstantCullProjectile = (p) => instantCullProjectileTypes.has(p.type) && isOutOfScreen(p);
    const canLockEnemyTarget = (e) => !!e && !e.marked && e.combatActive && e.x >= 0 && e.x <= canvas.width && e.y >= 0 && e.y <= canvas.height;
    
    activeProjectiles.forEach(p => {
        if (shouldInstantCullProjectile(p)) {
            p.marked = true; return;
        }
        if (p.type !== 'enemy_laser' && p.type !== 'blackhole' && p.type !== 'ally_support_laser' && !instantCullProjectileTypes.has(p.type) && (p.x < -200 || p.x > canvas.width + 200 || p.y < -200 || p.y > canvas.height + 200)) {
            p.marked = true; return; 
        }

        if (p.accel) { p.vx *= Math.pow(p.accel, spd); p.vy *= Math.pow(p.accel, spd); }
        if (p.curve) { 
            let speed = Math.hypot(p.vx, p.vy); 
            let a = Math.atan2(p.vy, p.vx) + p.curve * spd; 
            p.vx = Math.cos(a)*speed; p.vy = Math.sin(a)*speed; 
        }

        if(p.team === 'player') {
            if (p.type === 'missile' || p.type === 'doom_missile') {
                p.life -= spd; if(p.life <= 0) p.marked = true;
                let target = null; let minDistSq = 999999;
                for(let i=0; i<enemies.length; i++) {
                    let e = enemies[i];
                    if (!canLockEnemyTarget(e)) continue;
                    let dx = e.x - p.x; let dy = e.y - p.y;
                    let dSq = dx*dx + dy*dy;
                    if (dSq < minDistSq) { minDistSq = dSq; target = e; } 
                }
                if (target) {
                    let angle = Math.atan2(target.y - p.y, target.x - p.x);
                    const steered = steerVelocityToward(p.vx, p.vy, angle, 0.085, spd, 8);
                    p.vx = steered.vx; p.vy = steered.vy;
                }
                p.x += p.vx * spd; p.y += p.vy * spd;
                if(perfLoadLevel < 2 && Math.random() > 0.5) particles.push({x:p.x, y:p.y, color: '#aaa', life:0.2});
                for(let i=0; i<enemies.length; i++) {
                    let e = enemies[i];
                    let dx = e.x - p.x; let dy = e.y - p.y;
                    if (dx*dx + dy*dy < 400) { // 20*20
                        e.takeDamage(p.dmg); 
                        createExplosion(p.x, p.y, p.type==='doom_missile'?'#ff0055':'#ffea00', 5); 
                        p.marked = true; break;  
                    } 
                }
            }
            else if(p.type === 'wingman_bullet' || p.type === 'fleet_laser') {
                p.life -= spd; if(p.life <= 0) p.marked = true; p.x += p.vx * spd; p.y += p.vy * spd;
                if (p.type === 'fleet_laser') { 
                    for(let i=0; i<enemies.length; i++) {
                        let e = enemies[i]; let dx = e.x - p.x; let dy = e.y - p.y;
                        if (dx*dx + dy*dy < 625) { e.takeDamage(p.dmg); createExplosion(p.x, p.y, '#d500f9', 3); } // 25*25
                    } 
                } 
                else { 
                    for(let i=0; i<enemies.length; i++) {
                        let e = enemies[i]; let dx = e.x - p.x; let dy = e.y - p.y;
                        if (dx*dx + dy*dy < 400) { e.takeDamage(p.dmg); p.marked = true; break; } // 20*20
                    } 
                }
            }
            else if(p.type==='basic') { 
                p.x+=p.vx*spd; p.y+=p.vy*spd;
                let hit = false;
                for(let i=0; i<enemies.length; i++) {
                    let e = enemies[i];
                    let dx = e.x - p.x; let dy = e.y - p.y;
                    if(dx*dx + dy*dy < 400){ // 20*20
                        if ((player.shipType === 'shadow' || player.shipType === 'deity') && e.role === 'minion' && Math.random() < 0.02) { e.takeDamage(99999); showFloatText(e.x, e.y, "斩杀!", "#d500f9"); } 
                        else { e.takeDamage(p.dmg); } 
                        hit=true; break; 
                    } 
                }
                if(hit) p.marked = true;
            }
            else if(p.type==='laser' || p.type==='bolt') { p.life-=spd; if(p.life<=0) p.marked=true; }
            else if(p.type==='rang') {
                if(p.state===0) { p.x+=p.vx*spd; p.y+=p.vy*spd; p.life-=spd; if(p.life<=0) p.state=1; }
                else { 
                    let dx = player.x - p.x; let dy = player.y - p.y; let dSq = dx*dx + dy*dy;
                    if (dSq < 400) p.marked = true; 
                    else {
                        let d = Math.sqrt(dSq);
                        p.x += (dx)/d * 8 * spd; p.y += (dy)/d * 8 * spd; 
                    }
                }
                for(let i=0; i<enemies.length; i++) {
                    let e = enemies[i];
                    let dx = e.x - p.x; let dy = e.y - p.y;
                    if(dx*dx + dy*dy < 400) { // 20*20
                        if ((player.shipType === 'shadow' || player.shipType === 'deity') && e.role === 'minion' && Math.random() < 0.02) { e.takeDamage(99999); showFloatText(e.x, e.y, "斩杀!", "#d500f9"); } 
                        else { e.takeDamage(p.dmg); } 
                    } 
                }
            }
            else if(p.type === 'shockwave') {
                p.radius += (p.maxRadius / 60) * spd; p.life -= spd; if (p.life <= 0) p.marked = true;
                let rSq = p.radius * p.radius;
                for(let i=0; i<enemies.length; i++) {
                    let e = enemies[i];
                    if (e.y < -50 || e.y > canvas.height + 50 || p.hitList.includes(e)) continue;
                    let dx = e.x - p.x; let dy = e.y - p.y;
                    if (dx*dx + dy*dy < rSq) { e.takeDamage(p.dmg); p.hitList.push(e); } 
                }
                activeProjectiles.forEach(ep => { 
                    if ((ep.team === 'enemy' && ep.type !== 'enemy_laser')) {
                        let dx = ep.x - p.x; let dy = ep.y - p.y;
                        if (dx*dx + dy*dy < rSq) { ep.marked = true; createExplosion(ep.x, ep.y, '#00ffaa', 3); }
                    }
                });
            }
            else if(p.type === 'giant_missile') {
                p.life -= spd; 
                if(p.life <= 0 && !p.marked) { 
                    p.marked = true; createExplosion(p.x, p.y, '#d500f9', 50); AudioSys.play('explode'); shakeAmount = 20; 
                    for(let i=0; i<enemies.length; i++) { let ae = enemies[i]; let dx = ae.x - p.x; let dy = ae.y - p.y; if (dx*dx + dy*dy < 40000) ae.takeDamage(p.dmg); } // 200*200
                }
                if (!p.marked) {
                    let target = null; let minDistSq = 999999;
                    for(let i=0; i<enemies.length; i++) {
                        let e = enemies[i];
                        if (!canLockEnemyTarget(e)) continue;
                        let dx = e.x - p.x; let dy = e.y - p.y;
                        let dSq = dx*dx + dy*dy;
                        if (dSq < minDistSq) { minDistSq = dSq; target = e; }
                    }
                    if (target) {
                        let angle = Math.atan2(target.y - p.y, target.x - p.x);
                        const steered = steerVelocityToward(p.vx, p.vy, angle, 0.045, spd, 6);
                        p.vx = steered.vx; p.vy = steered.vy;
                    }
                    p.x += p.vx * spd; p.y += p.vy * spd;
                    if(perfLoadLevel < 2 && Math.random() > 0.2) particles.push({x:p.x+(Math.random()-0.5)*10, y:p.y+(Math.random()-0.5)*10, color: '#d500f9', life:0.5});
                    
                    for(let i=0; i<enemies.length; i++) {
                        let e = enemies[i];
                        let dx = e.x - p.x; let dy = e.y - p.y;
                        if (dx*dx + dy*dy < 1600) {  // 40*40
                            createExplosion(p.x, p.y, '#d500f9', 50); AudioSys.play('explode'); shakeAmount = 20;
                            for(let j=0; j<enemies.length; j++) { let ae = enemies[j]; let adx = ae.x - p.x; let ady = ae.y - p.y; if (adx*adx + ady*ady < 40000) ae.takeDamage(p.dmg); }
                            p.marked = true; break;
                        }
                    }
                }
            }
        } else if (p.team === 'neutral') {
            if (p.type === 'meteor_warning') {
                p.life -= spd;
                if (p.life <= 0) {
                    p.marked = true;
                    activeProjectiles.push({
                        type: 'meteor', team: 'neutral',
                        x: p.tx + (Math.random()-0.5)*150, y: -100,
                        vx: (Math.random()-0.5)*3, vy: 10 + Math.random()*6,
                        dmg: 500 * (1 + gameWave * 0.1), color: '#ff8800', life: 300,
                        radius: 40
                    });
                }
            }
            if (p.type === 'meteor') {
                p.x += p.vx * spd; p.y += p.vy * spd;
                p.life -= spd;
                if (p.life <= 0 || p.y > canvas.height + 100) p.marked = true;

                let hit = false;
                let rSq = p.radius * p.radius;
                let dxP = player.x - p.x; let dyP = player.y - p.y;
                if (dxP*dxP + dyP*dyP < rSq) {
                    player.takeDamage(p.dmg * 0.05); 
                    hit = true;
                }
                for(let i=0; i<enemies.length; i++) {
                    let e = enemies[i];
                    if (e.y < -50 || e.y > canvas.height + 50) continue;
                    let dx = e.x - p.x, dy = e.y - p.y;
                    if (dx*dx + dy*dy < rSq) {
                        e.takeDamage(p.dmg);
                        hit = true;
                    }
                }
                if (hit) {
                    p.marked = true;
                    createExplosion(p.x, p.y, p.color, 30);
                    AudioSys.play('explode');
                    shakeAmount = 15;
                }
            }
            if (p.type === 'ally_support_laser') {
                if (p.warnTime > 0) {
                    p.warnTime -= spd;
                    p.renderW = p.baseW || p.w;
                    p.renderAlpha = 1;
                } else if (p.activeTime > 0) {
                    if (!p.started) {
                        p.started = true;
                        shakeAmount = Math.max(shakeAmount, 8);
                        AudioSys.play('explode');
                    }
                    p.activeTime -= spd;
                    const endFadeTime = p.endFadeTime || 24;
                    let widthScale = 1;
                    let alphaScale = 1;
                    if (p.activeTime < endFadeTime) {
                        const t = Math.max(0, p.activeTime / endFadeTime);
                        widthScale = 0.18 + 0.82 * t;
                        alphaScale = t;
                    }
                    const curW = (p.baseW || p.w) * widthScale;
                    p.renderW = curW;
                    p.renderAlpha = alphaScale;
                    if (frameCount % 6 === 0) {
                        const halfW = curW * 0.5;
                        for (let i = 0; i < enemies.length; i++) {
                            const e = enemies[i];
                            if (e.marked) continue;
                            if (e.y < -80 || e.y > canvas.height + 80) continue;
                            if (Math.abs(e.x - p.x) <= halfW + 16) e.takeDamage(p.dmg);
                        }
                    }
                } else {
                    p.marked = true;
                }
            }
            if (p.type === 'blackhole') {
                p.life -= spd;
                p.angle += 0.02 * spd;
                if (typeof p.targetY === 'number') {
                    p.y += (p.targetY - p.y) * 0.01 * spd;
                }
                
                if (p.maxLife - p.life < 300) {
                    p.x += (p.targetX - p.x) * 0.01 * spd;
                } else if (p.life < 300) {
                    const outX = p.side === 'left' ? -p.radius * 1.5 : canvas.width + p.radius * 1.5;
                    p.x += (outX - p.x) * 0.01 * spd;
                }
                p.y = Math.max(-p.radius * 0.2, Math.min(canvas.height + p.radius * 0.2, p.y));
                
                if (p.life <= 0) p.marked = true;
                let dx = player.x - p.x;
                let dy = player.y - p.y;
                let dSq = dx*dx + dy*dy;
                const pullRadius = p.pullRadius || p.radius;
                const damageRadius = p.damageRadius || p.radius;
                const pullSq = pullRadius * pullRadius;
                const damageSq = damageRadius * damageRadius;
                
                if (dSq < pullSq) {
                    let dist = Math.sqrt(dSq);
                    if (dist > 10) {
                        let pullStr = (1 - dist / pullRadius) * (p.pullStrength || 1.5);
                        player.x -= (dx/dist) * pullStr * spd;
                        player.y -= (dy/dist) * pullStr * spd;
                    }
                    
                    if (dSq < damageSq && frameCount % 10 === 0) {
                       let proximity = Math.max(0, 1 - dist / damageRadius);
                       let maxCenterDmg = 80;
                       let dmg = Math.max(1, maxCenterDmg * Math.pow(proximity, 3) * globalDmgScale);
                       
                       player.takeDamage(dmg);
                       
                       let text = dmg > 20 ? "CRITICAL!" : "GRAVITY";
                       let color = dmg > 20 ? "#ff0055" : "#800080";
                       showFloatText(player.x, player.y, text, color);
                    }
                }
                for (let i = 0; i < enemies.length; i++) {
                    const e = enemies[i];
                    if (e.marked) continue;
                    if (e.y < -80 || e.y > canvas.height + 80 || e.x < -80 || e.x > canvas.width + 80) continue;
                    let edx = e.x - p.x;
                    let edy = e.y - p.y;
                    let edSq = edx * edx + edy * edy;
                    if (edSq >= pullSq && edSq >= damageSq) continue;
                    let edist = Math.max(1, Math.sqrt(edSq));
                    const isBigBoss = (e.role === 'boss' || e.isBoss);
                    if (!isBigBoss && edSq < pullSq) {
                        let enemyPull = (1 - edist / pullRadius) * (p.pullStrength || 1.5) * 1.2;
                        if (edist > 10) {
                            e.x -= (edx / edist) * enemyPull * spd;
                            e.y -= (edy / edist) * enemyPull * spd;
                        }
                    }
                    if (edSq < damageSq && frameCount % 12 === 0) {
                        let proximity = Math.max(0, 1 - edist / damageRadius);
                        let maxEnemyCenterDmg = 120;
                        let enemyDmg = Math.max(1, maxEnemyCenterDmg * Math.pow(proximity, 2.5));
                        if (isBigBoss) enemyDmg *= 0.4;
                        else if (e.role === 'elite') enemyDmg *= 0.7;
                        e.takeDamage(enemyDmg);
                    }
                }
            }
        } else {
            if (p.type === 'enemy_laser') {
                if (p.parent && !p.parent.marked) {
                    if (p.isSweeper) { p.x = p.parent.x; p.y = p.parent.y; p.angle = p.parent.angle + (p.angleOffset || 0); }
                } else if (p.parent && p.parent.marked) { p.marked = true; }
                
                if (p.warnTime > 0) {
                    p.warnTime -= spd;
                    if (p.tracking) {
                        let targetAngle = Math.atan2(player.y - p.y, player.x - p.x);
                        let diff = targetAngle - p.angle;
                        while(diff > Math.PI) diff -= Math.PI*2;
                        while(diff < -Math.PI) diff += Math.PI*2;
                        p.angle += diff * 0.05 * spd;
                    }
                } else if (p.activeTime > 0) {
                    if (p.activeTime === p.originalActiveTime) { shakeAmount = 5; }
                    p.activeTime -= spd;
                    
                    let dx = player.x - p.x; let dy = player.y - p.y;
                    let dirX = Math.cos(p.angle); let dirY = Math.sin(p.angle);
                    let proj = dx * dirX + dy * dirY;
                    let dist = Math.abs(dx * (-dirY) + dy * dirX);
                    if (proj > 0 && dist < p.w/2 + 10) { 
                        player.takeDamage(p.dmg * spd * 0.1); 
                    }
                } else {
                    p.marked = true;
                }
            }
            else if(p.type==='enemy_bullet') { 
                p.x+=p.vx*spd; p.y+=p.vy*spd; p.life-=spd;
                if(p.life<=0) p.marked=true;
                let dx = player.x - p.x; let dy = player.y - p.y;
                if(dx*dx + dy*dy < 100) { player.takeDamage(p.dmg); p.marked=true; }
            }
            else if (p.type === 'enemy_missile') { 
                p.life -= spd; if(p.life<=0) p.marked=true;
                let angleToPlayer = Math.atan2(player.y - p.y, player.x - p.x); let turnSpeed = 0.03; 
                let targetVx = Math.cos(angleToPlayer) * 5; let targetVy = Math.sin(angleToPlayer) * 5;
                p.vx += (targetVx - p.vx) * turnSpeed * spd; p.vy += (targetVy - p.vy) * turnSpeed * spd;
                p.x += p.vx * spd; p.y += p.vy * spd;
                if(perfLoadLevel < 2 && Math.random() > 0.5) particles.push({x:p.x, y:p.y, color: '#ff0055', life:0.2});
                let dx = player.x - p.x; let dy = player.y - p.y;
                if(dx*dx + dy*dy < 100) { player.takeDamage(p.dmg); p.marked=true; createExplosion(p.x, p.y, '#ff0055', 5); }
            }
        }
        if (!p.marked && shouldInstantCullProjectile(p)) p.marked = true;
    });
    
    enemies.forEach(e => { 
        e.update(spd); 
        if (!e.combatActive && e.x >= 0 && e.x <= canvas.width && e.y >= 0 && e.y <= canvas.height) e.combatActive = true;
        let dx = player.x - e.x; let dy = player.y - e.y;
        if(e.combatActive && dx*dx + dy*dy < 900) player.takeDamage(15 * globalDmgScale); // 30*30
        if(e.y>canvas.height+50) e.marked=true; 
    });
    
    pickups.forEach(p => {
        if (p.type !== 'xp' || p.magnetized) { if (!p.magnetized) p.y += 1 * spd; } else { p.y += 2 * spd; }
        
        if (p.y > canvas.height + 150) p.marked = true;

        let dx = player.x - p.x; let dy = player.y - p.y; let distSq = dx*dx + dy*dy;
        let pullRange = p.magnetized ? 9999 : player.getMagnetRange();
        
        if(distSq < pullRange * pullRange) { 
            let dist = Math.sqrt(distSq);
            let moveSpeed = 8; if (p.magnetized) moveSpeed = 20; else moveSpeed = 5 + (1 - dist/pullRange) * 10; 
            if (dist > 1) { p.x += dx / dist * moveSpeed * spd; p.y += dy / dist * moveSpeed * spd; } 
        }
        if(distSq < 400) { // 20*20
            if (p.type === 'xp') { player.gainXp(p.value || 10); AudioSys.play('ui_click'); } 
            else if (p.type === 'gold') { player.gold += p.value; runStats.goldEarned += p.value; showFloatText(player.x, player.y, `+${p.value} 金币`, "#ffea00"); AudioSys.play('ui_click'); } 
            else if (p.type === 'heal') { const healAmount = player.maxHp * 0.1 + 10; const prevHp = player.hp; player.hp = Math.min(player.maxHp, player.hp + healAmount); showFloatText(player.x, player.y, `+${Math.ceil(player.hp - prevHp)} HP`, "#00ffaa"); AudioSys.play('level_up'); } 
            else if (p.type === 'magnet') { pickups.forEach(o => o.magnetized = true); showFloatText(player.x, player.y, "MAGNET", "#fff"); AudioSys.play('level_up'); } 
            else if (p.type === 'freeze') { freezeTimer = 180; showFloatText(player.x, player.y, "FREEZE!", "#00e5ff"); createExplosion(canvas.width/2, canvas.height/2, '#00e5ff', 20); AudioSys.play('shield_break'); }
            else if (p.type === 'star') { player.invincible = Math.max(player.invincible, 300); showFloatText(player.x, player.y, "INVINCIBLE", "#ffe066"); createExplosion(player.x, player.y, '#ffe066', 12); AudioSys.play('level_up'); }
            else if (p.type === 'attack_up') { attackBoostTimer = Math.max(attackBoostTimer, ATTACK_BOOST_DURATION); showFloatText(player.x, player.y, "ATK UP +50%", "#ff6a00"); createExplosion(player.x, player.y, '#ff6a00', 10); AudioSys.play('shoot_heavy'); }
            p.marked=true; 
        }
    });
    activeProjectiles = activeProjectiles.filter(p=>!p.marked); enemies = enemies.filter(e=>!e.marked); pickups = pickups.filter(p=>!p.marked);
    particles.forEach(p=>{ p.life-=0.05; }); particles=particles.filter(p=>p.life>0);
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save(); ctx.translate(shakeX, shakeY);

    updateAndDrawStars(ctx, spd);

    if (freezeTimer > 0) { ctx.fillStyle = `rgba(0, 229, 255, ${Math.min(0.1, freezeTimer/1000)})`; ctx.fillRect(0,0,canvas.width,canvas.height); }
    
    if (settings.graphics > 0 && perfLoadLevel < 2) {
        ctx.strokeStyle='rgba(0,229,255,0.05)'; ctx.lineWidth=1; ctx.globalCompositeOperation = 'lighter';
        let off = (frameCount*2*spd)%40;
        for(let i=0;i<canvas.width;i+=40) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); ctx.stroke(); }
        for(let i=0;i<canvas.height;i+=40) { ctx.beginPath(); ctx.moveTo(0,i+off); ctx.lineTo(canvas.width,i+off); ctx.stroke(); }
        ctx.globalCompositeOperation = 'source-over';
    }

    if (bombEffectTimer > 0) {
        bombEffectTimer -= spd; let progress = 1 - (bombEffectTimer / 40); let maxRadius = Math.max(canvas.width, canvas.height);
        ctx.beginPath(); ctx.arc(canvas.width/2, canvas.height/2, maxRadius * progress, 0, Math.PI * 2);
        ctx.lineWidth = 50 * (1 - progress); ctx.strokeStyle = `rgba(255, 255, 255, ${1 - progress})`; ctx.stroke();
        ctx.fillStyle = `rgba(255, 255, 255, ${bombEffectTimer / 80})`; ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    pickups.forEach(p=>{ 
        ctx.globalCompositeOperation = settings.graphics > 0 ? 'lighter' : 'source-over';
        if (p.type === 'xp') {
            let r = Math.min(12, 4 + Math.sqrt(p.value || 10) * 0.4);
            ctx.fillStyle='#00ffaa'; 
            if(settings.graphics > 0) { ctx.shadowBlur = settings.graphics === 1 ? 5 : 10; ctx.shadowColor = '#00ffaa'; }
            ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.fill(); 
        } 
        else if (p.type === 'gold') {
            let r = 6; ctx.fillStyle='#ffea00'; 
            if(settings.graphics > 0) { ctx.shadowBlur = settings.graphics === 1 ? 5 : 10; ctx.shadowColor = '#ffea00'; }
            ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.fill(); ctx.shadowBlur = 0; ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle='#000'; ctx.font='8px sans-serif'; ctx.textAlign='center'; ctx.fillText('$', p.x, p.y+3);
        }
        else {
            if(settings.graphics > 0) ctx.shadowBlur = settings.graphics === 1 ? 8 : 15;
            if (p.type === 'heal') {
                ctx.shadowColor = '#00ffaa'; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = '#00ffaa'; ctx.fillRect(p.x-3, p.y-7, 6, 14); ctx.fillRect(p.x-7, p.y-3, 14, 6);
            } else if (p.type === 'magnet') {
                ctx.shadowColor = '#ff0055'; ctx.strokeStyle = '#ff0055'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(p.x, p.y-2, 8, 0, Math.PI, false); ctx.stroke();
                ctx.fillStyle = '#ccc'; ctx.fillRect(p.x-10, p.y-2, 4, 4); ctx.fillRect(p.x+6, p.y-2, 4, 4);
            } else if (p.type === 'freeze') {
                ctx.shadowColor = '#00e5ff'; ctx.strokeStyle = '#00e5ff'; ctx.lineWidth = 2; ctx.beginPath();
                for(let i=0; i<3; i++) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(i * Math.PI/3); ctx.moveTo(0, -10); ctx.lineTo(0, 10); ctx.restore(); }
                ctx.stroke(); ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI*2); ctx.fillStyle='#fff'; ctx.fill();
            } else if (p.type === 'star') {
                ctx.shadowColor = '#ffe066'; ctx.fillStyle = '#ffe066';
                ctx.save(); ctx.translate(p.x, p.y); ctx.beginPath();
                for (let i = 0; i < 10; i++) {
                    const a = -Math.PI / 2 + i * Math.PI / 5;
                    const r = (i % 2 === 0) ? 11 : 5;
                    const sx = Math.cos(a) * r;
                    const sy = Math.sin(a) * r;
                    if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                }
                ctx.closePath(); ctx.fill(); ctx.restore();
            } else if (p.type === 'attack_up') {
                ctx.shadowColor = '#ff6a00'; ctx.fillStyle = '#ff6a00';
                ctx.beginPath(); ctx.moveTo(p.x, p.y - 11); ctx.lineTo(p.x - 8, p.y + 2); ctx.lineTo(p.x - 2, p.y + 2); ctx.lineTo(p.x - 2, p.y + 11);
                ctx.lineTo(p.x + 8, p.y - 3); ctx.lineTo(p.x + 2, p.y -3); ctx.lineTo(p.x + 2, p.y -11); ctx.closePath(); ctx.fill();
            }
        }
        ctx.shadowBlur = 0; ctx.globalCompositeOperation = 'source-over';
    });

    ctx.globalCompositeOperation = settings.graphics > 0 ? 'lighter' : 'source-over';
    activeProjectiles.forEach(p => {
        const playerProjAlpha = p.team === 'player' ? (settings.playerBulletAlpha || 1) : 1;
        ctx.globalAlpha = playerProjAlpha;
        if(settings.graphics > 0 && perfLoadLevel < 2) { ctx.shadowBlur = settings.graphics === 1 ? 8 : 15; ctx.shadowColor=p.color; }
        else { ctx.shadowBlur = 0; }
        ctx.fillStyle='#fff'; ctx.strokeStyle='#fff';
        
        if (p.type === 'enemy_bullet') { 
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.atan2(p.vy, p.vx));
            ctx.beginPath(); ctx.fillStyle = p.color; ctx.fillRect(-8, -3, 16, 6); 
            ctx.beginPath(); ctx.arc(-8, 0, 3, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(8, 0, 3, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#fff'; ctx.shadowBlur = 0; ctx.fillRect(-6, -1, 12, 2);
            ctx.restore();
        } 
        else if (p.type === 'enemy_missile') { 
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.atan2(p.vy, p.vx));
            ctx.fillStyle = p.color; ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(-6, -4); ctx.lineTo(-6, 4); ctx.fill();
            ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-2, 0, 2, 0, Math.PI*2); ctx.fill();
            ctx.restore();
        }
        else if (p.type === 'enemy_laser') {
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
            if (p.warnTime > 0) {
                ctx.globalAlpha = 0.5 + Math.sin(frameCount*0.5)*0.3;
                ctx.strokeStyle = p.color; ctx.lineWidth = 2;
                ctx.setLineDash([10, 10]);
                ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(2000, 0); ctx.stroke();
            } else {
                if (settings.graphics > 0) { ctx.shadowBlur = settings.graphics === 1 ? 15 : 30; ctx.shadowColor = p.color; ctx.globalCompositeOperation = 'lighter'; }
                ctx.fillStyle = p.color; ctx.fillRect(0, -p.w/2, 2000, p.w);
                ctx.fillStyle = '#fff'; ctx.fillRect(0, -p.w/4, 2000, p.w/2);
            }
            ctx.restore();
        }
        else if (p.type === 'ally_support_laser') {
            const beamW = p.renderW || p.w;
            const halfW = beamW * 0.5;
            if (p.warnTime > 0) {
                ctx.globalAlpha = 0.5 + Math.sin(frameCount * 0.45) * 0.25;
                ctx.strokeStyle = '#66ffea';
                ctx.lineWidth = 3;
                ctx.setLineDash([14, 10]);
                ctx.strokeRect(p.x - halfW, 0, beamW, canvas.height);
                ctx.setLineDash([]);
                ctx.fillStyle = 'rgba(102,255,234,0.08)';
                ctx.fillRect(p.x - halfW, 0, beamW, canvas.height);
            } else {
                const beamAlpha = p.renderAlpha === undefined ? 1 : p.renderAlpha;
                ctx.globalAlpha = beamAlpha;
                if (settings.graphics > 0) {
                    ctx.globalCompositeOperation = 'lighter';
                    ctx.shadowBlur = settings.graphics === 1 ? 20 : 36;
                    ctx.shadowColor = '#66ffea';
                }
                const grad = ctx.createLinearGradient(p.x - halfW, 0, p.x + halfW, 0);
                grad.addColorStop(0, 'rgba(102,255,234,0.15)');
                grad.addColorStop(0.25, 'rgba(102,255,234,0.6)');
                grad.addColorStop(0.5, 'rgba(255,255,255,0.95)');
                grad.addColorStop(0.75, 'rgba(102,255,234,0.6)');
                grad.addColorStop(1, 'rgba(102,255,234,0.15)');
                ctx.fillStyle = grad;
                ctx.fillRect(p.x - halfW, 0, beamW, canvas.height);
                ctx.fillStyle = 'rgba(255,255,255,0.45)';
                ctx.fillRect(p.x - beamW * 0.08, 0, beamW * 0.16, canvas.height);
            }
        }
        else if (p.type === 'meteor_warning') {
            ctx.beginPath();
            ctx.arc(p.tx, p.y, 40, 0, Math.PI*2);
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.2 + Math.abs(Math.sin(frameCount * 0.2)) * 0.6})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = `rgba(255, 0, 0, 0.1)`;
            ctx.fill();
        }
        else if (p.type === 'meteor') {
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.atan2(p.vy, p.vx) + Math.PI/2);
            ctx.fillStyle = '#ff8800';
            ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = 'rgba(255, 100, 0, 0.5)';
            ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(0, -60); ctx.lineTo(15, 0); ctx.fill();
            ctx.restore();
        }
        else if (p.type === 'blackhole') {
            ctx.save();
            ctx.translate(p.x, p.y);
            
            let alpha = Math.min(1, p.life / 60); 
            ctx.globalAlpha = alpha;
            
            let coreR = p.radius * 0.45 + Math.sin(frameCount * 0.05) * 2;
            
            if (settings.graphics > 0) {
                ctx.beginPath();
                ctx.arc(0, 0, p.radius, 0, Math.PI*2);
                let grad = ctx.createRadialGradient(0, 0, coreR, 0, 0, p.radius);
                grad.addColorStop(0, "rgba(80, 0, 150, 0.4)");
                grad.addColorStop(1, "rgba(0, 0, 0, 0)");
                ctx.fillStyle = grad;
                ctx.fill();
            }

            if (settings.graphics > 0) { ctx.shadowBlur = settings.graphics === 1 ? 15 : 30; ctx.shadowColor = '#d500f9'; }
            ctx.beginPath();
            ctx.arc(0, 0, coreR, 0, Math.PI*2);
            ctx.strokeStyle = 'rgba(213, 0, 249, 0.8)';
            ctx.lineWidth = 6;
            ctx.stroke();

            if (settings.graphics > 0) {
                ctx.globalCompositeOperation = 'lighter';
                let pCount = settings.graphics === 1 ? 40 : 120;
                if (perfLoadLevel >= 1) pCount = Math.max(18, Math.floor(pCount * 0.55));
                if (perfLoadLevel >= 2) pCount = Math.max(10, Math.floor(pCount * 0.35));
                for(let i=0; i<pCount; i++) {
                    let noise = Math.sin(i * 123.45);
                    let distRatio = Math.pow(Math.abs(noise), 1.5);
                    let dist = coreR + distRatio * (p.radius - coreR);
                    
                    let particleAngle = p.angle * (1 + 2 * (1 - distRatio)) + i * 0.1;
                    
                    let px = Math.cos(particleAngle) * dist;
                    let py = Math.sin(particleAngle) * dist;
                    
                    ctx.beginPath();
                    let size = Math.max(0.5, 2.5 * (1 - distRatio));
                    ctx.arc(px, py, size, 0, Math.PI*2);
                    ctx.fillStyle = noise > 0.5 ? '#fff' : '#d500f9';
                    if (settings.graphics === 2 && perfLoadLevel < 2) { ctx.shadowBlur = 10; ctx.shadowColor = ctx.fillStyle; }
                    ctx.fill();
                }
            }

            ctx.globalCompositeOperation = 'source-over';
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(0, 0, coreR - 1, 0, Math.PI*2);
            ctx.fillStyle = '#000';
            ctx.fill();
            
            ctx.restore();
            if (settings.graphics > 0) ctx.globalCompositeOperation = 'lighter';
        }
        else {
            if(p.type==='basic') { ctx.beginPath(); ctx.arc(p.x,p.y,4,0,Math.PI*2); ctx.fill(); }
            if(p.type==='laser') { 
                const isSpectral = !!p.isSpectral || p.w >= 35;
                ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle + Math.PI/2);
                if (isSpectral) {
                    const lifeAlpha = Math.max(0.35, Math.min(1, p.life / 10));
                    ctx.globalCompositeOperation = 'source-over';
                    if (settings.graphics > 0) {
                        ctx.shadowBlur = settings.graphics === 1 ? 6 : 10;
                        ctx.shadowColor = 'rgba(64,235,255,0.55)';
                    } else {
                        ctx.shadowBlur = 0;
                    }
                    ctx.globalAlpha *= 0.6 * lifeAlpha;
                    ctx.lineWidth = p.w * 0.82;
                    ctx.strokeStyle = 'rgba(64,235,255,0.55)';
                    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-1000); ctx.stroke();
                    ctx.globalAlpha *= 0.75;
                    ctx.lineWidth = p.w * 0.18;
                    ctx.strokeStyle = 'rgba(220,255,255,0.55)';
                    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-1000); ctx.stroke();
                } else {
                    ctx.lineWidth=p.w; ctx.strokeStyle=p.color; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-1000); ctx.stroke(); 
                    ctx.lineWidth=p.w/3; ctx.strokeStyle='#fff'; ctx.stroke();
                }
                ctx.restore(); 
            }
            if(p.type==='bolt') { ctx.lineWidth=4; ctx.strokeStyle=p.color; ctx.beginPath(); ctx.moveTo(p.x1,p.y1); ctx.lineTo(p.x2,p.y2); ctx.stroke(); ctx.lineWidth=2; ctx.strokeStyle='#fff'; ctx.stroke(); }
            if(p.type==='rang') { ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(frameCount*0.5); ctx.fillStyle=p.color; ctx.fillRect(-10,-2,20,4); ctx.fillStyle='#fff'; ctx.fillRect(-6,-1,12,2); ctx.restore(); }
            if(p.type==='wingman_bullet') { ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fill(); }
            if(p.type==='fleet_laser') { 
                ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.atan2(p.vy, p.vx));
                ctx.fillStyle = p.color; ctx.fillRect(-10, -3, 20, 6); 
                ctx.fillStyle = '#fff'; ctx.fillRect(-6, -1, 12, 2);
                ctx.restore();
            }
            if(p.type==='missile' || p.type==='doom_missile') {
                ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.atan2(p.vy, p.vx));
                ctx.fillStyle = p.color; ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(-6, -4); ctx.lineTo(-6, 4); ctx.fill();
                ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-2, 0, 2, 0, Math.PI*2); ctx.fill();
                ctx.restore();
            }
            if(p.type === 'shockwave') {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.strokeStyle = `rgba(0, 255, 170, ${p.life / 60})`; ctx.lineWidth = 4; ctx.stroke(); ctx.fillStyle = `rgba(0, 255, 170, ${(p.life / 60) * 0.1})`; ctx.fill();
            }
            if (p.type === 'giant_missile') {
                ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.atan2(p.vy, p.vx));
                ctx.fillStyle = p.color; ctx.beginPath(); ctx.moveTo(20, 0); ctx.lineTo(-15, -15); ctx.lineTo(-15, 15); ctx.fill();
                ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-5, 0, 6, 0, Math.PI*2); ctx.fill();
                ctx.restore();
            }
        }
        ctx.globalAlpha = 1;
    });
    ctx.shadowBlur=0; ctx.globalCompositeOperation = 'source-over'; 

    enemies.forEach(e => e.draw(ctx));
    player.draw(ctx);
    
    ctx.globalCompositeOperation = settings.graphics > 0 ? 'lighter' : 'source-over';
    const particleStep = perfLoadLevel >= 2 ? 2 : 1;
    for (let i = 0; i < particles.length; i += particleStep) {
        const p = particles[i];
        ctx.fillStyle=p.color; ctx.globalAlpha=p.life; 
        if(settings.graphics > 0 && perfLoadLevel < 2) { ctx.shadowBlur=settings.graphics === 1 ? 5 : 10; ctx.shadowColor=p.color; }
        else { ctx.shadowBlur = 0; }
        ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1; 
    }
    ctx.shadowBlur=0; ctx.globalCompositeOperation = 'source-over';
    
    ctx.restore();
    const hpRatioFx = Math.max(0, Math.min(1, player.hp / player.maxHp));
    let shieldRatioFx = 0;
    let shieldChargingFx = false;
    if (player.shieldMax > 0) {
        if (player.shieldHp > 0) {
            shieldRatioFx = Math.max(0, Math.min(1, player.shieldHp / player.shieldMax));
        } else {
            const shieldLvlFx = player.passives.shield || 0;
            const maxTimeFx = shieldLvlFx >= 5 ? 20 : 30;
            shieldRatioFx = Math.max(0, Math.min(1, player.shieldTimer / maxTimeFx));
            shieldChargingFx = true;
        }
    }
    updateHudBarFX(hpRatioFx, shieldRatioFx, shieldChargingFx);
    updateHUD();
    gameLoopId = requestAnimationFrame(gameLoop);
}

function showFloatText(x, y, text, color) { 
    const textStr = String(text);
    const isDamageNum = /^\d+$/.test(textStr);
    if (isDamageNum && settings.showDamageFloat === false) return;
    if (settings.graphics === 2 && isDamageNum) {
        if (perfLoadLevel >= 2) return;
        if (perfLoadLevel >= 1 && Math.random() < 0.7) return;
    }
    const layer = document.getElementById('text-layer');
    if (!layer) return;
    if (layer.childElementCount > 120) layer.removeChild(layer.firstChild);
    const r = getCanvasRectCached(); const d=document.createElement('div'); d.className='dmg-text'; d.innerText=textStr; 
    d.style.left=(r.left + x) + 'px'; d.style.top=(r.top + y - 20) + 'px'; d.style.color=color; 
    if(settings.graphics > 0) d.style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}`;
    layer.appendChild(d); setTimeout(()=>d.remove(),800); 
}
function createExplosion(x,y,c,n) { 
    let count = settings.graphics === 2 ? n : (settings.graphics === 1 ? Math.max(1, Math.floor(n/2)) : Math.max(1, Math.floor(n/4)));
    if (settings.graphics === 2 && perfLoadLevel >= 1) count = Math.max(1, Math.floor(count * (perfLoadLevel >= 2 ? 0.45 : 0.7)));
    for(let i=0;i<count;i++) particles.push({x: x+(Math.random()-0.5)*10, y: y+(Math.random()-0.5)*10, color:c, life:1}); 
}
function updateUI() { 
    document.getElementById('menu-gold').innerText=saveData.gold; document.getElementById('shop-gold').innerText=saveData.gold;
    const startBtn = document.getElementById('btn-start-mission'); const hangarBtn = document.getElementById('btn-hangar'); const abandonBtn = document.getElementById('btn-abandon-mission');
    const lbBtn = document.getElementById('btn-leaderboard-container');
    
    // 如果无尽模式已解锁，则显示排行榜入口
    if (lbBtn) {
        lbBtn.style.display = saveData.unlocks.endless ? 'block' : 'none';
    }

    if (saveData.currentRun) { startBtn.innerHTML = `<span>继续任务</span> <span class="text-xs opacity-50 group-hover:translate-x-1 transition">>>></span>`; startBtn.classList.add('!text-yellow-400', '!border-yellow-600', '!shadow-[0_0_15px_rgba(255,234,0,0.3)]'); hangarBtn.classList.add('locked'); hangarBtn.title = "任务进行中无法升级"; if(abandonBtn) abandonBtn.style.display = 'flex'; } 
    else { startBtn.innerHTML = `<span>开始任务</span> <span class="text-xs opacity-50 group-hover:translate-x-1 transition">>>></span>`; startBtn.classList.remove('!text-yellow-400', '!border-yellow-600', '!shadow-[0_0_15px_rgba(255,234,0,0.3)]'); hangarBtn.classList.remove('locked'); hangarBtn.title = ""; if(abandonBtn) abandonBtn.style.display = 'none'; }
}

function updateHUD() { 
    document.getElementById('hud-hp-bar').style.width=(player.hp/player.maxHp*100)+'%'; document.getElementById('hud-hp-text').innerText = `${Math.ceil(player.hp)} / ${Math.ceil(player.maxHp)}`;
    const lvlEl = document.getElementById('hud-level-text'); if (lvlEl) lvlEl.innerText = `Lv.${player.level}`;
    const reviveEl = document.getElementById('hud-revive-text');
    if (player.revivesMax > 0) { reviveEl.style.display = 'block'; reviveEl.innerText = `复活: ${player.revivesLeft} / ${player.revivesMax}`; } else { reviveEl.style.display = 'none'; }
    const sBar = document.getElementById('hud-shield-bar'); const sCont = document.getElementById('hud-shield-c');
    if (player.shieldMax > 0) { sCont.style.display = 'block'; if (player.shieldHp > 0) { sBar.style.width = (player.shieldHp / player.shieldMax * 100) + '%'; sBar.classList.remove('charging'); } else { let shieldLvl = player.passives.shield || 0; let maxTime = (shieldLvl >= 5) ? 20 : 30; let chargePct = Math.min(100, (player.shieldTimer / maxTime) * 100); sBar.style.width = chargePct + '%'; sBar.classList.add('charging'); } } else { sCont.style.display = 'none'; }
    const bossHud = document.getElementById('boss-hud');
    if (activeBoss && !activeBoss.marked) { bossHud.style.display = 'flex'; const bossNameMap = { 'prism': '精英：棱镜核心', 'pulsar': '精英：脉冲核心', 'weaver': '精英：虚空编织者', 'carrier': '精英：母巢航母', 'boss': 'BOSS：霓虹审判者', 'boss_eclipse': 'BOSS：绯红日蚀', 'boss_omega': 'BOSS：欧米茄构造体' }; document.getElementById('boss-name').innerText = bossNameMap[activeBoss.type] || '强敌'; document.getElementById('boss-hp-bar').style.width = Math.max(0, (activeBoss.hp / activeBoss.maxHp * 100)) + '%'; document.getElementById('boss-hp-text').innerText = `${Math.ceil(activeBoss.hp)} / ${Math.ceil(activeBoss.maxHp)}`; } else { bossHud.style.display = 'none'; }
    document.getElementById('hud-gold').innerText=player.gold; document.getElementById('xp-bar-f').style.width=(player.xp/player.nextLvl*100)+'%';
    document.getElementById('hud-wave').innerText = gameWave; let max = MODES[currentMode].maxWave; document.getElementById('hud-max-wave').innerText = currentMode === 'endless' ? '' : `/${max}`;
    let timePct = Math.min(100, (waveTimer / 45) * 100); document.getElementById('time-bar-f').style.width = timePct + '%'; document.getElementById('time-bar-f').style.backgroundColor = isWaveBossActive ? '#ff0055' : '#00e5ff'; document.getElementById('time-bar-f').style.boxShadow = isWaveBossActive ? '0 0 10px #ff0055' : '0 0 10px #00e5ff';
    const circle = document.getElementById('bomb-progress'); const bombPct = Math.min(1, player.bombCharge / player.bombMax); circle.style.strokeDashoffset = 251 - (bombPct * 251);
    const btn = document.getElementById('bomb-btn'); if (player.bombCharge >= player.bombMax) { btn.classList.add('ready'); btn.innerText = "准备就绪"; } else { btn.classList.remove('ready'); btn.innerText = Math.floor(bombPct*100) + "%"; }
}

function triggerLevelUp() { player.hp = player.maxHp; gameState='levelup'; document.getElementById('levelup-screen').classList.add('active'); AudioSys.play('level_up'); renderLevelUpOptions(); }
function renderLevelUpOptions() {
    const invContainer = document.getElementById('current-skills-container');
    if (invContainer) {
        invContainer.innerHTML = '';
        Object.keys(player.weapons).forEach(k => { let w = player.weapons[k]; let conf = WEAPONS[k]; let isEvo = w.evo; let icon = ICONS[isEvo ? conf.evo : k] || '❓'; let lvlText = isEvo ? 'EVO' : `Lv.${w.level}`; let d = document.createElement('div'); d.className = 'flex items-center gap-2 bg-black/40 px-3 py-1 rounded border border-cyan-900 shadow-[inset_0_0_10px_rgba(0,229,255,0.1)]'; d.innerHTML = `<span style="color:${conf.color}; filter:drop-shadow(0 0 5px ${conf.color})">${icon}</span> <span class="text-xs font-mono text-gray-300">${lvlText}</span>`; invContainer.appendChild(d); });
        Object.keys(player.passives).forEach(k => { let lvl = player.passives[k]; let conf = UPGRADE_POOL.find(p => p.id === k); if(!conf) return; let lvlText = lvl >= conf.max ? 'MAX' : `Lv.${lvl}`; let d = document.createElement('div'); d.className = 'flex items-center gap-2 bg-black/40 px-3 py-1 rounded border border-cyan-900 shadow-[inset_0_0_10px_rgba(0,229,255,0.1)]'; d.innerHTML = `<span class="text-gray-400">${ICONS[k] || '🔹'}</span> <span class="text-xs font-mono text-gray-300">${lvlText}</span>`; invContainer.appendChild(d); });
        if (player.lbDmgBonus > 0) { let d = document.createElement('div'); d.className = 'flex items-center gap-2 bg-yellow-900/40 px-3 py-1 rounded border border-yellow-700 shadow-[inset_0_0_10px_rgba(255,234,0,0.1)]'; d.innerHTML = `<span class="text-yellow-400" style="filter:drop-shadow(0 0 5px #ffea00)">⚔️</span> <span class="text-xs font-mono text-yellow-200">+${Math.round(player.lbDmgBonus * 100)}% DMG</span>`; invContainer.appendChild(d); }
    }
    const c=document.getElementById('upgrade-container'); c.innerHTML=''; const opts=[]; let possibleEvos = [];
    Object.keys(player.weapons).forEach(k => { let w = player.weapons[k]; let conf = WEAPONS[k]; let passiveConf = UPGRADE_POOL.find(p => p.id === conf.passive); let currentPassiveLevel = player.passives[conf.passive] || 0; if (w.level >= 5 && !w.evo && passiveConf && currentPassiveLevel >= passiveConf.max) { possibleEvos.push({id: k, type: 'evo', conf: conf, evoConf: EVOLUTIONS[conf.evo], evoId: conf.evo}); } });
    let validPool = UPGRADE_POOL.filter(item => { if (item.type === 'weapon') { let owned = player.weapons[item.id]; return owned ? (owned.level < item.max && !owned.evo) : true; } else if (item.type === 'passive') return (player.passives[item.id] || 0) < item.max; return false; });
    if (validPool.length === 0 && possibleEvos.length === 0) { opts.push({id:'lb_dmg', nameKey:'极限突破：火力', descKey:'基础伤害 +5% (可无限叠加)', type:'limit_break'}); opts.push({id:'lb_heal', nameKey:'极限突破：维修', descKey:'回复 30% 生命值', type:'limit_break'}); opts.push({id:'lb_gold', nameKey:'极限突破：财富', descKey:'直接获得 500 金币', type:'limit_break'}); } 
    else { if (possibleEvos.length > 0) opts.push(possibleEvos[Math.floor(Math.random() * possibleEvos.length)]); while(opts.length < 3 && validPool.length > 0) { let idx = Math.floor(Math.random() * validPool.length); let item = validPool[idx]; if (!opts.some(o => o.id === item.id)) opts.push(item); } }
    opts.forEach(o => {
        let d=document.createElement('div'); d.className='card'; let iconKey = o.type === 'evo' ? o.evoId : o.id;
        if (o.type === 'limit_break') { d.className += ' limit-break'; d.innerHTML=`<div class="flex flex-col items-center"><div class="text-xs text-yellow-400 font-bold mb-1" style="text-shadow:0 0 5px #ffea00">⚡ 极限突破 ⚡</div><div class="text-4xl mb-2 filter drop-shadow-[0_0_15px_rgba(255,234,0,1)] animate-pulse">${ICONS[iconKey] || '✨'}</div><h3 class="text-yellow-300 text-lg mb-1 font-bold" style="text-shadow:0 0 10px #ffea00">${o.nameKey}</h3><p class="text-gray-300 text-xs leading-tight text-center px-2">${o.descKey}</p></div>`; d.onclick = () => { if (o.id === 'lb_dmg') player.lbDmgBonus += 0.05; if (o.id === 'lb_heal') player.hp = Math.min(player.maxHp, player.hp + (player.maxHp * 0.3)); if (o.id === 'lb_gold') { player.gold += 500; runStats.goldEarned += 500; } AudioSys.play('level_up'); document.getElementById('levelup-screen').classList.remove('active'); gameState='playing'; gameLoop(); }; }
        else if (o.type === 'evo') { d.className += ' evolution !border-purple-500 shadow-[0_0_20px_rgba(213,0,249,0.3)]'; d.innerHTML=`<div class="flex flex-col items-center"><div class="text-xs text-purple-400 font-bold mb-1" style="text-shadow:0 0 5px #d500f9">⚠️ 武器进化 ⚠️</div><div class="text-4xl mb-2 filter drop-shadow-[0_0_15px_rgba(213,0,249,1)] animate-pulse">${ICONS[iconKey]}</div><h3 class="text-purple-300 text-lg mb-1 font-bold" style="text-shadow:0 0 10px #d500f9">${t(o.evoConf.nameKey)}</h3><p class="text-gray-300 text-xs leading-tight text-center px-2 h-8 overflow-hidden">${t(o.evoConf.descKey)}</p></div>`; d.onclick = () => { player.weapons[o.id].evo = true; player.weapons[o.id].level = 1; showFloatText(player.x, player.y, "EVOLUTION!", "#d500f9"); createExplosion(player.x, player.y, "#d500f9", 50); AudioSys.play('level_up'); document.getElementById('levelup-screen').classList.remove('active'); gameState='playing'; gameLoop(); }; } 
        else { let currentLvl = (o.type === 'weapon') ? (player.weapons[o.id]?.level || 0) : (player.passives[o.id] || 0); d.innerHTML=`<div class="flex flex-col items-center"><div class="text-4xl mb-2 filter drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">${ICONS[iconKey] || '❓'}</div><h3 class="text-cyan-300 text-lg mb-1 font-bold" style="text-shadow:0 0 5px var(--c-primary)">${t(WEAPONS[o.id]?.nameKey || o.nameKey)}</h3><div class="text-xs text-yellow-400 font-bold mb-2 tracking-wider">${currentLvl === 0 ? "新获得" : `Lv.${currentLvl} -> Lv.${currentLvl+1}`}</div><p class="text-gray-400 text-xs leading-tight text-center px-2 h-8 overflow-hidden">${t(o.descKey || WEAPONS[o.id]?.descKey)}</p></div>`; d.onclick=()=>{ if(o.type==='weapon') { if(!player.weapons[o.id]) player.weapons[o.id]={level:1,cd:0,evo:false}; else player.weapons[o.id].level++; } else player.passives[o.id]=(player.passives[o.id]||0)+1; AudioSys.play('ui_click'); document.getElementById('levelup-screen').classList.remove('active'); gameState='playing'; gameLoop(); }; }
        c.appendChild(d);
    });
    
    const btn = document.getElementById('reroll-btn'); 
    if (player.rerolls > 0) btn.innerText = `重置 (${player.rerolls} 剩余)`; 
    else btn.innerText = `重置 (${player.rerollCost} 金币)`;
}

function rerollUpgrades() { 
    if (player.rerolls > 0) { 
        player.rerolls--; renderLevelUpOptions(); AudioSys.play('ui_click'); return; 
    } 
    if (player.gold >= player.rerollCost) { 
        player.gold -= player.rerollCost; 
        player.rerollCost *= 2; // 指数增长重置费用
        updateHUD(); renderLevelUpOptions(); AudioSys.play('ui_click'); 
    } 
}

function endGame(win) { 
    gameState='gameover'; 
    activeBoss = null;
    const bossHudEl = document.getElementById('boss-hud');
    if (bossHudEl) bossHudEl.style.display = 'none';
    AudioSys.playMusic('menu'); 
    document.getElementById('result-screen').classList.add('active'); 
    saveData.currentRun = null; 
    let earnings = player.gold; 
    let displayWave = win && currentMode !== 'endless' ? MODES[currentMode].maxWave : gameWave - 1; 
    const context = { win, mode: currentMode, wave: displayWave, kills: runStats.kills, goldEarned: runStats.goldEarned, hit: runStats.hit, hpPct: player.hp / player.maxHp }; 
    let newUnlocks = []; 
    let unlockedThisRun = [];
    ACHIEVEMENTS.forEach(ach => {
        if (!saveData.achievements.includes(ach.id) && ach.check(context)) {
            saveData.achievements.push(ach.id);
            unlockedThisRun.push(ach.id);
            saveData.gold += ach.reward;
            earnings += ach.reward;
            newUnlocks.push(`<span class="text-yellow-400" style="text-shadow:0 0 5px #ffea00">🏆 成就解锁：${ach.title} (+${ach.reward})</span>`);
        }
    });
    if (win) { 
        if (currentMode === 'easy') { if (!saveData.unlocks.normal) { saveData.unlocks.normal = true; newUnlocks.push(`<span class="text-cyan-400" style="text-shadow:0 0 5px #00e5ff">🔓 模式解锁：老兵</span>`); } if (!saveData.unlocks.win_easy) { saveData.unlocks.win_easy = true; newUnlocks.push(`<span class="text-green-400" style="text-shadow:0 0 5px #00ffaa">✈️ 机体解锁：堡垒</span>`); } } 
        if (currentMode === 'normal') { if (!saveData.unlocks.hard) { saveData.unlocks.hard = true; newUnlocks.push(`<span class="text-cyan-400" style="text-shadow:0 0 5px #00e5ff">🔓 模式解锁：精英</span>`); } if (!saveData.unlocks.win_normal) { saveData.unlocks.win_normal = true; newUnlocks.push(`<span class="text-yellow-400" style="text-shadow:0 0 5px #ffea00">✈️ 机体解锁：闪电</span>`); } } 
        if (currentMode === 'hard') {
            if (!saveData.unlocks.endless) { saveData.unlocks.endless = true; newUnlocks.push(`<span class="text-cyan-400" style="text-shadow:0 0 5px #00e5ff">🔓 模式解锁：无尽</span>`); }
            if (!saveData.unlocks.win_hard) { saveData.unlocks.win_hard = true; newUnlocks.push(`<span class="text-purple-400" style="text-shadow:0 0 5px #d500f9">✈️ 机体解锁：幽影</span>`); }
        }
    } 
    if (unlockedThisRun.includes('endless_20')) newUnlocks.push(`<span class="text-cyan-300" style="text-shadow:0 0 5px #00ffff">✈️ 机体解锁：激光者</span>`);
    if (unlockedThisRun.includes('endless_30')) newUnlocks.push(`<span class="text-white" style="text-shadow:0 0 8px #ffffff">✈️ 机体解锁：神明</span>`);
    if (unlockedThisRun.includes('endless_50')) newUnlocks.push(`<span class="text-purple-300" style="text-shadow:0 0 5px #d500f9">🧬 商店解锁：分身可购买</span>`);
    if (unlockedThisRun.includes('endless_60')) newUnlocks.push(`<span class="text-green-300" style="text-shadow:0 0 5px #00ffaa">♻️ 商店解锁：复活重组</span>`);
    if (unlockedThisRun.includes('endless_100')) newUnlocks.push(`<span class="text-pink-300" style="text-shadow:0 0 5px #ff66cc">🧬 商店解锁：分身2可购买</span>`);
    
    // 如果是无尽模式且突破了最高记录
    if (currentMode === 'endless' && displayWave > (saveData.bestEndlessWave || 0)) {
        saveData.bestEndlessWave = displayWave;
        newUnlocks.push(`<span class="text-yellow-400 font-bold" style="text-shadow:0 0 10px #ffea00">📈 新的无尽记录：${displayWave} 波！</span>`);
        
        // 如果玩家已经设置了昵称，自动上传成绩
        if (saveData.nickname && window.FirebaseAPI && window.FirebaseAPI.ready) {
            window.FirebaseAPI.uploadScore(saveData.nickname, displayWave);
            newUnlocks.push(`<span class="text-cyan-400 font-bold" style="text-shadow:0 0 10px #00e5ff">☁️ 记录已同步至星际网络！</span>`);
        }
    }

    saveData.gold += player.gold; saveGame(); document.getElementById('result-title').innerText = win ? "任务完成" : "任务失败"; document.getElementById('result-title').style.color = win ? "#00ffaa" : "#ff0055"; document.getElementById('result-wave').innerText = displayWave; document.getElementById('result-gold').innerText = earnings; document.getElementById('result-unlocks').innerHTML = newUnlocks.join("<br>"); 
}

function openShipSelect() { document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById('ship-select').classList.add('active'); updateShipGrid(); renderModeButtons(); }
function renderModeButtons() { const c = document.getElementById('mode-buttons'); c.innerHTML = ''; for (const [k, conf] of Object.entries(MODES)) { let unlocked = k === 'easy' || saveData.unlocks[k] !== false; let btn = document.createElement('button'); btn.className = `btn py-2 px-4 text-xs m-0 border-none ${unlocked ? (currentMode===k?'bg-cyan-600 text-white shadow-[0_0_10px_#00e5ff]':'bg-gray-800') : 'locked bg-gray-900 text-gray-600'}`; btn.innerHTML = unlocked ? conf.name : `🔒 ${conf.name}`; if (unlocked) btn.onclick = () => { AudioSys.play('ui_click'); currentMode = k; renderModeButtons(); document.getElementById('mode-desc').innerText = conf.desc; }; c.appendChild(btn); } document.getElementById('mode-desc').innerText = MODES[currentMode].desc; }
function updateShipGrid() { 
    const c = document.getElementById('ship-container'); c.innerHTML = ''; 
    const infoPanel = document.getElementById('selected-ship-info'); 
    
    for (const [k, conf] of Object.entries(SHIPS)) { 
        let unlocked = false;
        if (conf.unlock === 'default') unlocked = true;
        else if (saveData.unlocks[conf.unlock]) unlocked = true;
        else if (conf.unlock.startsWith('ach_') && saveData.achievements.includes(conf.unlock.replace('ach_', ''))) unlocked = true;
        
        let d=document.createElement('div'); d.className=`card ${currentShip===k?'selected':''} ${!unlocked?'locked':''}`; 
        
        d.innerHTML=`${!unlocked ? '<div class="absolute inset-0 flex items-center justify-center bg-black/80 z-10"><span class="text-2xl">🔒</span></div>' : ''}<div class="card-icon" style="color:${conf.color}; filter:drop-shadow(0 0 10px ${conf.color}); margin-bottom:5px;">✈</div><h3 style="margin-bottom:0; font-size:1rem;">${conf.name}</h3>`; 
        
        if (unlocked) d.onclick=()=>{ AudioSys.play('ui_click'); currentShip=k; updateShipGrid(); }; 
        c.appendChild(d); 
        
        if (currentShip === k && infoPanel) {
            infoPanel.innerHTML = `<div class="text-lg font-bold mb-1 tracking-widest" style="color:${conf.color}; text-shadow:0 0 8px ${conf.color}">${conf.name}</div><div class="text-sm text-gray-300 leading-relaxed px-2">${t(conf.descKey)}</div>`;
        }
    } 
}
function showShop() { if (saveData.currentRun) return notifyUnlock("任务进行中，无法升级机库。"); document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById('shop-screen').classList.add('active'); renderShop(); }

function renderShop() { 
    const c = document.getElementById('shop-container'); 
    c.innerHTML = ''; 
    
    let items = [];
    Object.keys(SHOP_CONFIG).forEach(k => { items.push({ key: k, ...SHOP_CONFIG[k] }); });
    
    const baseKeys = Object.keys(SHOP_CONFIG);
    const isBaseMaxed = baseKeys.every(k => (saveData.upgrades[k] || 0) >= SHOP_CONFIG[k].max);
    
    if (isBaseMaxed) {
        items.push({ key: 'overclock_dmg', nameKey: 'shop_oc_dmg', descKey: 'desc_oc_dmg', max: 9999, costBase: 10000, isInfinite: true });
        items.push({ key: 'overclock_hull', nameKey: 'shop_oc_hull', descKey: 'desc_oc_hull', max: 9999, costBase: 10000, isInfinite: true });
    }
    
    if (saveData.achievements.includes('endless_60')) { items.push({ key: 'revive', nameKey: 'shop_revive', descKey: 'desc_revive', max: 3, costBase: 50000, isSpecial: true }); }
    if (saveData.achievements.includes('endless_50')) items.push({ key: 'clone', nameKey: 'shop_clone', descKey: 'desc_clone', max: 1, costBase: 1000000, isSpecial: true });
    if (saveData.achievements.includes('endless_100')) items.push({ key: 'clone2', nameKey: 'shop_clone2', descKey: 'desc_clone2', max: 1, costBase: 2000000, isSpecial: true });

    items.forEach(conf => { 
        let cur = saveData.upgrades[conf.key] || 0; 
        if (conf.key === 'clone') cur = (saveData.upgrades.clone || 0) >= 1 ? 1 : 0;
        if (conf.key === 'clone2') cur = (saveData.upgrades.clone || 0) >= 2 ? 1 : 0;
        let isMax = cur >= conf.max; 
        
        let cost;
        if (isMax) cost = 'MAX';
        else if (conf.isInfinite || conf.isSpecial) cost = conf.costBase * (cur + 1);
        else cost = conf.cost * (cur + 1);
        
        let d = document.createElement('div'); 
        d.className = `card ${isMax ? 'locked' : ''}`; 
        
        if (conf.isInfinite) { d.style.borderColor = '#ff0055'; d.style.boxShadow = '0 0 15px rgba(255,0,85,0.2)'; }
        if (conf.isSpecial) { d.style.borderColor = '#d500f9'; d.style.boxShadow = '0 0 15px rgba(213,0,249,0.2)'; }
        if (isMax) { d.style.borderColor = '#00ffaa'; d.style.boxShadow = 'inset 0 0 10px rgba(0,255,170,0.1)'; }

        let lvlText = conf.isInfinite ? `无限 Lv.${cur}` : `Lv.${cur} / ${conf.max}`;
        
        d.innerHTML = `<div class="font-bold ${conf.isInfinite ? 'text-accent neon-text-accent' : (conf.isSpecial ? 'text-purple-400' : 'text-cyan-300 neon-text-primary')}">${t(conf.nameKey)}</div><div class="text-xs text-gray-400 my-2">${t(conf.descKey)}</div><div class="text-yellow-400 font-mono font-bold text-xl" style="text-shadow:0 0 5px #ffea00">${cost}</div><div class="text-xs text-gray-500 mt-1 font-mono">${lvlText}</div>`; 
        
        if (!isMax) {
            d.onclick = () => { 
                if (saveData.gold >= cost) { 
                    saveData.gold -= cost; 
                    if (conf.key === 'clone') saveData.upgrades.clone = 1;
                    else if (conf.key === 'clone2') saveData.upgrades.clone = 2;
                    else saveData.upgrades[conf.key] = cur + 1; 
                    saveGame(); 
                    AudioSys.play('level_up'); 
                    renderShop(); 
                } 
            }; 
        }
        c.appendChild(d); 
    }); 
}

function showAchievements() { document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById('ach-screen').classList.add('active'); const list = document.getElementById('ach-list'); list.innerHTML = ''; ACHIEVEMENTS.forEach(ach => { let isUnlocked = saveData.achievements.includes(ach.id); let div = document.createElement('div'); div.className = `ach-item ${isUnlocked ? 'unlocked' : ''}`; div.innerHTML = `<div class="ach-icon">${isUnlocked ? '🏆' : '🔒'}</div><div><div class="font-bold ${isUnlocked ? 'text-yellow-400' : 'text-gray-500'}">${ach.title}</div><div class="ach-desc">${ach.desc}</div></div><div class="ach-reward">+${ach.reward}</div>`; list.appendChild(div); }); }
function launchGame(isNew = false) { document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById('hud-layer').style.display='block'; activeBoss = null; const bossHudEl = document.getElementById('boss-hud'); if (bossHudEl) bossHudEl.style.display = 'none'; if (isNew) { player=new Player(currentShip); gameWave = 1; waveTimer = 0; freezeTimer = 0; isWaveBossActive = false; endlessEventTimer = 0; endlessNextEventTime = 30 + Math.random() * 30; enemies = []; activeProjectiles = []; pickups = []; runStats = { kills: 0, goldEarned: 0, hit: false }; } gameState='playing'; AudioSys.stopMusic(); gameLoop(); }
function showGuide() { document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById('guide-screen').classList.add('active'); switchTab('weapons'); }
function setVolume(v) { settings.volume=v/100; AudioSys.setVolume(settings.volume); } 
function setSpeed(v) { settings.speed=v/100; document.getElementById('speed-display').innerText=settings.speed.toFixed(1)+'x'; }
function setGraphics(v) {
    settings.graphics = parseInt(v);
    const labels = ["低(流畅)", "中等", "高(绚丽)"];
    document.getElementById('graphics-display').innerText = labels[settings.graphics];
    if (settings.graphics === 0) {
        settings.showDamageFloat = false;
        const floatToggle = document.getElementById('input-damagefloat');
        const floatLabel = document.getElementById('damagefloat-display');
        if (floatToggle) floatToggle.checked = false;
        if (floatLabel) floatLabel.innerText = '关';
        const layer = document.getElementById('text-layer');
        if (layer) layer.innerHTML = '';
    }
    initStars();
}

// 新增：动态设置 UI 缩放倍率，通过更改根目录 font-size 实现
const setGraphicsNative = setGraphics;
setGraphics = function(v) { setGraphicsNative(v); applyGraphicsFX(); };
function setUIScale(v) { 
    settings.uiScale = parseInt(v) / 100; 
    document.getElementById('uiscale-display').innerText = settings.uiScale.toFixed(2) + 'x'; 
    document.documentElement.style.fontSize = (settings.uiScale * 16) + 'px'; 
}

function setPlayerBulletAlpha(v) {
    const raw = parseInt(v, 10);
    const pct = Math.max(20, Math.min(100, isNaN(raw) ? 100 : raw));
    settings.playerBulletAlpha = pct / 100;
    document.getElementById('playeralpha-display').innerText = pct + '%';
}
function setDamageFloatEnabled(enabled) {
    settings.showDamageFloat = !!enabled;
    document.getElementById('damagefloat-display').innerText = settings.showDamageFloat ? '开' : '关';
    if (!settings.showDamageFloat) {
        const layer = document.getElementById('text-layer');
        if (layer) layer.innerHTML = '';
    }
}

function switchTab(tab) { AudioSys.play('ui_click'); document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active')); const buttons = document.getElementsByClassName('tab-btn'); for (let i = 0; i < buttons.length; i++) if (buttons[i].getAttribute('onclick') === `switchTab('${tab}')`) buttons[i].classList.add('active'); const container = document.getElementById('guide-content'); container.innerHTML = ''; let data = []; if (tab === 'ships') Object.keys(SHIPS).forEach(k => data.push({icon:'✈️', title:SHIPS[k].name, desc:t(SHIPS[k].descKey), color:SHIPS[k].color})); else if (tab === 'enemies') Object.keys(TEXTS).filter(k=>k.startsWith('enemy_')).forEach(k => data.push({icon:'👾', title:t(k).split(':')[0], desc:t(k), color:'#ff0055'})); else if (tab === 'weapons') Object.keys(WEAPONS).forEach(k => data.push({icon: ICONS[k] || '🔫', title:t(WEAPONS[k].nameKey), desc:t(WEAPONS[k].descKey), color:WEAPONS[k].color})); else if (tab === 'passives') UPGRADE_POOL.filter(i => i.type === 'passive').forEach(p => data.push({ icon: ICONS[p.id] || '🔹', title: t(p.nameKey), desc: t(p.descKey), color:'#00ffaa' })); else if (tab === 'evolution') Object.keys(WEAPONS).forEach(k => { let w = WEAPONS[k]; let p = UPGRADE_POOL.find(u => u.id === w.passive); let e = EVOLUTIONS[w.evo]; data.push({ icon: '🔄', title: `<span class="text-cyan-300">${t(w.nameKey)}</span> + <span class="text-yellow-300">${ICONS[p.id]} ${t(p.nameKey)}</span>`, desc: `<div class="mt-1 text-purple-400 font-bold" style="text-shadow:0 0 5px #d500f9">⬇️ 合成: ${ICONS[w.evo]} ${t(e.nameKey)}</div><div class="text-xs text-gray-400 mt-1">${t(e.descKey)}</div>`, isHtml: true, color:'#d500f9' }); }); data.forEach(item => { container.innerHTML += `<div class="guide-item" style="display:flex; gap:15px; margin-bottom:12px; padding:12px; background:rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); align-items:center; border-radius:4px;"><div class="guide-icon text-3xl" style="color:${item.color}; filter:drop-shadow(0 0 8px ${item.color})">${item.icon}</div>${item.isHtml ? `<div class="flex-1"><div class="font-bold text-white text-sm mb-1">${item.title}</div>${item.desc}</div>` : `<div class="flex-1"><div class="font-bold text-lg mb-1" style="color:${item.color}; text-shadow:0 0 5px ${item.color}">${item.title}</div><div class="text-xs text-gray-400 leading-relaxed">${item.desc}</div></div>`}</div>`; }); }

function triggerBombUI() { 
    if(player.bombCharge >= player.bombMax){ 
        player.bombCharge = 0; 
        enemies.forEach(e => { if (e.role === 'minion') e.takeDamage(99999); else e.takeDamage(800 + gameWave * 20); }); 
        activeProjectiles.forEach(p => { if (p.team === 'enemy' || p.type === 'enemy_bullet' || p.type === 'enemy_missile' || p.type === 'enemy_laser') { p.marked = true; createExplosion(p.x, p.y, p.color, 3); } }); 
        createExplosion(canvas.width/2, canvas.height/2, '#fff', 100); 
        shakeAmount = 30; 
        bombEffectTimer = 40; 
        AudioSys.play('explode'); 
        updateHUD(); 
    } 
}

updateUI();
</script>
</body>
</html>

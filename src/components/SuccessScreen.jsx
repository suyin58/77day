import React, { useEffect, useState } from 'react';

const SuccessScreen = ({ totalStars, onRestart }) => {
  const [showHearts, setShowHearts] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowHearts(true), 500);
    const timer2 = setTimeout(() => setShowMessage(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // 生成随机位置的心形
  const generateHearts = () => {
    const hearts = [];
    for (let i = 0; i < 12; i++) {
      hearts.push(
        <div
          key={i}
          className="floating-hearts"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        ></div>
      );
    }
    return hearts;
  };

  return (
    <div className="success-overlay relative">
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(https://down-cdn.dingtalk.com/ddmedia/iwELAqNqcGcDBgTRGYAF0RMgBrAC7PFkh8tqbgiOegbQpdAAB9IB61N7CAAJqm9wZW4udG9vbHMKAAvSAGDuiQ.jpg)',
          filter: 'blur(1px)'
        }}
      ></div>
      
      {/* 渐变遮罩层，确保文字清晰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>
      {/* 飘落的心形动画 */}
      {showHearts && generateHearts()}
      
      {/* 主要内容 */}
      <div className="text-center space-y-8 relative z-10">
        {/* 标题 */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-star-gold via-magpie-pink to-bridge-light animate-pulse">
            鹊桥已通
          </h1>
          <h2 className="text-3xl text-white opacity-90">
            佳期如梦！
          </h2>
        </div>

        {/* 牛郎织女相会动画 */}
        <div className="relative w-80 h-40 mx-auto">
          {/* 鹊桥 */}
          <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-bridge-light via-star-gold to-bridge-light rounded-full animate-bridge-glow"></div>
          
          {/* 牛郎 */}
          <div 
            className="lovers male absolute top-1/2 transform -translate-y-1/2 transition-all duration-3000"
            style={{ 
              left: showMessage ? '45%' : '10%',
              transform: 'translateY(-50%)'
            }}
          >
            <div className="absolute -top-8 -left-2 w-6 h-1 bg-yellow-600 opacity-80"></div>
          </div>
          
          {/* 织女 */}
          <div 
            className="lovers absolute top-1/2 transform -translate-y-1/2 transition-all duration-3000"
            style={{ 
              right: showMessage ? '45%' : '10%',
              transform: 'translateY(-50%)'
            }}
          >
            <div className="absolute -top-5 -right-3 w-12 h-1 bg-gradient-to-r from-magpie-pink to-transparent opacity-60 animate-float"></div>
          </div>
          
          {/* 相会时的光效 */}
          {showMessage && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-star-gold to-magpie-pink rounded-full opacity-60 animate-ping"></div>
          )}
        </div>

        {/* 祝福语 */}
        {showMessage && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-2xl text-white font-bold">
              🌟 余璇小妹妹 🌟
            </p>
            <p className="text-lg text-white opacity-90">
              你已经成功搭建了爱情的桥梁，并顺利牵到大帅哥的手手了
            </p>
            <div className="text-base text-white opacity-80 space-y-2">
              <p>现在开始像牛郎织女一样</p>
              <p>跨越千山万水，相守一生一世吧 💕</p>
            </div>
          </div>
        )}

        {/* 按钮 */}
        <div className="space-y-4 pt-8">
          <button
            onClick={onRestart}
            className="px-8 py-4 bg-gradient-to-r from-magpie-pink to-star-gold text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            🌟 再次寻星 🌟
          </button>
          
          <p className="text-sm text-white opacity-60">
            七夕快乐！愿你的爱情如星光般永恒闪耀 ✨
          </p>
        </div>
      </div>

      {/* 装饰星星 */}
      <div className="absolute top-10 left-10 star-item animate-twinkle"></div>
      <div className="absolute top-20 right-20 star-item animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-20 left-20 star-item animate-twinkle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-10 right-10 star-item animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default SuccessScreen;

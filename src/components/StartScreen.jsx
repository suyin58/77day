import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
      {/* 标题 */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-star-gold via-magpie-pink to-bridge-light mb-4 animate-twinkle">
          鹊桥寻星记
        </h1>
        <p className="text-xl text-white opacity-80 mb-2">
          帮助小喜鹊收集星光，为牛郎织女搭建鹊桥
        </p>
        <p className="text-lg text-white opacity-60">
          让有情人终成眷属 ✨
        </p>
      </div>

      {/* 装饰性小喜鹊 */}
      <div className="relative mb-8">
        <div className="magpie animate-float" style={{ position: 'relative', left: '0px', top: '0px' }}>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-star-gold rounded-full animate-twinkle"></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-magpie-pink rounded-full animate-twinkle"></div>
        </div>
      </div>

      {/* 开始按钮 */}
      <button
        onClick={onStart}
        className="px-8 py-4 bg-gradient-to-r from-magpie-pink to-star-gold text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
      >
        🌟 开始寻星之旅 🌟
      </button>

      {/* 游戏说明 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white opacity-70">
        <p className="mb-2">💡 操作提示：</p>
        <p className="text-sm">电脑：按住鼠标左键或空格键控制小喜鹊飞行</p>
        <p className="text-sm">手机：点按屏幕控制小喜鹊飞行</p>
      </div>

      {/* 装饰星星 */}
      <div className="absolute top-20 left-20 star-item animate-twinkle"></div>
      <div className="absolute top-32 right-32 star-item animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-40 left-40 star-item animate-twinkle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-20 star-item animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default StartScreen;

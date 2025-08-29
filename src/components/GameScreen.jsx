import React, { useState, useEffect, useCallback, useRef } from 'react';

const GameScreen = ({ level, onComplete, onReset }) => {
  const [magpieY, setMagpieY] = useState(300);
  const [magpieX, setMagpieX] = useState(100);
  const [mouseX, setMouseX] = useState(100);
  const [mouseY, setMouseY] = useState(300);
  const [stars, setStars] = useState([]);
  const [collectedStars, setCollectedStars] = useState(0);
  const [bridgeSegments, setBridgeSegments] = useState([]);
  const [isFlying, setIsFlying] = useState(false);
  const [gameProgress, setGameProgress] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [currentPoem, setCurrentPoem] = useState('');
  const [showPoem, setShowPoem] = useState(false);
  
  const gameAreaRef = useRef(null);
  const animationRef = useRef(null);
  const keysRef = useRef({ space: false, mouse: false });

  // 七夕诗词库
  const qixiPoems = [
    "两情若是久长时，又岂在朝朝暮暮",
    "金风玉露一相逢，便胜却人间无数",
    "纤云弄巧，飞星传恨，银汉迢迢暗度",
    "柔情似水，佳期如梦，忍顾鹊桥归路",
    "天阶夜色凉如水，卧看牵牛织女星",
    "迢迢牵牛星，皎皎河汉女",
    "盈盈一水间，脉脉不得语",
    "七夕今宵看碧霄，牵牛织女渡河桥",
    "家家乞巧望秋月，穿尽红丝几万条",
    "银烛秋光冷画屏，轻罗小扇扑流萤",
    "此日六军同驻马，当时七夕笑牵牛",
    "卧看牵牛织女星，月转过梧桐树影",
    "别离还有经年客，怅望不如河鼓星",
    "争将世上无期别，换得年年一度来"
  ];

  // 关卡配置
  const levelConfig = {
    1: { starsNeeded: 8, starCount: 10, obstacles: [] },
    2: { starsNeeded: 10, starCount: 12, obstacles: [] },
    3: { starsNeeded: 12, starCount: 15, obstacles: [] }
  };

  const currentConfig = levelConfig[level] || levelConfig[1];

  // 初始化星星
  const initializeStars = useCallback(() => {
    const newStars = [];
    for (let i = 0; i < currentConfig.starCount; i++) {
      newStars.push({
        id: i,
        x: 200 + Math.random() * (window.innerWidth - 400),
        y: 100 + Math.random() * (window.innerHeight - 200),
        collected: false,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.02 + Math.random() * 0.02
      });
    }
    setStars(newStars);
  }, [currentConfig.starCount]);

  // 初始化游戏
  useEffect(() => {
    initializeStars();
    setCollectedStars(0);
    setBridgeSegments([]);
    setGameProgress(0);
    setGameTime(0);
    setMagpieY(300);
    setMagpieX(100); // 重置小喜鹊的X位置
  }, [level, initializeStars]);

  // 鼠标移动事件处理
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = gameAreaRef.current?.getBoundingClientRect();
      if (rect) {
        setMouseX(e.clientX - rect.left);
        setMouseY(e.clientY - rect.top);
      }
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        keysRef.current.space = true;
        setIsFlying(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        keysRef.current.space = false;
        setIsFlying(false);
      }
    };

    const handleMouseDown = (e) => {
      if (e.button === 0) {
        keysRef.current.mouse = true;
        setIsFlying(true);
      }
    };

    const handleMouseUp = (e) => {
      if (e.button === 0) {
        keysRef.current.mouse = false;
        setIsFlying(false);
      }
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = gameAreaRef.current?.getBoundingClientRect();
      if (rect) {
        setMouseX(touch.clientX - rect.left);
        setMouseY(touch.clientY - rect.top);
      }
      setIsFlying(true);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = gameAreaRef.current?.getBoundingClientRect();
      if (rect) {
        setMouseX(touch.clientX - rect.left);
        setMouseY(touch.clientY - rect.top);
      }
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      setIsFlying(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // 游戏循环
  useEffect(() => {
    const gameLoop = () => {
      // 更新游戏时间
      setGameTime(prevTime => prevTime + 0.016); // 约60fps

      // 更新小喜鹊位置 - 跟随鼠标移动
      setMagpieX(prevX => {
        const targetX = mouseX;
        const diff = targetX - prevX;
        const speed = 0.1; // 跟随速度，值越大跟随越快
        const newX = prevX + diff * speed;
        
        // 确保不超出边界
        return Math.max(25, Math.min(window.innerWidth - 75, newX));
      });

      setMagpieY(prevY => {
        let targetY = mouseY;
        
        // 如果按住空格或鼠标，小喜鹊向上飞
        if (keysRef.current.space || keysRef.current.mouse) {
          targetY = mouseY - 50; // 向上偏移
        }
        
        const diff = targetY - prevY;
        const speed = 0.08; // 跟随速度
        const newY = prevY + diff * speed;
        
        // 边界限制
        return Math.max(25, Math.min(window.innerHeight - 75, newY));
      });

      // 更新星星位置（飘动效果）
      setStars(prevStars => 
        prevStars.map(star => {
          if (star.collected) return star;
          
          star.floatOffset += star.floatSpeed;
          return {
            ...star,
            y: star.y + Math.sin(star.floatOffset) * 0.5
          };
        })
      );

      // 检测碰撞
      setStars(prevStars => {
        let newCollectedCount = 0;
        const updatedStars = prevStars.map(star => {
          if (star.collected) return star;
          
          const distance = Math.sqrt(
            Math.pow(star.x - magpieX, 2) + 
            Math.pow(star.y - magpieY, 2)
          );
          
          if (distance < 35) {
            newCollectedCount++;
            
            return { ...star, collected: true };
          }
          
          return star;
        });
        
        // 批量更新收集的星星数量和鹊桥片段
        if (newCollectedCount > 0) {
          // 显示随机诗词
          const randomPoem = qixiPoems[Math.floor(Math.random() * qixiPoems.length)];
          setCurrentPoem(randomPoem);
          setShowPoem(true);
          
          // 3秒后隐藏诗词
          setTimeout(() => {
            setShowPoem(false);
          }, 3000);
          
          setCollectedStars(prev => {
            const newCount = prev + newCollectedCount;
            
            // 添加鹊桥片段 - 跟随小喜鹊的轨迹
            setBridgeSegments(prevSegments => {
              const newSegments = [];
              for (let i = 0; i < newCollectedCount; i++) {
                const segmentIndex = prevSegments.length + i;
                newSegments.push({
                  id: Date.now() + Math.random() + i,
                  x: magpieX - Math.cos(gameTime * 0.008 + segmentIndex * 0.1) * 20,
                  y: magpieY + 15 + Math.sin(segmentIndex * 0.3) * 8,
                  delay: segmentIndex * 0.05,
                  time: gameTime
                });
              }
              return [...prevSegments, ...newSegments];
            });
            
            return newCount;
          });
        }
        
        return updatedStars;
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [magpieX, magpieY, gameTime]);

  // 检查关卡完成 - 基于收集的星星数量
  useEffect(() => {
    if (collectedStars >= currentConfig.starsNeeded) {
      // 立即设置进度为完成状态
      setGameProgress(1);
      
      // 延迟1.5秒后进入下一关，给玩家看到完成效果
      const timer = setTimeout(() => {
        onComplete(collectedStars);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [collectedStars, currentConfig.starsNeeded, onComplete]);

  return (
    <div ref={gameAreaRef} className="absolute inset-0">
      {/* 游戏UI */}
      <div className="game-ui">
        <div className="mb-2">第 {level} 关</div>
        <div className="mb-2">收集星光: {collectedStars}/{currentConfig.starsNeeded}</div>
        <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-star-gold to-magpie-pink transition-all duration-300"
            style={{ width: `${(collectedStars / currentConfig.starsNeeded) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 七夕诗词显示 */}
      {showPoem && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-star-gold/30 shadow-lg">
            <p className="text-white text-lg font-bold text-center animate-pulse">
              {currentPoem}
            </p>
          </div>
        </div>
      )}

      {/* 操作提示 */}
      <div className="instruction">
        <p>移动鼠标控制小喜鹊飞行位置</p>
        <p>按住鼠标左键或空格键让小喜鹊向上飞行 💕</p>
      </div>

      {/* 小喜鹊 */}
      <div 
        className={`magpie ${isFlying ? 'animate-fly' : ''}`}
        style={{ 
          left: `${magpieX}px`, 
          top: `${magpieY}px`,
          transform: isFlying ? 'rotate(-10deg)' : 'rotate(5deg)'
        }}
      >
        {/* 小喜鹊的光晕效果 */}
        <div className="absolute -inset-2 bg-gradient-to-r from-bridge-light to-star-gold rounded-full opacity-30 animate-pulse"></div>
      </div>

      {/* 星星 */}
      {stars.map(star => (
        !star.collected && (
          <div
            key={star.id}
            className="star-item"
            style={{ 
              left: `${star.x}px`, 
              top: `${star.y}px`,
              animationDelay: `${star.id * 0.2}s`
            }}
          ></div>
        )
      ))}

      {/* 鹊桥片段 */}
      {bridgeSegments.map((segment, index) => (
        <div
          key={segment.id}
          className="bridge-segment"
          style={{ 
            left: `${segment.x}px`, 
            top: `${segment.y}px`,
            animationDelay: `${segment.delay}s`
          }}
        ></div>
      ))}

      {/* 进度指示 */}
      {gameProgress > 0.5 && (
        <>
          {/* 织女 - 固定在右侧 */}
          <div 
            className="lovers"
            style={{ 
              right: '100px', 
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: gameProgress
            }}
          >
            {/* 飘带效果 */}
            <div className="absolute -top-5 -right-3 w-20 h-1 bg-gradient-to-r from-magpie-pink to-transparent opacity-60 animate-float"></div>
          </div>
          
          {/* 牛郎 - 固定在左侧 */}
          <div 
            className="lovers male"
            style={{ 
              left: '50px', 
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: gameProgress
            }}
          >
            {/* 扁担效果 */}
            <div className="absolute -top-8 -left-2 w-25 h-1 bg-gradient-to-r from-yellow-600 to-yellow-800 opacity-80"></div>
            <div className="absolute -top-10 -left-1 w-2 h-2 bg-star-gold rounded-full opacity-80"></div>
            <div className="absolute -top-10 right-1 w-2 h-2 bg-star-gold rounded-full opacity-80"></div>
          </div>
        </>
      )}

      {/* 成功提示 */}
      {gameProgress >= 0.8 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-25">
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-star-gold to-magpie-pink animate-pulse mb-4">
            鹊桥已通！
          </div>
          {/* 飘落的心形 */}
          <div className="floating-hearts" style={{ top: '-20px', left: '-10px', animationDelay: '0s' }}></div>
          <div className="floating-hearts" style={{ top: '-15px', right: '-10px', animationDelay: '0.5s' }}></div>
          <div className="floating-hearts" style={{ bottom: '-20px', left: '50%', animationDelay: '1s' }}></div>
        </div>
      )}

      {/* 重新开始按钮 */}
      <button
        onClick={onReset}
        className="absolute top-5 right-5 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 z-20"
      >
        重新开始
      </button>
    </div>
  );
};

export default GameScreen;

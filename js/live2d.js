/**
 * Live2D 看板娘 - 小黑
 * 使用内嵌模型数据（避免 file:// 的 XHR 限制）
 */
(function () {
  var DEBUG = window.__live2d_debug || false;
  function log() {
    if (DEBUG) console.log.apply(console, ['[Live2D]'].concat(Array.prototype.slice.call(arguments)));
  }

  log('live2d.js 已加载，等待依赖就绪...');

  // 等待依赖库就绪
  var checkCount = 0;
  var initCheck = setInterval(function () {
    checkCount++;
    if (checkCount > 100) {
      clearInterval(initCheck);
      console.error('[Live2D] 超时：依赖库未能加载');
      console.error('  CubismCore:', typeof Live2DCubismCore);
      console.error('  PIXI:', typeof PIXI);
      console.error('  PIXI.live2d:', typeof PIXI !== 'undefined' ? typeof PIXI.live2d : 'PIXI undefined');
      console.error('  ModelData:', typeof window.__LIVE2D_MODEL_SETTINGS);
      return;
    }
    if (typeof Live2DCubismCore === 'undefined') return;
    if (typeof PIXI === 'undefined') return;
    if (typeof PIXI.live2d === 'undefined') return;
    if (typeof PIXI.live2d.Live2DModel === 'undefined') return;
    if (typeof window.__LIVE2D_MODEL_SETTINGS === 'undefined') return;

    clearInterval(initCheck);
    log('所有依赖就绪！启动看板娘...');
    start();
  }, 100);

  function start() {
    // ========== 画布 ==========
    var canvas = document.createElement('canvas');
    canvas.id = 'live2d-canvas';
    canvas.style.cssText = 'position:fixed; left:10px; bottom:0; z-index:9998; pointer-events:none;';
    document.body.appendChild(canvas);
    log('画布已创建');

    // ========== 消息气泡 ==========
    var bubble = document.createElement('div');
    bubble.id = 'live2d-bubble';
    bubble.style.cssText =
      'position:fixed; left:80px; bottom:320px; z-index:9998;' +
      'background:rgba(255,255,255,0.92); color:#333; padding:8px 14px;' +
      'border-radius:18px; font-size:14px; max-width:180px;' +
      'box-shadow:0 2px 12px rgba(0,0,0,0.12);' +
      'opacity:0; transition:opacity 0.3s ease;' +
      'pointer-events:none;' +
      'font-family:"Microsoft YaHei","PingFang SC",sans-serif;';
    bubble.textContent = '加载中...';
    document.body.appendChild(bubble);

    function showBubble(msg, duration) {
      duration = duration || 3000;
      bubble.textContent = msg;
      bubble.style.opacity = '1';
      clearTimeout(bubble._timer);
      bubble._timer = setTimeout(function () { bubble.style.opacity = '0'; }, duration);
    }

    // ========== 响应式尺寸 ==========
    function getSize() {
      var w = window.innerWidth;
      if (w < 480) return { w: 220, h: 310 };
      if (w < 768) return { w: 280, h: 410 };
      return { w: 380, h: 530 };
    }
    function getBubblePos() {
      var s = getSize();
      return { left: (s.w * 0.48) + 'px', bottom: (s.h * 0.75) + 'px' };
    }

    var size = getSize();
    var bp = getBubblePos();
    bubble.style.left = bp.left;
    bubble.style.bottom = bp.bottom;

    // ========== PIXI 应用 ==========
    var app;
    try {
      app = new PIXI.Application({
        view: canvas, width: size.w, height: size.h,
        transparent: true, backgroundAlpha: 0,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });
      log('PIXI 初始化成功');
    } catch (e) {
      console.error('[Live2D] PIXI 初始化失败:', e);
      return;
    }

    // ========== 使用内嵌模型数据加载模型 ==========
    // window.__LIVE2D_MODEL_SETTINGS 在 live2d-data.js 中定义
    // 包含了 Moc/Physics 的 data URL，Texture 用文件路径（Image 加载不受 file:// 限制）
    var settings = window.__LIVE2D_MODEL_SETTINGS;
    // pixi-live2d-display 要求 settings 必须有 url 字段（用于解析相对路径）
    settings.url = 'live2d/model0.json';
    // 替换贴图路径为 data URL（Chrome 阻止 file:// 图片用于 WebGL）
    if (window.__LIVE2D_TEXTURE_DATAURL) {
      settings.FileReferences.Textures = [window.__LIVE2D_TEXTURE_DATAURL];
    }
    log('使用内嵌模型数据，Moc:', settings.FileReferences.Moc.substring(0, 50) + '...');

    var model = null;
    var modelScale = 0.35;

    PIXI.live2d.Live2DModel.from(settings, {
      autoUpdate: true,
      autoHitTest: true,
      motionPreloadStrategy: 'ALL',
    })
      .then(function (loadedModel) {
        log('模型加载成功！');
        model = loadedModel;
        app.stage.addChild(model);

        var w = model.width || 300;
        var h = model.height || 400;
        modelScale = Math.min(
          (size.w * 0.85) / (w || 1),
          (size.h * 0.80) / (h || 1),
          1.0
        );
        if (modelScale <= 0.05) modelScale = 0.3;
        log('缩放比例:', modelScale);

        model.scale.set(modelScale);
        model.x = size.w / 2;
        model.y = size.h;  // 贴底：模型中心在画布底部，让脚刚好贴边
        try { model.anchor.set(0.5, 1); } catch (e) {}

        model.interactive = true;

        // 点击交互
        model.on('hit', function (hitAreas) {
          if (!hitAreas || hitAreas.length === 0) {
            showBubble('嗯？');
            return;
          }
          var area = hitAreas[0];
          if (area === 'Head') showBubble('不要摸头啦~');
          else if (area === 'Body') showBubble('嘻嘻~');
          else showBubble('你好呀~');
        });

        setTimeout(function () {
          showBubble('你好呀~ 欢迎来到我的博客！', 4000);
        }, 600);

        console.log('✓ [Live2D] 小黑加载成功！');
      })
      .catch(function (err) {
        console.error('[Live2D] 模型加载失败:', err);
        canvas.style.display = 'none';
        bubble.style.display = 'none';
      });

    // ========== 鼠标追踪 ==========
    var targetMX = 0, targetMY = 0, curMX = 0, curMY = 0;
    document.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      targetMX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetMX = Math.max(-1, Math.min(1, targetMX));
      targetMY = Math.max(-1, Math.min(1, targetMY));
    });
    document.addEventListener('touchmove', function (e) {
      if (!e.touches || e.touches.length === 0) return;
      var rect = canvas.getBoundingClientRect();
      targetMX = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      targetMY = ((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1;
      targetMX = Math.max(-1, Math.min(1, targetMX));
      targetMY = Math.max(-1, Math.min(1, targetMY));
    });

    // ========== 主循环 ==========
    app.ticker.add(function () {
      if (!model) return;
      curMX += (targetMX - curMX) * 0.08;
      curMY += (targetMY - curMY) * 0.08;
      try {
        var core = model.internalModel.coreModel;
        core.setParameterValueById('ParamAngleX', curMX * 30);
        core.setParameterValueById('ParamAngleY', curMY * 18);
        core.setParameterValueById('ParamBodyAngleX', curMX * 8);
        core.setParameterValueById('ParamBodyAngleY', curMY * 4);
        core.setParameterValueById('ParamEyeBallX', curMX);
        core.setParameterValueById('ParamEyeBallY', curMY);
      } catch (e) {}
    });

    // ========== 窗口大小调整 ==========
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var ns = getSize();
        if (ns.w !== size.w || ns.h !== size.h) {
          size = ns;
          app.renderer.resize(size.w, size.h);
          if (model && modelScale > 0) {
            model.scale.set(modelScale);
            model.x = size.w / 2;
            model.y = size.h;
          }
          var bp2 = getBubblePos();
          bubble.style.left = bp2.left;
          bubble.style.bottom = bp2.bottom;
        }
      }, 300);
    });

    // ========== 画布点击 ==========
    canvas.style.pointerEvents = 'auto';
    canvas.addEventListener('click', function () {
      if (!model) return;
      model.emit('hit', ['Body']);
    });
  }
})();

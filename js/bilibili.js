// ============================================================
// Bilibili API 封装 — WBI 签名 + JSONP 请求
// 用于在浏览器端自动拉取最新视频数据
// ============================================================

// ---- MD5 (RFC 1321) 纯 JS 实现 ----
var MD5 = (function() {
  function r(n,t){return(n<<t)|(n>>>(32-t))}
  function c(n,t){var e,a,o,i,u;return o=2147483648&n,i=2147483648&t,e=1073741824&n,a=1073741824&t,u=(1073741823&n)+(1073741823&t),e&a?2147483648^u^o^i:e|a?1073741824&u?3221225472^u^o^i:1073741824^u^o^i:u^o^i}
  function f(n,t,e){return n&t|~n&e}
  function g(n,t,e){return n&e|t&~e}
  function h(n,t,e){return n^t^e}
  function m(n,t,e){return t^(n|~e)}
  function p(n,t,e,a,o,i,u){return n=c(n,c(c(f(t,e,a),o),u)),c(r(n,i),t)}
  function d(n,t,e,a,o,i,u){return n=c(n,c(c(g(t,e,a),o),u)),c(r(n,i),t)}
  function l(n,t,e,a,o,i,u){return n=c(n,c(c(h(t,e,a),o),u)),c(r(n,i),t)}
  function v(n,t,e,a,o,i,u){return n=c(n,c(c(m(t,e,a),o),u)),c(r(n,i),t)}
  function b(n){for(var t,e=n.length,a=e+8,o=(a-a%64)/64,i=16*(o+1),u=new Array(i-1),c=0,f=0;f<e;)t=(f-f%4)/4,c=f%4*8,u[t]=u[t]|n.charCodeAt(f)<<c,f++;return t=(f-f%4)/4,c=f%4*8,u[t]=u[t]|128<<c,u[i-2]=e<<3,u[i-1]=e>>>29,u}
  function s(n){var t,e="",a="";for(t=0;t<=3;t++)e+=(a="0"+(n>>>8*t&255).toString(16)).substr(a.length-2,2);return e}
  function MD5(n){var t,e,a,o,i,u,C,A,S,x=[];for(n=function(n){n=n.replace(/\r\n/g,"\n");for(var t="",e=0;e<n.length;e++){var a=n.charCodeAt(e);a<128?t+=String.fromCharCode(a):a>127&&a<2048?(t+=String.fromCharCode(a>>6|192),t+=String.fromCharCode(63&a|128)):(t+=String.fromCharCode(a>>12|224),t+=String.fromCharCode(a>>6&63|128),t+=String.fromCharCode(63&a|128))}return t}(n),x=b(n),C=1732584193,A=4023233417,S=2562383102,t=271733878,i=0;i<x.length;i+=16)e=C,a=A,o=S,u=t,C=p(C,A,S,t,x[i+0],7,3614090360),t=p(t,C,A,S,x[i+1],12,3905402710),S=p(S,t,C,A,x[i+2],17,606105819),A=p(A,S,t,C,x[i+3],22,3250441966),C=p(C,A,S,t,x[i+4],7,4118548399),t=p(t,C,A,S,x[i+5],12,1200080426),S=p(S,t,C,A,x[i+6],17,2821735955),A=p(A,S,t,C,x[i+7],22,4249261313),C=p(C,A,S,t,x[i+8],7,1770035416),t=p(t,C,A,S,x[i+9],12,2336552879),S=p(S,t,C,A,x[i+10],17,4294925233),A=p(A,S,t,C,x[i+11],22,2304563134),C=p(C,A,S,t,x[i+12],7,1804603682),t=p(t,C,A,S,x[i+13],12,4254626195),S=p(S,t,C,A,x[i+14],17,2792965006),A=p(A,S,t,C,x[i+15],22,1236535329),C=d(C,A,S,t,x[i+1],5,4129170786),t=d(t,C,A,S,x[i+6],9,3225465664),S=d(S,t,C,A,x[i+11],14,643717713),A=d(A,S,t,C,x[i+0],20,3921069994),C=d(C,A,S,t,x[i+5],5,3593408605),t=d(t,C,A,S,x[i+10],9,38016083),S=d(S,t,C,A,x[i+15],14,3634488961),A=d(A,S,t,C,x[i+4],20,3889429448),C=d(C,A,S,t,x[i+9],5,568446438),t=d(t,C,A,S,x[i+14],9,3275163606),S=d(S,t,C,A,x[i+3],14,4107603335),A=d(A,S,t,C,x[i+8],20,1163531501),C=d(C,A,S,t,x[i+13],5,2850285829),t=d(t,C,A,S,x[i+2],9,4243563512),S=d(S,t,C,A,x[i+7],14,1735328473),A=d(A,S,t,C,x[i+12],20,2368359562),C=l(C,A,S,t,x[i+5],4,4294588738),t=l(t,C,A,S,x[i+8],11,2272392833),S=l(S,t,C,A,x[i+11],16,1839030562),A=l(A,S,t,C,x[i+14],23,4259657740),C=l(C,A,S,t,x[i+1],4,2763975236),t=l(t,C,A,S,x[i+4],11,1272893353),S=l(S,t,C,A,x[i+7],16,4139469664),A=l(A,S,t,C,x[i+10],23,3200236656),C=l(C,A,S,t,x[i+13],4,681279174),t=l(t,C,A,S,x[i+0],11,3936430074),S=l(S,t,C,A,x[i+3],16,3572445317),A=l(A,S,t,C,x[i+6],23,76029189),C=l(C,A,S,t,x[i+9],4,3654602809),t=l(t,C,A,S,x[i+12],11,3873151461),S=l(S,t,C,A,x[i+15],16,530742520),A=l(A,S,t,C,x[i+2],23,3299628645),C=v(C,A,S,t,x[i+0],6,4096336452),t=v(t,C,A,S,x[i+7],10,1126891415),S=v(S,t,C,A,x[i+14],15,2878612391),A=v(A,S,t,C,x[i+5],21,4237533241),C=v(C,A,S,t,x[i+12],6,1700485571),t=v(t,C,A,S,x[i+3],10,2399980690),S=v(S,t,C,A,x[i+10],15,4293915773),A=v(A,S,t,C,x[i+1],21,2240044497),C=v(C,A,S,t,x[i+8],6,1873313359),t=v(t,C,A,S,x[i+15],10,4264355552),S=v(S,t,C,A,x[i+6],15,2734768916),A=v(A,S,t,C,x[i+13],21,1309151649),C=v(C,A,S,t,x[i+2],6,4149444226),t=v(t,C,A,S,x[i+9],10,3174756917),S=v(S,t,C,A,x[i+0],15,718787259),A=v(A,S,t,C,x[i+7],21,3951481745),C=c(C,e),A=c(A,a),S=c(S,o),t=c(t,u);return(s(C)+s(A)+s(S)+s(t)).toLowerCase()}
  return MD5;
})();

// ---- WBI 签名 ----
var mixinKeyEncTab = [46,47,18,2,53,8,23,32,15,50,10,31,58,3,45,35,27,43,5,49,33,9,42,19,29,28,14,39,12,38,41,13,37,48,7,16,24,55,40,61,26,17,0,1,60,51,30,4,22,25,54,21,56,59,6,63,57,62,11,36,20,52,44,34];

function getMixinKey(orig) {
  var temp = '';
  mixinKeyEncTab.forEach(function(n) { temp += orig[n]; });
  return temp.slice(0, 32);
}

function encWbi(params, img_key, sub_key) {
  var mixin_key = getMixinKey(img_key + sub_key);
  params.wts = Math.floor(Date.now() / 1000);
  var keys = Object.keys(params).sort();
  var query = keys.map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }).join('&');
  params.w_rid = MD5(query + mixin_key);
  return params;
}

// ---- JSONP 辅助 ----
function jsonp(url, callbackName, timeout) {
  return new Promise(function(resolve) {
    var script = document.createElement('script');
    var called = false;

    window[callbackName] = function(data) {
      if (called) return;
      called = true;
      delete window[callbackName];
      script.remove();
      resolve(data);
    };

    setTimeout(function() {
      if (!called) {
        called = true;
        delete window[callbackName];
        script.remove();
        resolve(null);
      }
    }, timeout || 5000);

    script.src = url;
    document.head.appendChild(script);
  });
}

// ---- 从 B站 获取视频列表 ----
async function fetchBilibiliVideos(uid) {
  try {
    // 第一步：获取 WBI 密钥
    var navData = await jsonp(
      'https://api.bilibili.com/x/web-interface/nav?callback=_nav_cb',
      '_nav_cb',
      4000
    );

    if (!navData || navData.code !== 0) {
      console.log('[B站] 获取 WBI 密钥失败，使用静态数据');
      return null;
    }

    var img_key = navData.data.wbi_img.img_url.split('/').pop().split('.')[0];
    var sub_key = navData.data.wbi_img.sub_url.split('/').pop().split('.')[0];

    // 第二步：用 WBI 签名请求视频列表
    var params = encWbi({ mid: uid, ps: '30', order: 'pubdate' }, img_key, sub_key);
    var queryStr = Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');

    var cbName = '_bili_cb_' + Date.now();
    var searchData = await jsonp(
      'https://api.bilibili.com/x/space/wbi/arc/search?' + queryStr + '&callback=' + cbName,
      cbName,
      8000
    );

    if (!searchData || searchData.code !== 0) {
      console.log('[B站] 视频列表请求失败，使用静态数据');
      return null;
    }

    var vlist = searchData.data.list.vlist;
    if (!vlist || vlist.length === 0) {
      console.log('[B站] 没有获取到视频，使用静态数据');
      return null;
    }

    console.log('[B站] 成功获取 ' + vlist.length + ' 个视频');

    return vlist.map(function(v) {
      return {
        title: v.title,
        bvid: v.bvid,
        cover: (v.pic || '').replace(/^http:/, 'https:'),
        desc: (v.description || '').length > 100
          ? v.description.slice(0, 100) + '...'
          : v.description || ''
      };
    });
  } catch (e) {
    console.log('[B站] 请求异常，使用静态数据:', e.message);
    return null;
  }
}

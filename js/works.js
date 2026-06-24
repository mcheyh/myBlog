// ============================================================
// 作品展示数据 — B站视频列表
//
// 🔄 在线模式：页面打开时自动通过 B站 API 获取最新视频和封面
// ✏️  静态数据：离线时的兜底数据（封面图已通过 API 预获取）
//
// 发了新视频后，按格式添加到数组即可
// ============================================================

const BILI_UID = "285015360";

const works = [
  {
    title: "薯薯第一次用10A捞这么多人，薯薯好开心",
    bvid: "BV1HHpDzDEzt",
    cover: "https://i0.hdslb.com/bfs/archive/3b7351c0ae68a1ee279771951c5472aa5dae0583.jpg",
    desc: ""
  },
  {
    title: "0x11 动态规划之线性DP 4道经典例题教你如何分析解决！",
    bvid: "BV1vy421874o",
    cover: "https://i0.hdslb.com/bfs/archive/fb4ace46504f636f4bd9fbc161078f967ff9b70b.jpg",
    desc: ""
  },
  {
    title: "0x10「更高级的递推」轻松入门「DP大炮」动态规划！",
    bvid: "BV1Qp421o7eU",
    cover: "https://i2.hdslb.com/bfs/archive/9f0afdbc0e729ea1aa6bb1f795f556faa16cdfa5.jpg",
    desc: ""
  },
  {
    title: "【CSGO】2vs4 两人完美合作的残局",
    bvid: "BV1Za4y1g7eE",
    cover: "https://i2.hdslb.com/bfs/archive/6685150b1d46fd867a2ee99c972bdf79f3a03a2a.jpg",
    desc: ""
  },
  {
    title: "〔坎巴拉贺岁片〕Jeb&Val 终会与你同行🎵 坎巴拉之过年",
    bvid: "BV12T411Z7VP",
    cover: "https://i0.hdslb.com/bfs/archive/6fe3fc519f9d22861b4283d48a31ff3fab9424fa.jpg",
    desc: ""
  },
  {
    title: "KSP Duna 仿Apollo式 生涯载人科研往返",
    bvid: "BV1U24y1C7ab",
    cover: "https://i2.hdslb.com/bfs/archive/4348200f10e32db47299e6ac91177460c0adfd96.jpg",
    desc: ""
  },
  {
    title: "KSP MINMUS 生涯载人科研往返",
    bvid: "BV1ov4y1D7Tz",
    cover: "https://i2.hdslb.com/bfs/archive/1a9ee2cae1d039fb1064f2c9d8fbb6ddf8495fbe.jpg",
    desc: ""
  }
];

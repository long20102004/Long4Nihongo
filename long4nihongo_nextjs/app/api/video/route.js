// // filepath: /c:/Code/ProjectForIntern/Long4Nihongo-github/long4nihongo_nextjs/app/api/video/route.js
// import { createProxyMiddleware } from "http-proxy-middleware";
// import { NextResponse } from "next/server";

// const proxy = createProxyMiddleware({
//   target: "https://cdn.course-content.video.long4nihongo.online/",
//   changeOrigin: true,
//   pathRewrite: {
//     "^/api/video": "", // remove /api/video from the path
//   },
//   onProxyReq: (proxyReq, req, res) => {
//     console.log(`Proxying request to: ${proxyReq.path}`);
//   },
// });

// export async function GET(req) {
//   return new Promise((resolve, reject) => {
//     proxy(req, {
//       end: (result) => {
//         if (result instanceof Error) {
//           reject(result);
//         } else {
//           resolve(NextResponse.json(result));
//         }
//       },
//     });
//   });
// }


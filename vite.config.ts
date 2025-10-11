import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import postCssPxToRem from "postcss-pxtorem";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 16,
          unitPrecision: 5, // 转换后的rem值保留的小数位数
          propList: ["*", "!border"], // 需要转换的属性，*表示所有属性，除 border 外所有px 转 rem
          selectorBlackList: ["ignore"], // 不进行转换的选择器
          replace: true, // 是否直接替换px为rem，而不是添加备用属性
          mediaQuery: false, // 是否在媒体查询中转换px
          minPixelValue: 0, // 设置要替换的最小像素值
          // exclude: /node_modules/i, // 排除node_modules文件夹下的文件
        }),
      ],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ["doc"], // 防止依赖预构建处理 doc 内容[1](@ref)
  },
  server: {
    watch: {
      ignored: ["**/doc/**"], // 忽略 doc 目录的所有变化[3](@ref)
    },
  },
});

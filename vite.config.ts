import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import Components from "unplugin-vue-components/vite";
// @ts-ignore
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd())
  return {
    plugins: [
      vue(),
      // 按需加载 ant-design-vue
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ].filter(Boolean),
    server: {
      host: '0.0.0.0',
      port: 3001,
      open: false,
      proxy: {
        '/api': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('/api/', '/'),
        },
      },
    },
  };
});
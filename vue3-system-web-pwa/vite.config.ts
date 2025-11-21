import { defineConfig,loadEnv as ttloadEnv } from 'vite'
import { resolve } from 'path';
// import { UserConfig } from 'vite';
import { loadEnv } from './src/utils/viteBuild';
import createVitePlugins from './vite/plugins'
const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir);
};

const { VITE_PORT, VITE_OPEN, VITE_PUBLIC_PATH } = loadEnv();

const alias: Record<string, string> = {
	'/@': pathResolve('./src/'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

export default defineConfig(({mode, command })=>{
   const env = ttloadEnv(mode, process.cwd())
   return {
      plugins: createVitePlugins(env, command === 'build'),
	  root: process.cwd(),
	  resolve: { 
		alias,
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
	 },
	  base: process.env.NODE_ENV === 'production' ? VITE_PUBLIC_PATH : './',
	  optimizeDeps: {
		include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en'],
	 },
	server: {
		port: env.VITE_PORT,
        strictPort: false,  //设为true时端口被占用则直接退出，不会尝试下一个可用端口
        host: "localhost",
        https: false,
        cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
        open: true,//服务启动时自动在浏览器中打开应用
        force: true,//是否强制依赖预构建
        hmr: false,//禁用或配置 HMR 连接
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:9527/',
				ws: true,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '/'),
			},
		},
	},
	//静态资源服务的文件夹
      publicDir: "public",
      //静态资源处理
      assetsInclude: "",
      //控制台输出的级别 info 、warn、error、silent
      logLevel: "info",
      // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
      clearScreen:true,
	build: {
		//浏览器兼容性  "esnext"|"modules"
       target: "modules",
       outDir: 'dist',
		//生成静态资源的存放路径
       assetsDir: "assets",
       minify: 'terser',
		//传递给 Terser 的更多 minify 选项。
       terserOptions: {
       },
	//设置为 false 来禁用将构建后的文件写入磁盘
       write: true,
       //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
       emptyOutDir: true,
       //启用/禁用 brotli 压缩大小报告
       brotliSize: true,
	//启用/禁用 CSS 代码拆分
       cssCodeSplit: true,
       //构建后是否生成 source map 文件
		sourcemap: false,

		chunkSizeWarningLimit: 4096,
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].${new Date().getTime()}.js`,
				chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
				assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
			},
		},
	},
	css: {
		postcss: {
			plugins: [
				{
					postcssPlugin: 'internal:charset-removal',
					AtRule: {
						charset: (atRule) => {
							if (atRule.name === 'charset') {
								atRule.remove();
							}
						},
					},
				},
			],
		},
	},
	define: {
		__VUE_I18N_LEGACY_API__: JSON.stringify(false),
		__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
		__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
	},
   }
})

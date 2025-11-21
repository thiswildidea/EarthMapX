import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
// 使用命名导入，因为旧版本使用CommonJS导出
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [
      vue(),    
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/@arcgis/core/assets/**/*',
            dest: 'esri'
          }
        ]
      })
    ]
    vitePlugins.push(
    VitePWA({
      manifest: {
        id: "/",
        scope: "/",
        name: 'EarthMapX',
        start_url: "./",
        short_name: 'EarthMapX',
        theme_color: '#ffffff',
        description: 'EsriMap Gallery',
        orientation: "any",
        "background_color": "#E1477E",
        "related_applications": [],
        "prefer_related_applications": false,
        "display_override": ["window-controls-overlay"],
        "launch_handler": {
        "client_mode": "focus-existing"
        },
        icons: [
            {
              src: "icons/menu/512x512.png",
              sizes: "512x512",
              type: "image/png"
            },
            {
              src: "icons/menu/192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "icons/menu//48x48.png",
              sizes: "48x48",
              type: "image/png"
            },
            {
              src: "icons/menu/24x24.png",
              sizes: "24x24",
              type: "image/png"
            }
        ],
        screenshots: [
        {
          src: "icons/screenshots/screen.png",
          sizes: "1617x1012",
          type: "image/png"
        }
       ],
       features: [
        "Cross Platform",
        "fast",
        "simple"
      ],
       categories: [
         "social"
       ]
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [{	
          handler: 'CacheFirst',
          urlPattern: /^https:\/\/jsonplaceholder/,
          method: 'GET',
          options: {
            cacheName: 'test-external-api',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      },
      devOptions: {
        enabled: true
      }
    })
    )
    // vitePlugins.push(createAutoImport())
	  // vitePlugins.push(createSetupExtend())
    // vitePlugins.push(createSvgIcon(isBuild))
	  isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}

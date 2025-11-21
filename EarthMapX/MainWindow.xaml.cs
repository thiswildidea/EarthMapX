using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Navigation;
using Microsoft.Web.WebView2.Core;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace EarthMapX
{
    /// <summary>
    /// An empty window that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            InitializeWebView2Async();
        }
        private async void InitializeWebView2Async()
        {
            var env = await CoreWebView2Environment.CreateAsync();
            await WebView2Control.EnsureCoreWebView2Async(env);
            WebView2Control.CoreWebView2.PermissionRequested += CoreWebView2_PermissionRequested;

            string appFolderPath = Windows.ApplicationModel.Package.Current.InstalledLocation.Path;
            string deployFolderPath = Path.Combine(appFolderPath, "deploy");

            if (!Directory.Exists(deployFolderPath))
            {
                Debug.WriteLine($"虚拟主机映射目录不存在: {deployFolderPath}");
                return;
            }
            WebView2Control.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "localweb.local",
                deployFolderPath,
                CoreWebView2HostResourceAccessKind.Allow);

            WebView2Control.Source = new Uri("https://localweb.local/index.html");
        }
        private void CoreWebView2_PermissionRequested(object sender, CoreWebView2PermissionRequestedEventArgs e)
        {
            if (e.PermissionKind == CoreWebView2PermissionKind.Geolocation)
            {
                e.State = CoreWebView2PermissionState.Allow;
                e.Handled = true;
            }
        }
    }
}

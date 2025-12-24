/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracing: false, // 🔥 fixes EPERM on Windows + OneDrive
  optimizeFonts: false,
  env: {
    emailjsPublicKey: 'JqXosOh_cPbQzyU-f',
    emailjsServiceId: 'service_kifd2sn',
    emailjsTemplateId: 'template_7dt6fo7',
  },
};

module.exports = nextConfig;

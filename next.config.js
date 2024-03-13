/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ["pvamqafnjkxygruqsnax.supabase.co"], // Adicione aqui os domínios de onde você está carregando imagens
    // remotePatterns opcional para especificações mais detalhadas
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pvamqafnjkxygruqsnax.supabase.co",
        // você pode especificar uma porta e um padrão de caminho, se necessário
        // port: '',
        // pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Ative ou desative o modo React Strict (opcional)
  reactStrictMode: true,
  // Outras configurações específicas do seu projeto Next.js podem ser adicionadas aqui
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource",
    });

    return config;
  },
};

module.exports = nextConfig;

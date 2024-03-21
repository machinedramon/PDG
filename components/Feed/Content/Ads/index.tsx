// "use client";

// import React, { useState, useEffect } from "react";

// const BannerComponent = () => {
//   const [bannerContent, setBannerContent] = useState("");

//   useEffect(() => {
//     const eventSource = new EventSource(
//       "http://offers.propellerads.com/api/v1/ads_open_rtb/7217105/?auth=427f3633cb37b4ddb9238918385fb4a014e0eb81"
//     );

//     eventSource.onmessage = (event) => {
//       // Tratar a mensagem recebida, assumindo que é um texto simples
//       setBannerContent(event.data);
//       console.log(event);
//     };

//     eventSource.onerror = (error) => {
//       console.error("Erro na conexão com a fonte de eventos:", error);
//     };

//     return () => {
//       // Encerrar a conexão quando o componente for desmontado
//       eventSource.close();
//     };
//   }, []);

//   return (
//     <div>
//       {bannerContent ? (
//         // Renderiza o conteúdo do banner se estiver disponível
//         <div dangerouslySetInnerHTML={{ __html: bannerContent }} />
//       ) : (
//         // Exibe uma mensagem de carregamento enquanto o conteúdo do banner está sendo buscado
//         <p>Carregando banner...</p>
//       )}
//     </div>
//   );
// };

// export default BannerComponent;

import React, { useEffect } from "react";

// Declaração de Augmentação Global
declare global {
  interface Window {
    _vawqicun: () => void;
    _grepqmu: () => void;
  }
}

const CustomScriptInjector = () => {
  useEffect(() => {
    // Declara scriptElement2 no escopo superior para garantir acessibilidade
    let scriptElement2: HTMLScriptElement | null = null;

    // Definições temporárias das funções para evitar erros de compilação
    window._vawqicun =
      window._vawqicun || (() => console.log("_vawqicun executada"));
    window._grepqmu =
      window._grepqmu || (() => console.log("_grepqmu executada"));

    const scriptElement1 = document.createElement("script");
    scriptElement1.src = "monetagscript.js"; // Ajuste para a URL do seu script
    scriptElement1.async = true;
    scriptElement1.setAttribute("data-cfasync", "false");
    scriptElement1.onload = () => {
      scriptElement2 = document.createElement("script");
      scriptElement2.src = "//phicmune.net/ntfc.php?p=7216313";
      scriptElement2.async = true;
      scriptElement2.setAttribute("data-cfasync", "false");
      scriptElement2.onerror = () => window._vawqicun();
      scriptElement2.onload = () => window._grepqmu();

      document.body.appendChild(scriptElement2);
    };

    document.body.appendChild(scriptElement1);

    return () => {
      document.body.removeChild(scriptElement1);
      if (scriptElement2 && document.body.contains(scriptElement2)) {
        document.body.removeChild(scriptElement2);
      }
    };
  }, []);

  return null;
};

export default CustomScriptInjector;

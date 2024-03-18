import React from "react";
import styles from "./styles.module.css";

type DotSliderProps = {
  count: number;
};

const Dots: React.FC<DotSliderProps> = ({ count }) => {
  const maxWidth = 100; // Largura máxima em pixels
  let dotSize = 20; // Tamanho inicial dos dots
  const spaceBetween = 2; // Espaçamento mínimo entre dots

  // Ajuste dinâmico do tamanho dos dots com base no count
  // Isso é apenas um exemplo. Você pode querer ajustar a lógica para se adequar ao seu design
  const totalSpacing = spaceBetween * (count - 1);
  const totalSize = maxWidth - totalSpacing;
  const maxDotSize = totalSize / count;

  if (maxDotSize < dotSize) {
    dotSize = maxDotSize;
  }

  // Criar um array de elementos 'dot'
  const dots = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`${styles.dot} transition-all duration-300 ease-out`}
      style={{
        width: `${dotSize}px`,
        height: `100%`,
        margin: `0 ${spaceBetween / 2}px`,
      }}
    />
  ));

  return (
    <div
      className={`${styles.dotSlider} h-4 transition-all duration-300 ease-out mx-8`}
    >
      {dots}
    </div>
  );
};

export default Dots;

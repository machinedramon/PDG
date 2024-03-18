import React from "react";

type DotSliderProps = {
  count: number;
};

const Dots: React.FC<DotSliderProps> = ({ count }) => {
  const maxWidth = 100; // A largura máxima é definida como 100% para ocupar todo o espaço disponível do container
  const spaceBetween = 2; // Espaçamento entre as divisões em pixels

  // Calcula a largura de cada divisão considerando o espaçamento entre elas
  const divisionWidth =
    count > 1
      ? `calc(${maxWidth / count}% - ${spaceBetween}px)`
      : `${maxWidth}%`;

  // Cria um array de divisões. Cada divisão representa um "story" postado.
  const divisions = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className="h-full bg-white" // Usando Tailwind para altura total e cor de fundo
      style={{
        width: divisionWidth,
        marginRight: `${index < count - 1 ? spaceBetween : 0}px`, // Adiciona espaço entre as divisões, exceto após a última
      }}
    />
  ));

  return (
    <div
      className="absolute bottom-0 flex h-1 mx-8 overflow-hidden opacity-25" // Flex container com Tailwind para alinhamento e margem
      style={{
        backgroundColor: "green", // Cor de fundo do container
        width: `${maxWidth}%`, // Ocupa a largura máxima disponível
      }}
    >
      {divisions}
    </div>
  );
};

export default Dots;

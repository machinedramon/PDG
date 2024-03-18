import React, { useState } from "react";

// Opções de gênero
const options = ["Masculino", "Feminino", "Outro"];

// Componente de botão de opção
const OptionButton: React.FC<{
    option: string;
    selected: boolean;
    onClick: () => void;
}> = ({ option, selected, onClick }) => {
    return (
        <button
            className={`${selected
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } py-2 px-4 rounded-md mr-2 mb-2`}
            onClick={onClick}
        >
            {option}
        </button>
    );
};

// Componente principal
const GenderSelector: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    // Função para selecionar uma opção
    const selectOption = (option: string) => {
        setSelectedOption(option === selectedOption ? null : option);
    };

    // Função para gerar os botões de opção
    const renderOptionButtons = () => {
        return options.map((option) => (
            <OptionButton
                key={option}
                option={option}
                selected={option === selectedOption}
                onClick={() => selectOption(option)}
            />
        ));
    };

    return (
        <div className="flex flex-wrap">
            <h2 className="text-lg font-semibold mb-4">Selecione o gênero:</h2>
            {renderOptionButtons()}
            <div>
                <p className="mt-4">
                    Gênero selecionado: {selectedOption || "Nenhum selecionado"}
                </p>
            </div>
        </div>
    );
};

export default GenderSelector;

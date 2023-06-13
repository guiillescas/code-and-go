import React, { useState } from "react";

const useKeyPress = function (targetKey: string) {
  const [keyPressed, setKeyPressed] = useState(false);

  // TODO - Adicionar tipagem correta
  function downHandler({ key }: any) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // TODO - Adicionar tipagem correta
  const upHandler = ({ key }: any) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", downHandler);
    document.addEventListener("keyup", upHandler);

    return () => {
      document.removeEventListener("keydown", downHandler);
      document.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

export default useKeyPress;

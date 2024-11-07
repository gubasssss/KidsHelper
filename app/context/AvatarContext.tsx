// AvatarContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type AvatarContextType = {
  selectedAvatar: any;
  setSelectedAvatar: (avatar: any) => void;
  userNameColor: string;
  setUserNameColor: (color: string) => void;
 // Adiciona o estado cromático
};

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
  const [userNameColor, setUserNameColor] = useState<string>('#333');

  return (
    <AvatarContext.Provider
      value={{
        selectedAvatar,
        setSelectedAvatar,
        userNameColor,
        setUserNameColor,
 // Passando o estado e a função para alterar o cromático
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
};

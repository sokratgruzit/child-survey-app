import React, { createContext, useContext, useState } from "react";

type UploadContextType = {
  files: { [key: string]: File | null };
  setFile: (key: string, file: File | null) => void;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [files, setFiles] = useState<{ scene: File | null; animal: File | null; selfie: File | null }>({
    scene: null,
    animal: null,
    selfie: null,
  });

  const setFile = (key: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  return (
    <UploadContext.Provider value={{ files, setFile }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within UploadProvider");
  }
  return context;
};

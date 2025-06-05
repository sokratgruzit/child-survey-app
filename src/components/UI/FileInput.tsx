interface Props {
  onChange: (file: File) => void;
}

function FileInput({ onChange }: Props) {
  return (
    <input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onChange(file);
      }}
    />
  );
}

export default FileInput;

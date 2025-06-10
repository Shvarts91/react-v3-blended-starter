import css from "./SearchBox.module.css";

interface SearcBoxProps {
  onChange: (text: string) => void;
  searchQuery: string;
}

export default function SearchBox({ onChange, searchQuery }: SearcBoxProps) {
  return (
    <input
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      value={searchQuery}
      className={css.input}
      type="text"
      placeholder="Search posts"
    />
  );
}

import React from "react";

interface ContractAccessNoteCardProps {
  note: string;
}

export const ContractAccessNoteCard: React.FC<
  ContractAccessNoteCardProps
> = ({ note }) => {
  return (
    <div className="bg-note-green-bg border border-note-green-border rounded-lg p-3.5 sm:p-4 space-y-1 shadow-2xs">
      <h3 className="text-base md:text-lg font-medium text-note-green-border tracking-wider uppercase">
        Access Note
      </h3>
      <p className="text-xs md:text-sm text-note-green-text leading-relaxed">
        {note}
      </p>
    </div>
  );
};

export default ContractAccessNoteCard;

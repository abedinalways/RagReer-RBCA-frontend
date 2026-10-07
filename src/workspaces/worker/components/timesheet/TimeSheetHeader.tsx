interface TimeSheetHeaderProps {
  title?: string;
}

export function TimeSheetHeader({
  title = "Time Sheet per hours",
}: TimeSheetHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-border">
      <h1 className="text-xl font-medium text-txt-primary tracking-tight">
        {title}
      </h1>
    </div>
  );
}

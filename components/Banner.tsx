export const Banner = ({ text }: { text: string }) => {
  return (
    <div className="sticky top-0 z-10 w-full border-b bg-background/95 p-6 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <h1 className="text-center text-xl font-semibold">{text}</h1>
    </div>
  );
};

import Link from "next/link";

const ConditionalRender = ({
  id,
  category,
  children,
  className,
}: {
  id: number;
  category: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      {category === "recipe" ? (
        <Link href={`/recipes/${id}`} className={`cursor-default ${className}`}>
          {children}
        </Link>
      ) : (
        <div className={className}>{children}</div>
      )}
    </>
  );
};

export default ConditionalRender;

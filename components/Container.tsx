import { ChildrenProps } from "@/types/typings";

const Container = ({ children, className }: ChildrenProps) => {
  return (
    <div
      className={`mx-auto w-[90%] md:w-[90%] flex justify-between flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;

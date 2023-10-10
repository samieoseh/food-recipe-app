import { ChildrenProps } from "@/types/typings";

const Container = ({ children, className }: ChildrenProps) => {
  return (
    <div
      className={`mx-auto w-[95%] md:w-[90%] lg:w[396px]  flex justify-between flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;

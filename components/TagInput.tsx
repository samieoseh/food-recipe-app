import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { ControllerRenderProps } from "react-hook-form";

const TagInput = ({
  field,
  tags,
  setTags,
}: {
  field: ControllerRenderProps<
    {
      tag: string;
    },
    "tag"
  >;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <div className="border rounded-md flex p-2 gap-2 items-center flex-wrap">
      {tags.map((tag, id) => (
        <div className="flex items-center" key={id}>
          <div className="border rounded-lg bg-gray-200 flex items-center justify-center space-x-1 p-2">
            <p className="text-xs">{tag}</p>
            <X
              height={15}
              width={15}
              className="cursor-pointer"
              onClick={() => {
                if (tags.some((item) => tag == item)) {
                  const newTags = tags.filter((item) => item != tag);
                  setTags(newTags);
                }
              }}
            />
          </div>
        </div>
      ))}
      <div
        className="flex relative"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          className="w-32 outline-none border focus:outline-none text-xs"
          placeholder="e.g Alcohol"
          {...field}
        />
        <Button className="absolute top-0 right-0 hidden">lol</Button>
      </div>
    </div>
  );
};

export default TagInput;

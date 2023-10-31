"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/constants";

const TodosPage = () => {
  return (
    <div>
      Todos Page
      <Button
        onClick={async () => {
          const { data, error } = await supabase.from("todos").select();
          console.log(data);

          if (error) {
            console.log(error);
          }
        }}
      >
        Get Todos
      </Button>
    </div>
  );
};

export default TodosPage;

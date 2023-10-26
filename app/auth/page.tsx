import Container from "@/components/Container";
import dynamic from "next/dynamic";

const HankoAuth = dynamic(() => import("@/components/HankoAuth"), {
  ssr: false,
});

export default function AuthPage() {
  return (
    <Container className="mx-auto w-full mt-48">
      <HankoAuth />
    </Container>
  );
}

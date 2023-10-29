import Container from "@/components/Container";
import dynamic from "next/dynamic";

const HankoProfile = dynamic(() => import("@/components/HankoProfile"), {
  ssr: false,
});

export default function ProfilePage() {
  return (
    <Container>
      <HankoProfile />
    </Container>
  );
}

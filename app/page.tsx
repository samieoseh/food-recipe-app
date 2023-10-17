import Container from "@/components/Container";
import LandingNavbar from "@/components/LandingNavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <section className="bg-[#f9ebe9] pb-48">
        <header>
          <LandingNavbar />
        </header>
        <Container className="mt-16 relative">
          <div className="flex xl:mr-36 space-x-4">
            <div className="flex mt-24 flex-col space-y-4  w-full">
              <h1 className="font-bold text-3xl xl:text-4xl">
                Culinary <span className="text-primary">Creations</span> for
                Every Palate
              </h1>
              <p className="text-sm lg:w-[60%]">
                Explore Our World of Flavor and Learn to Cook Like a Pro with
                Our Recipes!
              </p>
              <Button size="sm" className="w-48">
                Get Started
              </Button>
            </div>
            <Image
              src="/hero.png"
              height={400}
              width={400}
              alt="hero.png"
              className="hidden md:block"
            />
          </div>
          <Image
            src="/strawberry.png"
            height={40}
            width={40}
            alt="strawberry.png"
            className="absolute  top-[10%] xl:top-0 left-[10%] xl:left-[40%] -rotate-45 transform"
          />
          <div className="h-[100px] w-[100px] xl:h-[200px] xl:w-[200px] absolute top-4 xl:top-0 right-0 ">
            <Image
              src="/burger.png"
              layout="fill"
              objectFit="contain"
              alt="strawberry.png"
              className="transform rotate-[45deg]"
            />
          </div>
          <Image
            src="/pizza.png"
            height={40}
            width={40}
            alt="pizza.png"
            className="absolute -bottom-16 md:bottom-0 xl:bottom-[20%] left-[20%]"
          />
          <Image
            src="/search.png"
            height={250}
            width={250}
            alt="pizza.png"
            className="hidden lg:block absolute top-[55%] right-[35%]"
          />
        </Container>
      </section>
    </>
  );
}

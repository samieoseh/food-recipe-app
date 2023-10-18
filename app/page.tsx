import Container from "@/components/Container";
import LandingNavbar from "@/components/LandingNavBar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <section className="bg-[#f9ebe9] pb-24 md:pb-0">
        <header>
          <LandingNavbar />
        </header>
        <Container className="mt-16 relative">
          <div className="flex md:mr-12 lg:mr-24 xl:mr-36 space-x-4">
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
            <div className="relative h-[400px] w-[400px] hidden md:block">
              <Image
                src="/hero.png"
                layout="fill"
                objectFit="contain"
                alt="hero.png"
              />
            </div>
          </div>
          <Image
            src="/strawberry.png"
            height={40}
            width={40}
            alt="strawberry.png"
            className="absolute  top-0 xl:top-0 left-10 xl:left-10 -rotate-45 transform"
          />
          <div className="h-[100px] w-[100px] md:h-[120px] md:w-[120px] xl:h-[200px] xl:w-[200px] absolute top-2 md:top-0 xl:top-0 right-0 ">
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
            className="absolute -bottom-16 md:bottom-12 lg:bottom-24 left-24 md:left-48"
          />
        </Container>
      </section>
      <div className="-mt-[1.5rem] w-96 md:w-[34rem] mx-auto">
        <SearchBar className="shadow-md" />
      </div>
    </>
  );
}

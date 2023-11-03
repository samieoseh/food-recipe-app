import Container from "@/components/Container";
import LandingNavbar from "@/components/LandingNavBar";
import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
              <p className="text-sm lg:w-[60%] leading-5">
                Explore Our World of Flavor and Learn to Cook Like a Pro with
                Our Recipes!
              </p>
              <Link
                className="w-32 text-xs bg-primary text-white text-center py-2 rounded-sm"
                href="/login"
              >
                Get Started
              </Link>
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
      <section className="mt-8">
        <Container className="lg:w-[34rem]">
          <h2 className="text-center pb-4 font-bold text-xl">
            Explore our <span className="text-primary">Amazing</span> Features
          </h2>
          <p className="text-sm text-center text-muted-foreground leading-6 w-[80%] lg:w-full mx-auto">
            Dive into a realm of innovation with our cutting-edge features. From
            intuitive user interfaces to powerful tools, we provide a seamless
            experience.
          </p>
          <div className="mt-8 flex items-center flex-col justify-center space-y-4  mx-auto lg:grid lg:grid-cols-2 w-full lg:space-y-0 gap-4">
            <div className="shadow-md w-[16rem] h-[15rem] p-4 rounded-md flex flex-col justify-between">
              <div>
                <h2 className="mb-4 font-bold">Seemless User Experience</h2>
                <p className="text-sm text-muted-foreground w-[90%] leading-5">
                  Our food recipe app offers seamless user experience,
                  personalized meal suggestions, and an extensive recipe
                  database
                </p>
              </div>
              <Button
                className="w-32 flex items-center justify-center text-xs bg-transparent border border-primary text-primary hover:text-white"
                size="sm"
              >
                Learn More <LucideArrowRight className="ml-2" />
              </Button>
            </div>
            <div className="shadow-md w-[16rem] h-[15rem] p-4 rounded-md flex flex-col justify-between">
              <div>
                <h2 className="mb-4 font-bold">Personalized Meal Suggestion</h2>
                <p className="text-sm text-muted-foreground w-[90%] leading-5">
                  Get tailored meal recommendations based on your preferences,
                  search history and dietary needs
                </p>
              </div>
              <Button
                className="w-32 flex items-center justify-center text-xs bg-transparent border border-primary text-primary hover:text-white"
                size="sm"
              >
                Learn More <LucideArrowRight className="ml-2" />
              </Button>
            </div>
            <div className="shadow-md w-[16rem] h-[15rem] p-4 rounded-md flex flex-col justify-between">
              <div>
                <h2 className="mb-4 font-bold">Meal Planner</h2>
                <p className="text-sm text-muted-foreground w-[90%] leading-5">
                  From healthy recipes to indulgent treats, our curated
                  selection ensures your dining experiences are tailored to your
                  taste
                </p>
              </div>
              <Button
                className="w-32 flex items-center justify-center text-xs bg-transparent border border-primary text-primary hover:text-white"
                size="sm"
              >
                Learn More <LucideArrowRight className="ml-2" />
              </Button>
            </div>
            <div className="shadow-md w-[16rem] h-[15rem] p-4 rounded-md flex flex-col justify-between">
              <div>
                <h2 className="mb-4 font-bold">Vast Database of Recipes</h2>
                <p className="text-sm text-muted-foreground w-[90%] leading-5">
                  Explore a wide range of recipes from various cuisines, all in
                  one place
                </p>
              </div>
              <Button
                className="w-32 flex items-center justify-center text-xs bg-transparent border border-primary text-primary hover:text-white"
                size="sm"
              >
                Learn More <LucideArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
          <Button size="sm" className="mt-8 mx-auto w-48">
            Get Started
          </Button>
        </Container>
      </section>
    </>
  );
}

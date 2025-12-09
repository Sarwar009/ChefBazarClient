import Hero from "../../components/Home/Hero"
import WhyChooseus from "../../components/Home/WhyChoosUs"
import Silder from "../../components/Home/Slider"
import DailyMeals from "../../components/Shared/DailyMeals/DailyMeals"
import Reviews from "../../components/Shared/Review/Review"
import BestSellers from "../../components/Home/BestSellers"
import TrandingMeals from "../../components/Home/TrandingMeals"
import MostLovedFoods from "../../components/Home/MostLovedFoods"
import HomePageFreeDelivery from "../../components/Home/HomePageFreeDelivery"


const Home = () => {
  return (
    <div>
      <Silder />
      <Hero />
      <DailyMeals />
      <TrandingMeals />
      <MostLovedFoods />
      <HomePageFreeDelivery />
      <BestSellers />
      <WhyChooseus />
      <Reviews />
    </div>
  )
}

export default Home

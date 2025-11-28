import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MarvelHome() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <header className="w-full flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-[#9F0013]">MARVEL</h1>
        <nav className="space-x-6 text-lg">
          <a href="#" className="hover:text-[#9F0013] transition">Home</a>
          <a href="#heroes" className="hover:text-[#9F0013] transition">Heroes</a>
          <a href="#about" className="hover:text-[#9F0013] transition">About</a>
        </nav>
      </header>

      <section className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-5xl font-extrabold mb-4 leading-tight">
            Добро пожаловать во Вселенную <span className="text-[#9F0013]">MARVEL</span>
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Marvel — это огромная вселенная супергероев, злодеев и эпичных историй.
            Здесь ты найдёшь всё: от Человека-Паука и Железного Человека до Мстителей
            и Стражей Галактики.
          </p>
          <Button className="bg-[#9F0013] hover:bg-[#c11220] text-white text-lg px-6 py-3 rounded-2xl shadow-xl">
            Узнать больше
          </Button>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MarvelLogo.svg/1280px-MarvelLogo.svg.png"
          alt="Marvel Logo"
          className="w-full drop-shadow-[0_0_20px_#9F0013]"
        />
      </section>

      <section id="heroes" className="mt-20 grid md:grid-cols-3 gap-8">
        {["Iron Man", "Spider-Man", "Thor"].map((hero, i) => (
          <Card key={i} className="bg-[#1a1a1a] border-none rounded-2xl shadow-xl">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2 text-[#9F0013]">{hero}</h3>
              <p className="text-gray-300">Один из легендарных персонажей вселенной Marvel.</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section id="about" className="mt-20 p-8 bg-[#1a1a1a] rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-[#9F0013] mb-4">О Marvel</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Marvel Entertainment — один из крупнейших создателей комиксов, фильмов и сериалов.
          Основанная в 1939 году компания подарила миру сотни культовых персонажей.
          Сегодня Marvel — это не просто комиксы, а огромная мультимедийная вселенная.
        </p>
      </section>
    </div>
  );
}

import { Helmet } from "react-helmet";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const blogPosts = [
  {
    id: 1,
    title: "Как продать битое авто после ДТП в Хабаровске",
    description: "Подробная инструкция по продаже автомобиля после аварии: документы, оценка, выгодные условия. Узнайте, как получить максимальную цену за битое авто.",
    date: "15 октября 2025",
    readTime: "5 мин",
    slug: "kak-prodat-bitoe-avto-posle-dtp",
    icon: "Car"
  },
  {
    id: 2,
    title: "Выкуп кредитных автомобилей: как продать машину в кредите",
    description: "Полное руководство по продаже кредитного автомобиля. Погашение кредита, работа с банком, документы. Быстрый выкуп авто с непогашенным кредитом.",
    date: "14 октября 2025",
    readTime: "7 мин",
    slug: "vykup-kreditnykh-avtomobiley",
    icon: "CreditCard"
  },
  {
    id: 3,
    title: "Срочный выкуп авто: как продать машину за 1 день",
    description: "Нужны срочно деньги? Узнайте, как продать автомобиль за один день без потери в цене. Экспресс-оценка, моментальная сделка, деньги сразу.",
    date: "13 октября 2025",
    readTime: "4 мин",
    slug: "srochnyy-vykup-avto",
    icon: "Zap"
  }
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Блог — АвтоВыкуп27 Хабаровск | Советы по продаже авто</title>
        <meta 
          name="description" 
          content="Полезные статьи о выкупе автомобилей: как продать битое авто, кредитную машину, срочный выкуп. Советы экспертов автовыкупа в Хабаровске." 
        />
        <meta name="keywords" content="выкуп авто хабаровск блог, продажа битого авто, выкуп кредитных авто, срочный выкуп автомобилей" />
        <link rel="canonical" href="https://avtovykupkhb27.ru/blog" />
        <meta property="og:title" content="Блог — АвтоВыкуп27 Хабаровск | Советы по продаже авто" />
        <meta property="og:description" content="Полезные статьи о выкупе автомобилей в Хабаровске" />
        <meta property="og:url" content="https://avtovykupkhb27.ru/blog" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-12">
          <Link to="/">
            <Button variant="ghost" className="mb-8 group">
              <Icon name="ArrowLeft" size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              На главную
            </Button>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Блог АвтоВыкуп27
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Полезные статьи и советы по продаже автомобилей в Хабаровске
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Нужна консультация?
              </h2>
              <p className="text-gray-600 mb-6">
                Свяжитесь с нами для бесплатной оценки вашего автомобиля
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="tel:+79841771588">
                  <Button size="lg" className="gap-2">
                    <Icon name="Phone" size={20} />
                    +7 984 177 15 88
                  </Button>
                </a>
                <a href="https://wa.me/79841771588" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Icon name="MessageCircle" size={20} />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;

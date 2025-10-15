import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const BlogPost1 = () => {
  return (
    <>
      <Helmet>
        <title>Как продать битое авто после ДТП в Хабаровске — АвтоВыкуп27</title>
        <meta 
          name="description" 
          content="Подробная инструкция по продаже битого автомобиля после ДТП: документы, оценка ущерба, выгодные условия. Получите максимальную цену за аварийное авто в Хабаровске." 
        />
        <meta name="keywords" content="выкуп битых авто хабаровск, продать битое авто, авто после дтп, аварийные автомобили, выкуп после дтп" />
        <link rel="canonical" href="https://avtovykupkhb27.ru/blog/kak-prodat-bitoe-avto-posle-dtp" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <Link to="/blog">
            <Button variant="ghost" className="mb-8 group">
              <Icon name="ArrowLeft" size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              К статьям
            </Button>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 border-2">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <Icon name="Calendar" size={14} />
                15 октября 2025
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                5 мин чтения
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Как продать битое авто после ДТП в Хабаровске
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                После ДТП многие автовладельцы сталкиваются с вопросом: что делать с повреждённым автомобилем? 
                Ремонт может обойтись дорого, а продать битое авто по обычным объявлениям сложно. 
                В этой статье расскажем, как выгодно продать аварийный автомобиль в Хабаровске.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Почему выкуп битого авто — лучшее решение
              </h2>
              
              <p className="mb-4">
                Продажа битого автомобиля через специализированные компании автовыкупа имеет несколько преимуществ:
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span><strong>Быстро:</strong> Оценка за 15 минут, деньги в тот же день</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span><strong>Удобно:</strong> Бесплатный выезд специалиста, не нужно искать покупателей</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span><strong>Выгодно:</strong> Честная оценка с учётом рыночной стоимости запчастей</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span><strong>Безопасно:</strong> Юридически чистая сделка, помощь с документами</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Какие документы нужны для продажи битого авто
              </h2>

              <p className="mb-4">
                Для быстрой продажи битого автомобиля подготовьте:
              </p>

              <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">
                <li><strong>ПТС</strong> (паспорт транспортного средства)</li>
                <li><strong>СТС</strong> (свидетельство о регистрации)</li>
                <li><strong>Паспорт владельца</strong></li>
                <li><strong>Справка о ДТП</strong> (если есть)</li>
              </ol>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                <p className="font-semibold text-gray-800 mb-2">💡 Важно знать:</p>
                <p className="text-gray-700">
                  Даже если у автомобиля есть проблемы с документами или он снят с учёта, 
                  мы можем предложить варианты выкупа. Позвоните для консультации!
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Как происходит оценка битого автомобиля
              </h2>

              <p className="mb-4">
                При оценке аварийного авто учитываются:
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Марка, модель и год выпуска</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Характер и степень повреждений</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Техническое состояние неповреждённых узлов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Наличие и состояние салона</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Стоимость аналогичных автомобилей на рынке</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Этапы продажи битого авто в АвтоВыкуп27
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Звонок или заявка</h3>
                    <p className="text-gray-600">Позвоните по телефону +7 984 177 15 88 или оставьте заявку на сайте</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Выезд оценщика</h3>
                    <p className="text-gray-600">Наш специалист приедет в удобное место и время (бесплатно по всему Хабаровску)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Осмотр и оценка</h3>
                    <p className="text-gray-600">Оценка повреждений занимает 15 минут, озвучиваем финальную цену</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Оформление сделки</h3>
                    <p className="text-gray-600">Подписываем договор, оформляем документы</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Получение денег</h3>
                    <p className="text-gray-600">Деньги наличными или переводом на карту в день обращения</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Частые вопросы о продаже битых авто
              </h2>

              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Можно ли продать сильно битое авто?</h3>
                  <p className="text-gray-600">
                    Да, мы выкупаем автомобили в любом состоянии, даже после серьёзных ДТП. 
                    Цена зависит от остаточной стоимости запчастей и металла.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Нужно ли везти авто на эвакуаторе?</h3>
                  <p className="text-gray-600">
                    Нет, наш специалист сам приедет к месту стоянки автомобиля. 
                    Если авто не на ходу — оценим на месте.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Как быстро получу деньги?</h3>
                  <p className="text-gray-600">
                    В день обращения. После осмотра и согласования цены оформляем сделку 
                    и сразу передаём деньги наличными или на карту.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-8 rounded-2xl text-center mt-12">
                <h2 className="text-2xl font-bold mb-4">
                  Продайте битое авто выгодно прямо сейчас!
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Бесплатная оценка за 15 минут. Деньги сразу. Работаем 9 лет.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="tel:+79841771588">
                    <Button size="lg" variant="secondary" className="gap-2">
                      <Icon name="Phone" size={20} />
                      +7 984 177 15 88
                    </Button>
                  </a>
                  <a href="https://wa.me/79841771588" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="gap-2 bg-white text-primary hover:bg-gray-100">
                      <Icon name="MessageCircle" size={20} />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t-2 border-gray-200">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      Нужна бесплатная консультация?
                    </h3>
                    <p className="text-gray-600">
                      Свяжитесь с нами — ответим на все вопросы и поможем продать авто выгодно
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <a href="tel:+79841771588" className="block">
                      <div className="bg-white p-6 rounded-xl border-2 border-transparent hover:border-primary transition-all hover:shadow-lg cursor-pointer">
                        <div className="flex items-center justify-center mb-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon name="Phone" className="text-primary" size={24} />
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-800 text-center mb-1">Позвонить</h4>
                        <p className="text-sm text-gray-600 text-center">Быстрый ответ</p>
                      </div>
                    </a>

                    <a href="https://wa.me/79841771588" target="_blank" rel="noopener noreferrer" className="block">
                      <div className="bg-white p-6 rounded-xl border-2 border-transparent hover:border-green-500 transition-all hover:shadow-lg cursor-pointer">
                        <div className="flex items-center justify-center mb-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Icon name="MessageCircle" className="text-green-600" size={24} />
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-800 text-center mb-1">WhatsApp</h4>
                        <p className="text-sm text-gray-600 text-center">Написать в чат</p>
                      </div>
                    </a>

                    <a href="/#evaluation" className="block">
                      <div className="bg-white p-6 rounded-xl border-2 border-transparent hover:border-blue-500 transition-all hover:shadow-lg cursor-pointer">
                        <div className="flex items-center justify-center mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Icon name="Calculator" className="text-blue-600" size={24} />
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-800 text-center mb-1">Оценить авто</h4>
                        <p className="text-sm text-gray-600 text-center">Заполнить форму</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPost1;
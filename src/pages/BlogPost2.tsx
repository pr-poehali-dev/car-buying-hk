import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const BlogPost2 = () => {
  return (
    <>
      <Helmet>
        <title>Выкуп кредитных автомобилей: как продать машину в кредите — АвтоВыкуп27</title>
        <meta 
          name="description" 
          content="Полное руководство по продаже кредитного автомобиля в Хабаровске. Погашение кредита, работа с банком, необходимые документы. Быстрый выкуп авто с непогашенным кредитом." 
        />
        <meta name="keywords" content="выкуп кредитных авто хабаровск, продать авто в кредите, погашение автокредита, выкуп с обременением" />
        <link rel="canonical" href="https://avtovykupkhb27.ru/blog/vykup-kreditnykh-avtomobiley" />
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
                14 октября 2025
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                7 мин чтения
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Выкуп кредитных автомобилей: как продать машину в кредите
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Продажа автомобиля с непогашенным кредитом — распространённая ситуация. 
                Изменились финансовые обстоятельства, нужны срочно деньги или просто хочется сменить машину. 
                Разбираемся, как быстро и законно продать кредитный автомобиль в Хабаровске.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Можно ли продать автомобиль в кредите
              </h2>
              
              <p className="mb-4">
                <strong>Да, можно!</strong> Существует несколько законных способов продажи кредитного авто. 
                Главное условие — погасить задолженность перед банком и снять обременение с автомобиля.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-6">
                <p className="font-semibold text-gray-800 mb-2">⚠️ Важно:</p>
                <p className="text-gray-700">
                  Продать кредитное авто без уведомления банка нельзя. Это нарушение договора, 
                  которое может привести к судебным разбирательствам и штрафам.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                3 способа продажи кредитного автомобиля
              </h2>

              <div className="space-y-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                    Через компанию автовыкупа (РЕКОМЕНДУЕМ)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Компания сама погашает кредит в банке и выплачивает вам разницу между стоимостью 
                    автомобиля и остатком долга.
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="Plus" className="text-green-600 mt-1 flex-shrink-0" size={16} />
                      <span>Быстро: сделка за 1 день</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Plus" className="text-green-600 mt-1 flex-shrink-0" size={16} />
                      <span>Удобно: все вопросы с банком решаем мы</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Plus" className="text-green-600 mt-1 flex-shrink-0" size={16} />
                      <span>Безопасно: юридическое сопровождение</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                    Досрочное погашение кредита
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Погашаете кредит своими средствами, снимаете обременение и продаёте авто обычным способом.
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="Minus" className="text-red-600 mt-1 flex-shrink-0" size={16} />
                      <span>Нужны свободные деньги для погашения</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Minus" className="text-red-600 mt-1 flex-shrink-0" size={16} />
                      <span>Долгий процесс (1-2 недели)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Minus" className="text-red-600 mt-1 flex-shrink-0" size={16} />
                      <span>Самостоятельный поиск покупателя</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                    Через перекредитование
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Покупатель оформляет новый кредит, которым погашается ваш долг перед банком.
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="Minus" className="text-red-600 mt-1 flex-shrink-0" size={16} />
                      <span>Сложная схема с рисками</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Minus" className="text-red-600 mt-1 flex-shrink-0" size={16} />
                      <span>Нужен покупатель с хорошей кредитной историей</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Minus" className="text-red-600 mt-1 flex-shrink-0" size={16} />
                      <span>Долгое оформление (2-3 недели)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Как мы выкупаем кредитные автомобили
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Консультация</h3>
                    <p className="text-gray-600">
                      Вы звоните, называете марку авто, год, пробег и остаток по кредиту. 
                      Мы озвучиваем предварительную цену выкупа.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Осмотр автомобиля</h3>
                    <p className="text-gray-600">
                      Наш специалист приезжает в удобное место, осматривает авто и подтверждает окончательную стоимость.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Работа с банком</h3>
                    <p className="text-gray-600">
                      Связываемся с вашим банком, уточняем сумму остатка по кредиту и процедуру погашения.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Погашение кредита</h3>
                    <p className="text-gray-600">
                      Мы переводим деньги в банк для полного погашения кредита. Банк снимает обременение с ПТС.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Оформление сделки</h3>
                    <p className="text-gray-600">
                      После получения чистого ПТС оформляем договор купли-продажи и передаём вам оставшуюся сумму.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Необходимые документы
              </h2>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Icon name="FileText" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span><strong>ПТС</strong> (оригинал с отметкой банка об обременении)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="FileText" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span><strong>СТС</strong> (свидетельство о регистрации ТС)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="FileText" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span><strong>Паспорт владельца</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="FileText" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span><strong>Кредитный договор</strong> с банком</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="FileText" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span><strong>Справка об остатке долга</strong> (получаем в банке или онлайн)</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Частые вопросы о выкупе кредитных авто
              </h2>

              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Что если остаток по кредиту больше стоимости авто?</h3>
                  <p className="text-gray-600">
                    В этом случае продажа не имеет смысла — придётся доплачивать из своих средств. 
                    Рекомендуем подождать, пока остаток долга уменьшится.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Как быстро происходит сделка?</h3>
                  <p className="text-gray-600">
                    Обычно 1-2 рабочих дня. Основное время уходит на получение справки из банка 
                    и снятие обременения с ПТС.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Есть ли скрытые комиссии?</h3>
                  <p className="text-gray-600">
                    Нет. Мы озвучиваем итоговую сумму, которую вы получите на руки после погашения кредита. 
                    Никаких скрытых комиссий и дополнительных платежей.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Можно ли продать авто с просрочкой по кредиту?</h3>
                  <p className="text-gray-600">
                    Да, мы выкупаем такие автомобили. Погашаем весь долг включая пени и штрафы. 
                    Это поможет избежать судебных разбирательств с банком.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                <p className="font-semibold text-gray-800 mb-2">💰 Пример расчёта:</p>
                <div className="text-gray-700 space-y-1">
                  <p>Рыночная стоимость авто: <strong>800 000₽</strong></p>
                  <p>Остаток по кредиту: <strong>500 000₽</strong></p>
                  <p className="text-lg pt-2 border-t border-blue-200 mt-2">
                    Вы получите на руки: <strong className="text-primary">300 000₽</strong>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-8 rounded-2xl text-center mt-12">
                <h2 className="text-2xl font-bold mb-4">
                  Продайте кредитное авто без проблем!
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Мы сами погасим кредит в банке. Вы получите деньги в день сделки.
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
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPost2;

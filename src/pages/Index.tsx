import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import ChatBot from "@/components/ChatBot";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const products = [
    {
      id: 1,
      name: "Электронные сигареты",
      description: "Широкий выбор одноразовых и многоразовых устройств",
      price: "от 500₽",
      image: "/img/64c52779-76df-4010-94ed-fff55e612cc1.jpg",
      category: "Вейпы"
    },
    {
      id: 2,
      name: "Жидкости для вейпа",
      description: "Большой ассортимент вкусов и крепостей",
      price: "от 300₽",
      image: "/img/64c52779-76df-4010-94ed-fff55e612cc1.jpg",
      category: "Жидкости"
    },
    {
      id: 3,
      name: "Табак для кальяна",
      description: "Премиальные бренды табака в большом ассортименте",
      price: "от 800₽",
      image: "/img/bf68b8dc-bca5-42cd-b1a7-4ada55c3e9aa.jpg",
      category: "Кальян"
    },
    {
      id: 4,
      name: "Аксессуары для кальяна",
      description: "Уголь, колбы, чаши, щипцы, калауды и плитки",
      price: "от 200₽",
      image: "/img/bf68b8dc-bca5-42cd-b1a7-4ada55c3e9aa.jpg",
      category: "Аксессуары"
    }
  ];

  const categories = ["Вейпы", "Жидкости", "Кальян", "Аксессуары"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
      {/* Header */}
      <header className="border-b border-purple-700/50 sticky top-0 bg-purple-900/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://cdn.poehali.dev/files/b4ae4ac5-ddd8-4b54-9b70-2c6150ccc991.jpeg" 
                  alt="VAPE ПО КАЙФУ" 
                  className="w-12 h-12 rounded-lg"
                />
                <h1 className="text-2xl font-bold text-white">VAPE ПО КАЙФУ</h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-purple-200 hover:text-white transition-colors">Главная</a>
                <a href="#products" className="text-purple-200 hover:text-white transition-colors">Товары</a>
                <a href="#about" className="text-purple-200 hover:text-white transition-colors">О нас</a>
                <a href="#contact" className="text-purple-200 hover:text-white transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-800">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Telegram
              </Button>
              <Button variant="outline" size="icon" className="md:hidden border-purple-400 text-purple-200">
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src="https://cdn.poehali.dev/files/b4ae4ac5-ddd8-4b54-9b70-2c6150ccc991.jpeg" 
                alt="VAPE ПО КАЙФУ" 
                className="w-32 h-32 mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
              Магазин вейпов и кальянов
            </h2>
            <p className="text-xl text-purple-200 mb-8 leading-relaxed">
              Актуальные товары, свежие новинки и эксклюзивные акции. 
              Всё для идеального кайфа в одном месте.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg">
                Смотреть товары
                <Icon name="ArrowRight" className="ml-2" size={16} />
              </Button>
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-200 hover:bg-purple-800">
                Telegram канал
                <Icon name="MessageCircle" className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Наши товары</h3>
            <p className="text-purple-200 text-lg">Широкий ассортимент качественных товаров</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 border-purple-600/50 bg-purple-900/50 backdrop-blur-sm">
                <div className="aspect-square bg-purple-800/30 rounded-t-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="space-y-3">
                  <Badge variant="secondary" className="bg-pink-500/20 text-pink-200 border-pink-500/50 w-fit">
                    {product.category}
                  </Badge>
                  <CardTitle className="text-xl text-white group-hover:text-pink-300 transition-colors">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-purple-200 leading-relaxed">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-400">
                      {product.price}
                    </span>
                    <Button variant="outline" size="sm" className="border-purple-400 text-purple-200 hover:bg-purple-800">
                      Подробнее
                      <Icon name="ArrowRight" className="ml-1" size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-white mb-12 text-center">Категории товаров</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card key={category} className="hover:shadow-xl transition-all duration-300 cursor-pointer group bg-purple-900/50 border-purple-600/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="Package" size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-white group-hover:text-pink-300 transition-colors">
                    {category}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-white mb-8">Акции и скидки</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-pink-900/80 to-purple-900/80 border-pink-500/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Star" size={32} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Скидка 5% за отзыв</h4>
                  <p className="text-purple-200 mb-4">
                    Оставьте отзыв и получите скидку 5% на общий чек
                  </p>
                  <p className="text-sm text-purple-300">
                    (кроме продукции для кальянов)
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 border-purple-500/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CreditCard" size={32} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Накопительная карта</h4>
                  <p className="text-purple-200 mb-4">
                    Накапливайте баллы и списывайте их на 100%
                  </p>
                  <p className="text-sm text-purple-300">
                    Каждая покупка — это баллы
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-white mb-8">О нас</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h4 className="text-2xl font-semibold text-pink-400 mb-4">Зачем наш магазин?</h4>
                <ul className="space-y-3 text-purple-200">
                  <li className="flex items-start">
                    <Icon name="Check" className="text-pink-500 mt-1 mr-3" size={16} />
                    <span>Актуальная информация о новых поступлениях</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" className="text-pink-500 mt-1 mr-3" size={16} />
                    <span>Возможность задать любой вопрос</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" className="text-pink-500 mt-1 mr-3" size={16} />
                    <span>Обзоры ассортимента и новинок</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" className="text-pink-500 mt-1 mr-3" size={16} />
                    <span>Эксклюзивные розыгрыши и акции</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" className="text-pink-500 mt-1 mr-3" size={16} />
                    <span>Уникальный и познавательный контент</span>
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="text-2xl font-semibold text-pink-400 mb-4">Наш ассортимент</h4>
                <ul className="space-y-3 text-purple-200">
                  <li className="flex items-start">
                    <Icon name="Package" className="text-pink-500 mt-1 mr-3" size={16} />
                    <span>Электронные сигареты всех типов</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Package" className="text-pink-500 mt-1 mr-3" size={16} />
                    <span>Жидкости в большом количестве</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Package" className="text-pink-500 mt-1 mr-3" size={16} />
                    <span>Табак для кальяна в большом ассортименте</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Package" className="text-pink-500 mt-1 mr-3" size={16} />
                    <span>Аксессуары для кальяна</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-white mb-8">Контакты</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-xl transition-all duration-300 bg-purple-900/50 border-purple-600/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="MapPin" size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Адрес</h4>
                  <p className="text-purple-200 text-sm">
                    Деревня Куюки, ул. 30-ый квартал, дом 114
                  </p>
                  <p className="text-purple-300 text-xs mt-2">
                    Павильоны напротив ТД ВЕСНА, фиолетовая вывеска
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-all duration-300 bg-purple-900/50 border-purple-600/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="MessageCircle" size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Telegram</h4>
                  <p className="text-purple-200">@vapepokaifukuyki</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 border-purple-400 text-purple-200 hover:bg-purple-800"
                    onClick={() => window.open('https://t.me/vapepokaifukuyki', '_blank')}
                  >
                    Перейти в канал
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-all duration-300 bg-purple-900/50 border-purple-600/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Clock" size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Режим работы</h4>
                  <p className="text-purple-200">Ежедневно</p>
                  <p className="text-purple-300 text-sm">10:00 - 22:00</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/b4ae4ac5-ddd8-4b54-9b70-2c6150ccc991.jpeg" 
                  alt="VAPE ПО КАЙФУ" 
                  className="w-10 h-10 rounded-lg"
                />
                <h4 className="font-bold text-xl">VAPE ПО КАЙФУ</h4>
              </div>
              <p className="text-purple-300">
                Магазин товаров для вейпа и кальяна в деревне Куюки
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Навигация</h5>
              <ul className="space-y-2 text-purple-300">
                <li><a href="#" className="hover:text-white transition-colors">Главная</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Товары</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Товары</h5>
              <ul className="space-y-2 text-purple-300">
                <li><a href="#" className="hover:text-white transition-colors">Электронные сигареты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Жидкости</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Табак для кальяна</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Аксессуары</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Связь</h5>
              <p className="text-purple-300 mb-4">
                Следите за новостями в нашем Telegram канале
              </p>
              <Button 
                variant="outline" 
                className="border-purple-400 text-purple-200 hover:bg-purple-800"
                onClick={() => window.open('https://t.me/vapepokaifukuyki', '_blank')}
              >
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Telegram
              </Button>
            </div>
          </div>
          <Separator className="my-8 bg-purple-800" />
          <div className="text-center text-purple-400">
            <p>&copy; 2024 VAPE ПО КАЙФУ. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Chat Bot */}
      <ChatBot />
      
      {/* Admin Panel */}
      <AdminPanel />
    </div>
  );
};

export default Index;
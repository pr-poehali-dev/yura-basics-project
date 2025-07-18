import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const Index = () => {
  const articles = [
    {
      id: 1,
      title: "Принципы минималистичного дизайна",
      excerpt: "Изучаем основы создания чистого и функционального дизайна, который фокусируется на главном и убирает лишнее.",
      category: "Дизайн",
      date: "15 июля 2024",
      readTime: "5 мин",
      image: "/img/69ac16dd-8c8f-4dc0-ad56-2658470b9b7e.jpg"
    },
    {
      id: 2,
      title: "Современные тренды в веб-разработке",
      excerpt: "Обзор актуальных технологий и подходов, которые определяют будущее веб-разработки в 2024 году.",
      category: "Разработка",
      date: "12 июля 2024",
      readTime: "8 мин",
      image: "/img/69ac16dd-8c8f-4dc0-ad56-2658470b9b7e.jpg"
    },
    {
      id: 3,
      title: "Искусство создания контента",
      excerpt: "Как создавать контент, который вдохновляет и привлекает аудиторию. Практические советы и рекомендации.",
      category: "Контент",
      date: "10 июля 2024",
      readTime: "6 мин",
      image: "/img/69ac16dd-8c8f-4dc0-ad56-2658470b9b7e.jpg"
    }
  ];

  const categories = ["Дизайн", "Разработка", "Контент", "Маркетинг", "Технологии"];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Блог</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Главная</a>
                <a href="#categories" className="text-gray-600 hover:text-gray-900 transition-colors">Категории</a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">Обо мне</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input 
                  placeholder="Поиск статей..." 
                  className="pl-10 w-64 bg-gray-50 border-gray-200"
                />
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <Button variant="outline" size="icon" className="md:hidden">
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Делимся идеями и опытом
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Исследуем дизайн, разработку и создание контента. Простые решения для сложных задач.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
                Читать статьи
                <Icon name="ArrowRight" className="ml-2" size={16} />
              </Button>
              <Button variant="outline" size="lg">
                Подписаться
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Последние статьи</h3>
            <Button variant="outline">
              Все статьи
              <Icon name="ArrowRight" className="ml-2" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                      <Icon name="Calendar" size={14} />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-gray-700 transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Icon name="Clock" size={14} className="mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                      Читать далее
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
      <section id="categories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Категории</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-300 transition-colors">
                    <Icon name="Folder" size={24} className="text-gray-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {category}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Обо мне</h3>
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Icon name="User" size={32} className="text-gray-600" />
            </div>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Привет! Я занимаюсь дизайном и разработкой уже более 5 лет. В этом блоге делюсь 
              опытом, идеями и наблюдениями о том, как создавать качественные цифровые продукты.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Twitter" size={16} className="mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Github" size={16} className="mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Linkedin" size={16} className="mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Комментарии</h3>
            
            {/* Comment Form */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Оставить комментарий</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Ваше имя" />
                  <Input type="email" placeholder="Email" />
                </div>
                <Textarea 
                  placeholder="Ваш комментарий..." 
                  className="min-h-[120px]"
                />
                <Button className="bg-gray-900 hover:bg-gray-800">
                  Отправить комментарий
                </Button>
              </CardContent>
            </Card>

            {/* Sample Comments */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">Анна Иванова</span>
                        <span className="text-sm text-gray-500">2 часа назад</span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        Отличная статья! Особенно понравился подход к минималистичному дизайну. 
                        Много полезных практических советов.
                      </p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <Icon name="Heart" size={16} className="mr-1" />
                          Нравится
                        </Button>
                        <Button variant="ghost" size="sm">
                          Ответить
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">Михаил Петров</span>
                        <span className="text-sm text-gray-500">1 день назад</span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        Спасибо за материал! Подскажите, планируете ли вы написать продолжение 
                        с более детальными примерами?
                      </p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <Icon name="Heart" size={16} className="mr-1" />
                          Нравится
                        </Button>
                        <Button variant="ghost" size="sm">
                          Ответить
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Контакты</h3>
            <p className="text-lg text-gray-600 mb-8">
              Есть вопросы или предложения? Буду рад обратной связи!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Icon name="Mail" size={32} className="text-gray-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                  <p className="text-gray-600">hello@example.com</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Icon name="MessageCircle" size={32} className="text-gray-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Telegram</h4>
                  <p className="text-gray-600">@username</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Icon name="Phone" size={32} className="text-gray-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Телефон</h4>
                  <p className="text-gray-600">+7 (999) 123-45-67</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-xl mb-4">Блог</h4>
              <p className="text-gray-400">
                Делимся знаниями и опытом в области дизайна и разработки.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Навигация</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Главная</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Категории</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Обо мне</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Категории</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Дизайн</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Разработка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контент</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Технологии</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Подписка</h5>
              <p className="text-gray-400 mb-4">
                Получайте новые статьи на email
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Ваш email" 
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Блог. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
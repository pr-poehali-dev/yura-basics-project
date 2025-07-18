import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'product' | 'offer';
}

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я помогу вам выбрать товары для вейпа и кальяна. Что вас интересует?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    greetings: [
      'Привет! Добро пожаловать в VAPE ПО КАЙФУ!',
      'Здравствуйте! Чем могу помочь?',
      'Привет! Готов помочь с выбором товаров'
    ],
    products: {
      vape: [
        'У нас есть одноразовые вейпы от 500₽ и многоразовые устройства. Что предпочитаете?',
        'Рекомендую обратить внимание на популярные модели: IGET, ELF BAR, VOZOL',
        'Для новичков подойдут одноразовые, для опытных — многоразовые POD-системы'
      ],
      liquid: [
        'Жидкости у нас от 300₽. Какую крепость предпочитаете: 0, 3, 6 или 20 мг?',
        'Популярные вкусы: фруктовые, ягодные, десертные. Что больше нравится?',
        'Есть жидкости солевые и обычные. Для POD-систем лучше солевые'
      ],
      hookah: [
        'Табак для кальяна от 800₽. Какой бренд интересует: Adalya, Al Fakher, Darkside?',
        'Крепость табака: легкий, средний или крепкий? Подберу под ваш вкус',
        'Популярные вкусы: мятные, фруктовые, многокомпонентные миксы'
      ],
      accessories: [
        'Аксессуары от 200₽: уголь, чаши, калауды, щипцы. Что нужно?',
        'Рекомендую кокосовый уголь - горит дольше и без запаха',
        'Для улучшения курения советую калауд или фольгу с колпаком'
      ]
    },
    offers: [
      'Скидка 5% за отзыв на общий чек! Действует на все, кроме кальянных товаров',
      'У нас есть накопительная карта - баллы можно списать на 100%',
      'Следите за акциями в нашем Telegram канале @vapepokaifukuyki'
    ],
    location: [
      'Мы находимся в деревне Куюки, ул. 30-ый квартал, дом 114',
      'Ищите фиолетовую вывеску напротив ТД ВЕСНА',
      'Работаем ежедневно с 10:00 до 22:00'
    ],
    default: [
      'Могу рассказать о товарах, ценах и акциях. Что вас интересует?',
      'Задайте вопрос о вейпах, жидкостях, кальянах или аксессуарах',
      'Помогу выбрать подходящий товар под ваши потребности'
    ]
  };

  const detectIntent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
      return 'greetings';
    }
    if (lowerMessage.includes('вейп') || lowerMessage.includes('сигарет')) {
      return 'vape';
    }
    if (lowerMessage.includes('жидкость') || lowerMessage.includes('жижа')) {
      return 'liquid';
    }
    if (lowerMessage.includes('кальян') || lowerMessage.includes('табак')) {
      return 'hookah';
    }
    if (lowerMessage.includes('аксессуар') || lowerMessage.includes('уголь') || lowerMessage.includes('чаш')) {
      return 'accessories';
    }
    if (lowerMessage.includes('скидк') || lowerMessage.includes('акци') || lowerMessage.includes('карт')) {
      return 'offers';
    }
    if (lowerMessage.includes('адрес') || lowerMessage.includes('где') || lowerMessage.includes('находит')) {
      return 'location';
    }
    
    return 'default';
  };

  const generateBotResponse = (userMessage: string): Message => {
    const intent = detectIntent(userMessage);
    let responseText = '';
    
    if (intent === 'greetings') {
      responseText = botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    } else if (intent in botResponses.products) {
      responseText = botResponses.products[intent as keyof typeof botResponses.products][
        Math.floor(Math.random() * botResponses.products[intent as keyof typeof botResponses.products].length)
      ];
    } else if (intent === 'offers') {
      responseText = botResponses.offers[Math.floor(Math.random() * botResponses.offers.length)];
    } else if (intent === 'location') {
      responseText = botResponses.location[Math.floor(Math.random() * botResponses.location.length)];
    } else {
      responseText = botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickReplies = [
    'Показать вейпы',
    'Жидкости для вейпа',
    'Табак для кальяна',
    'Аксессуары',
    'Скидки и акции',
    'Где находитесь?'
  ];

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Icon name="MessageCircle" size={24} className="text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 bg-purple-900/95 backdrop-blur-sm border-purple-600/50 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} className="text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">Консультант</CardTitle>
                <p className="text-xs text-purple-100">Онлайн</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 h-full flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'bg-purple-800/50 text-purple-100 border border-purple-700/50'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-purple-800/50 text-purple-100 border border-purple-700/50 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-purple-700/50">
            <div className="flex flex-wrap gap-1">
              {quickReplies.slice(0, 3).map((reply) => (
                <Badge
                  key={reply}
                  variant="outline"
                  className="text-xs cursor-pointer border-purple-500/50 text-purple-200 hover:bg-purple-800/50"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </Badge>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-purple-700/50">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Задайте вопрос..."
                className="flex-1 bg-purple-800/50 border-purple-700/50 text-purple-100 placeholder-purple-400"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
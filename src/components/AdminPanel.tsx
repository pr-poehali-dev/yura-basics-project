import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  inStock: boolean;
}

interface ChatMessage {
  id: string;
  customerName: string;
  message: string;
  timestamp: Date;
  status: 'new' | 'read' | 'replied';
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  items: { product: string; quantity: number }[];
  total: string;
  status: 'new' | 'processing' | 'completed' | 'cancelled';
  timestamp: Date;
}

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [notifications, setNotifications] = useState<{id: string, message: string, type: 'order' | 'message', timestamp: Date}[]>([]);

  // Sample data
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'IGET Bar 2500',
      description: 'Одноразовый вейп на 2500 затяжек',
      price: '800',
      category: 'Вейпы',
      image: '/img/64c52779-76df-4010-94ed-fff55e612cc1.jpg',
      inStock: true
    },
    {
      id: '2',
      name: 'Жидкость Premium 60ml',
      description: 'Премиальная жидкость различных вкусов',
      price: '450',
      category: 'Жидкости',
      image: '/img/64c52779-76df-4010-94ed-fff55e612cc1.jpg',
      inStock: true
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      customerName: 'Анна',
      message: 'Привет! Какие у вас есть вейпы для новичков?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'new'
    },
    {
      id: '2',
      customerName: 'Михаил',
      message: 'Есть ли доставка в город?',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'read'
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'Петр Иванов',
      phone: '+7 (999) 123-45-67',
      items: [
        { product: 'IGET Bar 2500', quantity: 2 },
        { product: 'Жидкость Premium', quantity: 1 }
      ],
      total: '2050₽',
      status: 'new',
      timestamp: new Date(Date.now() - 1000 * 60 * 45)
    }
  ]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
      setAdminPassword('');
    } else {
      alert('Неверный пароль');
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description || '',
        price: newProduct.price,
        category: newProduct.category,
        image: uploadedImage || newProduct.image || '/img/64c52779-76df-4010-94ed-fff55e612cc1.jpg',
        inStock: newProduct.inStock || true
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', description: '', price: '', category: '', image: '', inStock: true });
      setUploadedImage(null);
    }
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? {
          ...editingProduct,
          image: uploadedImage || editingProduct.image
        } : p
      ));
      setEditingProduct(null);
      setUploadedImage(null);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNotification = (message: string, type: 'order' | 'message') => {
    const notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 9)]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (newStatus === 'processing') {
      addNotification(`Заказ #${orderId} взят в работу`, 'order');
    }
  };

  const handleMarkMessageAsRead = (messageId: string) => {
    setChatMessages(chatMessages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    ));
    const message = chatMessages.find(m => m.id === messageId);
    if (message) {
      addNotification(`Сообщение от ${message.customerName} прочитано`, 'message');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-500';
      case 'processing': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'processing': return 'В работе';
      case 'completed': return 'Выполнен';
      case 'cancelled': return 'Отменен';
      default: return status;
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
          >
            <Icon name="Settings" size={24} className="text-white" />
          </Button>
          {notifications.length > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{notifications.length}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-96 bg-purple-900/95 backdrop-blur-sm border-purple-600/50">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle>Вход в админ-панель</CardTitle>
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
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-purple-200">Пароль</label>
              <Input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="mt-1 bg-purple-800/50 border-purple-700/50 text-purple-100"
                placeholder="Введите пароль"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl h-[90vh] bg-purple-900/95 backdrop-blur-sm border-purple-600/50">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle>Админ-панель VAPE ПО КАЙФУ</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsOpen(false);
                setIsAuthenticated(false);
              }}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 h-full overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-purple-800/50">
              <TabsTrigger value="products" className="text-purple-200">Товары</TabsTrigger>
              <TabsTrigger value="orders" className="text-purple-200">Заказы</TabsTrigger>
              <TabsTrigger value="messages" className="text-purple-200">Сообщения</TabsTrigger>
              <TabsTrigger value="analytics" className="text-purple-200">Аналитика</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Управление товарами</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить товар
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-purple-900 border-purple-600">
                    <DialogHeader>
                      <DialogTitle className="text-white">Добавить новый товар</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Название товара"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="bg-purple-800/50 border-purple-700/50 text-purple-100"
                      />
                      <Textarea
                        placeholder="Описание"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="bg-purple-800/50 border-purple-700/50 text-purple-100"
                      />
                      <Input
                        placeholder="Цена (₽)"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="bg-purple-800/50 border-purple-700/50 text-purple-100"
                      />
                      <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                        <SelectTrigger className="bg-purple-800/50 border-purple-700/50 text-purple-100">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Вейпы">Вейпы</SelectItem>
                          <SelectItem value="Жидкости">Жидкости</SelectItem>
                          <SelectItem value="Кальян">Кальян</SelectItem>
                          <SelectItem value="Аксессуары">Аксессуары</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-purple-200">Загрузить фото</label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="bg-purple-800/50 border-purple-700/50 text-purple-100"
                        />
                        {uploadedImage && (
                          <div className="relative">
                            <img src={uploadedImage} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setUploadedImage(null)}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        )}
                      </div>
                      <Button onClick={handleAddProduct} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                        Добавить товар
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="bg-purple-800/50 border-purple-700/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-sm">{product.name}</CardTitle>
                          <CardDescription className="text-purple-200">{product.description}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingProduct(product)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-pink-400 font-bold">{product.price}₽</span>
                        <Badge variant={product.inStock ? "default" : "secondary"}>
                          {product.inStock ? "В наличии" : "Нет в наличии"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Edit Product Dialog */}
              {editingProduct && (
                <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
                  <DialogContent className="bg-purple-900 border-purple-600">
                    <DialogHeader>
                      <DialogTitle className="text-white">Редактировать товар</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Название товара"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="bg-purple-800/50 border-purple-700/50 text-purple-100"
                      />
                      <Textarea
                        placeholder="Описание"
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="bg-purple-800/50 border-purple-700/50 text-purple-100"
                      />
                      <Input
                        placeholder="Цена (₽)"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                        className="bg-purple-800/50 border-purple-700/50 text-purple-100"
                      />
                      <Select value={editingProduct.category} onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}>
                        <SelectTrigger className="bg-purple-800/50 border-purple-700/50 text-purple-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Вейпы">Вейпы</SelectItem>
                          <SelectItem value="Жидкости">Жидкости</SelectItem>
                          <SelectItem value="Кальян">Кальян</SelectItem>
                          <SelectItem value="Аксессуары">Аксессуары</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-purple-200">Изменить фото</label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="bg-purple-800/50 border-purple-700/50 text-purple-100"
                        />
                        {(uploadedImage || editingProduct.image) && (
                          <div className="relative">
                            <img 
                              src={uploadedImage || editingProduct.image} 
                              alt="Preview" 
                              className="w-full h-32 object-cover rounded-lg" 
                            />
                            {uploadedImage && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setUploadedImage(null)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="inStock"
                          checked={editingProduct.inStock}
                          onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                          className="rounded"
                        />
                        <label htmlFor="inStock" className="text-sm font-medium text-purple-200">
                          В наличии
                        </label>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={handleUpdateProduct} 
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                          Сохранить изменения
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setEditingProduct(null)}
                          className="border-purple-600 text-purple-200 hover:bg-purple-800"
                        >
                          Отмена
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Управление заказами</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="bg-purple-800/50 border-purple-700/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">Заказ #{order.id}</CardTitle>
                          <CardDescription className="text-purple-200">
                            {order.customerName} • {order.phone}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-purple-200">
                          <strong>Товары:</strong>
                          <ul className="mt-1">
                            {order.items.map((item, index) => (
                              <li key={index} className="text-sm">
                                {item.product} × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-pink-400 font-bold">Итого: {order.total}</span>
                          <Select value={order.status} onValueChange={(value) => handleUpdateOrderStatus(order.id, value as Order['status'])}>
                            <SelectTrigger className="w-40 bg-purple-700/50 border-purple-600/50 text-purple-100">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">Новый</SelectItem>
                              <SelectItem value="processing">В работе</SelectItem>
                              <SelectItem value="completed">Выполнен</SelectItem>
                              <SelectItem value="cancelled">Отменен</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Сообщения от клиентов</h3>
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <Card key={message.id} className="bg-purple-800/50 border-purple-700/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-sm">{message.customerName}</CardTitle>
                          <CardDescription className="text-purple-200">
                            {message.timestamp.toLocaleString()}
                          </CardDescription>
                        </div>
                        <Badge variant={message.status === 'new' ? 'destructive' : 'secondary'}>
                          {message.status === 'new' ? 'Новое' : message.status === 'read' ? 'Прочитано' : 'Отвечено'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-200 mb-3">{message.message}</p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkMessageAsRead(message.id)}
                          className="border-purple-600 text-purple-200 hover:bg-purple-800"
                        >
                          Отметить как прочитанное
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                          Ответить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Аналитика</h3>
                {notifications.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setNotifications([])}
                    className="border-purple-600 text-purple-200 hover:bg-purple-800"
                  >
                    Очистить уведомления
                  </Button>
                )}
              </div>
              
              {/* Notifications */}
              {notifications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-md font-semibold text-white">Последние уведомления</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {notifications.map((notification) => (
                      <Card key={notification.id} className="bg-purple-800/50 border-purple-700/50 p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2">
                            <Icon 
                              name={notification.type === 'order' ? 'ShoppingCart' : 'MessageCircle'} 
                              size={16} 
                              className="text-pink-400 mt-0.5" 
                            />
                            <div>
                              <p className="text-sm text-purple-200">{notification.message}</p>
                              <p className="text-xs text-purple-400">
                                {notification.timestamp.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant={notification.type === 'order' ? 'default' : 'secondary'}>
                            {notification.type === 'order' ? 'Заказ' : 'Сообщение'}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-purple-800/50 border-purple-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-200 text-sm">Всего товаров</p>
                        <p className="text-2xl font-bold text-white">{products.length}</p>
                      </div>
                      <Icon name="Package" size={24} className="text-pink-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-800/50 border-purple-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-200 text-sm">Новых заказов</p>
                        <p className="text-2xl font-bold text-white">{orders.filter(o => o.status === 'new').length}</p>
                      </div>
                      <Icon name="ShoppingCart" size={24} className="text-pink-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-800/50 border-purple-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-200 text-sm">Непрочитанных</p>
                        <p className="text-2xl font-bold text-white">{chatMessages.filter(m => m.status === 'new').length}</p>
                      </div>
                      <Icon name="MessageCircle" size={24} className="text-pink-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-800/50 border-purple-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-200 text-sm">Товаров в наличии</p>
                        <p className="text-2xl font-bold text-white">{products.filter(p => p.inStock).length}</p>
                      </div>
                      <Icon name="CheckCircle" size={24} className="text-pink-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
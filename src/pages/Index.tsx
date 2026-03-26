import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/811d2b8b-0774-4888-abe6-2c88c440d79b/files/a17d2031-47ab-4935-84b5-d3c09321e020.jpg";
const GIFT_IMG = "https://cdn.poehali.dev/projects/811d2b8b-0774-4888-abe6-2c88c440d79b/files/264462d8-1cb0-4de0-8aa0-2c2e07c07efb.jpg";
const TOYS_IMG = "https://cdn.poehali.dev/projects/811d2b8b-0774-4888-abe6-2c88c440d79b/files/96a5bc66-0dff-45af-bf62-658b97df1abd.jpg";

const products = [
  { id: 1, name: "Набор юного художника", age: "3-6", price: 1490, type: "Творчество", theme: "Новый год", img: GIFT_IMG, badge: "Хит" },
  { id: 2, name: "Конструктор «Замок»", age: "6-10", price: 2990, type: "Конструктор", theme: "Зима", img: TOYS_IMG, badge: "Новинка" },
  { id: 3, name: "Кукла в зимнем наряде", age: "3-6", price: 1890, type: "Игрушка", theme: "Новый год", img: GIFT_IMG, badge: null },
  { id: 4, name: "Настольная игра «Снежки»", age: "6-10", price: 990, type: "Игра", theme: "Зима", img: TOYS_IMG, badge: "Акция" },
  { id: 5, name: "Набор лего «Снегоход»", age: "10+", price: 3490, type: "Конструктор", theme: "Новый год", img: GIFT_IMG, badge: null },
  { id: 6, name: "Мягкая игрушка Дед Мороз", age: "0-3", price: 790, type: "Игрушка", theme: "Новый год", img: TOYS_IMG, badge: "Хит" },
  { id: 7, name: "Книга сказок с иллюстрациями", age: "3-6", price: 690, type: "Книга", theme: "Рождество", img: GIFT_IMG, badge: null },
  { id: 8, name: "Детская химия", age: "10+", price: 2190, type: "Развитие", theme: "Зима", img: TOYS_IMG, badge: "Новинка" },
];

const reviews = [
  { name: "Анна К.", text: "Заказала набор художника для дочки — она в восторге! Качество отличное, упаковка красивая.", rating: 5, date: "12 декабря" },
  { name: "Михаил С.", text: "Конструктор замок — лучший подарок для сына 8 лет. Собирали вместе весь вечер!", rating: 5, date: "18 декабря" },
  { name: "Елена В.", text: "Быстрая доставка, товар соответствует описанию. Мягкая игрушка очень мягкая и приятная на ощупь.", rating: 4, date: "20 декабря" },
];

const ageFilters = ["Все", "0-3", "3-6", "6-10", "10+"];
const typeFilters = ["Все", "Игрушка", "Конструктор", "Творчество", "Игра", "Книга", "Развитие"];
const themeFilters = ["Все", "Новый год", "Рождество", "Зима"];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [ageFilter, setAgeFilter] = useState("Все");
  const [typeFilter, setTypeFilter] = useState("Все");
  const [themeFilter, setThemeFilter] = useState("Все");
  const [priceMax, setPriceMax] = useState(5000);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "promos", label: "Акции" },
    { id: "reviews", label: "Отзывы" },
    { id: "about", label: "О магазине" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const filtered = products.filter((p) => {
    if (ageFilter !== "Все" && p.age !== ageFilter) return false;
    if (typeFilter !== "Все" && p.type !== typeFilter) return false;
    if (themeFilter !== "Все" && p.theme !== themeFilter) return false;
    if (p.price > priceMax) return false;
    return true;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--brand-cream)", color: "var(--brand-dark)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <nav style={{ backgroundColor: "white", borderBottom: "1px solid #ede8e0" }} className="sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <span style={{ fontFamily: "'Cormorant', serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--brand-red)", letterSpacing: "-0.02em" }}>
              ПодарокДетям
            </span>
            <span style={{ fontSize: "1.2rem" }}>🎁</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: activeSection === item.id ? "var(--brand-red)" : "var(--brand-gray)",
                  fontFamily: "'Golos Text', sans-serif",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("catalog")}
            className="hidden md:block text-sm font-medium px-5 py-2 rounded-full transition-all duration-200"
            style={{ backgroundColor: "var(--brand-red)", color: "white" }}
          >
            Купить подарок
          </button>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4 animate-fade-in" style={{ backgroundColor: "white" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-sm font-medium py-2"
                style={{ color: activeSection === item.id ? "var(--brand-red)" : "var(--brand-dark)", fontFamily: "'Golos Text', sans-serif" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
              style={{ backgroundColor: "#FEF0EE", color: "var(--brand-red)" }}>
              <span>✨</span> Новогодняя коллекция 2025
            </div>
            <h1 style={{
              fontFamily: "'Cormorant', serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              lineHeight: 1.1,
              fontWeight: 600,
              color: "var(--brand-dark)",
              letterSpacing: "-0.03em",
            }}>
              Подарки,<br />
              <span style={{ color: "var(--brand-red)", fontStyle: "italic" }}>которые помнят</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--brand-gray)", maxWidth: "420px", fontFamily: "'Golos Text', sans-serif" }}>
              Тщательно отобранные новогодние подарки для детей от 0 до 14 лет. Каждый подарок — это маленькое волшебство.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("catalog")}
                className="px-8 py-3 rounded-full font-medium text-sm transition-all duration-200 hover-lift"
                style={{ backgroundColor: "var(--brand-red)", color: "white" }}
              >
                Перейти в каталог
              </button>
              <button
                onClick={() => scrollTo("promos")}
                className="px-8 py-3 rounded-full font-medium text-sm transition-all duration-200"
                style={{ border: "1.5px solid var(--brand-red)", color: "var(--brand-red)", backgroundColor: "transparent" }}
              >
                Смотреть акции
              </button>
            </div>
            <div className="mt-10 flex gap-8">
              {[["500+", "Товаров"], ["98%", "Довольных"], ["1 день", "Доставка"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Cormorant', serif", fontSize: "1.8rem", fontWeight: 600, color: "var(--brand-dark)" }}>{val}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--brand-gray)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in hidden md:block">
            <div className="absolute -top-6 -right-6 w-80 h-80 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #C0392B 0%, transparent 70%)" }} />
            <img
              src={HERO_IMG}
              alt="Счастливый ребёнок с подарком"
              className="relative z-10 w-full rounded-3xl shadow-2xl object-cover"
              style={{ aspectRatio: "4/5", maxHeight: "560px" }}
            />
            <div className="absolute -bottom-4 -left-4 z-20 bg-white rounded-2xl px-5 py-4 shadow-lg"
              style={{ border: "1px solid #ede8e0" }}>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "1.5rem" }}>🎄</span>
                <div>
                  <div className="text-xs font-medium" style={{ color: "var(--brand-gray)" }}>До Нового года</div>
                  <div style={{ fontFamily: "'Cormorant', serif", fontSize: "1.2rem", fontWeight: 600 }}>Осталось 6 дней</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20" style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--brand-red)" }}>Каталог</p>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "2.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--brand-dark)" }}>
              Все подарки
            </h2>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-medium mr-1" style={{ color: "var(--brand-gray)" }}>Возраст:</span>
              {ageFilters.map((f) => (
                <button key={f} onClick={() => setAgeFilter(f)}
                  className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={ageFilter === f ? { backgroundColor: "var(--brand-red)", color: "white" } : { backgroundColor: "#F5F0EA", color: "var(--brand-dark)" }}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-medium mr-1" style={{ color: "var(--brand-gray)" }}>Тип:</span>
              {typeFilters.map((f) => (
                <button key={f} onClick={() => setTypeFilter(f)}
                  className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={typeFilter === f ? { backgroundColor: "var(--brand-red)", color: "white" } : { backgroundColor: "#F5F0EA", color: "var(--brand-dark)" }}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-medium mr-1" style={{ color: "var(--brand-gray)" }}>Тематика:</span>
              {themeFilters.map((f) => (
                <button key={f} onClick={() => setThemeFilter(f)}
                  className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={themeFilter === f ? { backgroundColor: "var(--brand-red)", color: "white" } : { backgroundColor: "#F5F0EA", color: "var(--brand-dark)" }}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-medium" style={{ color: "var(--brand-gray)" }}>Цена до:</span>
              <input
                type="range" min={500} max={5000} step={100}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-40"
                style={{ accentColor: "var(--brand-red)" }}
              />
              <span className="text-sm font-medium" style={{ color: "var(--brand-dark)" }}>{priceMax.toLocaleString()} ₽</span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16" style={{ color: "var(--brand-gray)" }}>
              <p style={{ fontFamily: "'Cormorant', serif", fontSize: "1.8rem" }}>Ничего не найдено</p>
              <p className="text-sm mt-2">Попробуйте изменить фильтры</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <div key={product.id} className="hover-lift rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ backgroundColor: "var(--brand-cream)", border: "1px solid #ede8e0" }}>
                  <div className="relative overflow-hidden aspect-square">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {product.badge && (
                      <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: product.badge === "Акция" ? "var(--brand-gold)" : product.badge === "Хит" ? "var(--brand-red)" : "#1A1512",
                          color: "white"
                        }}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-xs mb-1" style={{ color: "var(--brand-gray)" }}>{product.type} · {product.age} лет</div>
                    <div className="font-medium text-sm leading-snug mb-3" style={{ color: "var(--brand-dark)", fontFamily: "'Golos Text', sans-serif" }}>
                      {product.name}
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "'Cormorant', serif", fontSize: "1.25rem", fontWeight: 600, color: "var(--brand-dark)" }}>
                        {product.price.toLocaleString()} ₽
                      </span>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                        style={{ backgroundColor: "var(--brand-red)", color: "white" }}>
                        <Icon name="Plus" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PROMOS */}
      <section id="promos" className="py-20" style={{ backgroundColor: "var(--brand-cream)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--brand-red)" }}>Акции</p>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "2.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--brand-dark)" }} className="mb-10">
            Специальные предложения
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "🎄", title: "Новогодний набор", desc: "При покупке от 3 товаров — скидка 15% на всё", badge: "-15%", color: "#FEF0EE", accent: "var(--brand-red)" },
              { emoji: "⭐", title: "Ранняя птица", desc: "Заказ до 25 декабря — бесплатная доставка", badge: "Бесплатно", color: "#FFF8E8", accent: "var(--brand-gold)" },
              { emoji: "🎁", title: "Подарочная упаковка", desc: "К любому заказу — праздничная упаковка в подарок", badge: "Бонус", color: "#EFF8F0", accent: "#2D7D46" },
            ].map((promo) => (
              <div key={promo.title} className="rounded-2xl p-7 hover-lift cursor-pointer" style={{ backgroundColor: promo.color, border: "1px solid #ede8e0" }}>
                <div className="text-3xl mb-4">{promo.emoji}</div>
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                  style={{ backgroundColor: promo.accent, color: "white" }}>
                  {promo.badge}
                </span>
                <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "1.4rem", fontWeight: 600, color: "var(--brand-dark)" }} className="mb-2">
                  {promo.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--brand-gray)" }}>{promo.desc}</p>
                <button className="mt-5 text-sm font-medium flex items-center gap-1 transition-opacity hover:opacity-70"
                  style={{ color: promo.accent }}>
                  Подробнее <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20" style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--brand-red)" }}>Отзывы</p>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "2.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--brand-dark)" }} className="mb-10">
            Что говорят родители
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.name} className="rounded-2xl p-6" style={{ backgroundColor: "var(--brand-cream)", border: "1px solid #ede8e0" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} style={{ color: "var(--brand-gold)" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--brand-dark)" }}>«{review.text}»</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      style={{ backgroundColor: "var(--brand-red)" }}>
                      {review.name[0]}
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--brand-dark)" }}>{review.name}</span>
                  </div>
                  <span className="text-xs" style={{ color: "var(--brand-gray)" }}>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="text-sm font-medium px-6 py-3 rounded-full transition-all duration-200"
              style={{ border: "1.5px solid var(--brand-red)", color: "var(--brand-red)", backgroundColor: "transparent" }}>
              Читать все отзывы
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20" style={{ backgroundColor: "var(--brand-cream)" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img src={TOYS_IMG} alt="О магазине" className="w-full rounded-3xl shadow-xl object-cover" style={{ aspectRatio: "4/3" }} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--brand-red)" }}>О магазине</p>
            <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "2.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--brand-dark)" }} className="mb-6">
              Мы помогаем создавать праздник
            </h2>
            <p className="text-sm leading-7 mb-6" style={{ color: "var(--brand-gray)" }}>
              ПодарокДетям — магазин, где каждый подарок отобран вручную. Мы работаем с проверенными производителями и следим за качеством. Наша цель — чтобы ребёнок помнил этот момент всю жизнь.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "ShieldCheck", text: "Проверенные производители" },
                { icon: "Truck", text: "Доставка за 1–2 дня" },
                { icon: "RotateCcw", text: "Обмен и возврат 14 дней" },
                { icon: "Gift", text: "Подарочная упаковка" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#FEF0EE" }}>
                    <Icon name={item.icon as "ShieldCheck" | "Truck" | "RotateCcw" | "Gift"} size={18} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--brand-dark)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20" style={{ backgroundColor: "white" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--brand-red)" }}>Контакты</p>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "2.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--brand-dark)" }} className="mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-sm mb-10" style={{ color: "var(--brand-gray)" }}>
            Помогаем выбрать подарок, оформить заказ и ответить на любой вопрос
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "Phone", title: "+7 (800) 123-45-67", sub: "Бесплатно по России", href: "tel:+78001234567" },
              { icon: "Mail", title: "hello@podarodetiam.ru", sub: "Ответим за 1 час", href: "mailto:hello@podarodetiam.ru" },
              { icon: "MapPin", title: "Москва, ул. Ёлочная, 1", sub: "Ежедневно 10:00–20:00", href: "#" },
            ].map((c) => (
              <a key={c.title} href={c.href} className="rounded-2xl p-6 block hover-lift"
                style={{ backgroundColor: "var(--brand-cream)", border: "1px solid #ede8e0", textDecoration: "none" }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#FEF0EE" }}>
                  <Icon name={c.icon as "Phone" | "Mail" | "MapPin"} size={20} />
                </div>
                <div className="font-medium text-sm mb-1" style={{ color: "var(--brand-dark)" }}>{c.title}</div>
                <div className="text-xs" style={{ color: "var(--brand-gray)" }}>{c.sub}</div>
              </a>
            ))}
          </div>

          <div className="rounded-2xl p-8 text-left" style={{ backgroundColor: "var(--brand-cream)", border: "1px solid #ede8e0" }}>
            <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--brand-dark)" }} className="mb-6 text-center">
              Напишите нам
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Ваше имя"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: "1px solid #ede8e0", backgroundColor: "white", color: "var(--brand-dark)", fontFamily: "'Golos Text', sans-serif" }} />
              <input type="tel" placeholder="Телефон"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: "1px solid #ede8e0", backgroundColor: "white", color: "var(--brand-dark)", fontFamily: "'Golos Text', sans-serif" }} />
            </div>
            <textarea rows={3} placeholder="Ваш вопрос или пожелание"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none mb-4"
              style={{ border: "1px solid #ede8e0", backgroundColor: "white", color: "var(--brand-dark)", fontFamily: "'Golos Text', sans-serif" }} />
            <button className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-200"
              style={{ backgroundColor: "var(--brand-red)", color: "white" }}>
              Отправить сообщение
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t" style={{ backgroundColor: "var(--brand-dark)", borderColor: "#2a2420" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "'Cormorant', serif", fontSize: "1.3rem", color: "white", fontWeight: 600 }}>ПодарокДетям 🎁</span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>© 2025 Все права защищены</span>
          <div className="flex gap-6">
            {navItems.slice(0, 4).map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-xs transition-opacity hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Golos Text', sans-serif" }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

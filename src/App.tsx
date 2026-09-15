import { useMemo, useState } from 'react'
import './App.css'

type Product = { id: number; name: string; category: string; price: number; image: string; tag?: string }

const products: Product[] = [
  { id: 1, name: 'Vestido Siena', category: 'Vestidos', price: 489, tag: 'Novo', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Blazer Verona', category: 'Alfaiataria', price: 629, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Blusa Aura', category: 'Essenciais', price: 219, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Saia Amélie', category: 'Saias', price: 329, tag: 'Favorito', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Tricot Flora', category: 'Essenciais', price: 289, image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Calça Noa', category: 'Alfaiataria', price: 379, image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85' },
]
const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`

function App() {
  const [activeCategory, setActiveCategory] = useState('Tudo')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === 'Tudo' || product.category === activeCategory
    return matchesCategory && product.name.toLowerCase().includes(search.toLowerCase())
  }), [activeCategory, search])
  const toggleFavorite = (id: number) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const addToCart = (product: Product) => setCart((current) => current.some((item) => item.id === product.id) ? current : [...current, product])

  return <main>
    <div className="announcement">Frete grátis nas compras acima de R$ 499 <span>·</span> Parcele em até 6x sem juros</div>
    <header className="site-header">
      <button className="mobile-menu" aria-label="Abrir menu">☰</button>
      <nav className="main-nav"><a href="#colecao">Coleção</a><a href="#essenciais">Essenciais</a><a href="#sobre">A marca</a></nav>
      <a className="brand" href="#top">chick chick</a>
      <div className="header-actions"><label className="search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar" aria-label="Buscar produtos" /></label><button className="icon-button" aria-label="Favoritos">♡<small>{favorites.length || ''}</small></button><button className="icon-button bag" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho">♧<small>{cart.length || ''}</small></button></div>
    </header>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">Coleção 01 — 2024</p><h1>Vista o seu<br /><em>momento.</em></h1><p className="hero-text">Peças para quem encontra beleza na simplicidade e força nos detalhes.</p><a className="primary-button" href="#colecao">Explorar coleção <span>↗</span></a></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=1400&q=90" alt="Modelo usando vestido rosa da nova coleção Maia" /><div className="image-note">01 <span>/</span> 04</div></div><div className="hero-caption">Elegância que<br />acompanha você.</div></section>
    <section className="collection" id="colecao"><div className="section-heading"><div><p className="eyebrow">Curadoria Maia</p><h2>Escolhas da<br /><em>temporada</em></h2></div><p className="section-intro">Uma seleção feita para atravessar estações. Silhuetas fluidas, texturas especiais e a delicadeza de ser você.</p></div><div className="catalog-toolbar"><div className="categories">{['Tudo', 'Vestidos', 'Alfaiataria', 'Essenciais', 'Saias'].map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><span className="product-count">{filteredProducts.length} peças</span></div><div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} /><span className="product-tag">{product.tag || product.category}</span><button className={`favorite ${favorites.includes(product.id) ? 'selected' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label={`Favoritar ${product.name}`}>{favorites.includes(product.id) ? '♥' : '♡'}</button><button className="quick-add" onClick={() => addToCart(product)}>Adicionar à sacola <span>+</span></button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>{formatPrice(product.price)}</strong></div></article>)}</div>{filteredProducts.length === 0 && <p className="empty-state">Nenhuma peça encontrada para a sua busca.</p>}</section>
    <section className="manifesto" id="sobre"><div className="manifesto-image"><img src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85" alt="Detalhes de tecidos e roupas Maia" /></div><div className="manifesto-copy"><p className="eyebrow">O jeito Maia</p><h2>Menos, mas<br /><em>muito melhor.</em></h2><p>Acreditamos em uma moda que não pede pressa. Em peças que acompanham a vida, revelam quem você é e ficam ainda mais bonitas com o tempo.</p><a className="text-link" href="#colecao">Conheça a nossa história <span>↗</span></a></div></section>
    <footer><a className="brand" href="#top">chick chick</a><p>Feito para os seus dias mais bonitos.</p><div className="footer-links"><a href="#colecao">Instagram</a><a href="#colecao">Atendimento</a><a href="#colecao">Trocas e devoluções</a></div></footer>
    {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="cart-head"><h2>Sua sacola <span>{cart.length}</span></h2><button onClick={() => setCartOpen(false)} aria-label="Fechar carrinho">×</button></div>{cart.length ? <>{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{formatPrice(item.price)}</p></div></div>)}<div className="cart-total"><span>Total</span><strong>{formatPrice(cart.reduce((sum, item) => sum + item.price, 0))}</strong></div><button className="primary-button checkout">Finalizar compra <span>↗</span></button></> : <div className="empty-cart"><span>♡</span><p>Sua sacola está vazia.</p><button onClick={() => setCartOpen(false)}>Continuar explorando</button></div>}</aside></div>}
  </main>
}
export default App

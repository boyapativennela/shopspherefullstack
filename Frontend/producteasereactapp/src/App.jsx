import ProductList from "./components/ProductList";

export default function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-start justify-center px-6 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1616627453525-4d7a8f8e8f63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/70 to-black/90"></div>
      <div className="relative z-10 w-full max-w-6xl">
        <h1 className="text-6xl font-extrabold text-center mb-10 tracking-wide bg-gradient-to-r from-pink-400 via-yellow-300 to-green-400 text-transparent bg-clip-text drop-shadow-lg">
          🌟 ShopSphere
        </h1>
        <ProductList />
      </div>
    </div>
  );
}

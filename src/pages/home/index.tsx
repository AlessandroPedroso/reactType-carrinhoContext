import { BsCartPlus } from "react-icons/bs";

export function Home() {
  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">
          Produtos em alta
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          <section className="w-full flex flex-col items-center">
            <img
              className="w-full rounded-lg max-w-80 mb-2"
              src="https://cdn.awsli.com.br/2500x2500/1919/1919257/produto/212487764/mme73-jqqyzmb9k5.jpg"
              alt="logo do produto"
            />
            <p className="font-medium mt-1 mb-2">Airpods Pro</p>
            <div className="flex gap-3 items-center">
              <strong className="text-zinc-700/90">R$ 1000</strong>
              <button className="bg-zinc-900 p-1 rounded">
                <BsCartPlus size={20} color="#FFF" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

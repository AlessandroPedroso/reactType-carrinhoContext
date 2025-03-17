import { createContext, ReactNode, useState } from "react";
import { ProductsProps } from "../pages/home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem:ProductsProps) => void;
}

interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);

  function addItemCart(newItem:ProductsProps) {
    //Adiciona no carrinho
    //verificar se já não existe no carrinho
    const indexItem = cart.findIndex(item => item.id === newItem.id);// -1 - se não encontrar

    if (indexItem !== -1) {
      // se entrou aqui apenas soma +1 um na quantidade e calculamos o total desse carrinho.
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;// calcula a quantidade * o valor

      setCart(cartList);
      return;

    }

    //Adicionar esse item na nossa lista
    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    setCart(products => [...products,data])//adiciona o que já tem e coloca um novo
  }

  return (
    <CartContext.Provider value={{ cart, cartAmount: cart.length,addItemCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

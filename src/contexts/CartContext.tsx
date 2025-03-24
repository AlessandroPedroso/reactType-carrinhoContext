import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductsProps } from "../pages/home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductsProps) => void;
  formatPrice: (value: number) => string;
  removeItemCart: (produc: CartProps) => void;
  total: string;
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
  const [total, setTotal] = useState("");

  function addItemCart(newItem: ProductsProps) {
    //Adiciona no carrinho
    //verificar se já não existe no carrinho
    const indexItem = cart.findIndex((item) => item.id === newItem.id); // -1 - se não encontrar

    if (indexItem !== -1) {
      // se entrou aqui apenas soma +1 um na quantidade e calculamos o total desse carrinho.
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price; // calcula a quantidade * o valor

      setCart(cartList);
      totalResultCart(cartList);
      updateLocalStorage(cartList)
      return;
    }

    //Adicionar esse item na nossa lista

    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((products) => [...products, data]); //adiciona o que já tem e coloca um novo
    totalResultCart([...cart, data]);
    updateLocalStorage([...cart, data])
  }

  function formatPrice(value: number): string {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id);

    if (cart[indexItem]?.amount > 1) {
      //diminuir apenas 1 amount do que você tem
      let cartList = cart;
      cartList[indexItem].amount = cartList[indexItem].amount - 1;
      cartList[indexItem].total =
        cartList[indexItem].total - cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      updateLocalStorage(cartList)
      return;
    }

    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);
    updateLocalStorage(removeItem)
  }

  function totalResultCart(items: CartProps[]) {
    let myCart = items;
    let result = myCart.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);

    const resultFormat = formatPrice(result);
    setTotal(resultFormat);
  }

  function updateLocalStorage(products: CartProps[]) {
    
    localStorage.setItem("@cartList",JSON.stringify(products))
    
  }


  useEffect(() => {
    const loadProducts = localStorage.getItem("@cartList");
    if (loadProducts) {
      setCart(JSON.parse(loadProducts))
     totalResultCart(JSON.parse(loadProducts))
    }
  },[])

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        formatPrice,
        removeItemCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

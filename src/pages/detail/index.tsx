import {useState,useEffect,useContext} from 'react'
import { useParams,useNavigate } from "react-router"
import { api } from '../../services/api';
import { ProductsProps } from '../home';
import { BsCartPlus } from 'react-icons/bs'
import { CartContext } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

export function Detail() {
    const { id } = useParams();
    const [product, setProducts] = useState<ProductsProps>()
    const { addItemCart } = useContext(CartContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        async function getProduct():Promise<void> {
            const response = await api.get(`/products/${id}`)
            setProducts(response.data)
        }
        getProduct();
    }, [id])
    
    function handleAddCartItem(product: ProductsProps): void {
            toast.success("Produto adicionado no carrinho.", {
      style: {
        borderRadius: 10,
        backgroundColor: '#121212',
        color:'#fff'
      }
    })
        addItemCart(product)
        navigate('/cart')
    }
    return (
        <div className=' min-h-[calc(100vh-56px)] flex items-center'>
            <main className='w-full max-w-7xl px-4 mx-auto my-6'>
            {product && (
                <section className='w-full'>
                        <div className='flex flex-col lg:flex-row'>
                            <img className='flex-1 w-full max-h-72 object-contain' src={product?.cover} alt={product?.title} />
                            <div className='flex-1'>
                                <p className='font-bold text-2xl mt-4 mb-2'>{product?.title}</p>
                                <p className='my-4'>{product?.description}</p>
                                <strong className='text-zinc-700 text-xl'>{product?.price.toLocaleString("pt-BR", {
                                    style: 'currency',
                                    currency:'BRL'
                                })}</strong>
                                <button onClick={()=> handleAddCartItem(product)} className='bg-zinc-900 p-1 rounded cursor-pointer ml-3'>
                                    <BsCartPlus size={ 20 } color='#FFF' />
                                </button>
                            </div>
                        </div>
                </section>
             )}
            </main>
        </div>
    )

}
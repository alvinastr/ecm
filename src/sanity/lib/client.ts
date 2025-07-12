import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { sanityFetch } from './live'
import { Product, ProductCategory, Order } from '@/sanity.types'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const getAllProducts = async () => {
  const query = `*[_type == "product"]`
  const products = await sanityFetch({query: query});
  return products.data as Product[]
}

export const getAllCategories = async () => {
  const query = `*[_type == "productCategory"]`
  const categories = await sanityFetch({query: query});
  return categories.data as ProductCategory[]
}

export const getCategoryBySlug = async (slug: string) => {
  const query = `*[_type == "productCategory" && slug.current == $slug][0]`
  const category = await sanityFetch({ query: query, params: { slug } });
  return category.data as ProductCategory;
}

export const getProductsByCategorySlug = async (slug: string) => {
  const query = `*[_type == "product" && references(*[_type == "productCategory" && slug.current == $slug][0]._id)]`
  const products = await sanityFetch({ query: query, params: { slug } });
  return products.data as Product[];
}

export const getProductById = async (id: string) => {
  const query = `*[_type == "product" && _id == $id][0]`;
  const product = await sanityFetch({ query: query, params: { id } });
  return product.data as Product | null;
}

export const searchProducts = async (searchQuery: string) => {
  const query = `*[_type == "product" && (
    title match "*" + $searchQuery + "*" ||
    description match "*" + $searchQuery + "*" ||
    category->title match "*" + $searchQuery + "*" ||
    category->slug.current match "*" + $searchQuery + "*"
  )]`;

  const products = await sanityFetch({ query: query, params: { searchQuery } });
  return products.data as Product[];
}

export const getOrders = async (userId?: string) => {
  let query = `*[_type == "order"]`;
  let params = {};
  
  if (userId) {
    query = `*[_type == "order" && customerId == $userId]`;
    params = { userId };
  }
  
  query += ` | order(orderDate desc) {
    _id,
    orderNumber,
    orderDate,
    customerId,
    customerEmail,
    customerName,
    totalPrice,
    status,
    shippingAddress,
    orderItems[] {
      _key,
      quantity,
      price,
      product-> {
        _id,
        title,
        image
      }
    }
  }`;
  
  const orders = await sanityFetch({ query, params });
  return orders.data as Order[];
}

export const getOrderById = async (orderId: string) => {
  const query = `*[_type == "order" && _id == $orderId][0] {
    _id,
    orderNumber,
    orderDate,
    customerId,
    customerEmail,
    customerName,
    stripeCustomerId,
    stripeCheckoutSessionId,
    stripePaymentIntentId,
    totalPrice,
    status,
    shippingAddress,
    orderItems[] {
      _key,
      quantity,
      price,
      product-> {
        _id,
        title,
        description,
        price,
        image
      }
    }
  }`;
  
  const order = await sanityFetch({ query, params: { orderId } });
  return order.data as Order | null;
}